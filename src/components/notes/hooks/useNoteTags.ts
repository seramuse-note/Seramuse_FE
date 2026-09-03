import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { getRandomHexColor } from '@/utils/randomColor.util';
import { useDeleteTagMutation, useGetTagsQuery } from '@/services';
import { useAppSelector } from '@/store/store';
import type { NoteTagItem, Tag } from '@/types';

interface UseNoteTagsProps {
  initialTags?: Tag[];
  onChangeTags?: (tags: NoteTagItem[]) => void;
}

export const useNoteTags = ({ initialTags = [], onChangeTags }: UseNoteTagsProps) => {
  const allExistingTags = useAppSelector((state) => state.filter.tags);
  const [deleteTag] = useDeleteTagMutation();

  // Prefetch/ensure tags list in cache
  useGetTagsQuery({ page: 1, limit: 50 });

  const [tagInput, setTagInput] = useState('');
  const [addedTags, setAddedTags] = useState<NoteTagItem[]>([]);
  const [removedTagNames, setRemovedTagNames] = useState<string[]>([]);

  // Compute display tags
  const rawDisplayTags: NoteTagItem[] = [
    ...initialTags
      .filter((tag) => !removedTagNames.includes(tag.name.toLowerCase()))
      .map((tag) => ({ id: tag.id, name: tag.name, color: tag.color })),
    ...addedTags,
  ];

  const displayTags: NoteTagItem[] = Array.from(
    new Map(rawDisplayTags.map((tag) => [tag.name.trim().toLowerCase(), tag])).values()
  );

  const notifyChange = useCallback(
    (nextAdded: NoteTagItem[], nextRemoved: string[]) => {
      if (!onChangeTags) return;
      const combined: NoteTagItem[] = [
        ...initialTags
          .filter((tag) => !nextRemoved.includes(tag.name.toLowerCase()))
          .map((tag) => ({ id: tag.id, name: tag.name, color: tag.color })),
        ...nextAdded,
      ];
      const unique = Array.from(
        new Map(combined.map((t) => [t.name.trim().toLowerCase(), t])).values()
      );
      onChangeTags(unique);
    },
    [initialTags, onChangeTags]
  );

  const handleAddTag = () => {
    const normalizedInput = tagInput.trim().toLowerCase();
    if (!normalizedInput) return;

    const isExistOnUI = displayTags.some(
      (tag) => normalizedInput === tag.name.trim().toLowerCase()
    );

    if (isExistOnUI) {
      toast.warn('Tag này đã được thêm vào ghi chú!');
      setTagInput('');
      return;
    }

    const existingDbTag = allExistingTags.find(
      (t) => t.name.trim().toLowerCase() === normalizedInput
    );

    let nextAdded = addedTags;
    let nextRemoved = removedTagNames;

    if (removedTagNames.includes(normalizedInput)) {
      nextRemoved = removedTagNames.filter((name) => name !== normalizedInput);
      setRemovedTagNames(nextRemoved);
    } else {
      const newTag: NoteTagItem = {
        id: existingDbTag?.id,
        name: existingDbTag?.name || normalizedInput,
        color: existingDbTag?.color || getRandomHexColor(),
      };
      nextAdded = [...addedTags, newTag];
      setAddedTags(nextAdded);
    }

    notifyChange(nextAdded, nextRemoved);
    setTagInput('');
  };

  const handleSelectTag = (selectedTag: string) => {
    if (!selectedTag) return;

    const normalizedTag = selectedTag.trim().toLowerCase();
    const isExist = displayTags.some((tag) => normalizedTag === tag.name.trim().toLowerCase());

    if (isExist) return;

    const existingTagObj = allExistingTags.find(
      (t) => t.name.trim().toLowerCase() === normalizedTag
    );

    let nextAdded = addedTags;
    let nextRemoved = removedTagNames;

    if (removedTagNames.includes(normalizedTag)) {
      nextRemoved = removedTagNames.filter((name) => name !== normalizedTag);
      setRemovedTagNames(nextRemoved);
    } else {
      const newTag: NoteTagItem = {
        id: existingTagObj?.id,
        name: existingTagObj?.name || normalizedTag,
        color: existingTagObj?.color || getRandomHexColor(),
      };
      nextAdded = [...addedTags, newTag];
      setAddedTags(nextAdded);
    }

    notifyChange(nextAdded, nextRemoved);
    setTagInput('');
  };

  const handleRemoveCurrentTag = (targetTag: string) => {
    const normalizedTarget = targetTag.trim().toLowerCase();

    const nextAdded = addedTags.filter((tag) => tag.name.trim().toLowerCase() !== normalizedTarget);
    const nextRemoved = [...removedTagNames, normalizedTarget];

    setAddedTags(nextAdded);
    setRemovedTagNames(nextRemoved);
    notifyChange(nextAdded, nextRemoved);
  };

  const handleDeleteDbTag = async (deletedTag: string) => {
    const normalized = deletedTag.trim().toLowerCase();
    const tagExist = allExistingTags.find((t) => t.name.trim().toLowerCase() === normalized);
    const tagId = tagExist?.id;

    if (!tagId) return;

    try {
      await deleteTag({ id: tagId }).unwrap();
      toast.success('Đã xóa tag thành công');

      // Also remove from local display if present
      handleRemoveCurrentTag(deletedTag);
    } catch (error) {
      console.error('Lỗi khi xóa tag:', error);
      toast.error('Không thể xóa tag này!');
    }
  };

  return {
    tagInput,
    setTagInput,
    existingTagNames: allExistingTags.map((i) => i.name),
    displayTags,
    handleAddTag,
    handleSelectTag,
    handleRemoveCurrentTag,
    handleDeleteDbTag,
  };
};

export type UseNoteTagsReturn = ReturnType<typeof useNoteTags>;
