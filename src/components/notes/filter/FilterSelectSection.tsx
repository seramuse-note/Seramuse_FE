import type { RefObject } from 'react';
import { X } from 'lucide-react';
import type { FilterOptionItem } from '../hooks/useFilterPopover';

interface FilterSelectSectionProps<T extends FilterOptionItem> {
  label: string;
  placeholder: string;
  emptyMessage: string;
  selectedItems: T[];
  filteredOptions: T[];
  searchQuery: string;
  isOpen: boolean;
  dropdownRef: RefObject<HTMLDivElement | null>;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onOpenDropdown: () => void;
  onToggleItem: (item: T) => void;
  onRemoveItem: (item: T) => void;
  className?: string;
}

export const FilterSelectSection = <T extends FilterOptionItem>({
  label,
  placeholder,
  emptyMessage,
  selectedItems,
  filteredOptions,
  searchQuery,
  isOpen,
  dropdownRef,
  onSearchChange,
  onClearSearch,
  onOpenDropdown,
  onToggleItem,
  onRemoveItem,
  className = '',
}: FilterSelectSectionProps<T>) => {
  return (
    <div ref={dropdownRef} className={`relative flex flex-col gap-1.5 ${className}`}>
      <span className="text-[10px] font-bold text-brand-accent-fourth uppercase tracking-wider px-0.5">
        {label}
      </span>

      <div className="flex flex-col gap-2 p-2 bg-white/40 backdrop-blur-sm ring-1 ring-brand-accent-secondary/20 rounded-xl focus-within:bg-white/70 focus-within:border-white focus-within:ring-2 focus-within:ring-brand-accent-secondary/20 transition-all shadow-inner">
        {selectedItems.length > 0 && (
          <div className="p-1 pr-2 bg-white/40 backdrop-blur-sm ring-1 ring-brand-accent-secondary/20 rounded-xl focus-within:bg-white/70 focus-within:border-white focus-within:ring-2 focus-within:ring-brand-accent-secondary/20 transition-all shadow-inner">
            <div className="flex gap-1 flex-wrap overflow-y-auto max-h-10 pb-2 pr-1">
              {selectedItems.map((item) => (
                <span
                  key={item.id}
                  className="inline-flex items-center gap-1 bg-white/80 backdrop-blur-xs shadow-md text-brand-accent-primary text-xs px-2.5 py-1 rounded-xl border border-white/80 font-medium animate-in fade-in-50 duration-150"
                >
                  {item.name}
                  <button
                    type="button"
                    title={`Xóa ${item.name}`}
                    aria-label={`Xóa ${item.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveItem(item);
                    }}
                    className="p-0.5 -mr-1 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3 text-brand-accent-fourth hover:text-brand-accent-primary" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white/40 backdrop-blur-sm ring-1 ring-brand-accent-secondary/20 rounded-lg focus-within:bg-white/70 focus-within:border-white focus-within:ring-2 focus-within:ring-brand-accent-secondary/20 transition-all shadow-inner">
          <div className="relative flex-1 flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onClick={onOpenDropdown}
              placeholder={placeholder}
              className="w-full outline-none text-xs px-1 py-1 text-brand-accent-primary placeholder:text-brand-accent-fourth bg-transparent"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={onClearSearch}
                title="Xóa tìm kiếm"
                aria-label="Xóa tìm kiếm"
                className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-brand-accent-fourth hover:text-brand-accent-primary transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1.5 p-1.5 border border-white/95 bg-white/75 backdrop-blur-xl shadow-md/10 rounded-xl animate-in fade-in-0 zoom-in-95 duration-150">
          <div className="max-h-18 overflow-y-auto flex flex-col gap-0.5">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item) => {
                const isSelected = selectedItems.some((sel) => sel.id === item.id);
                return (
                  <label
                    key={item.id}
                    className="flex min-h-[1.75rem] items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-brand-accent-secondary/10 active:scale-99 text-brand-accent-primary cursor-pointer transition-all duration-200"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleItem(item)}
                      className="sr-only"
                    />
                    <div
                      className={`w-3 h-3 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                        isSelected
                          ? 'bg-brand-accent-secondary border-brand-accent-secondary text-white shadow-xs'
                          : 'border-gray-300/80 bg-white/40 group-hover:border-gray-400'
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-2.5 h-2.5 stroke-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </label>
                );
              })
            ) : (
              <div className="px-3 py-3 text-xs text-brand-accent-fourth text-center">
                {emptyMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
