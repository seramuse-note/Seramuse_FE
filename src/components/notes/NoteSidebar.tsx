import { Ellipsis, Mic, Plus, X, Funnel, Trash } from 'lucide-react';
import { useState } from 'react';
import { Pagination } from '@/components/common/Pagination';
import type { LayoutMode } from '../layout/NoteMainLayout';
import { formatDate } from '@/utils/formatDate';
import SidebarNoteSkeleton from '../skeleton/NoteSkeleton';
import FilterPopover from './FilterSection';
import type { Note } from '@/types/notes.types';
import type { ApiResponse, ApiResponseItemNote } from '@/types/api.types';
import { useCreateNoteMutation } from '@/services/notesApi';

const TAG_OPTIONS = ['Work', 'Personal', 'Study'];
const MOOD_OPTIONS = ['😊 Vui vẻ', '🧘 Tập trung', '😴 Mệt mỏi', '🔥 Hào hứng'];

interface NoteSidebarProps {
  notes: ApiResponse<Note> | undefined;
  isLoading: boolean;
  isFetching: boolean;
  currentPage: number;
  layoutMode: LayoutMode;
  selectedNoteId?: string | null;
  onPageChange: (page: number) => void;
  onSelectNote: (noteId: string) => void;
  onCreateNote: (newNote: ApiResponseItemNote<Note>) => void;
}

