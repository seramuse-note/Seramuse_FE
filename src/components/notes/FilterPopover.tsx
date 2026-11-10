import type { FC } from 'react';
import type { FilterState } from '@/types';
import { useFilterPopover } from './hooks/useFilterPopover';
import { FilterPopoverHeader, FilterPopoverFooter, FilterSelectSection } from './filter';

export interface FilterPopoverProps {
  selectedFilter: FilterState;
  onClose: () => void;
  onApply: (data: FilterState) => void;
}

export const FilterPopover: FC<FilterPopoverProps> = ({ selectedFilter, onClose, onApply }) => {
  const {
    popoverRef,
    tagDropdownRef,
    moodDropdownRef,
    tempTags,
    filteredTags,
    tagQuery,
    setTagQuery,
    isTagOpen,
    setIsTagOpen,
    handleToggleTag,
    handleRemoveTag,
    tempMoods,
    filteredMoods,
    moodQuery,
    setMoodQuery,
    isMoodOpen,
    setIsMoodOpen,
    handleToggleMood,
    handleRemoveMood,
    handleReset,
    handleApply,
    handleClose,
  } = useFilterPopover({ selectedFilter, onClose, onApply });

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-1 bg-transparent cursor-default"
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
      />
      <div
        ref={popoverRef}
        className="shrink-0 absolute top-10 right-0 w-100 flex flex-col px-4 py-4 gap-3 bg-white/65 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-md z-40 text-xs text-brand-accent-primary"
      >
        <FilterPopoverHeader onReset={handleReset} />

        <div className="flex-1 -mr-1 flex flex-col gap-3">
          <FilterSelectSection
            label="TAG"
            placeholder="Select tag..."
            emptyMessage="Không tìm thấy tag phù hợp"
            selectedItems={tempTags}
            filteredOptions={filteredTags}
            searchQuery={tagQuery}
            isOpen={isTagOpen}
            dropdownRef={tagDropdownRef}
            onSearchChange={setTagQuery}
            onClearSearch={() => setTagQuery('')}
            onOpenDropdown={() => setIsTagOpen(true)}
            onToggleItem={handleToggleTag}
            onRemoveItem={handleRemoveTag}
            className="z-20"
          />

          <FilterSelectSection
            label="MOOD"
            placeholder="Select mood..."
            emptyMessage="Không tìm thấy mood phù hợp"
            selectedItems={tempMoods}
            filteredOptions={filteredMoods}
            searchQuery={moodQuery}
            isOpen={isMoodOpen}
            dropdownRef={moodDropdownRef}
            onSearchChange={setMoodQuery}
            onClearSearch={() => setMoodQuery('')}
            onOpenDropdown={() => setIsMoodOpen(true)}
            onToggleItem={handleToggleMood}
            onRemoveItem={handleRemoveMood}
            className="z-10"
          />
        </div>

        <FilterPopoverFooter onCancel={handleClose} onApply={handleApply} />
      </div>
    </>
  );
};
