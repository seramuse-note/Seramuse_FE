import { Heart, Trash } from 'lucide-react';
import { useState, useRef, useEffect, memo } from 'react';
import type { FC, MouseEvent, KeyboardEvent } from 'react';
import type { Note, Tag } from '@/types';
import { formatDate } from '@/utils/event.util';
import { getFirstBlockText } from '@/utils/block.util';

interface NoteCardProps {
  note: Note;
  isActive?: boolean;
  onActiveNote: (id: string) => void;
  onToggleLike: (id: string) => Promise<void>;
  onOpenDeleteModal: () => void;
}

export const NoteCard: FC<NoteCardProps> = memo(
  ({ note, isActive, onActiveNote, onToggleLike, onOpenDeleteModal }) => {
    const [isLocalLikes, setIsLocalLikes] = useState(note.is_favorite);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Đồng bộ trạng thái like cục bộ khi note.is_favorite từ prop cập nhật
    useEffect(() => {
      setIsLocalLikes(note.is_favorite);
    }, [note.is_favorite]);

    // Dọn dẹp timer khi component unmount để tránh memory leak
    useEffect(() => {
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }, []);

    const handleHeartClick = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      const nextState = !isLocalLikes;
      setIsLocalLikes(nextState);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        if (nextState !== note.is_favorite) {
          onToggleLike(note.id);
        }
      }, 500);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onActiveNote(note.id);
      }
    };

    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => onActiveNote(note.id)}
        onKeyDown={handleKeyDown}
        className={`group flex flex-col relative p-5 pb-1 gap-3 rounded-2xl bg-white/65 backdrop-blur-md border border-transparent
          hover:bg-white/85 hover:shadow-xs active:shadow-xs duration-100 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-primary/40`}
      >
        <div className="flex">
          <h3
            className={`font-semibold text-sm transition-colors line-clamp-1 ${
              isActive ? 'text-brand-accent-secondary' : 'text-brand-accent-primary'
            }`}
          >
            {note.title || 'Untitled'}
          </h3>
        </div>

        <div className="min-h-8 text-[11px] text-brand-accent-tertiary line-clamp-2 leading-relaxed">
          {getFirstBlockText(note.blocks)}
        </div>

        <div className="h-8.75 flex items-center py-5 border-t border-white/20 overflow-hidden">
          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-nowrap gap-1.5">
              {note.tags.map((tag: Tag) => (
                <span
                  key={tag.id}
                  className="text-[9px] font-semibold px-2 py-0 rounded-lg bg-white/80 border border-white/50 shrink-0"
                  style={{
                    borderColor: tag.color ? `${tag.color}` : undefined,
                    color: tag.color ? `${tag.color}` : undefined,
                  }}
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-brand-accent-tertiary/10">
          <div className="text-[10px] text-brand-accent-tertiary font-medium">
            {formatDate(note.created_at)}
          </div>

          <div className="flex gap-1 items-center">
            <button
              type="button"
              onClick={handleHeartClick}
              className="p-2 cursor-pointer transition-transform active:scale-75"
              title={isLocalLikes ? 'Bỏ thích' : 'Yêu thích'}
              aria-label={isLocalLikes ? 'Bỏ thích' : 'Yêu thích'}
            >
              <Heart
                className={`w-3.5 h-3.5 transition-all duration-200 ${
                  isLocalLikes
                    ? 'fill-pink-500 text-pink-500 scale-110'
                    : 'fill-transparent text-brand-accent-tertiary hover:text-pink-400'
                }`}
              />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDeleteModal();
              }}
              className="p-2 text-brand-accent-tertiary hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors cursor-pointer active:scale-75"
              title="Xóa ghi chú"
              aria-label="Xóa ghi chú"
            >
              <Trash className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

NoteCard.displayName = 'NoteCard';
