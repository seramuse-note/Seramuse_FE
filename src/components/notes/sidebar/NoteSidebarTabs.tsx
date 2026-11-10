import { ACTIVE_TAB, type ActiveTab } from '@/constants/tab.constants';
import type { FC } from 'react';

interface TabItem {
  id: ActiveTab;
  label: string;
}

const TABS: TabItem[] = [
  { id: ACTIVE_TAB.ALL, label: 'All' },
  { id: ACTIVE_TAB.FAVORITE, label: 'Favorites' },
];

interface NoteSidebarTabsProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
}

export const NoteSidebarTabs: FC<NoteSidebarTabsProps> = ({ activeTab, onChangeTab }) => {
  return (
    <div
      className="min-w-0 min-h-0 overflow-hidden px-2.5 py-2 bg-white/30 backdrop-blur-md
      hover:bg-white/80 border border-white/40 shadow-xs gap-1.5 flex items-center justify-between rounded-2xl"
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChangeTab(tab.id)}
            className={`flex-1 flex items-center justify-center p-1.5 gap-1 shadow-xs text-xs rounded-xl font-medium transition-all duration-300 cursor-pointer ${
              isActive
                ? 'bg-brand-accent-primary text-white'
                : 'text-brand-accent-tertiary hover:text-brand-accent-primary hover:bg-white/50'
            }`}
          >
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
