import { Pagination } from '@/components/common/Pagination';
import { Ellipsis, Mic, Plus, Heart, X, Funnel } from 'lucide-react';
import type { LayoutMode } from '../layout/NoteMainLayout';
import { useState } from 'react';
import type { Note } from '@/types/notes.types';
import FilterPopover from './FilterSection';
// import FilterPopover from './FilterSection';
// import { Preview } from '@/components/common/Preview';

const mockListNote: Note[] = [
  {
    id: 'note-001',
    title: 'Học React & Tailwind CSS cơ bản',
    mood_id: 'mood-happy',
    blocks: [
      {
        type: 'paragraph',
        properties: {
          text: 'Tìm hiểu về State, Props, Hooks (useState, useEffect, useMemo) và cách cấu hình Tailwind CSS tối ưu giao diện UI.',
        },
        order_index: 1,
      },
    ],
    created_at: '2026-07-20T08:30:00.000Z',
    updated_at: '2026-07-20T09:15:00.000Z',
    tags: [
      {
        id: 'tag-1',
        name: 'frontend',
        color: '3B82F6', // Blue
        created_at: '2026-07-01T00:00:00.000Z',
        updated_at: '2026-07-01T00:00:00.000Z',
      },
      {
        id: 'tag-2',
        name: 'hoc tap',
        color: '10B981', // Green
        created_at: '2026-07-01T00:00:00.000Z',
        updated_at: '2026-07-01T00:00:00.000Z',
      },
    ],
    isFavorite: true,
  },
  {
    id: 'note-002',
    title: 'Lên danh sách đi siêu thị cuối tuần',
    mood_id: 'mood-normal',
    blocks: [
      {
        type: 'paragraph',
        properties: {
          text: 'Mua thịt bò, rau cải, sữa tươi nguyên kem, 1 kg cam sành, nước giặt xả và mớ hành tây.',
        },
        order_index: 1,
      },
    ],
    created_at: '2026-07-21T14:20:00.000Z',
    updated_at: '2026-07-21T14:20:00.000Z',
    tags: [
      {
        id: 'tag-3',
        name: 'ca nhan',
        color: 'F59E0B', // Yellow/Orange
        created_at: '2026-07-01T00:00:00.000Z',
        updated_at: '2026-07-01T00:00:00.000Z',
      },
    ],
    isFavorite: false,
  },
  {
    id: 'note-003',
    title: 'Ý tưởng ứng dụng Quản lý Ghi chú (Note App 2026)',
    mood_id: 'mood-inspired',
    blocks: [
      {
        type: 'paragraph',
        properties: {
          text: 'Tích hợp AI tự động phân loại ghi chú, hỗ trợ giọng nói thành văn bản và đồng bộ dữ liệu đám mây siêu tốc.',
        },
        order_index: 1,
      },
    ],
    created_at: '2026-07-22T10:00:00.000Z',
    updated_at: '2026-07-22T11:45:00.000Z',
    tags: [
      {
        id: 'tag-4',
        name: 'du an',
        color: '8B5CF6', // Purple
        created_at: '2026-07-01T00:00:00.000Z',
        updated_at: '2026-07-01T00:00:00.000Z',
      },
      {
        id: 'tag-5',
        name: 'ai feature',
        color: 'EC4899', // Pink
        created_at: '2026-07-01T00:00:00.000Z',
        updated_at: '2026-07-01T00:00:00.000Z',
      },
    ],
    isFavorite: true,
  },
  {
    id: 'note-004',
    title: 'Biên bản cuộc họp Sprint Planning Q3',
    mood_id: 'mood-serious',
    blocks: [
      {
        type: 'paragraph',
        properties: {
          text: 'Phân công công việc: Nam phụ trách Fix bug giao diện, Hải viết API Backend cho thanh toán, Mai kiểm thử hệ thống.',
        },
        order_index: 1,
      },
    ],
    created_at: '2026-07-23T02:00:00.000Z',
    updated_at: '2026-07-23T03:30:00.000Z',
    tags: [
      {
        id: 'tag-6',
        name: 'cong viec',
        color: 'EF4444', // Red
        created_at: '2026-07-01T00:00:00.000Z',
        updated_at: '2026-07-01T00:00:00.000Z',
      },
    ],
    isFavorite: false,
  },
  {
    id: 'note-005',
    title: 'Công thức nấu Phở Bò Gia Truyền',
    mood_id: 'mood-excited',
    blocks: [
      {
        type: 'paragraph',
        properties: {
          text: 'Hầm xương ống trong 8 tiếng, thêm gừng nướng, hoa hồi, thảo quả, quế và sá sùng để nước dùng ngọt thanh đậm đà.',
        },
        order_index: 1,
      },
    ],
    created_at: '2026-07-24T11:10:00.000Z',
    updated_at: '2026-07-24T11:10:00.000Z',
    tags: [
      {
        id: 'tag-7',
        name: 'am thuc',
        color: '14B8A6', // Teal
        created_at: '2026-07-01T00:00:00.000Z',
        updated_at: '2026-07-01T00:00:00.000Z',
      },
    ],
    isFavorite: true,
  },
  {
    id: 'note-006',
    title: 'Ghi chú rỗng không có tags',
    mood_id: 'mood-quiet',
    blocks: [
      {
        type: 'paragraph',
        properties: {
          text: 'Đây là ghi chú thử nghiệm trường hợp không gán tag nào cả để kiểm tra giao diện hiển thị bọc tag.',
        },
        order_index: 1,
      },
    ],
    created_at: '2026-07-25T16:45:00.000Z',
    updated_at: '2026-07-25T16:45:00.000Z',
    tags: [],
    isFavorite: false,
  },
];
const TAG_OPTIONS = ['Work', 'Personal', 'Study', 'Code'];
const MOOD_OPTIONS = ['😊 Vui vẻ', '🧘 Tập trung', '😴 Mệt mỏi', '🔥 Hào hứng'];

