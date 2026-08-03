import { RotateCcw, X } from 'lucide-react';

// Danh sách Mood mẫu (có thể truyền từ Props hoặc Database)

export default function FilterPopover() {
  // Local state để người dùng chỉnh sửa trước khi bấm "Áp dụng"

  return (
    <div
      className="max-h-100 overflow-y-auto flex flex-col  
                absolute top-12 p-4 pr-2 gap-4 right-0 w-80 bg-white/80 backdrop-blur-2xl rounded-3xl border border-white/80 shadow-2xl z-40 overflow-hidden text-xs"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-200/50">
        <h3 className="font-semibold text-sm text-gray-800">Filter</h3>
        <button
          type="button"
          className="flex items-center gap-1 text-xs text-brand-accent-fourth hover:text-brand-accent-primary transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>
      <div className="max-h-87.5 overflow-y-auto pr-2 pb-10 ">
        <div className="pr-2 ">
          {/* Section: TAG */}
          <div className="relative flex flex-col gap-1.5 ">
            <span className="text-[10px] font-bold text-brand-accent-fourth uppercase tracking-wider">
              TAG
            </span>
            <div
              className="flex flex-col p-2  max-h-35  bg-white/40 
                    border border-brand-accent-fourth/10 rounded-2xl focus-within:bg-white/80 focus-within:border-brand-accent-secondary/60 transition-all"
            >
              <div className="flex gap-1.5 flex-wrap overflow-x-auto  max-h-16 ">
                <span className="inline-flex items-center gap-1 bg-white  text-brand-accent-primary text-xs px-2.5 py-1 rounded-xl shadow-xs border border-gray-100 font-medium">
                  label
                  <X className="w-3 h-3 text-brand-accent-fourth hover:text-gray-600 cursor-pointer" />
                </span>
              </div>

              <input
                placeholder="Select tag..."
                className=" outline-none text-xs p-2 text-brand-accent-primary placeholder:text-brand-accent-fourth flex-1 min-w-[80px]"
              />
            </div>

            {/* TAG Dropdown List - Tách biệt z-index mượt mà */}
            <div className="absolute z-50 top-full left-0 right-0 p-3 border border-white/90 rounded-2xl bg-white/85 backdrop-blur-xl shadow-xl ">
              <div className=" max-h-20 overflow-y-auto  flex flex-col gap-0.5 ">
                <label className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/80  text-brand-accent-primary cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    className="rounded-md border-gray-300 text-black focus:ring-0"
                  />
                  <span>😊 Vui vẻ</span>
                </label>
              </div>
            </div>
          </div>
          {/* Section: MOOD */}
          <div className="relative flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-brand-accent-fourth uppercase tracking-wider">
              TAG
            </span>
            <div
              className="flex flex-col p-2  max-h-35  bg-white/40 
                    border border-brand-accent-fourth/10 rounded-2xl focus-within:bg-white/80 focus-within:border-brand-accent-secondary/60 transition-all"
            >
              <div className="flex gap-1.5 flex-wrap overflow-x-auto  max-h-16 ">
                <span className="inline-flex items-center gap-1 bg-white  text-brand-accent-primary text-xs px-2.5 py-1 rounded-xl shadow-xs border border-gray-100 font-medium">
                  label
                  <X className="w-3 h-3 text-brand-accent-fourth hover:text-gray-600 cursor-pointer" />
                </span>
              </div>
              <input
                placeholder="Select tag..."
                className=" outline-none text-xs p-2 text-brand-accent-primary placeholder:text-brand-accent-fourth flex-1 min-w-[80px]"
              />
            </div>

            {/* TAG Dropdown List - Tách biệt z-index mượt mà */}
            <div className="absolute z-50 top-full left-0 right-0 p-3 border border-white/90 rounded-2xl bg-white/85 backdrop-blur-xl shadow-md ">
              <div className=" max-h-20 overflow-y-auto flex flex-col gap-0.5 ">
                <label className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/80  text-brand-accent-primary cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    className="rounded-md border-gray-300 text-black focus:ring-0"
                  />
                  <span>😊 Vui vẻ</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Buttons */}
      <div className="pt-2 flex items-center justify-end gap-2 shrink-0 border-t border-gray-100/50">
        <button
          type="button"
          className="px-4 py-2 font-medium text-gray-500 hover:text-gray-800 rounded-xl hover:bg-white/50 transition-colors cursor-pointer"
        >
          Hủy
        </button>
        <button
          type="button"
          className="px-5 py-2 font-medium text-white bg-gray-900 hover:bg-black rounded-xl shadow-md active:scale-95 transition-all cursor-pointer"
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
}
