import { useState } from 'react';
import { NoteSidebar } from '../notes/NoteSidebar';
import { NoteEditor } from '../notes/NoteEditor';

export type LayoutMode = 'SPLIT' | 'FULL_SIDEBAR' | 'FULL_EDITOR';

export const NoteMainLayout = () => {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('FULL_SIDEBAR');
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const handleSelectNote = (id: string) => {
    setSelectedNoteId(id);
    setLayoutMode('SPLIT');
  };

  const handleToggleLayout = () => {
    setLayoutMode((prev) => (prev === 'FULL_EDITOR' ? 'SPLIT' : 'FULL_EDITOR'));
  };

  const handleCloseEditor = () => {
    setLayoutMode('FULL_SIDEBAR');
    setSelectedNoteId(null);
  };

  return (
    <div
      className={`flex h-full w-full bg-modern-glow/15  
    backdrop backdrop-blur-md 
    shadow-[0_25px_50px_-12px_rgba(134,0,60,0.15)] 
    transition-all duration-300 overflow-auto
   `}
    >
      <div
        className={`h-full min-h-0 min-w-0 overflow-hidden transform-gpu
       ${layoutMode === 'FULL_SIDEBAR' ? 'w-full' : ''}
       ${layoutMode === 'SPLIT' ? 'w-0 opacity-0 overflow-hidden md:w-70 md:opacity-100' : ''}
       ${layoutMode === 'FULL_EDITOR' ? 'w-0 opacity-0 overflow-hidden pointer-events-none' : ''}
      `}
      >
        <NoteSidebar
          layoutMode={layoutMode}
          onSelectNote={handleSelectNote}
          onSetLayout={(mode: LayoutMode) => setLayoutMode(mode)}
        />
      </div>
      <div
        className={`h-full overflow-auto min-w-0 min-h-0
       ${layoutMode === 'SPLIT' ? 'w-full md:flex-1' : ''}
       ${layoutMode === 'FULL_EDITOR' ? 'w-full' : ''}
       ${layoutMode === 'FULL_SIDEBAR' ? 'w-0 opacity-0 overflow-hidden pointer-events-none' : 'opacity-100'}
      `}
      >
        <NoteEditor
          key={selectedNoteId}
          layoutMode={layoutMode}
          selectedNoteId={selectedNoteId}
          onToggleRecentList={handleToggleLayout}
          onCloseEditor={handleCloseEditor}
        />
      </div>
    </div>
  );
};
