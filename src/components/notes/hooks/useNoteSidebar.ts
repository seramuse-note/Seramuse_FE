import { useState, type MouseEvent } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import {
  useGetMoodsQuery,
  useGetTagsQuery,
  useGetNotesQuery,
  useCreateNoteMutation,
} from '@/services';
import { ACTIVE_TAB, type ActiveTab } from '@/constants/tab.constants';
import type { FilterState } from '@/types';
import { useAppDispatch } from '@/store/store';
import { selectNote } from '@/store/slices/noteUiSlice';
import { toast } from 'react-toastify';

const LIMIT = 10;
const PAGES = 1;

export const useNoteSidebar = () => {
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<ActiveTab>(ACTIVE_TAB.ALL);
  const [createNote] = useCreateNoteMutation();

  const [selectedFilter, setSelectedFilter] = useState<FilterState>({
    moods: [],
    tags: [],
  });

  const debouncedSearch = useDebounce(searchQuery, 400);

  useGetTagsQuery({
    page: PAGES,
    limit: LIMIT,
  });
  useGetMoodsQuery({
    page: PAGES,
    limit: LIMIT,
  });

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleFilterChange = (filter: FilterState) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const {
    data: notesData,
    isLoading,
    isError,
    error,
  } = useGetNotesQuery({
    page: currentPage,
    limit: LIMIT,
    search: debouncedSearch.trim() || undefined,
    tag_id: selectedFilter.tags?.map((item) => item.id).join(','),
    mood_id: selectedFilter.moods?.map((item) => item.id).join(','),
    operator: 'and',
    is_favorite: activeTab === ACTIVE_TAB.FAVORITE ? true : undefined,
  });

  const listNote = notesData?.data ?? [];
  const pagination = notesData?.meta?.pagination;
  const totalNotesCount = pagination?.total ?? listNote.length;

  const displayNotes = listNote.filter((note) => {
    return activeTab === ACTIVE_TAB.FAVORITE ? note.is_favorite : true;
  });

  const hasActiveFilters = Boolean(
    (selectedFilter.tags && selectedFilter.tags.length > 0) ||
    (selectedFilter.moods && selectedFilter.moods.length > 0)
  );

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateNote = async (e?: MouseEvent) => {
    e?.preventDefault();
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

  return {
    notes: displayNotes,
    totalNotesCount,
    pagination,
    isLoading,
    error,
    isError,
    handleCreateNote,

    searchQuery,
    setSearchQuery: handleSearchChange,
    debouncedSearch,
    selectedFilter,
    setSelectedFilter: handleFilterChange,
    hasActiveFilters,

    activeTab,
    setActiveTab: handleTabChange,
    currentPage,
    handlePageChange,
  };
};

export type UseNoteSidebarReturn = ReturnType<typeof useNoteSidebar>;
