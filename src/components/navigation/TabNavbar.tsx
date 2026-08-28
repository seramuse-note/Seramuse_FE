import { ChartBar, Library } from 'lucide-react';
import type { MouseEventHandler, ReactNode } from 'react';

interface NavItem {
  icon: ReactNode;
  name: string;
  count?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
const NAV_ITEMS: NavItem[] = [
  {
    icon: <Library size={15} />,
    name: 'Note List',
    count: 3,
  },
  {
    icon: <ChartBar size={15} />,
    name: 'Chart',
  },
];

export const TabNavbar = () => {
  return (
    <>
      <div className=" flex flex-col gap-1 text-xs text-brand-accent-primary font-medium">
        {NAV_ITEMS.map((item) => (
          <div
            key={item.name}
            className="relative h-8 px-2 gap-2 box-border rounded-md flex justify-between items-center cursor-pointer hover:bg-white/20 "
            onClick={item.onClick}
          >
            <div className="flex gap-2 justify-between items-center ">
              {item.icon} <span className=" block">{item.name}</span>
            </div>
            {!!item.count && <div>{item.count}</div>}
          </div>
        ))}
      </div>
    </>
  );
};
