import { Mic, Plus, X, Funnel } from 'lucide-react';
import { useState } from 'react';
import { Pagination } from '@/components/common/Pagination';

import {
  useGetMoodsQuery,
  useGetTagsQuery,
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useGetNotesQuery,
  useUpdateFavoriteMutation,
} from '@/services';
import { toast } from 'react-toastify';
import { NoteCard } from './NoteCard';
import { FilterPopover } from './FilterPopover';
import { SidebarNoteSkeleton } from '../skeleton/SidebarNoteSkeleton';
import { ACTIVE_TAB, type ActiveTab } from '@/constants/tab.constants';
import { useAppDispatch, useAppSelector } from '@/store/store';
import type { FilterState, Note } from '@/types';
import { closeNote, selectNote } from '@/store/slices/noteUiSlice';
import { ConfirmModal } from '../common/ConfirmModal';
import { EmptyState } from '../common/EmptyState';

const LIMIT = 10;
const PAGES = 1;

export const NoteSidebar = () => {
  const dispatch = useAppDispatch();
  const activeNoteId = useAppSelector((state) => state.uiNote.activeNoteId);
  const [deletingNote, setDeletingNote] = useState<Note | null>(null);

  const [deleteNote] = useDeleteNoteMutation();
  const [createNote] = useCreateNoteMutation();
  const [updateFavorite] = useUpdateFavoriteMutation();

  useGetTagsQuery({
    page: PAGES,
    limit: LIMIT,
  });
  useGetMoodsQuery({
    page: PAGES,
    limit: LIMIT,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<ActiveTab>(ACTIVE_TAB.ALL);
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);

  const { tags, moods } = useAppSelector((state) => state.filter);

  const [selectedFilter, setSelectedFilter] = useState<FilterState>({
    moods: [],
    tags: [],
  });

  const { data: notes, isLoading } = useGetNotesQuery({
    page: currentPage,
    limit: LIMIT,
    search: searchQuery.trim() || undefined,
    tag_id: selectedFilter.tags?.map((item) => item.id).join(','),
    mood_id: selectedFilter.moods?.map((item) => item.id).join(','),
    operator: 'and',
    is_favorite: activeTab === 'favorite' ? true : undefined,
  });

  const listNote = notes?.data ?? [];
  const pagination = notes?.meta?.pagination;
  const displayNotes = listNote.filter((note) => {
    return activeTab === ACTIVE_TAB.FAVORITE ? note.is_favorite : true;
  });

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleActiveNote = (id: string) => {
    dispatch(selectNote(id));
  };

  const handleCreateNote = async (e: React.MouseEvent) => {
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
      toast.success(`${noteId}`);
    } catch (err) {
      console.error('Lỗi khi tạo note:', err);
    }
  };

  const handleDeleteNote = async () => {
    if (!deletingNote) return;
    if (deletingNote) {
      try {
        await deleteNote({ id: deletingNote.id }).unwrap();
        toast.success('Xóa note thành công!');
        setDeletingNote(null);
      } catch (err) {
        toast.error('Xóa thất bại rồi!');
        console.error('Lỗi:', err);
      }
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
    <div className=" flex-1 h-full min-h-0 min-w-0 overflow-hidden transform-gpu transition-all duration-300">
      {isLoading ? (
        <SidebarNoteSkeleton count={4} />
      ) : (
        <div className={`h-full relative bg-white/45 backdrop-blur-lg p-4 `}>
          <div className={`h-full flex flex-col gap-6 w-full mx-auto `}>
            <div className="flex flex-col md:gap-4 gap-3 w-full">
              <div className="flex justify-between items-center px-1 shrink-0">
                <button className="cursor-pointer">
                  <div
                    onClick={() => dispatch(closeNote())}
                    className=" items-start text-base font-bold flex-1"
                  >
                    Note List
                  </div>
                </button>
                <div className="flex gap-1.5">
                  <button
                    className=" p-2 bg-white/90 shadow-xs rounded-full text-brand-accent-primary cursor-pointer  "
                    title="Use voice chat"
                  >
                    <Mic className="w-4 h-4"></Mic>
                  </button>
                  <button
                    onClick={handleCreateNote}
                    className=" p-2  shadow-xs bg-white/90 rounded-full   text-brand-accent-primary cursor-pointer "
                    title="Create a new note"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="relative flex items-center  gap-2 shrink-0 w-full">
                <div className="relative flex-1 flex items-center">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className=" w-full bg-white/60 border border-white/80 rounded-xl px-4 py-2.5 text-xs text-brand-accent-primary
                  placeholder-brand-accent-tertiary outline-none focus:bg-white/90 focus:border-brand-accent-secondary shadow-xs"
                  />
                  {searchQuery.trim() && (
                    <button
                      onClick={() => setSearchQuery('')}
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs  text-brand-accent-primary cursor-pointer"
                    >
                      <X className="w-3 h-3 " />
                    </button>
                  )}
                </div>
                <div className="relative ">
                  <button
                    type="button"
                    onClick={() => setIsOpenFilter((prev) => !prev)}
                    className="px-2.5 py-2.5  bg-white/90 text-brand-accent-primary shadow-xs rounded-xl cursor-pointer hover:bg-white/90  "
                  >
                    <Funnel className="w-4 h-4" />
                  </button>
                  {isOpenFilter && (
                    <FilterPopover
                      key={JSON.stringify(tags) + JSON.stringify(moods)}
                      onClose={() => setIsOpenFilter(false)}
                      onApply={(data: FilterState) => {
                        setSelectedFilter(data);
                      }}
                      selectedFilter={selectedFilter}
                    />
                  )}
                </div>
              </div>
              <div
                className="min-w-0 min-h-0 overflow-hidden px-2.5 py-2 bg-white/30 backdrop-blur-md
              hover:bg-white/80 border border-white/40 shadow-xs gap-1.5 flex items-center justify-between rounded-2xl"
              >
                <div
                  onClick={() => setActiveTab(ACTIVE_TAB.ALL)}
                  className={`flex-1 flex items-center justify-center p-1.5 gap-1 shadow-xs text-xs rounded-xl font-medium transition-all duration-300 cursor-pointer
              ${
                activeTab === 'all'
                  ? ' bg-brand-accent-primary text-white'
                  : 'text-brand-accent-tertiary hover:text-brand-accent-primary hover:bg-white/50'
              }`}
                >
                  <span>All</span>
                </div>
                <div
                  onClick={() => setActiveTab(ACTIVE_TAB.FAVORITE)}
                  className={`flex-1 flex items-center justify-center p-1.5 gap-1 shadow-xs text-xs rounded-xl font-medium  transition-all duration-300 cursor-pointer
              ${
                activeTab === 'favorite'
                  ? ' bg-brand-accent-primary text-white'
                  : 'text-brand-accent-tertiary hover:text-brand-accent-primary hover:bg-white/50'
              }`}
                >
                  <span>Favorites</span>
                </div>
              </div>
            </div>

            <div className="min-h-0 h-full w-full overflow-y-auto flex">
              {displayNotes && displayNotes.length > 0 ? (
                <div
                  className={`w-full h-full pr-2 grid gap-4 justify-center md:gap-4 
                  ${!activeNoteId ? 'grid-cols-1  md:grid-cols-2 md:items-start' : 'grid-cols-1 items-start'}`}
                >
                  {displayNotes.map((note) => {
                    return (
                      <NoteCard
                        key={`${note.id}`}
                        note={note}
                        isActive={activeNoteId === note.id}
                        onActiveNote={() => handleActiveNote(note.id)}
                        onToggleLike={handleToggleLike}
                        onOpenDeleteModal={() => setDeletingNote(note)}
                      />
                    );
                  })}

                  {deletingNote && (
                    <ConfirmModal
                      isOpen={!!deletingNote}
                      title="Xác nhận xóa ghi chú"
                      description={
                        <>
                          Ghi chú
                          <span className="font-semibold text-brand-accent-primary">
                            '{deletingNote?.title || 'Untitled'}'
                          </span>
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
                <div className="flex flex-col h-full w-full items-center justify-center gap-3 p-6 text-center select-none animate-fadeIn">
                  <div className="space-y-1 max-w-full">
                    {!listNote || listNote.length === 0 ? (
                      <EmptyState
                        title="Chưa có ghi chú"
                        description="Hãy tạo ghi chú đầu tiên của bạn để bắt đầu lưu trữ ý tưởng!"
                        action={{
                          label: 'Tạo ghi chú mới',
                          onClick: handleCreateNote,
                          icon: Plus,
                        }}
                      />
                    ) : searchQuery.trim() ? (
                      <EmptyState
                        title="Không tìm thấy kết quả"
                        description="Không có ghi chú phù hợp với từ khóa tìm kiếm"
                      />
                    ) : activeTab === 'favorite' ? (
                      <EmptyState
                        title="Chưa có ghi chú yêu thích"
                        description="Nhấn vào biểu tượng trái tim ở ghi chú để đưa vào danh sách favorite nhé!"
                      />
                    ) : null}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center items-center w-full shrink-0 ">
              {!activeNoteId ? (
                <Pagination
                  currentPage={currentPage}
                  totalPages={pagination?.totalPages ?? 1}
                  onPageChange={handlePageChange}
                />
              ) : (
                <div
                  className="flex justify-center items-center mt-auto w-full p-2.5 bg-white/50 hover:bg-white/80 backdrop-blur-md rounded-2xl border
                 border-white/70 text-xs font-medium text-brand-accent-primary hover:text-brand-accent-secondary shadow-xs cursor-pointer whitespace-nowrap truncate shrink-0"
                >
                  All post
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
