import { Heart, Ellipsis, Trash } from 'lucide-react';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Note, Tag } from '@/types';
import moment from 'moment';
import { formatDate } from '@/utils/event.util';
import { getFirstBlockText } from '@/utils/block.util';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useAppSelector } from '@/store/store';
moment.locale('vi');

interface NoteCardProps {
  note: Note;
  isActive?: boolean;
  onActiveNote: (id: string) => void;
  onToggleLike: (id: string) => Promise<void>;
  onDeleteNote: (id: string) => void;
}

export const NoteCard = ({
  note,
  isActive,
  onActiveNote,
  onToggleLike,
  onDeleteNote,
}: NoteCardProps) => {
  const activeNoteId = useAppSelector((state) => state.ui.activeNoteId);
  const layoutMode = useAppSelector((state) => state.ui.layoutMode);

  const [isLocalLikes, setIsLocalLikes] = useState(note.is_favorite);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const deleteBtnRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleHeartClick = (e: React.MouseEvent) => {
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

  useClickOutside(deleteBtnRef, () => {
    setIsOpenDelete(false);
  });
  return (
    <>
      <div
        onClick={() => {
          onActiveNote(note.id);
          console.log({ activeNoteId, layoutMode });
        }}
        className="group flex flex-col relative  p-5 pb-1 gap-3 rounded-2xl bg-white/65 backdrop-blur-md border border-transparent
      hover:bg-white/85 hover:shadow-xs active:shadow-xs duration-100 cursor-pointer"
      >
        {isOpenDelete &&
          createPortal(
            <div
              className="fixed inset-0 z-40 bg-transparent"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenDelete(false);
              }}
            />,
            document.body
          )}

        <div className="flex">
          <h3
            className={`font-semibold text-sm transition-colors line-clamp-1 ${isActive ? 'text-brand-accent-secondary' : 'text-brand-accent-primary'} `}
          >
            {note.title || 'Untitled'}
          </h3>
        </div>

        <div className="min-h-[32px] text-[11px] text-brand-accent-tertiary line-clamp-2 leading-relaxed">
          {getFirstBlockText(note.blocks)}
        </div>

        <div className="h-[35px] flex items-center py-5 border-t border-white/20 overflow-hidden">
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
          <div className="text-[10px] text-brand-accent-tertiary font-medium active:text-brand-accent-secondary">
            {formatDate(note.created_at)}
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
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpenDelete((prev) => !prev);
                }}
                className="p-1 cursor-pointer transition-transform  "
              >
                <Ellipsis className="w-5 text-brand-accent-tertiary hover:text-brand-accent-primary" />
              </button>
              {isOpenDelete && (
                <div
                  ref={deleteBtnRef}
                  className="absolute z-50 bottom-full right-0 mb-1 min-w-[100px] bg-white rounded-xl shadow-md border border-gray-100 p-1"
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteNote(note?.id);
                      setIsOpenDelete(false);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer font-medium"
                  >
                    <Trash className="w-3 h-3" /> <p>Delete</p>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
