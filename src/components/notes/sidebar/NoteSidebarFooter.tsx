import { Pagination } from '@/components/common/Pagination';
import { closeNote } from '@/store/slices/noteUiSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import type { FC } from 'react';

interface NoteSidebarFooterProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const NoteSidebarFooter: FC<NoteSidebarFooterProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const dispatch = useAppDispatch();
  const activeNoteId = useAppSelector((state) => state.uiNote.activeNoteId);

  const handleCloseNote = () => {
    dispatch(closeNote());
  };

  return (
    <div className="flex justify-center items-center w-full shrink-0">
      {!activeNoteId ? (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      ) : (
        <button
          type="button"
          onClick={handleCloseNote}
          className="flex justify-center items-center mt-auto w-full p-2.5 bg-white/50 hover:bg-white/80 backdrop-blur-md rounded-2xl border
          border-white/70 text-xs font-medium text-brand-accent-primary hover:text-brand-accent-secondary shadow-xs cursor-pointer whitespace-nowrap truncate shrink-0 transition-all"
        >
          All post
        </button>
      )}
    </div>
  );
};
