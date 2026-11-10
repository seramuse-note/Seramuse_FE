import type { FC } from 'react';
import { ArrowLeft, PanelLeftOpen, Save } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { closeNote, toggleNav } from '@/store/slices/noteUiSlice';

interface NoteEditorHeaderProps {
  title?: string;
  isSavingNote: boolean;
  isSaveNoteSuccess: boolean;
  onSave: () => void;
}

export const NoteEditorHeader: FC<NoteEditorHeaderProps> = ({
  title,
  isSavingNote,
  isSaveNoteSuccess,
  onSave,
}) => {
  const dispatch = useAppDispatch();
  const isNavCollapsed = useAppSelector((state) => state.uiNote.isNavCollapsed);

  return (
    <div className="flex justify-between items-center h-7 gap-1 p-1 text-brand-accent-primary shadow-xs">
      <div className="flex items-center gap-1">
        {isNavCollapsed && (
          <button
            type="button"
            onClick={() => dispatch(toggleNav())}
            className="p-1 rounded-full bg-white  text-brand-accent-fourth hover:text-brand-accent-secondary hover:bg-white/20 cursor-pointer transition-colors"
            title="Mở thanh điều hướng"
          >
            <PanelLeftOpen className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          type="button"
          onClick={() => dispatch(closeNote())}
          className="p-1 rounded-full text-brand-accent-fourth hover:text-brand-accent-secondary hover:bg-white/20 cursor-pointer transition-colors"
          title="Quay lại danh sách ghi chú"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
        <p className="leading-none truncate ml-1 font-medium">{title || 'Untitled'}</p>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          className="flex items-center gap-1 text-[8px] h-fit shrink-0 bg-brand-accent-primary text-white rounded-xl px-3 cursor-pointer hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          onClick={onSave}
          disabled={isSavingNote}
          title="Lưu ghi chú"
        >
          <Save size={10} />
          <div>{isSaveNoteSuccess ? 'Saved' : isSavingNote ? 'Saving...' : 'Save'}</div>
        </button>
      </div>
    </div>
  );
};
