import { X } from 'lucide-react';

interface TagData {
  name: string;
  color: string;
}

interface TagProps {
  tag: TagData;
  onRemove: (targetTag: string) => void;
}

export const TagCompoment = ({ tag, onRemove }: TagProps) => (
  <div
    key={tag.name}
    className={`group flex items-center gap-1 px-2.5 text-[8px]
    bg-white/90 border border-white/30 shadow-md font-medium
    hover:shadow-sm rounded-xl whitespace-nowrap 
    transition-all shrink-0  `}
  >
    <span style={{ color: tag.color ? `${tag.color}` : '' }} className="truncate max-w-30">
      {tag.name}
    </span>
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onRemove(tag.name);
      }}
      className=" rounded p-0.5 shrink-0 "
      title="Remove tag"
    >
      <X className="w-3 h-3 opacity-40 hover:opacity-100 hover:to-brand-accent-primary transition-all " />
    </button>
  </div>
);
