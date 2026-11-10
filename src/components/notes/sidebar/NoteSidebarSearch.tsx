import { useState, type FC } from 'react';
import { Funnel, X } from 'lucide-react';
import { FilterPopover } from '../FilterPopover';
import type { FilterState } from '@/types';

interface NoteSidebarSearchProps {
  value: string;
  onChange: (value: string) => void;
  filter: FilterState;
  onFilterChange: (data: FilterState) => void;
}

export const NoteSidebarSearch: FC<NoteSidebarSearchProps> = ({
  value,
  onChange,
  filter,
  onFilterChange,
}) => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const hasActiveFilters = Boolean(
    (filter.tags && filter.tags.length > 0) || (filter.moods && filter.moods.length > 0)
  );

  return (
    <div className="relative flex items-center gap-2 shrink-0 w-full">
      <div className="relative flex-1 flex items-center">
        <input
          type="text"
          placeholder="Search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/60 border border-white/80 rounded-xl px-4 py-2.5 text-xs text-brand-accent-primary
          placeholder-brand-accent-tertiary outline-none focus:bg-white/90 focus:border-brand-accent-secondary shadow-xs"
        />
        {value.trim() && (
          <button
            onClick={() => onChange('')}
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-brand-accent-primary cursor-pointer hover:opacity-75"
            title="Clear search"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpenFilter((prev) => !prev)}
          className={`px-2.5 py-2.5 shadow-xs rounded-xl cursor-pointer transition-colors ${
            hasActiveFilters
              ? 'bg-brand-accent-primary text-white'
              : 'bg-white/90 text-brand-accent-primary hover:bg-white'
          }`}
          title="Filter notes"
        >
          <Funnel className="w-4 h-4" />
        </button>
        {isOpenFilter && (
          <FilterPopover
            onClose={() => setIsOpenFilter(false)}
            onApply={(data: FilterState) => {
              onFilterChange(data);
            }}
            selectedFilter={filter}
          />
        )}
      </div>
    </div>
  );
};
