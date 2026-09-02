import { SidebarNoteSkeleton } from '../skeleton/SidebarNoteSkeleton';
import { useNoteSidebar } from './hooks/useNoteSidebar';
import {
  NoteSidebarHeader,
  NoteSidebarSearch,
  NoteSidebarTabs,
  NoteSidebarList,
  NoteSidebarFooter,
} from './sidebar';

export const NoteSidebar = () => {
  // Coordinator quản lý luồng dữ liệu & query params
  const {
    notes,
    pagination,
    isLoading,
    searchQuery,
    setSearchQuery,
    debouncedSearch,
    selectedFilter,
    setSelectedFilter,
    hasActiveFilters,
    activeTab,
    setActiveTab,
    currentPage,
    handlePageChange,
  } = useNoteSidebar();

  return (
    <div className="flex-1 h-full min-h-0 min-w-0 overflow-hidden transform-gpu transition-all duration-300">
      {isLoading ? (
        <SidebarNoteSkeleton count={4} />
      ) : (
        <div className="h-full relative bg-white/45 backdrop-blur-lg p-4">
          <div className="h-full flex flex-col gap-6 w-full mx-auto">
            <div className="flex flex-col md:gap-4 gap-3 w-full">
              {/* Header: tự tạo note, tự đóng note (0 props) */}
              <NoteSidebarHeader />

              {/* Search: 4 props thiết yếu, tự quản lý isOpenFilter */}
              <NoteSidebarSearch
                value={searchQuery}
                onChange={setSearchQuery}
                filter={selectedFilter}
                onFilterChange={setSelectedFilter}
              />

              {/* Tabs: 2 props rõ ràng */}
              <NoteSidebarTabs activeTab={activeTab} onChangeTab={setActiveTab} />
            </div>

            {/* List: 4 props, tự quản lý modal xóa, favorite, active selection */}
            <NoteSidebarList
              notes={notes}
              searchQuery={debouncedSearch}
              activeTab={activeTab}
              hasFilters={hasActiveFilters}
            />

            {/* Footer: 3 props phân trang, tự đóng note khi bấm All post */}
            <NoteSidebarFooter
              currentPage={currentPage}
              totalPages={pagination?.totalPages ?? 1}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};