interface EditorPanelProps {
  layoutMode: LayoutMode;
  selectedNoteId?: string | null;
  onSelectNote: (noteId: string) => void;
  // notesList?:
}

export const NoteSidebar = ({
  layoutMode,
  onSelectNote,
  // notesList,
}: EditorPanelProps) => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 3;
  const [activeTab, setActiveTab] = useState<'all' | 'favorite'>('all');
  const [listNote, setListNote] = useState<Note[]>(mockListNote);
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
  //MOCK_NOTES=notesList
  // const totalPages = Math.ceil(notesList.length / itemsPerPage) || 1;
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentNotes = notesList.slice(indexOfFirstItem, indexOfLastItem);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }); // Trả về dạng: 14/07/2026
  };

  const handleFavoriteNote = (id: string) => {
    setListNote((prevNotes: Note[]) =>
      prevNotes.map((note) => (note.id === id ? { ...note, isFavorite: !note.isFavorite } : note))
    );
  };
  const displayNotes = listNote.filter((note) => {
    const matchesTab = activeTab === 'favorite' ? note.isFavorite : true;

    const keyword = searchQuery.toLowerCase().trim();

    const matchTitle = note.title ? note.title.toLowerCase().includes(keyword) : false;

    const matchContent = note.blocks
      ? note.blocks.some((block) => block.properties.text.toLowerCase().includes(keyword))
      : false;

    const matchesSearch = !keyword || matchTitle || matchContent;

    return matchesTab && matchesSearch;
  });

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
        <div className="min-h-0 h-full w-full overflow-y-auto flex ">
          {displayNotes && displayNotes.length > 0 ? (
            <div
              className={`w-full h-full grid gap-4 justify-center  md:gap-4 
              ${layoutMode === 'FULL_SIDEBAR' ? 'grid-cols-1 md:grid-cols-2 md:items-center' : 'grid-cols-1 items-start'}`}
            >
              {displayNotes.map((note) => {
                const isFavorite = note.isFavorite;
                return (
                  <div
                    key={note.id}
                    onClick={() => onSelectNote(note.id)}
                    className="group flex flex-col relative p-5 pb-1 gap-3 rounded-2xl bg-white/65 backdrop-blur-md border border-transparent 
                    hover:bg-white/85 hover:shadow-xs active:scale-98 active:shadow-xs  duration-300 cursor-pointer "
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
                      {note.blocks.map((block) => block.properties.text)}
                    </div>

                    <div className=" h-[35px] border-t border-white/20 overflow-hidden">
                      {note.tags && note.tags.length > 0 && (
                        <div className="flex flex-nowrap gap-1.5  line-clamp-1">
                          {note.tags.map((tag) => (
                            <span
                              key={tag.id}
                              className="text-[9px] font-semibold px-2 py-0 rounded-lg bg-white/80 border border-white/50 shrink-0"
                              style={{
                                borderColor: tag.color ? `#${tag.color}` : undefined,
                                color: tag.color ? `#${tag.color}` : undefined,
                                // background: tag.color ? `#${tag.color}` : undefined,
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
                        <button
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
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="p-1 cursor-pointer transition-transform active:scale-90"
                          title={isFavorite ? 'Unstarred' : 'Starred'}
                        >
                          <Ellipsis className="w-5  text-brand-accent-tertiary hover:text-brand-accent-primary" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-brand-accent-tertiary text-sm font-medium">
              Khong co danh sach hien thi
            </div>
          )}
        </div>

        <div className="flex justify-center items-center w-full shrink-0 ">
          {layoutMode === 'FULL_SIDEBAR' ? (
            // <Pagination
            //   currentPage={currentPage}
            //   totalPages={totalPages}
            //   onPageChange={(page) => setCurrentPage(page)}
            // />
            <div className="hidden w-full shrink-0 md:flex justify-center items-center ">
              <Pagination
                currentPage={1}
                totalPages={3}
                onPageChange={(page) => console.log('Chuyển sang trang:', page)}
              />
            </div>
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
