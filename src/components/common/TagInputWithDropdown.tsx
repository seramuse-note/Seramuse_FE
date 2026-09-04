import {
  useState,
  useRef,
  useEffect,
  type KeyboardEvent,
  type FC,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { Tag as TagIcon, Plus, X } from 'lucide-react';

interface TagInputDropdownProps {
  tagInput: string;
  setTagInput: (val: string) => void;
  existingTags?: string[];
  currentTags?: string[];
  onAddTag: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
  onSelectTag: (tagName: string) => void;
  onDeleteItem: (deletedTag: string) => void;
}

export const TagInputWithDropdown: FC<TagInputDropdownProps> = ({
  tagInput,
  setTagInput,
  existingTags = [],
  currentTags = [],
  onAddTag,
  onKeyDown,
  onSelectTag,
  onDeleteItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredTags = existingTags.filter(
    (tag) => tag.toLowerCase().includes(tagInput.toLowerCase().trim()) && !currentTags.includes(tag)
  );

  const handlePickTag = (e: ReactMouseEvent, tag: string) => {
    e.preventDefault();
    e.stopPropagation();
    onSelectTag(tag);
    setTagInput('');
    setIsOpen(false);
  };

  return (
    <div className="gap-3 shrink-0 relative" ref={containerRef}>
      <div
        className="flex shrink-0 gap-2 items-center justify-center px-3 py-1.5 text-brand-accent-primary font-medium
        outline-none backdrop-blur-md shadow-sm` hover:bg-white/70 rounded-xl active:scale-98 box-border transition-all duration-300 cursor-pointer focus-within:bg-white/70
        overflow-x-hidden"
      >
        <TagIcon className="w-5 h-5 md:w-3.5 md:h-3.5 text-brand-accent-secondary mr-1 self-center shrink-0" />

        <div className="hidden md:flex shrink-0 gap-2 items-center">
          <input
            type="text"
            placeholder="Add tag..."
            value={tagInput}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setTagInput(e.target.value);
              setIsOpen(true);
            }}
            onKeyDown={(e) => {
              onKeyDown(e);
            }}
            className="hidden md:block w-full bg-transparent outline-none placeholder:text-brand-accent-tertiary text-xs"
          />
          <button
            type="button"
            className="rounded-lg cursor-pointer"
            title="Add"
            onClick={() => {
              onAddTag();
              setIsOpen(false);
            }}
          >
            <Plus className="w-3.5 h-3.5 text-brand-accent-tertiary hover:text-brand-accent-primary transition-colors duration-300" />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 w-48 bg-white/95 backdrop-blur-xl border border-gray-100 shadow-xl rounded-2xl py-1.5 z-50 animate-in fade-in-0 zoom-in-95 duration-150 overflow-hidden">
          <div className="px-3 py-1 text-[10px] font-semibold text-brand-accent-tertiary uppercase tracking-wider">
            Gợi ý Tag
          </div>

          <div className="max-h-40 overflow-y-auto custom-scrollbar">
            {filteredTags.length > 0 ? (
              filteredTags.map((tag) => (
                <div
                  key={tag}
                  className="w-full px-3 py-1.5 text-xs text-brand-accent-primary hover:bg-brand-accent-primary/10 transition-colors flex items-center justify-between group"
                >
                  <button
                    type="button"
                    onClick={(e) => handlePickTag(e, tag)}
                    className="flex-1 text-left truncate cursor-pointer hover:text-brand-accent-primary"
                  >
                    #{tag}
                  </button>
                  <button
                    type="button"
                    title={`Xóa tag #${tag}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      onDeleteItem(tag);
                    }}
                    className="p-0.5 rounded cursor-pointer opacity-40 hover:opacity-100 hover:text-brand-accent-primary transition-all shrink-0"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-xs text-brand-accent-tertiary italic text-center">
                {tagInput.trim() ? `Nhấn Enter để tạo "#${tagInput}"` : 'Không có tag khả dụng'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
