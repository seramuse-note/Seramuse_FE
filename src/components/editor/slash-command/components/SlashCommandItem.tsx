import type { FC } from 'react';
import type { SlashCommandItem as SlashCommandItemType } from '../types';

interface SlashCommandItemProps {
  item: SlashCommandItemType;
  index: number;
  isSelected: boolean;
  onSelect: (index: number) => void;
  onExecute: (item: SlashCommandItemType) => void;
}

export const SlashCommandItem: FC<SlashCommandItemProps> = ({
  item,
  index,
  isSelected,
  onSelect,
  onExecute,
}) => {
  const Icon = item.icon;

  return (
    <button
      type="button"
      data-index={index}
      data-selected={isSelected}
      // Ngăn mousedown làm blur Tiptap editor để giữ vững vị trí con trỏ
      onMouseDown={(e) => e.preventDefault()}
      onMouseEnter={() => onSelect(index)}
      onClick={() => onExecute(item)}
      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left transition-all duration-150 cursor-pointer ${
        isSelected
          ? 'bg-brand-accent-secondary/20 text-brand-accent-primary font-medium'
          : 'text-brand-accent-primary/80 hover:bg-black/5'
      }`}
    >
      <div
        className={`p-1.5 rounded-lg shrink-0 transition-colors ${
          isSelected
            ? 'bg-brand-accent-secondary text-brand-accent-primary shadow-xs'
            : 'bg-black/5 text-brand-accent-tertiary'
        }`}
      >
        <Icon className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium leading-tight truncate">{item.title}</div>
        <div className="text-[10px] text-brand-accent-tertiary leading-tight truncate mt-0.5">
          {item.description}
        </div>
      </div>

      {item.badge && (
        <span
          className={`shrink-0 text-[9px] font-mono px-1.5 py-0.5 rounded border transition-colors ${
            isSelected
              ? 'border-brand-accent-secondary bg-white/70 text-brand-accent-primary'
              : 'border-gray-200 bg-gray-50 text-gray-400'
          }`}
        >
          {item.badge}
        </span>
      )}
    </button>
  );
};
