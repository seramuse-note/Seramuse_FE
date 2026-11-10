import type { FC } from 'react';
import { RotateCcw } from 'lucide-react';

interface FilterPopoverHeaderProps {
  onReset: () => void;
}

export const FilterPopoverHeader: FC<FilterPopoverHeaderProps> = ({ onReset }) => {
  return (
    <div className="flex items-center justify-between pb-2 border-b border-white/40 shrink-0">
      <h3 className="font-semibold text-sm text-brand-accent-primary tracking-tight">Filter</h3>
      <button
        onClick={onReset}
        type="button"
        title="Đặt lại bộ lọc"
        aria-label="Đặt lại bộ lọc"
        className="flex items-center gap-1.5 text-xs font-medium text-brand-accent-fourth hover:text-brand-accent-primary active:scale-95 transition-all cursor-pointer"
      >
        <RotateCcw className="w-3.5 h-3.5" /> Reset
      </button>
    </div>
  );
};
