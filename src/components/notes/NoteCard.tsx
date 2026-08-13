import { Heart, Ellipsis, Trash } from 'lucide-react';
import { formatDate } from '@/utils/event.util';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import type { Block, Note, Tag } from '@/types';

interface NoteCardProps {
  note: Note;
  onSelectNote: (id: string) => void;
  onToggleLike: (id: string) => Promise<void>;
  onDeleteNote: (id: string) => void;
}

export const NoteCard = ({ note, onSelectNote, onToggleLike, onDeleteNote }: NoteCardProps) => {
  const [isLocalLikes, setIsLocalLikes] = useState(note.is_favorite);
  const debouncedlLocalLikes = useDebounce(isLocalLikes, 500);

  const isFirstRender = useRef(true);

  useEffect(() => {
    // Bỏ qua lần Render đầu tiên (khi vừa hiện Card ra)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (debouncedlLocalLikes !== note.is_favorite) {
      onToggleLike(note.id);
    }
  }, [debouncedlLocalLikes]);

  const handleHeartClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLocalLikes((prev) => !prev);
  };

  return (
    <div
      onClick={() => onSelectNote(note.id)}
      className="group flex flex-col relative p-5 pb-1 gap-3 rounded-2xl bg-white/65 backdrop-blur-md border border-transparent
      hover:bg-white/85 hover:shadow-xs active:scale-99 active:shadow-xs duration-100 cursor-pointer"
    >
      <div className="flex">
        <h3
          className="font-semibold text-sm active:text-brand-accent-secondary
          group-hover:text-brand-accent-secondary transition-colors line-clamp-1"
        >
          {note.title || 'Untitled'}
        </h3>
      </div>

      <div className="min-h-[32px] text-[11px] text-brand-accent-tertiary line-clamp-2 leading-relaxed">
        {note.blocks?.map((block: Block) => block.properties?.text || '')}
      </div>

      <div className="h-[35px] flex items-center py-5 border-t border-white/20 overflow-hidden">
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-nowrap gap-1.5">
            {note.tags.map((tag: Tag) => (
              <span
                key={tag.id}
                className="text-[9px] font-semibold px-2 py-0 rounded-lg bg-white/80 border border-white/50 shrink-0"
                style={{
                  borderColor: tag.color ? `#${tag.color}` : undefined,
                  color: tag.color ? `#${tag.color}` : undefined,
                }}
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-brand-accent-tertiary/10">
        <div className="text-[10px] text-brand-accent-tertiary font-medium active:text-brand-accent-secondary">
          {formatDate(note.created_at || '2026-07-14T05:28:46')}
        </div>

        <div className="flex gap-1 items-center">
          <button
            type="button"
            onClick={handleHeartClick}
            className="p-2 cursor-pointer transition-transform active:scale-75  "
            title={isLocalLikes ? 'Unlike' : 'Like'}
          >
            <Heart
              className={`w-3.5 h-3.5 transition-all duration-200 ${
                isLocalLikes
                  ? 'fill-pink-500 text-pink-500 scale-110'
                  : 'fill-transparent text-brand-accent-tertiary hover:text-pink-400'
              }`}
            />
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={(e) => e.stopPropagation()}
              className="p-1 cursor-pointer transition-transform active:scale-90"
            >
              <Ellipsis className="w-5 text-brand-accent-tertiary hover:text-brand-accent-primary" />
            </button>
            <div className="absolute z-50 bottom-full right-0 mb-2 min-w-[100px] bg-white rounded-xl shadow-lg border border-gray-100 p-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteNote(note?.id);
                }}
                className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer font-medium"
              >
                <Trash className="w-3 h-3" />
                <p>Delete</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
