import { useCallback, useEffect, useRef, useState } from 'react';
import { getRandomHexColor } from '@/utils/randomColor.util';
import { useCreateTagMutation, useGetNoteQuery, useUpdateNoteMutation } from '@/services';
import { useAppSelector } from '@/store/store';
import type { CreateBlockPayload, NoteRequest, NoteTagItem } from '@/types';
import { useDebounce } from '@/hooks/useDebounce';
import { toast } from 'react-toastify';

export const useNoteEditor = () => {
  const activeNoteId = useAppSelector((state) => state.uiNote.activeNoteId);

  const {
    data: noteData,
    isLoading,
    isError,
  } = useGetNoteQuery({ id: activeNoteId ?? '' }, { skip: !activeNoteId });

  const [updateNote, { isLoading: isSavingNote, isSuccess: isSaveNoteSuccess }] =
    useUpdateNoteMutation();
  const [createTag] = useCreateTagMutation();

  const initialNote = noteData?.data ?? undefined;
  const initialTitle = initialNote?.title ?? '';
  const initialMoodId = initialNote?.mood_id ?? '';
  const initialBlocks = initialNote?.blocks ?? [];
  const initialTags = initialNote?.tags ?? [];

  const [formData, setFormData] = useState<Partial<NoteRequest>>({});
  const [tags, setTags] = useState<NoteTagItem[] | null>(null);
  const debouncedFormData = useDebounce(formData, 1000);
  const debouncedTags = useDebounce(tags, 1200);

  const currentTitle = formData.title ?? initialTitle;
  const currentMoodId = formData.mood_id ?? initialMoodId;
  const currentBlocks = formData.blocks ?? initialBlocks;
  const currentTags = tags ?? initialTags.map((t) => ({ id: t.id, name: t.name, color: t.color }));

  const handleTitleChange = useCallback((title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
    }));
  }, []);

  const handleMoodChange = useCallback((moodId: string) => {
    setFormData((prev) => ({
      ...prev,
      mood_id: moodId,
    }));
  }, []);

  const handleBlocksChange = useCallback((newBlocks: CreateBlockPayload[]) => {
    setFormData((prev) => ({
      ...prev,
      blocks: newBlocks,
    }));
  }, []);

  const handleTagsChange = useCallback((newTags: NoteTagItem[]) => {
    setTags(newTags);
  }, []);

  const handleSave = useCallback(
    async (showToast: boolean = false) => {
      if (!activeNoteId) return;

      const formattedTitle = currentTitle.trim() === '' ? 'Untitled' : currentTitle.trim();

      const tagIdPromises = currentTags.map(async (tag) => {
        if (tag.id) return tag.id;

        try {
          const response = await createTag({
            name: tag.name.trim(),
            color: tag.color || getRandomHexColor(),
          }).unwrap();
          return response.data?.id || null;
        } catch (error) {
          console.error('Lỗi tạo tag mới:', error);
          return null;
        }
      });

      const resolvedIds = await Promise.all(tagIdPromises);
      const validTagIds = Array.from(
        new Set(resolvedIds.filter((id): id is string => Boolean(id)))
      );

      const updatePayload: NoteRequest = {
        title: formattedTitle,
        blocks: currentBlocks ?? [],
        tag_ids: validTagIds,
        ...(currentMoodId ? { mood_id: currentMoodId } : {}),
      };

      try {
        await updateNote({ id: activeNoteId, body: updatePayload }).unwrap();
        if (showToast) {
          toast.success('Đã lưu ghi chú thành công!');
        }
      } catch (error) {
        console.error('Lỗi khi lưu ghi chú:', error);
        if (showToast) {
          toast.error('Lưu ghi chú thất bại!');
        }
      }
    },
    [activeNoteId, currentTitle, currentTags, createTag, currentBlocks, currentMoodId, updateNote]
  );

  const handleManualSave = useCallback(() => {
    handleSave(true);
  }, [handleSave]);

  const handleSaveRef = useRef(handleSave);
  useEffect(() => {
    handleSaveRef.current = handleSave;
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const isDirty = Object.keys(debouncedFormData).length > 0 || debouncedTags !== null;
    if (!isDirty || !activeNoteId) return;

    handleSaveRef.current(false);
  }, [debouncedFormData, debouncedTags, activeNoteId]);

  return {
    activeNoteId,
    initialNote,
    isLoading,
    isError,
    isSavingNote,
    isSaveNoteSuccess,
    currentTitle,
    handleTitleChange,
    currentMoodId,
    handleMoodChange,
    initialTags,
    handleTagsChange,
    currentBlocks,
    handleBlocksChange,
    handleSave: handleManualSave,
  };
};

export type UseNoteEditorReturn = ReturnType<typeof useNoteEditor>;