export const NoteSidebar = ({
  notes,
  isLoading,
  isFetching,
  currentPage,
  layoutMode,
  onPageChange,
  onSelectNote,
  onCreateNote,
}: NoteSidebarProps) => {
  const [createNote] = useCreateNoteMutation();
  const [activeTab, setActiveTab] = useState<'all' | 'favorite'>('all');

  const listNote = notes?.data ?? [];
  const pagination = notes?.meta?.pagination;
  const displayNotes = listNote.filter((note) => {
    return activeTab === 'favorite' ? note.isFavorite : true;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<{ tags: string[]; moods: string[] }>({
    tags: [],
    moods: [],
  });

  const handleApplyFilter = (selectedData: { tags: string[]; moods: string[] }) => {
    setFilters(selectedData);
    setIsOpen(!isOpen);
    console.log('Giá trị Filter nhận được:', selectedData);
  };

  function handlePageChange(page: number): void {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleCreateNote = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await createNote({
        title: '',
        blocks: [],
      }).unwrap();

      onCreateNote(response);
    } catch (err) {
      console.error('Lỗi khi tạo note:', err);
    }
  };

  // const handleDeleteNote = async (id: string) => {
  //   try {

  //   } catch (err) {
  //     console.error('Lỗi khi xoa note:', err);
  //   }
  // };
  // const handleFavoriteNote = (id: string) => {
  //   setListNote((prevNotes: Note[]) =>
  //     prevNotes.map((note) => (note.id === id ? { ...note, isFavorite: !note.isFavorite } : note))
  //   );
  // };

  if (isLoading || isFetching) return <SidebarNoteSkeleton count={4} />;

  return (
    <div className={`h-full relative bg-white/45 backdrop-blur-lg p-4 `}>
      <div className={`h-full flex flex-col gap-4 w-full mx-auto `}>
        <div className="flex flex-col md:gap-4 gap-3 w-full">
          <div className="flex justify-between items-center px-1 shrink-0">
            <div className=" items-start text-base font-bold flex-1">Recent</div>
            <div className="flex gap-1.5">
              <button
                className=" p-2 bg-white/60 hover:bg-white/90 rounded-full
                  border border-white/80  text-brand-accent-primary cursor-pointer"
                title="Use voice chat"
              >
                <Mic className="w-4 h-4"></Mic>
              </button>
              <button
                onClick={handleCreateNote}
                className=" p-2 bg-white/60 hover:bg-white/90 rounded-full border
                border-white/80  text-brand-accent-primary cursor-pointer"
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
                className=" w-full bg-white/60 border border-white/80
                rounded-xl px-4 py-2.5 text-xs text-brand-accent-primary
                placeholder-brand-accent-tertiary outline-none focus:bg-white/90
                focus:border-brand-accent-secondary shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs  text-brand-accent-primary cursor-pointer"
                >
                  <X className="w-3 h-3 " />
                </button>
              )}
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="px-2.5 py-2.5 bg-white/90 hover:bg-white rounded-xl border
              border-white/80  text-brand-accent-tertiary shadow-sm cursor-pointer"
              >
                <Funnel className="w-4 h-4" />
              </button>
              {isOpen && (
                <FilterPopover
                  key={JSON.stringify(filters.tags) + JSON.stringify(filters.moods)}
                  tagOptions={TAG_OPTIONS}
                  moodOptions={MOOD_OPTIONS}
                  initialTags={filters.tags}
                  initialMoods={filters.moods}
                  onClose={() => setIsOpen(false)}
                  onApply={handleApplyFilter}
                />
              )}
            </div>
          </div>
          <div
            className="min-w-0 min-h-0 overflow-hidden
            px-2.5 py-2 bg-white/30 backdrop-blur-md
            hover:bg-white/80 border border-white/40 shadow-sm
            gap-1.5 flex items-center justify-between rounded-2xl"
          >
            <div
              onClick={() => setActiveTab('all')}
              className={`flex-1 flex items-center justify-center p-1.5 gap-1
              shadow-sm text-xs rounded-xl font-medium transition-all duration-300 cursor-pointer
              ${
                activeTab === 'all'
                  ? ' bg-brand-accent-primary text-white'
                  : 'text-brand-accent-tertiary hover:text-brand-accent-primary hover:bg-white/50'
              }`}
            >
              <span>All</span>
            </div>
            <div
              onClick={() => setActiveTab('favorite')}
              className={`flex-1 flex items-center justify-center p-1.5 gap-1
              shadow-sm text-xs rounded-xl font-medium  transition-all duration-300 cursor-pointer
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
              ${layoutMode === 'FULL_SIDEBAR' ? 'grid-cols-1 md:grid-cols-2 md:items-center' : 'grid-cols-1 items-start'}`}
            >
              {displayNotes.map((note) => {
                // const isFavorite = note.isFavorite;
                return (
                  <div
                    key={note.id}
                    onClick={() => onSelectNote(note.id)}
                    className="group flex flex-col relative p-5 pb-1 gap-3 rounded-2xl bg-white/65 backdrop-blur-md border border-transparent
                    hover:bg-white/85 hover:shadow-xs active:scale-99 active:shadow-xs  duration-100 cursor-pointer "
                  >
                    <div className="flex ">
                      <h3
                        className="font-semibold text-sm active:text-brand-accent-secondary
                        group-hover:text-brand-accent-secondary transition-colors line-clamp-1"
                      >
                        {note.title || 'Untitled'}
                      </h3>
                    </div>
                    <div className="min-h-[32px] text-[11px] text-brand-accent-tertiary line-clamp-2 leading-relaxed">
                      {note.blocks.map((block) => block.properties?.text || '')}
                    </div>

                    <div className=" h-[35px] flex items-center py-5 border-t border-white/20 overflow-hidden">
                      {note.tags && note.tags.length > 0 && (
                        <div className="flex flex-nowrap gap-1.5">
                          {note.tags.map((tag) => (
                            <span
                              key={tag.id}
                              className="text-[9px] font-semibold px-2 py-0 rounded-lg bg-white/80 border border-white/50 shrink-0"
                              style={{
                                borderColor: tag.color ? `#${tag.color}` : undefined,
                                color: tag.color ? `#${tag.color}` : undefined,
                              }}
                            >
                              #{tag.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between border-t border-brand-accent-tertiary/10 ">
                      <div className="text-[10px] text-brand-accent-tertiary font-medium active:text-brand-accent-secondary">
                        {formatDate(note.created_at || '2026-07-14T05:28:46')}
                      </div>
                      <div className="flex gap-1 items-center">
                        {/* <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFavoriteNote(note.id);
                          }}
                          className="p-2 cursor-pointer transition-transform active:scale-90"
                          title={isFavorite ? 'Unlike' : 'Like'}
                        >
                          <Heart
                            className={`w-3  transition-colors duration-300
                            ${
                              isFavorite
                                ? 'fill-pink-500 text-pink-500'
                                : 'fill-brand-accent-tertiary text-brand-accent-tertiary'
                            }`}
                          />
                        </button> */}
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="p-1 cursor-pointer transition-transform active:scale-90"
                          >
                            <Ellipsis className="w-5  text-brand-accent-tertiary hover:text-brand-accent-primary" />
                          </button>
                          <div className="absolute z-50 bottom-full right-0 mb-2 min-w-[100px] bg-white rounded-xl shadow-lg border border-gray-100 p-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // handleDeleteNote(note?.id);
                              }}
                              className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer font-medium"
                            >
                              <Trash className="w-3 h-3" />
                              <p>Delete</p>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col h-full w-full items-center justify-center gap-3 p-6 text-center select-none animate-fadeIn">
              <div className="space-y-1 max-w-full">
                {searchQuery ? (
                  <div className="flex flex-col items-center">
                    <p className="text-sm font-bold text-brand-accent-primary">
                      Không tìm thấy kết quả
                    </p>
                    <p className="text-[11px] text-brand-accent-tertiary leading-relaxed">
                      Không có ghi chú phù hợp với từ khóa tìm kiếm
                    </p>
                  </div>
                ) : listNote.length === 0 ? (
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-sm font-bold text-brand-accent-primary">Chưa có ghi chú</p>
                    <p className="text-[11px] text-brand-accent-tertiary leading-relaxed">
                      Hãy tạo ghi chú đầu tiên của bạn để bắt đầu lưu trữ ý tưởng!
                    </p>
                    <button
                      onClick={handleCreateNote}
                      type="button"
                      className="mt-1 px-3.5 py-1.5 text-xs font-semibold text-white bg-brand-accent-primary 
                        hover:bg-brand-accent-secondary rounded-xl shadow-xs transition-all duration-200 
                          active:scale-95 cursor-pointer flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tạo ghi chú mới</span>
                    </button>
                  </div>
                ) : activeTab === 'favorite' ? (
                  <div className="flex flex-col items-center">
                    <p className="text-sm font-bold text-brand-accent-primary">
                      Chưa có ghi chú yêu thích
                    </p>
                    <p className="text-[11px] text-brand-accent-tertiary leading-relaxed">
                      Nhấn vào biểu tượng trái tim ở ghi chú để đưa vào danh sách favorite nhé!
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center items-center w-full shrink-0 ">
          {layoutMode === 'FULL_SIDEBAR' ? (
            <Pagination
              currentPage={currentPage}
              totalPages={pagination?.totalPages ?? 1}
              onPageChange={handlePageChange}
            />
          ) : (
            <div
              className="flex justify-center items-center
          mt-auto w-full p-2.5 bg-white/50
          hover:bg-white/80 backdrop-blur-md rounded-2xl border
          border-white/70 text-xs font-medium text-brand-accent-primary
          hover:text-brand-accent-secondary shadow-sm
          cursor-pointer whitespace-nowrap truncate shrink-0"
            >
              All post
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
