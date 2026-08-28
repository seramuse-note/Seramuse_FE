import clsx from 'clsx';

export const EditorSkeleton = () => {
  return (
    <div
      className={clsx(
        'flex-1 h-full min-h-0 min-w-0 overflow-auto transition-all duration-300 animate-pulse'
      )}
    >
      <div
        className={clsx(
          `flex-1 text-[10px] h-full min-w-0 min-h-0 flex flex-col overflow-x-auto overflow-y-auto z-0 p-3  
          bg-white/80 shadow-[0_20px_50px_-15px_rgba(134,0,60,0.12)]`
        )}
      >
        <div className="flex justify-between items-center h-7 gap-1 p-1">
          <div className="flex items-center gap-2">
            <div className="hidden md:block w-6 h-6 rounded-full bg-slate-200" />
            <div className="h-2.5 w-24 bg-slate-200 rounded-md" />
          </div>
          <div className="h-5 w-12 bg-slate-200 rounded-xl" />
        </div>

        <div className="px-3 py-1 flex flex-col gap-2 h-full">
          <div className="flex justify-between gap-2 md:gap-50 shrink-0 py-1">
            <div className="h-6 w-1/2 bg-slate-200 rounded-md" />
          </div>

          <div className="flex gap-2 items-center w-full max-h-10 shrink-0">
            <div className="shrink-0 h-7 w-24 bg-slate-200 rounded-lg" />

            <div className="flex flex-1 min-w-0 gap-2 rounded-2xl items-center shrink-0">
              <div className="h-7 w-28 bg-slate-200 rounded-xl shrink-0" />
              <div className="hidden sm:flex shrink-0 items-center gap-1.5 flex-1">
                <div className="h-6 w-14 bg-slate-200 rounded-full" />
                <div className="h-6 w-16 bg-slate-200 rounded-full" />
                <div className="h-6 w-12 bg-slate-200 rounded-full" />
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col min-h-0 h-full w-full pt-3 gap-2">
            <div className="w-full h-full bg-slate-100 rounded-lg mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
};
