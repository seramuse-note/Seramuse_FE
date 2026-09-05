import { useEffect, useRef, type FC } from 'react';
import { FloatingMenu } from '@tiptap/react/menus';
import type { SlashCommandItem as SlashCommandItemType, SlashCommandMenuProps } from '../types';
import { SlashCommandEmpty } from './SlashCommandEmpty';
import { SlashCommandGroup } from './SlashCommandGroup';

export const SlashCommandMenu: FC<SlashCommandMenuProps> = ({
  editor,
  slashQuery,
  commands,
  groupedCommands,
  selectedIndex,
  onSelectIndex,
  onExecuteCommand,
  onUploadImage,
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  // Cuộn tự động theo item đang được chọn bằng data attribute an toàn
  useEffect(() => {
    if (!listRef.current) return;
    const activeItem = listRef.current.querySelector(
      '[data-selected="true"]'
    ) as HTMLElement | null;
    if (activeItem) {
      activeItem.scrollIntoView({ behavior: 'auto', block: 'nearest' });
    }
  }, [selectedIndex]);

  const handleExecute = (item: SlashCommandItemType) => {
    if (item.id === 'image' || item.title.toLowerCase() === 'image') {
      onUploadImage?.();
    } else {
      onExecuteCommand(item.action);
    }
  };

  return (
    <FloatingMenu
      editor={editor}
      updateDelay={0}
      shouldShow={() => slashQuery !== null}
      options={{
        placement: 'bottom-start',
      }}
    >
      <div
        ref={listRef}
        className="w-72 max-h-80 overflow-y-auto bg-white/95 backdrop-blur-xl border border-white/80 rounded-2xl p-1.5 shadow-[0_12px_30px_-5px_rgba(0,0,0,0.15)] z-50 transition-all duration-150"
      >
        {commands.length === 0 ? (
          <SlashCommandEmpty />
        ) : (
          <>
            {groupedCommands.map((group) => (
              <SlashCommandGroup
                key={group.category.id}
                group={group}
                selectedIndex={selectedIndex}
                filteredCommands={commands}
                onSelect={onSelectIndex}
                onExecute={handleExecute}
              />
            ))}

            {/* Thanh hướng dẫn phím tắt ở chân menu */}
            <div className="mt-1 pt-1.5 px-2 border-t border-gray-100 flex items-center justify-between text-[9px] text-gray-400">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.2 bg-gray-100 rounded">↑↓</kbd> điều hướng
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.2 bg-gray-100 rounded">↵</kbd> hoặc{' '}
                <kbd className="px-1 py-0.2 bg-gray-100 rounded">Tab</kbd> chọn
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.2 bg-gray-100 rounded">Esc</kbd> hủy
              </span>
            </div>
          </>
        )}
      </div>
    </FloatingMenu>
  );
};
