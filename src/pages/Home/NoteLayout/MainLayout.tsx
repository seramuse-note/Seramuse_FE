// import Tiptap from '@/components/common/Tiptap';
import { useState } from 'react';
import { Navbar } from './Navbar';
import { NoteDetail } from './NoteDetail';
import { Sidebar } from './Sidebar';

export const MainLayout = () => {
  const [selectedNoteId, setSeletedNoteId] = useState<string | null>(null);
  const [showRecentList, setShowRecentList] = useState<boolean>(true);
  const showEditor = Boolean(selectedNoteId);

  const handleToggleRecentList = () => {
    setShowRecentList((prev) => !prev);
  };

  const handleCloseEditor = () => {
    setSeletedNoteId(null);
    setShowRecentList(true);
  };

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
        className={`h-full transition-all 
        duration-300 ease-in-out overflow-hidden 
        transform-gpu min-w-0
       ${
         !showEditor
           ? 'flex-1 opacity-100'
           : showRecentList
             ? 'w-80 shrink-0 opacity-100'
             : 'w-0 shrink-0 opacity-0 pointer-events-none'
       }`}
      >
        <div className="h-full justify-center">
          <Sidebar
            showRecentList={showRecentList}
            onSelectNote={(id) => setSeletedNoteId(id)}
            selectedNoteId={'note-1'}
            isFullWidth={!showEditor}
            // notesList={MOCK_NOTES}
          />
        </div>
      </div>
      <div
        className={`h-full transition-all duration-300 ease-in-out overflow-hidden min-w-0 
        ${showEditor ? 'flex-1 opacity-100' : 'w-0 shrink-0 opacity-0 pointer-events-none'}
        `}
      >
        {showEditor && (
          <NoteDetail
            showRecentList={showRecentList}
            onToggleRecentList={handleToggleRecentList}
            onClose={handleCloseEditor}
          ></NoteDetail>
        )}
      </div>
    </div>
  );
};
