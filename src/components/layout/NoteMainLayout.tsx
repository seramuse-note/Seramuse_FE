import { useState } from 'react';
import { NoteSidebar } from '../notes/NoteSidebar';
import { NoteEditor } from '../notes/NoteEditor';
import { LAYOUT_MODE, type LayoutMode } from '@/types/layout.types';

export const NoteMainLayout = () => {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>(LAYOUT_MODE.FULL_SIDEBAR);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const handleSelectNote = (id: string) => {
    setSelectedNoteId(id);
    setLayoutMode('SPLIT');
  };

  const handleToggleLayout = () => {
    setLayoutMode((prev) =>
      prev === LAYOUT_MODE.FULL_EDITOR ? LAYOUT_MODE.SPLIT : LAYOUT_MODE.FULL_EDITOR
    );
  };

  const handleCloseEditor = () => {
    setLayoutMode(LAYOUT_MODE.FULL_SIDEBAR);
    setSelectedNoteId(null);
  };

  return (
    <div
      className={`flex h-full w-full bg-modern-glow/15 backdrop backdrop-blur-md 
      shadow-[0_25px_50px_-12px_rgba(134,0,60,0.15)] transition-all duration-300 overflow-auto`}
    >
      <NoteSidebar
        layoutMode={layoutMode}
        onSelectNote={handleSelectNote}
        onSetLayout={(mode: LayoutMode) => setLayoutMode(mode)}
      />
      <NoteEditor
        key={selectedNoteId}
        selectedNoteId={selectedNoteId}
        layoutMode={layoutMode}
        onToggleRecentList={handleToggleLayout}
        onCloseEditor={handleCloseEditor}
      />
    </div>
  );
};
