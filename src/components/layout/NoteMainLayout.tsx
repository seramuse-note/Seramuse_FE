// import Tiptap from '@/components/common/Tiptap';
import { useEffect, useState } from 'react';
import { NoteSidebar } from '../notes/NoteSidebar';
import { NoteEditor } from '../notes/NoteEditor';
// import { useGetNotesQuery } from '@/services/notesApi';

export type LayoutMode = 'SPLIT' | 'FULL_SIDEBAR' | 'FULL_EDITOR';

export const NoteMainLayout = () => {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('FULL_SIDEBAR');
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const showEditor = Boolean(selectedNoteId);

  const handleSelectNote = (id: string) => {
    setSelectedNoteId(id);
    setLayoutMode('SPLIT');
  };

  const handleToggleRecentList = () => {
    setLayoutMode((prev) => (prev === 'FULL_EDITOR' ? 'SPLIT' : 'FULL_EDITOR'));
  };

  const handleCloseEditor = () => {
    setLayoutMode('FULL_SIDEBAR');
    setSelectedNoteId(null);
  };

  useEffect(() => {
    console.log('selectedNoteId', selectedNoteId);
    console.log('showEditor', showEditor);
  }, [selectedNoteId]);

  useEffect(() => {
    console.log('layoutMode', layoutMode);
  }, [layoutMode]);

  return (
    <div
      className={`flex h-full w-full bg-modern-glow/15  
    border border-white/40 border-b-white/15  box-border
    backdrop backdrop-blur-md rounded-r-xl 
    shadow-[0_25px_50px_-12px_rgba(134,0,60,0.15)] 
    transition-all duration-300 overflow-hidden
   `}
    >
      <div
        className={`h-full min-h-0 min-w-0 overflow-hidden transform-gpu
       ${layoutMode === 'FULL_SIDEBAR' ? 'w-full' : ''}
       ${layoutMode === 'SPLIT' ? 'w-70 border-r border-white/50 opacity-100' : ''}
       ${layoutMode === 'FULL_EDITOR' ? 'w-0 opacity-0 overflow-hidden pointer-events-none' : ''}
      `}
      >
        <NoteSidebar
          layoutMode={layoutMode}
          selectedNoteId={selectedNoteId}
          onSelectNote={handleSelectNote}
          // notesList={MOCK_NOTES}
        />
      </div>
      {showEditor && (
        <div
          className={`h-full overflow-auto min-w-0 min-h-0
       ${layoutMode === 'SPLIT' ? 'flex-1' : ''}
       ${layoutMode === 'FULL_EDITOR' ? 'w-full' : ''}
       ${layoutMode === 'FULL_SIDEBAR' ? 'w-0 opacity-0 overflow-hidden pointer-events-none' : 'opacity-100'}
      `}
        >
          <NoteEditor
            layoutMode={layoutMode}
            // selectedNoteId={selectedNoteId}
            onToggleRecentList={handleToggleRecentList}
            onCloseEditor={handleCloseEditor}
          />
        </div>
      )}
    </div>
  );
};
