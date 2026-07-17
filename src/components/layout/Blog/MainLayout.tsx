import { Navbar } from './Navbar';
import { NoteDetail } from './NoteDetail';
import { Sidebar } from './Sidebar';

export const MainLayout = () => {
  return (
    <div className="flex-1 grid grid-cols-[5%_20%_1fr] bg-brand-secondary/50 rounded-xl">
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <NoteDetail></NoteDetail>
    </div>
  );
};
