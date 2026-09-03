import { useState } from 'react';
import { toast } from 'react-toastify';
import { getRandomHexColor } from '@/utils/randomColor.util';
import { useCreateTagMutation, useGetNoteQuery, useUpdateNoteMutation } from '@/services';
import { useAppSelector } from '@/store/store';
import type { CreateBlockPayload, NoteRequest, NoteTagItem } from '@/types';

export const useNoteEditor = () => {
  const activeNoteId = useAppSelector((state) => state.uiNote.activeNoteId);

  const {
    data: noteData,
    isLoading,
    isError,
  } = useGetNoteQuery({ id: activeNoteId ?? '' }, { skip: !activeNoteId });

  const [updateNote, { isLoading: isSaving }] = useUpdateNoteMutation();
  const [createTag] = useCreateTagMutation();

  const initialNote = noteData?.data ?? undefined;
  const initialTitle = initialNote?.title ?? '';
  const initialMoodId = initialNote?.mood_id ?? '';
  const initialBlocks = initialNote?.blocks ?? [];
  const initialTags = initialNote?.tags ?? [];

  const [formData, setFormData] = useState<Partial<NoteRequest>>({});
  const [tags, setTags] = useState<NoteTagItem[] | null>(null);

  const currentTitle = formData.title ?? initialTitle;
  const currentMoodId = formData.mood_id ?? initialMoodId;
  const currentBlocks = formData.blocks ?? initialBlocks;
  const currentTags = tags ?? initialTags.map((t) => ({ id: t.id, name: t.name, color: t.color }));

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
    }));
  };

  const handleMoodChange = (moodId: string) => {
    setFormData((prev) => ({
      ...prev,
      mood_id: moodId,
    }));
  };

  const handleBlocksChange = (newBlocks: CreateBlockPayload[]) => {
    setFormData((prev) => ({
      ...prev,
      blocks: newBlocks,
    }));
  };

  const handleTagsChange = (newTags: NoteTagItem[]) => {
    setTags(newTags);
  };

  const handleSave = async () => {
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
    const validTagIds = Array.from(new Set(resolvedIds.filter((id): id is string => Boolean(id))));

    const updatePayload: NoteRequest = {
      title: formattedTitle,
      blocks: currentBlocks ?? [],
      tag_ids: validTagIds,
      ...(currentMoodId ? { mood_id: currentMoodId } : {}),
    };

    try {
      await updateNote({ id: activeNoteId, body: updatePayload }).unwrap();
      toast.success('Đã lưu ghi chú thành công!');
    } catch (error) {
      console.error('Lỗi khi lưu ghi chú:', error);
      toast.error('Lưu ghi chú thất bại!');
    }
  };

  return {
    activeNoteId,
    initialNote,
    isLoading,
    isError,
    isSaving,
    currentTitle,
    handleTitleChange,
    currentMoodId,
    handleMoodChange,
    initialTags,
    handleTagsChange,
    currentBlocks,
    handleBlocksChange,
    handleSave,
  };
};

export type UseNoteEditorReturn = ReturnType<typeof useNoteEditor>;
