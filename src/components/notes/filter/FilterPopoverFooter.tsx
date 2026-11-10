import type { FC } from 'react';

interface FilterPopoverFooterProps {
  onCancel: () => void;
  onApply: () => void;
}

export const FilterPopoverFooter: FC<FilterPopoverFooterProps> = ({ onCancel, onApply }) => {
  return (
    <div className="relative mt-auto z-10 pt-2.5 flex items-center justify-end gap-2 shrink-0 border-t border-white/40">
      <button
        onClick={onCancel}
        type="button"
        className="px-4 py-2 font-medium text-brand-accent-fourth hover:text-brand-accent-primary rounded-xl hover:bg-white/50 transition-all cursor-pointer"
      >
        Hủy
      </button>
      <button
        type="button"
        onClick={onApply}
        className="px-5 py-2 font-medium text-white bg-gray-900/90 hover:bg-black rounded-xl shadow-md active:scale-95 transition-all cursor-pointer"
      >
        Áp dụng
      </button>
    </div>
  );
};
