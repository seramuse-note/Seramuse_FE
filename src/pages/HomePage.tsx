import { NoteMainLayout } from '@/components/layout';
import { TabNavbar } from '@/components/navigation/TabNavbar';

export const HomePage = () => {
  return (
    <div
      className="flex flex-1 min-w-0 min-h-0 shirnk-0
      bg-white/30 backdrop-blur-md  box-border overflow-hidden"
    >
      <div className="min-w-0 min-h-0 w-53 p-4 px-2 z-20 shrink-0 border-r border-white/65 overflow-hidden">
        <TabNavbar />
      </div>
      <div className="flex-1 h-full min-w-0 min-h-0">
        <NoteMainLayout />
      </div>
    </div>
  );
};
