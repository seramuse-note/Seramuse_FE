import type { FC } from 'react';
import { EditorSkeleton } from '../skeleton/EditorSkeleton';
import { Editor } from '@/components/layout/EditorLayout';
import { useNoteEditor } from './hooks/useNoteEditor';
import { NoteEditorHeader, NoteEditorTitle, NoteEditorMood, NoteEditorTags } from './editor';

export type { DropdownOption } from '@/types';

export const NoteEditor: FC = () => {
  const {
    activeNoteId,
    initialNote,
    isLoading,
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
    handleSave,
  } = useNoteEditor();

  if (isLoading) {
    return <EditorSkeleton />;
  }

  return (
    <div
      key={activeNoteId}
      className="flex-1 h-full min-h-0 min-w-0 overflow-auto transition-all duration-300"
    >
      <div className="flex-1 text-[10px] h-full min-w-0 min-h-0 flex flex-col overflow-x-auto overflow-y-auto z-0 bg-white/80 shadow-[0_20px_50px_-15px_rgba(134,0,60,0.12)]">
        <NoteEditorHeader
          title={initialNote?.title}
          isSavingNote={isSavingNote}
          isSaveNoteSuccess={isSaveNoteSuccess}
          onSave={handleSave}
        />

        <div className="px-3 py-3 flex flex-col gap-2 h-full  lg:max-h-[calc(100vh-40px)]">
          <NoteEditorTitle value={currentTitle} onChange={handleTitleChange} />

          <div className="flex z-20 gap-3 items-center w-full h-12 shrink-0">
            <NoteEditorMood value={currentMoodId} onChange={handleMoodChange} />
            <NoteEditorTags initialTags={initialTags} onChangeTags={handleTagsChange} />
          </div>

          <div className="flex flex-col flex-1 min-h-0 h-full w-full z-1">
            <Editor key={activeNoteId} value={currentBlocks} onSetBlock={handleBlocksChange} />
          </div>
        </div>
      </div>
    </div>
  );
};
