import clsx from 'clsx';
import { Dropdown } from '@/components/common/Dropdown';
import { PanelLeftClose, PanelLeftOpen, Plus, Save, TagIcon } from 'lucide-react';
import { Editor } from '@/components/layout/EditorLayout';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useEffect, useState } from 'react';
import { TagCompoment } from '../common/Tag';
import { onEnter } from '@/utils/keyDown.util';
import { getRandomHexColor } from '@/utils/randomColor.util';
import type { BlockRequest, CreateTagRequest, UpdateNoteRequest } from '@/types';
import { LAYOUT_MODE, type LayoutMode } from '@/types/layout.types';
import {
  useCreateTagMutation,
  useGetMoodsQuery,
  useGetNoteQuery,
  useUpdateNoteMutation,
} from '@/services';

const EDITOR_LAYOUT_STYLES: Record<LayoutMode, string> = {
  FULL_EDITOR: 'flex-1',
  SPLIT: 'w-full translate-x-0 md:flex-1',
  FULL_SIDEBAR: '-translate-x-full w-0 opacity-0 overflow-hidden pointer-events-none',
};

interface EditorPanelProps {
  layoutMode: LayoutMode;
  selectedNoteId: string | null;
  onToggleRecentList: () => void;
  onCloseEditor: () => void;
  onSetLayout: (_mode: LayoutMode) => void;
}

