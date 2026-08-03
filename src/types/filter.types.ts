export interface FilterOptions {
  sortBy: 'news' | 'oldest';
  moodId: string;
}

export interface FilterPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilter: (filter: FilterOptions) => void;
  currentFilter: FilterOptions;
}
