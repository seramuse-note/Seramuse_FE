import clsx from 'clsx';
import { Dropdown } from '@/components/common/Dropdown';
import { PanelLeftClose, PanelLeftOpen, Plus, Save, TagIcon } from 'lucide-react';
import { Editor } from '@/components/layout/EditorLayout';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useCallback, useEffect, useState } from 'react';
import { TagCompoment } from '../common/Tag';
import { onKey } from '@/utils/keyDown.util';
import { getRandomHexColor } from '@/utils/randomColor.util';
import type { CreateBlockPayload, NoteRequest, Tag, TagRequest } from '@/types';
import {
  useCreateTagMutation,
  useGetMoodsQuery,
  useGetNoteQuery,
  useUpdateNoteMutation,
} from '@/services';
import { toast } from 'react-toastify';
import { EditorSkeleton } from '../skeleton/EditorSkeleton';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { selectNote, toggleNav } from '@/store/slices/noteUiSlice';

export interface DropdownOption {
  value: string;
  label: string;
}
export const NoteEditor = () => {
  const dispatch = useAppDispatch();
  const activeNoteId = useAppSelector((state) => state.uiNote.activeNoteId);
  const isNavCollapsed = useAppSelector((state) => state.uiNote.isNavCollapsed);

  const { data: moodsData } = useGetMoodsQuery({ page: 1, limit: 10 });
  const {
    data: noteData,
    isLoading,
    isError,
  } = useGetNoteQuery({ id: activeNoteId ?? '' }, { skip: !activeNoteId });

  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();
  const [createTag] = useCreateTagMutation();

  const moods = moodsData?.data ?? [];
  const moodOptions = moods.map((m) => ({ value: m.id, label: m.name }));

  const initialData = noteData?.data ?? undefined;
  const initialTitle = initialData?.title ?? '';
  const initialMoodId = initialData?.mood_id ?? '';
  const initialBlocks = initialData?.blocks ?? [];
  const initialTags =
    initialData?.tags?.map((tag) => ({
      id: tag.id,
      name: tag.name,
      color: tag.color,
    })) ?? [];

  const [formData, setFormData] = useState<Partial<NoteRequest>>({});
  const [tagInput, setTagInput] = useState('');
  const [addedTags, setAddedTags] = useState<TagRequest[]>([]);
  const [removedTagNames, setRemovedTagNames] = useState<string[]>([]);

  const currentTitle = formData.title ?? initialTitle;
  const currentMoodId = formData.mood_id ?? initialMoodId;
  const currentBlocks = formData.blocks ?? initialBlocks;

  const displayTags = [
    ...initialTags.filter((tag) => !removedTagNames.includes(tag.name.toUpperCase())),
    ...addedTags,
  ];

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleBlocksChange = useCallback((newBlocks: CreateBlockPayload[]) => {
    setFormData((prev) => ({
      ...prev,
      blocks: newBlocks,
    }));
  }, []);

  const handleMoodChange = (moodId: string) => {
    setFormData((prev) => ({
      ...prev,
      mood_id: moodId,
    }));
  };

  const handleAddTag = () => {
    const normalizedInput = tagInput.trim().toUpperCase();
    if (!normalizedInput) return;

    const isExist = displayTags.some((tag) => normalizedInput === tag.name?.trim().toUpperCase());
    if (isExist) {
      toast.warn('The tag already exists');
      return;
    }

    if (removedTagNames.includes(normalizedInput)) {
      setRemovedTagNames((prev) => prev.filter((name) => name !== normalizedInput));
    } else {
      setAddedTags((prev) => [
        ...prev,
        {
          name: normalizedInput,
          color: getRandomHexColor(),
        },
      ]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (targetTag: string) => {
    const normalizedTarget = targetTag.trim().toUpperCase();
    setAddedTags((prev) =>
      prev.filter((tag) => tag.name.trim().toUpperCase() !== normalizedTarget)
    );
    setRemovedTagNames((prev) => [...prev, normalizedTarget]);
  };

  const handleUpdateNote = async () => {
    if (!activeNoteId) return null;

    const formattedTitle = currentTitle.trim() === '' ? 'Untitled' : currentTitle.trim();

    const tagIds = await Promise.all(
      displayTags.map(async (tag) => {
        if (typeof tag === 'object' && 'id' in tag) {
          return tag.id;
        }

        try {
          const tagRequest: TagRequest = {
            name: tag.name,
            color: tag.color,
          };
          const response = await createTag(tagRequest).unwrap();
          return response.data?.id || null;
        } catch (error) {
          console.error('Lỗi tạo tag mới:', error);
          return null;
        }
      })
    );

    const validTagIds = Array.from(
      new Set(tagIds.filter((id): id is string => Boolean(id !== '')))
    );

    const isValidMood = currentMoodId && currentMoodId !== '';
    const updatePayload: NoteRequest = {
      title: formattedTitle,
      blocks: currentBlocks ?? [],
      tag_ids: validTagIds,
      ...(isValidMood && { mood_id: currentMoodId }),
    };

    try {
      await updateNote({ id: activeNoteId, body: { ...updatePayload } }).unwrap();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleToggleLayout = () => {
    dispatch(toggleNav());
  };

  useEffect(() => {
    if (isError) {
      dispatch(selectNote(null));
      toast.error('Không thể tải dữ liệu ghi chú!');
    }
  }, [dispatch, isError]);

  if (isLoading) {
    return <EditorSkeleton />;
  }

  return (
    <div
      key={activeNoteId}
      className=" flex-1 h-full min-h-0 min-w-0 overflow-auto transition-all duration-300"
    >
      <div
        className={clsx(
          `flex-1 text-[10px] h-full min-w-0 min-h-0 flex flex-col overflow-x-auto overflow-y-auto z-0
        bg-white/80 cursor-pointer shadow-[0_20px_50px_-15px_rgba(134,0,60,0.12)]`
        )}
      >
        <div className="flex justify-between items-center h-7 gap-1 p-1 text-brand-accent-primary shadow-xs ">
          <div className="flex items-center">
            <button
              onClick={handleToggleLayout}
              className="block-0 hidden md:inline-flex md:items-center md:justify-center md:w-6 md:h-6 p-1 rounded-full text-brand-accent-fourth
            hover:text-brand-accent-secondary cursor-pointer border border-transparent transition-colors duration-200"
              title={!isNavCollapsed ? 'Close navbar' : 'Open navbar'}
            >
              {!isNavCollapsed ? (
                <PanelLeftClose className="w-2 h-2  font-light" />
              ) : (
                <PanelLeftOpen className="w-2 h-2 font-light" />
              )}
            </button>
            <p className="leading-none truncate">{initialData?.title}</p>
          </div>
          <button
            className="flex items-center gap-1 text-[8px] h-fit shrink-0 bg-brand-accent-primary
            text-white rounded-xl px-3 cursor-pointer hover:opacity-80"
            onClick={handleUpdateNote}
            disabled={isUpdating}
          >
            <Save size={8} />
            <div>{isUpdating ? 'Saving...' : 'Save'}</div>
          </button>
        </div>
        <div className="px-3 py-1 flex flex-col gap-1 h-full ">
          <div className="flex justify-between gap-2 md:gap-50 shirnk-0">
            <input
              key={initialData?.id}
              name="title"
              type="text"
              placeholder="Ghi chú tâm trạng hôm nay"
              value={currentTitle}
              onChange={handleTitleChange}
              className="font-bold to-brand-accent-primary outline-0 flex-1 pl-1 shrink-0 text-xs md:text-lg"
            />
          </div>
          <div className="flex z-20 gap-2 items-center w-full max-h-10 shrink-0 ">
            <div className="shrink-0 z-20">
              <Dropdown
                options={moodOptions}
                value={currentMoodId ?? ''}
                onChange={handleMoodChange}
                placeholder="Trạng thái"
              />
            </div>
            <div className="flex flex-1 min-w-0 gap-2 rounded-2xl items-center shrink-0">
              <div className="gap-3 shrink-0">
                <div
                  className="flex shrink-0 gap-2 items-center justify-center md:pl-2 md:py-.5 px-3 py-.5 text-brand-accent-primary font-medium
              outline-none backdrop-blur-md shadow-sm hover:bg-white/70 rounded-xl active:scale-98 box-border transition-all duration-300 cursor-pointerfocus-within:bg-white/70
              overflow-x-hidden"
                >
                  <TagIcon className="w-5 h-5 md:w-3.5 ml:h-3.5 text-brand-accent-secondary mr-1 self-center" />
                  <div className="hidden md:flex shrink-0 gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Add tag..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={onKey('Enter', handleAddTag)}
                      className="hidden md:block w-full bg-transparent outline-none  placeholder:text-brand-accent-tertiary"
                    />
                    <button
                      type="button"
                      className="rounded-lg cursor-pointer"
                      title="Add"
                      onClick={handleAddTag}
                    >
                      <Plus className="w-3.5 h-3.5 text-brand-accent-tertiary hover:text-brand-accent-primary transition-colors duration-300" />
                    </button>
                  </div>
                </div>
              </div>

              <ScrollContainer
                vertical={false}
                className={`hidden sm:flex shrink-0 items-center gap-1.5 overflow-x-auto min-w-0 min-h-0 flex-1 box-border scrollbar-none transition-all duration-200
            ${
              displayTags.length > 0
                ? 'p-0 bg-white/10 backdrop-blur-md border border-white/20 shadow-sm rounded-2xl hover:cursor-grab active:cursor-grabbing'
                : 'p-0 bg-transparent border-transparent shadow-none'
            }`}
              >
                {displayTags.map((tag) => (
                  <TagCompoment
                    key={typeof tag === 'string' ? tag : (tag as Tag).id || tag.name}
                    tag={tag}
                    onRemove={handleRemoveTag}
                  />
                ))}
              </ScrollContainer>
            </div>
          </div>
          <div className="flex flex-col flex-1 min-h-0 h-full w-full z-1">
            <Editor key={activeNoteId} blocksNote={currentBlocks} onSetBlock={handleBlocksChange} />
          </div>
        </div>
      </div>
    </div>
  );
};
