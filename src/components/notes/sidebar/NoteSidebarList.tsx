import { useState, type FC } from 'react';
import type { ActiveTab } from '@/constants/tab.constants';
import type { Note } from '@/types';
import { NoteCard } from '../NoteCard';
import { ConfirmModal } from '@/components/common/ConfirmModal';
import { NoteSidebarEmptyState } from './NoteSidebarEmptyState';
import { useDeleteNoteMutation, useUpdateFavoriteMutation } from '@/services';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { selectNote } from '@/store/slices/noteUiSlice';
import { toast } from 'react-toastify';

interface NoteSidebarListProps {
  notes: Note[];
  searchQuery: string;
  activeTab: ActiveTab;
  hasFilters: boolean;
}

export const NoteSidebarList: FC<NoteSidebarListProps> = ({
  notes,
  searchQuery,
  activeTab,
  hasFilters,
}) => {
  const dispatch = useAppDispatch();
  const activeNoteId = useAppSelector((state) => state.uiNote.activeNoteId);

  const [deletingNote, setDeletingNote] = useState<Note | null>(null);
  const [deleteNote] = useDeleteNoteMutation();
  const [updateFavorite] = useUpdateFavoriteMutation();

  const handleActiveNote = (id: string) => {
    dispatch(selectNote(id));
  };

  const handleDeleteNote = async () => {
    if (!deletingNote) return;
    try {
      await deleteNote({ id: deletingNote.id }).unwrap();
      toast.success('Xóa note thành công!');
      setDeletingNote(null);
    } catch (err) {
      toast.error('Xóa thất bại rồi!');
      console.error('Lỗi:', err);
    }
  };

  const handleToggleLike = async (id: string) => {
    try {
      await updateFavorite({ id }).unwrap();
    } catch {
      toast.error('Cập nhật thất bại!');
    }
  };

  return (
    <div className="min-h-0 h-full w-full overflow-y-auto flex">
      {notes && notes.length > 0 ? (
        <div
          className={`w-full h-full pr-2 grid gap-4 justify-center md:gap-4 ${
            !activeNoteId ? 'grid-cols-1 md:grid-cols-2 md:items-start' : 'grid-cols-1 items-start'
          }`}
        >
          {notes.map((note) => (
            <NoteCard
              key={`${note.id}`}
              note={note}
              isActive={activeNoteId === note.id}
              onActiveNote={handleActiveNote}
              onToggleLike={handleToggleLike}
              onOpenDeleteModal={() => setDeletingNote(note)}
            />
          ))}

          {deletingNote && (
            <ConfirmModal
              isOpen={!!deletingNote}
              title="Xác nhận xóa ghi chú"
              description={
                <>
                  Ghi chú{' '}
                  <span className="font-semibold text-brand-accent-primary">
                    '{deletingNote?.title || 'Untitled'}'
                  </span>{' '}
                  sẽ bị xóa vĩnh viễn và không thể hoàn tác
                </>
              }
              confirmText="Xóa ngay"
              onClose={() => setDeletingNote(null)}
              onConfirm={handleDeleteNote}
            />
          )}
        </div>
      ) : (
        <NoteSidebarEmptyState
          searchQuery={searchQuery}
          hasActiveFilters={hasFilters}
          activeTab={activeTab}
        />
      )}
    </div>
  );
};
