import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  total?: number;
  limit?: number;
  isLoading?: boolean;
  onPageChange: (_page: number) => void;
}

function getPageNumbers(currentPage: number, totalPages: number, siblingCount = 1) {
  // siblingCount: số lượng trang ĐƯỢC hiển thị bên cạnh currentPage (mặc định là 1)

  const maxGroupSize = 3 + 2 * siblingCount;
  const totalPageNumbers = maxGroupSize + 2;
  // Tổng số nút tối đa

  // Trường hợp 1: Nếu số nút tối đa cho phép NHIEU HON tổng số trang
  // -> hiển thị tất cả
  if (totalPageNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

  const FIRST_PAGE = 1;
  const LAST_PAGE = totalPages;

  // Trường hợp 2: Chỉ ẩn bên phải (dấu ... bên phải)
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftRange = Array.from({ length: maxGroupSize }, (_, i) => i + 1);
    return [...leftRange, '...', LAST_PAGE];
  }

  // Trường hợp 3: Chỉ ẩn bên trái (dấu ... bên trái)
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightRange = Array.from(
      { length: maxGroupSize },
      (_, i) => totalPages - maxGroupSize + i + 1
    );
    return [FIRST_PAGE, '...', ...rightRange];
  }

  // Trường hợp 4: Ẩn cả 2 bên (dấu ... ở cả 2 bên)
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [FIRST_PAGE, '...', ...middleRange, '...', LAST_PAGE];
  }
  return [];
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  const handlePageClick = (page: number | string) => {
    if (page === '...') return;
    if (typeof page === 'number') {
      onPageChange?.(page);
    }
  };

  return (
    <div className="flex justify-between items-center px-2 py-2 shrink-0 border-t border-white/40 w-full">
      <span className="text-xs text-brand-accent-tertiary font-medium ">
        Page {currentPage} of {totalPages}
      </span>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className=" cursor-pointer p-1.5 rounded-lg bg-white/60 border border-white/80 text-brand-accent-primary hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`dots-${index}`}
                className="cursor-pointer py-1 text-brand-accent-primar w-7 h-7 text-xs"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`w-7 h-7 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                currentPage === page
                  ? 'bg-brand-accent-primary text-white shadow-sm'
                  : 'bg-white/40 hover:bg-white/80 text-brand-accent-primary'
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="cursor-pointer p-1.5 rounded-lg bg-white/60 border border-white/80 text-brand-accent-primary hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
