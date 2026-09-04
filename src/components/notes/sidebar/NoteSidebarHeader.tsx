import type { FC, MouseEvent } from 'react';
import { Mic, Plus, TextAlignJustify } from 'lucide-react';
import { useCreateNoteMutation } from '@/services';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { selectNote, toggleNav } from '@/store/slices/noteUiSlice';
import { toast } from 'react-toastify';

export const NoteSidebarHeader: FC = () => {
  const dispatch = useAppDispatch();
  const [createNote] = useCreateNoteMutation();
  const isNavcollapse = useAppSelector((state) => state.uiNote.isNavCollapsed);

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

  return (
    <div className="flex justify-between items-center px-1 shrink-0">
      <div className="flex gap-2 text-brand-accent-primary text-base">
        <button
          type="button"
          onClick={() => dispatch(toggleNav())}
          className={`cursor-pointer hover:opacity-85 transition-all duration-300 ${!isNavcollapse ? 'md:block-0 hidden' : 'block'} `}
        >
          <TextAlignJustify size={16} />
        </button>
        <div className=" font-bold ">Note List </div>
      </div>{' '}
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
