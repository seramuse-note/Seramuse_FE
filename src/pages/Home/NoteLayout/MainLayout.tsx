// import Tiptap from '@/components/common/Tiptap';
import { Navbar } from './Navbar';
import { NoteDetail } from './NoteDetail';
import { Sidebar } from './Sidebar';

export const MainLayout = () => {
  return (
    <div className="flex-1 grid grid-cols-[5%_20%_1fr]  bg-modern-glow/5  border border-white/40 border-b-white/15 backdrop box-border backdrop-blur-md rounded-xl shadow-[0_25px_50px_-12px_rgba(134,0,60,0.15)] ">
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <NoteDetail></NoteDetail>
    </div>
  );
};
