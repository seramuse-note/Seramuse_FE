import type { FC, MouseEvent } from 'react';
import { Mic, Plus, TextAlignJustify } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { toggleNav } from '@/store/slices/noteUiSlice';

interface NoteSidebarHeaderProps {
  handleCreateNote: (e?: MouseEvent) => void;
}

export const NoteSidebarHeader: FC<NoteSidebarHeaderProps> = ({ handleCreateNote }) => {
  const dispatch = useAppDispatch();
  const isNavcollapse = useAppSelector((state) => state.uiNote.isNavCollapsed);

  return (
    <div className="flex justify-between items-center px-1 shrink-0">
      <div className="flex gap-2 text-brand-accent-primary text-base">
        <button
          type="button"
          onClick={() => dispatch(toggleNav())}
          className={`block cursor-pointer hover:opacity-85 transition-all duration-300 ${!isNavcollapse ? ' md:hidden' : 'md:block'} `}
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
