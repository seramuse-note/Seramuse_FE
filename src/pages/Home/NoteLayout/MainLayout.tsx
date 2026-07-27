// import Tiptap from '@/components/common/Tiptap';
import { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { NoteDetail } from './NoteDetail';
import { Sidebar } from './Sidebar';
// import { useGetNotesQuery } from '@/services/notesApi';

export type LayoutMode = 'SPLIT' | 'FULL_SIDEBAR' | 'FULL_EDITOR';

export const MainLayout = () => {
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
      className={`flex h-full w-full bg-modern-glow/5  
    border border-white/40 border-b-white/15 
    backdrop box-border backdrop-blur-md rounded-xl 
    shadow-[0_25px_50px_-12px_rgba(134,0,60,0.15)] 
    transition-all duration-300 overflow-hidden
   `}
    >
      <div className="w-16 h-full shrink-0 z-20">
        <Navbar></Navbar>
      </div>
      <div
        className={`h-full 
        overflow-hidden 
        transform-gpu 
        min-w-0
       ${layoutMode === 'FULL_SIDEBAR' ? 'w-full' : ''}
       ${layoutMode === 'SPLIT' ? 'w-70 border-r border-white/50 opacity-100' : ''}
       ${layoutMode === 'FULL_EDITOR' ? 'w-0 opacity-0 overflow-hidden pointer-events-none' : ''}
      `}
      >
        <div className="h-full w-full min-w-70 ">
          <Sidebar
            layoutMode={layoutMode}
            selectedNoteId={selectedNoteId}
            onSelectNote={handleSelectNote}
            // notesList={MOCK_NOTES}
          />
        </div>
      </div>
      {showEditor && (
        <div
          className={`h-full
              overflow-hidden 
       ${layoutMode === 'SPLIT' ? 'flex-1' : ''}
       ${layoutMode === 'FULL_EDITOR' ? 'w-full' : ''}
       ${layoutMode === 'FULL_SIDEBAR' ? 'w-0 opacity-0 overflow-hidden pointer-events-none' : 'opacity-100'}
      `}
        >
          <NoteDetail
            layoutMode={layoutMode}
            // selectedNoteId={selectedNoteId}
            onToggleRecentList={handleToggleRecentList}
            onCloseEditor={handleCloseEditor}
          ></NoteDetail>
        </div>
      )}
    </div>
  );
};
