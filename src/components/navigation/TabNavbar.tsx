import { useGetNotesQuery } from '@/services';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ChartBar, Library, PanelLeftClose } from 'lucide-react';
import type { ReactNode } from 'react';
import { toggleNav, type NavTabId } from '@/store/slices/noteUiSlice';

interface NavItem {
  id: NavTabId;
  icon: ReactNode;
  name: string;
  count?: number;
}

export const TabNavbar = ({ onClick }: { onClick: (id: NavTabId) => void }) => {
  const dispatch = useAppDispatch();
  const activeNav = useAppSelector((state) => state.uiNote.activeNavContent);

  const { data: notes } = useGetNotesQuery({ page: 1, limit: 10 });

  const NAV_ITEMS: NavItem[] = [
    {
      id: 'note-list',
      icon: <Library size={15} />,
      name: 'Note List',
      count: notes?.meta?.pagination?.total ?? 0,
    },
    {
      id: 'chart',
      icon: <ChartBar size={15} />,
      name: 'Chart',
    },
  ];

  return (
    <>
      <div className=" flex flex-col gap-1 text-xs text-brand-accent-primary font-medium">
        <div className="flex items-center justify-between px-1 h-7 text-brand-accent-primary">
          <span className="font-bold text-sm tracking-wide">Seramuse</span>
          <button
            type="button"
            onClick={() => dispatch(toggleNav())}
            className="p-1 rounded-md text-brand-accent-primary/60 hover:bg-white/20 hover:text-brand-accent-primary/80 cursor-pointer transition-colors"
            title="Thu gọn thanh điều hướng"
          >
            <PanelLeftClose size={16} />
          </button>
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = activeNav === item.id;
          return (
            <div
              key={item.id}
              className={`relative h-8 px-2 gap-2 box-border rounded-md flex justify-between items-center cursor-pointer transition-colors duration-200 ease-in-out
             ${isActive ? 'bg-brand-primary' : 'hover:bg-white/20'}`}
              onClick={() => onClick(item.id)}
            >
              <div className="flex gap-2 justify-between items-center ">
                {item.icon} <span className=" block">{item.name}</span>
              </div>
              {!!item.count && <div>{item.count}</div>}
            </div>
          );
        })}
      </div>
    </>
  );
};
