import { useGetNotesQuery } from '@/services';
import { ChartBar, Library } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { useAppDispatch } from '@/store/store';
import { closeNote } from '@/store/slices/noteUiSlice';

type NavId = 'note-list' | 'chart';

interface NavItem {
  id: NavId;
  icon: ReactNode;
  name: string;
  count?: number;
}

export const TabNavbar = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<NavId>('note-list');

  const { data: notes } = useGetNotesQuery({ page: 1, limit: 10 });

  const NAV_ITEMS: NavItem[] = [
    {
      id: 'note-list',
      icon: <Library size={15} />,
      name: 'Note List',
      count: notes?.data.length || 0,
    },
    {
      id: 'chart',
      icon: <ChartBar size={15} />,
      name: 'Chart',
    },
  ];

  const handleNavClick = (id: NavId) => {
    setActiveTab(id);
    switch (id) {
      case 'note-list':
        // Đóng NoteEditor và quay lại NoteSidebar dạng full
        dispatch(closeNote());
        break;
      case 'chart':
        // Xử lý logic cho Chart sau này
        break;
    }
  };

  return (
    <>
      <div className="flex flex-col gap-1 text-xs text-brand-accent-primary font-medium">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <div
              key={item.id}
              className={`relative h-8 px-2 gap-2 box-border rounded-md flex justify-between items-center cursor-pointer transition-colors ${
                isActive ? 'bg-white/40 font-semibold shadow-xs' : 'hover:bg-white/20'
              }`}
              onClick={() => handleNavClick(item.id)}
            >
              <div className="flex gap-2 justify-between items-center">
                {item.icon} <span className="block">{item.name}</span>
              </div>
              {!!item.count && <div>{item.count}</div>}
            </div>
          );
        })}
      </div>
    </>
  );
};
