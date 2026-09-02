import { EmptyState } from '@/components/common/EmptyState';
import { ACTIVE_TAB, type ActiveTab } from '@/constants/tab.constants';
import { useCreateNoteMutation } from '@/services';
import { selectNote } from '@/store/slices/noteUiSlice';
import { useAppDispatch } from '@/store/store';
import { Plus } from 'lucide-react';
import type { FC, MouseEvent } from 'react';
import { toast } from 'react-toastify';

interface NoteSidebarEmptyStateProps {
  searchQuery: string;
  hasActiveFilters: boolean;
  activeTab: ActiveTab;
  onCreateNote?: (e?: MouseEvent) => void;
}

export const NoteSidebarEmptyState: FC<NoteSidebarEmptyStateProps> = ({
  searchQuery,
  hasActiveFilters,
  activeTab,
  onCreateNote,
}) => {
  const dispatch = useAppDispatch();
  const [createNote] = useCreateNoteMutation();

  const handleCreateNote = async (e?: MouseEvent) => {
    if (onCreateNote) {
      onCreateNote(e);
      return;
    }
    if (e) e.preventDefault();
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

  const isSearchingOrFiltering = Boolean(searchQuery.trim() || hasActiveFilters);

  const renderEmptyContent = () => {
    // 1. Case: Search or filter has no results
    if (isSearchingOrFiltering) {
      return (
        <EmptyState
          title="Không tìm thấy kết quả"
          description="Không có ghi chú phù hợp với từ khóa tìm kiếm hoặc bộ lọc"
        />
      );
    }

    // 2. Case: In favorites tab and no favorites found
    if (activeTab === ACTIVE_TAB.FAVORITE) {
      return (
        <EmptyState
          title="Chưa có ghi chú yêu thích"
          description="Nhấn vào biểu tượng trái tim ở ghi chú để đưa vào danh sách favorite nhé!"
        />
      );
    }

    // 3. Case: Entire note list is empty
    return (
      <EmptyState
        title="Chưa có ghi chú"
        description="Hãy tạo ghi chú đầu tiên của bạn để bắt đầu lưu trữ ý tưởng!"
        action={{
          label: 'Tạo ghi chú mới',
          onClick: handleCreateNote,
          icon: Plus,
        }}
      />
    );
  };

  return (
    <div className="flex flex-col h-full w-full items-center justify-center gap-3 p-6 text-center select-none animate-fadeIn">
      <div className="space-y-1 max-w-full">{renderEmptyContent()}</div>
    </div>
  );
};