export const NoteEditor = ({
  layoutMode,
  selectedNoteId,
  onToggleRecentList,
  onCloseEditor,
}: EditorPanelProps) => {
  const { data: moodsData } = useGetMoodsQuery({ page: 1, limit: 10 });
  const moods = moodsData?.data ?? [];
  const moodOptions = moods.map((m) => ({
    value: m.id,
    label: m.name,
  }));

  const {
    data: noteData,
    isLoading,
    isError,
  } = useGetNoteQuery({ id: selectedNoteId! }, { skip: !selectedNoteId });
  const note = noteData?.data;
  const title = note?.title ?? 'Untitled';
  const tagsNote = note?.tags ?? [];
  const moodId = note?.mood_id ?? '';
  const blocks = note?.blocks ?? [];

  const [updateNote] = useUpdateNoteMutation();
  const [createTag] = useCreateTagMutation();

  const [titleNoteTemp, setTitleNoteTemp] = useState<string>(title);

  const [selectedMoodId, setSelectedMoodId] = useState<string>(moodId);

  const [blockNoteTemp, setBlocksNoteTemp] = useState<BlockRequest[]>([]);

  const [valueTag, setValueTag] = useState('');
  const [tagsNoteTemp, setTagsNoteTemp] = useState<CreateTagRequest[]>(tagsNote);

  const handleAddTag = () => {
    const randomColor = getRandomHexColor();
    const newTagTemp: CreateTagRequest = {
      name: valueTag.toUpperCase(),
      color: randomColor,
    };

    const isExistTemp = tagsNoteTemp.some(
      (tag) => valueTag.trim().toUpperCase() === tag.name.trim().toUpperCase()
    );

    const isExist = tagsNote.some(
      (tag) => valueTag.trim().toUpperCase() === tag.name.trim().toUpperCase()
    );

    if (!valueTag.trim() || isExist || isExistTemp) return;

    setTagsNoteTemp((prev) => [...prev, newTagTemp]);
    setValueTag('');
  };

  const handleRemoveTag = (nameToRemove: string) => {
    setTagsNoteTemp((prevtagsNote) => prevtagsNote.filter((tag) => tag.name !== nameToRemove));
  };

  const handleUpdateNote = async () => {
    if (!selectedNoteId) return null;

    const tagIds = await Promise.all(
      tagsNoteTemp.map(async (tag) => {
        try {
          const response = await createTag(tag).unwrap();
          return response.data.id || response.data?.id;
        } catch (error) {
          console.error('Lỗi tạo tag:', error);
          return null;
        }
      })
    );

    const validTagIds = tagIds.filter((id): id is string => Boolean(id));

    const bodyData: UpdateNoteRequest = {
      title: titleNoteTemp.trim() === undefined ? 'Untitled' : titleNoteTemp,
      mood_id: selectedMoodId == '' ? undefined : selectedMoodId,
      blocks: blockNoteTemp,
      tag_ids: validTagIds,
    };

    try {
      await updateNote({ id: selectedNoteId, body: bodyData }).unwrap();
      reset();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleProcessBlocks = (newBlocks: BlockRequest[]) => {
    setBlocksNoteTemp(newBlocks);
  };

  function reset() {
    setValueTag('');
  }

  useEffect(() => {
    if (isError) {
      onCloseEditor();
    }
  }, [noteData, isError, onCloseEditor]);

  if (isLoading) {
    return (
      <div className="flex-1  p-6 animate-pulse flex flex-col gap-3">
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 h-full flex flex-col items-center justify-center text-red-500 text-xs gap-2">
        <p>Không thể tải dữ liệu ghi chú!</p>
        <button onClick={onCloseEditor} className="underline cursor-pointer">
          Quay lại
        </button>
      </div>
    );
  }
  return (
    <div
      className={clsx(
        'h-full min-h-0 min-w-0 overflow-auto transition-all duration-300',
        EDITOR_LAYOUT_STYLES[layoutMode]
      )}
    >
      <div
        className={clsx(
          `flex-1 text-[10px] h-full min-w-0 min-h-0 flex flex-col overflow-x-auto overflow-y-auto z-0
        bg-white/80 cursor-pointer shadow-[0_20px_50px_-15px_rgba(134,0,60,0.12)]`,
          EDITOR_LAYOUT_STYLES[layoutMode]
        )}
      >
        <div className="flex justify-between items-center h-7 gap-1 p-1 text-brand-accent-primary shadow-xs ">
          <div className="flex items-center">
            <button
              onClick={onToggleRecentList}
              className="block-0 hidden md:inline-flex md:items-center md:justify-center md:w-6 md:h-6 p-1 rounded-full text-brand-accent-fourth
            hover:text-brand-accent-secondary cursor-pointer border border-transparent
            transition-colors duration-200"
              title={
                layoutMode === LAYOUT_MODE.SPLIT
                  ? 'Close sidebar'
                  : layoutMode === LAYOUT_MODE.FULL_EDITOR
                    ? 'Lock sidebar open'
                    : ''
              }
            >
              {layoutMode === LAYOUT_MODE.SPLIT ? (
                <PanelLeftClose className="w-2 h-2  font-light" />
              ) : layoutMode === LAYOUT_MODE.FULL_EDITOR ? (
                <PanelLeftOpen className="w-2 h-2 font-light" />
              ) : (
                ''
              )}
            </button>
            <p className="leading-none truncate">{note?.title}</p>
          </div>
          <button
            className="flex items-center gap-1 text-[8px] h-fit shrink-0 bg-brand-accent-primary 
            text-white rounded-xl px-3 cursor-pointer hover:opacity-80"
            onClick={handleUpdateNote}
            disabled={isLoading}
          >
            <Save size={8} />
            <div>{isLoading ? 'Saving...' : 'Save'}</div>
          </button>
        </div>
        <div className="px-3 py-1 flex flex-col gap-1 h-full ">
          <div className="flex justify-between gap-2 md:gap-50 shirnk-0">
            <input
              key={note?.id}
              type="text"
              placeholder="Ghi chú tâm trạng hôm nay"
              defaultValue={note?.title}
              onChange={(e) => setTitleNoteTemp(e.target.value)}
              className="font-bold to-brand-accent-primary outline-0 flex-1 pl-1 shrink-0 text-xs md:text-lg"
            />
          </div>
          <div className="flex z-20 gap-2 items-center w-full max-h-10 shrink-0 ">
            <div className="shrink-0 z-20">
              <Dropdown
                options={moodOptions}
                value={selectedMoodId}
                onChange={setSelectedMoodId}
                placeholder="Trạng thái"
              />
            </div>
            <div className="flex flex-1 min-w-0 gap-2 rounded-2xl items-center shrink-0">
              <div className="gap-3 shrink-0">
                <div
                  className="flex shrink-0 gap-2 items-center justify-center md:pl-2 md:py-.5 px-3 py-.5 text-brand-accent-primary font-medium
              outline-none backdrop-blur-md shadow-sm hover:bg-white/70 
              rounded-xl active:scale-98 box-border transition-all duration-300 cursor-pointerfocus-within:bg-white/70
              overflow-x-hidden"
                >
                  <TagIcon className="w-5 h-5 md:w-3.5 ml:h-3.5 text-brand-accent-secondary mr-1 self-center" />
                  <div className="hidden md:flex shrink-0 gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Add tag..."
                      value={valueTag}
                      onChange={(e) => setValueTag(e.target.value)}
                      onKeyDown={onEnter(handleAddTag)}
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
              tagsNoteTemp.length > 0
                ? 'p-0 bg-white/10 backdrop-blur-md border border-white/20 shadow-sm rounded-2xl hover:cursor-grab active:cursor-grabbing'
                : 'p-0 bg-transparent border-transparent shadow-none'
            }`}
              >
                {tagsNoteTemp.map((tag) => (
                  <TagCompoment key={tag.name} tag={tag} onRemove={handleRemoveTag} />
                ))}
              </ScrollContainer>
            </div>
          </div>
          <div className="flex flex-col flex-1 min-h-0 h-full w-full z-1">
            <Editor blocksNote={blocks} onSetBlock={handleProcessBlocks} />
          </div>
        </div>
      </div>
    </div>
  );
};
