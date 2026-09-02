import { Mic, Plus } from 'lucide-react';
import type { FC, MouseEvent } from 'react';
import { useCreateNoteMutation } from '@/services';
import { useAppDispatch } from '@/store/store';
import { closeNote, selectNote } from '@/store/slices/noteUiSlice';
import { toast } from 'react-toastify';

export const NoteSidebarHeader: FC = () => {
  const dispatch = useAppDispatch();
  const [createNote] = useCreateNoteMutation();

  const handleCreateNote = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      const response = await createNote({
        title: '',
        blocks: [],
      }).unwrap();

      const noteId = response?.data?.id;
      if (!noteId) {
        console.warn('Không tìm thấy noteId trong response:', response);
        return;
      }
      dispatch(selectNote(noteId));
    } catch (err) {
      console.error('Lỗi khi tạo note:', err);
      toast.error('Tạo ghi chú thất bại!');
    }
  };

  const handleCloseNote = () => {
    dispatch(closeNote());
  };

  return (
    <div className="flex justify-between items-center px-1 shrink-0">
      <button
        type="button"
        onClick={handleCloseNote}
        className="text-base font-bold text-brand-accent-primary cursor-pointer hover:opacity-85 transition-opacity"
      >
        Note List
      </button>
      <div className="flex gap-1.5">
        <button
          type="button"
          className="p-2 bg-white/90 shadow-xs rounded-full text-brand-accent-primary cursor-pointer hover:bg-white transition-colors"
          title="Use voice chat"
        >
          <Mic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleCreateNote}
          className="p-2 shadow-xs bg-white/90 rounded-full text-brand-accent-primary cursor-pointer hover:bg-white transition-colors"
          title="Create a new note"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
