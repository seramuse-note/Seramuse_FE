import type { FC } from 'react';
import { PanelLeftClose, PanelLeftOpen, Save } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { toggleNav } from '@/store/slices/noteUiSlice';

interface NoteEditorHeaderProps {
  title?: string;
  isSavingNote: boolean;
  onSave: () => void;
}

export const NoteEditorHeader: FC<NoteEditorHeaderProps> = ({ title, isSavingNote, onSave }) => {
  const dispatch = useAppDispatch();
  const isNavCollapsed = useAppSelector((state) => state.uiNote.isNavCollapsed);

  const handleToggleLayout = () => {
    dispatch(toggleNav());
  };

  return (
    <div className="flex justify-between items-center h-7 gap-1 p-1 text-brand-accent-primary shadow-xs">
      <div className="flex items-center">
        <button
          type="button"
          onClick={handleToggleLayout}
          className="block-0 hidden md:inline-flex md:items-center md:justify-center md:w-6 md:h-6 p-1 rounded-full text-brand-accent-fourth hover:text-brand-accent-secondary cursor-pointer border border-transparent transition-colors duration-200"
          title={!isNavCollapsed ? 'Close navbar' : 'Open navbar'}
        >
          {!isNavCollapsed ? (
            <PanelLeftClose className="w-2 h-2 font-light" />
          ) : (
            <PanelLeftOpen className="w-2 h-2 font-light" />
          )}
        </button>
        <p className="leading-none truncate">{title}</p>
      </div>

      <button
        type="button"
        className="flex items-center gap-1 text-[8px] h-fit shrink-0 bg-brand-accent-primary text-white rounded-xl px-3 cursor-pointer hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        onClick={onSave}
        disabled={isSavingNote}
        title="Lưu ghi chú"
      >
        <Save size={8} />
        <div>{isSavingNote ? 'Saving...' : 'Save'}</div>
      </button>
    </div>
  );
};
