import { NoteSidebar } from '../notes/NoteSidebar';
import { NoteEditor } from '../notes/NoteEditor';
import { useAppSelector } from '@/store/store';

export const NoteMainLayout = () => {
  const activeNote = useAppSelector((state) => state.uiNote.activeNoteId);
  return (
    <div
      className={`flex h-full w-full bg-modern-glow/15 backdrop backdrop-blur-md transition-all duration-300 overflow-auto`}
    >
      {!activeNote ? <NoteSidebar /> : <NoteEditor />}
    </div>
  );
};
