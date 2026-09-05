import { NoteMainLayout } from '@/components/layout';
import { TabNavbar } from '@/components/navigation/TabNavbar';
import { closeNote, setActiveNavContent, type NavTabId } from '@/store/slices/noteUiSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { isNavCollapsed, activeNavContent } = useAppSelector((state) => state.uiNote);

  const handleNavClick = (id: NavTabId) => {
    dispatch(setActiveNavContent(id));
    switch (id) {
      case 'note-list':
        dispatch(closeNote());
        break;
      case 'chart':
        dispatch(closeNote());
        break;
      default:
        dispatch(closeNote());
        break;
    }
  };

  const renderNavContent = () => {
    switch (activeNavContent) {
      case 'note-list':
        return <NoteMainLayout />;
      case 'chart':
        return (
          <div className="flex-1 h-full flex items-center justify-center text-slate-400 text-sm">
            Chart View (Coming Soon...)
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="flex flex-1 min-w-0 min-h-0 shirnk-0
      bg-white/30 backdrop-blur-md  box-border overflow-hidden"
    >
      {!isNavCollapsed && (
        <div className=" md:block min-w-0 min-h-0 md:w-53 p-4 px-2 z-20 shrink-0 border-r border-white/65 overflow-hidden">
          <TabNavbar onClick={handleNavClick} />
        </div>
      )}
      <div className="flex-1 h-full min-w-0 min-h-0 transition-all duration-200 ease-out overflow-hidden ">
        {renderNavContent()}
      </div>
    </div>
  );
};
