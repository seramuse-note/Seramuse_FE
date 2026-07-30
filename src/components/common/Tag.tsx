import { X } from 'lucide-react';

interface TagItem {
  id: string;
  label: string;
  color: string;
}

interface TagProps {
  id: string;
  tag: TagItem;
  onRemove?: (id: string) => void | undefined;
}

export const Tag = ({ id, tag, onRemove }: TagProps) => (
  <div
    key={id}
    className={`group flex items-center gap-1 px-2.5 py-0.5
     bg-white/90 border border-white/30 shadow-md font-medium
     hover:shadow-sm
      rounded-xl text-[10px] whitespace-nowrap 
      transition-all shrink-0 select-none`}
  >
    <span style={{ color: tag.color ? `${tag.color}` : '' }} className="truncate max-w-30">
      {tag.label}
    </span>
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onRemove?.(id);
      }}
      className=" rounded p-0.5 shrink-0 "
      title="Remove tag"
    >
      <X className="w-3 h-3 opacity-40 hover:opacity-100 hover:to-brand-accent-primary transition-all " />
    </button>
  </div>
);
