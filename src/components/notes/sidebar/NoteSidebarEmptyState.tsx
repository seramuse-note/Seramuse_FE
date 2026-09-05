import { EmptyState } from '@/components/common/EmptyState';
import { ACTIVE_TAB, type ActiveTab } from '@/constants/tab.constants';
import { useCreateNoteMutation } from '@/services';
import { selectNote } from '@/store/slices/noteUiSlice';
import { useAppDispatch } from '@/store/store';
import { Plus, RotateCw } from 'lucide-react';
import type { FC, MouseEvent } from 'react';
import { toast } from 'react-toastify';
import { useNoteSidebar } from '../hooks/useNoteSidebar';

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
  const { isError, error } = useNoteSidebar();

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
    if (isError && error) {
      if ('status' in error && error.status === 'FETCH_ERROR') {
        return (
          <EmptyState
            title="Mất kết nối mạng"
            description="Kiểm tra kết nối mạng, vui lòng thử lại"
            action={{
              label: 'Thử lại',
              onClick: () => {
                console.log('12');
              },
              icon: RotateCw,
            }}
          />
        );
      }

      if ('status' in error && error.status === 'TIMEOUT_ERROR') {
        return (
          <EmptyState
            title="Kết nối quá thời gian chờ (Timeout)"
            description="Kiểm tra kết nối mạng, vui lòng thử lại"
            action={{
              label: 'Thử lại',
              onClick: () => {
                console.log('12');
              },
              icon: RotateCw,
            }}
          />
        );
      }

      if ('status' in error && typeof error.status === 'number') {
        return (
          <EmptyState
            title={`Máy chủ lỗi (HTTP ${error.status})`}
            description="Máy chủ lỗi, vui lòng thử lại"
            action={{
              label: 'Thử lại',
              onClick: () => {
                console.log('12');
              },
              icon: RotateCw,
            }}
          />
        );
      }
      return (
        <EmptyState
          title="Đã xảy ra lỗi không xác định"
          description="Vui lòng thử lại"
          action={{
            label: 'Thử lại',
            onClick: () => {
              console.log('12');
            },
            icon: RotateCw,
          }}
        />
      );
    }

    if (isSearchingOrFiltering) {
      return (
        <EmptyState
          title="Không tìm thấy kết quả"
          description="Không có ghi chú phù hợp với từ khóa tìm kiếm hoặc bộ lọc"
        />
      );
    }

    if (activeTab === ACTIVE_TAB.FAVORITE) {
      return (
        <EmptyState
          title="Chưa có ghi chú yêu thích"
          description="Nhấn vào biểu tượng trái tim ở ghi chú để đưa vào danh sách favorite nhé!"
        />
      );
    }

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
