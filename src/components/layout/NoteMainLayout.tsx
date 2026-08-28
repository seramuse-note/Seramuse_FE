import { NoteSidebar } from '../notes/NoteSidebar';
import { NoteEditor } from '../notes/NoteEditor';

export const NoteMainLayout = () => {
  return (
    <div
      className={`flex h-full w-full bg-modern-glow/15 backdrop backdrop-blur-md transition-all duration-300 overflow-auto`}
    >
      <NoteSidebar />
      <NoteEditor />
    </div>
  );
};
