// import Tiptap from '@/components/common/Tiptap';
import { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { NoteDetail } from './NoteDetail';
import { Sidebar } from './Sidebar';

export const MainLayout = () => {
  const [showRecentList, setShowRecentList] = useState<boolean>(true);

  const handleToggleRecentList = () => {
    setShowRecentList((prev) => !prev);
  };

  useEffect(() => {
    console.log(showRecentList);
  }, [showRecentList]);

  return (
    <div
      className={`flex-1 bg-modern-glow/5  
    border border-white/40 border-b-white/15 
    backdrop box-border backdrop-blur-md rounded-xl 
    shadow-[0_25px_50px_-12px_rgba(134,0,60,0.15)] transition-all duration-700
    grid ${showRecentList ? 'grid-cols-[5%_20%_1fr]' : 'grid-cols-[5%_0%_1fr]'} `}
    >
      <Navbar></Navbar>
      <Sidebar showRecentList={showRecentList}></Sidebar>
      <NoteDetail
        showRecentList={showRecentList}
        onToggleRecentList={handleToggleRecentList}
      ></NoteDetail>
    </div>
  );
};
