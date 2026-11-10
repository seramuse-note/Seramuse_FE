import { useClickOutside } from '@/hooks/useClickOutside';
import { useAppSelector } from '@/store/store';
import type { FilterState, Mood, Tag } from '@/types';
import { useMemo, useRef, useState } from 'react';

export interface FilterOptionItem {
  id: string;
  name: string;
}

export interface UseFilterPopoverProps {
  selectedFilter: FilterState;
  onClose: () => void;
  onApply: (data: FilterState) => void;
}

export const useFilterPopover = ({ selectedFilter, onClose, onApply }: UseFilterPopoverProps) => {
  const { moods, tags } = useAppSelector((state) => state.filter);

  const popoverRef = useRef<HTMLDivElement>(null);
  const tagDropdownRef = useRef<HTMLDivElement>(null);
  const moodDropdownRef = useRef<HTMLDivElement>(null);

  const [tempTags, setTempTags] = useState<Tag[]>(selectedFilter.tags ?? []);
  const [tempMoods, setTempMoods] = useState<Mood[]>(selectedFilter.moods ?? []);

  const [tagQuery, setTagQuery] = useState<string>('');
  const [moodQuery, setMoodQuery] = useState<string>('');

  const [isTagOpen, setIsTagOpen] = useState(false);
  const [isMoodOpen, setIsMoodOpen] = useState(false);

  // Filter lists based on search queries with useMemo
  const filteredTags = useMemo(() => {
    const trimmed = tagQuery.trim().toLowerCase();
    if (!trimmed) return tags;
    return tags.filter((tag) => tag.name.toLowerCase().includes(trimmed));
  }, [tags, tagQuery]);

  const filteredMoods = useMemo(() => {
    const trimmed = moodQuery.trim().toLowerCase();
    if (!trimmed) return moods;
    return moods.filter((mood) => mood.name.toLowerCase().includes(trimmed));
  }, [moods, moodQuery]);

  const handleToggleTag = (tag: Tag) => {
    setTempTags((prev) =>
      prev.some((item) => item.id === tag.id)
        ? prev.filter((item) => item.id !== tag.id)
        : [...prev, tag]
    );
  };

  const handleRemoveTag = (tag: Tag) => {
    setTempTags((prev) => prev.filter((item) => item.id !== tag.id));
  };

  const handleToggleMood = (mood: Mood) => {
    setTempMoods((prev) =>
      prev.some((item) => item.id === mood.id)
        ? prev.filter((item) => item.id !== mood.id)
        : [...prev, mood]
    );
  };

  const handleRemoveMood = (mood: Mood) => {
    setTempMoods((prev) => prev.filter((item) => item.id !== mood.id));
  };

  const handleReset = () => {
    setTempMoods([]);
    setTempTags([]);
    setTagQuery('');
    setMoodQuery('');
  };

  const handleApply = () => {
    onApply({ tags: tempTags, moods: tempMoods });
    onClose();
  };

  useClickOutside(tagDropdownRef, () => {
    setIsTagOpen(false);
  });

  useClickOutside(moodDropdownRef, () => {
    setIsMoodOpen(false);
  });

  useClickOutside(popoverRef, () => {
    setIsTagOpen(false);
    setIsMoodOpen(false);
    onClose();
  });

  return {
    popoverRef,
    tagDropdownRef,
    moodDropdownRef,

    // Tags
    tempTags,
    filteredTags,
    tagQuery,
    setTagQuery,
    isTagOpen,
    setIsTagOpen,
    handleToggleTag,
    handleRemoveTag,

    // Moods
    tempMoods,
    filteredMoods,
    moodQuery,
    setMoodQuery,
    isMoodOpen,
    setIsMoodOpen,
    handleToggleMood,
    handleRemoveMood,

    // Actions
    handleReset,
    handleApply,
    handleClose: onClose,
  };
};

export type UseFilterPopoverReturn = ReturnType<typeof useFilterPopover>;
