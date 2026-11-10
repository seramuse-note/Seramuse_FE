import type { FC } from 'react';
import type { GroupedSlashCommands, SlashCommandItem as SlashCommandItemType } from '../types';
import { SlashCommandItem } from './SlashCommandItem';

interface SlashCommandGroupProps {
  group: GroupedSlashCommands;
  selectedIndex: number;
  filteredCommands: SlashCommandItemType[];
  onSelect: (index: number) => void;
  onExecute: (item: SlashCommandItemType) => void;
}

export const SlashCommandGroup: FC<SlashCommandGroupProps> = ({
  group,
  selectedIndex,
  filteredCommands,
  onSelect,
  onExecute,
}) => {
  return (
    <div className="mb-1.5 last:mb-0">
      <div className="px-2.5 py-1 text-[10px] font-semibold text-brand-accent-tertiary uppercase tracking-wider">
        {group.category.label}
      </div>
      <div className="flex flex-col gap-0.5">
        {group.items.map((item) => {
          // Tính index toàn cục của item trong filteredCommands để đồng bộ với bàn phím
          const globalIndex = filteredCommands.findIndex((cmd) => cmd.id === item.id);
          const isSelected = globalIndex === selectedIndex;

          return (
            <SlashCommandItem
              key={item.id}
              item={item}
              index={globalIndex}
              isSelected={isSelected}
              onSelect={onSelect}
              onExecute={onExecute}
            />
          );
        })}
      </div>
    </div>
  );
};
