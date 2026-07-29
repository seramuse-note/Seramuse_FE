import { X } from 'lucide-react';

export const Tag = () => (
  <div
    // key={index}
    className="group flex items-center gap-1 px-2.5 py-1
     bg-white border border-gray-200/80 
     hover:border-gray-300 text-gray-700 font-medium
      rounded-md text-[10px] whitespace-nowrap shadow-2xs 
      transition-all shrink-0"
  >
    <span>Học tập Học tập</span>
    <button
      type="button"
      className="opacity-40 group-hover:opacity-100 hover:text-red-500 transition-all rounded p-0.5"
    >
      <X className="w-3 h-3" />
    </button>
  </div>
);
