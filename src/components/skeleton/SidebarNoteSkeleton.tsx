import { LAYOUT_MODE, type LayoutMode } from '@/types/layout.types';
import clsx from 'clsx';

const SIDEBAR_LAYOUT_STYLES: Record<LayoutMode, string> = {
  FULL_SIDEBAR: 'grid-cols-1 md:grid-cols-2 md:items-center',
  SPLIT: 'w-0 opacity-0 overflow-hidden md:w-50 md:opacity-100',
  FULL_EDITOR: 'w-0 opacity-0 overflow-hidden pointer-events-none',
};

export const SidebarNoteSkeleton = ({ layoutMode = LAYOUT_MODE.FULL_SIDEBAR, count = 4 }) => {
  return (
    <div className="h-full relative bg-white/45 backdrop-blur-lg p-4">
      <div className="h-full flex flex-col gap-4 w-full mx-auto">
        <div className="flex flex-col md:gap-4 gap-3 w-full">
          <div className="flex justify-between items-center px-1 shrink-0">
            <div className="h-5 w-20 bg-gray-200/80 rounded-md animate-pulse" />

            <div className="flex gap-1.5">
              <div className="w-8 h-8 bg-white/60 rounded-full border border-white/80 animate-pulse" />
              <div className="w-8 h-8 bg-white/60 rounded-full border border-white/80 animate-pulse" />
            </div>
          </div>

          <div className="relative flex items-center gap-2 shrink-0 w-full">
            <div className="flex-1 h-9 bg-white/60 border border-white/80 rounded-xl animate-pulse" />
            <div className="w-9 h-9 bg-white/90 border border-white/80 rounded-xl animate-pulse shrink-0" />
          </div>

          <div className="min-w-0 min-h-0 px-2.5 py-2 bg-white/30 backdrop-blur-md border border-white/40 shadow-sm gap-1.5 flex items-center justify-between rounded-2xl">
            <div className="flex-1 h-7 bg-white/60 rounded-xl animate-pulse" />
            <div className="flex-1 h-7 bg-white/40 rounded-xl animate-pulse" />
          </div>
        </div>

        <div className="min-h-0 h-full w-full overflow-y-hidden flex">
          <div
            className={clsx(
              `w-full h-full grid gap-4 justify-center md:gap-4`,
              SIDEBAR_LAYOUT_STYLES[layoutMode]
            )}
          >
            {Array.from({ length: count }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col relative p-5 pb-1 gap-3 rounded-2xl bg-white/65 backdrop-blur-md border border-transparent shadow-xs animate-pulse"
              >
                <div className="flex">
                  <div className="h-4 bg-gray-200/90 rounded-md w-3/4" />
                </div>

                <div className="min-h-8 space-y-2 pt-0.5">
                  <div className="h-3 bg-gray-200/70 rounded w-full" />
                  <div className="h-3 bg-gray-200/70 rounded w-4/5" />
                </div>

                <div className="h-8.75 border-t border-white/20 pt-1.5 flex gap-1.5">
                  <div className="h-4 w-12 bg-white/80 border border-white/50 rounded-lg" />
                  <div className="h-4 w-16 bg-white/80 border border-white/50 rounded-lg" />
                </div>

                <div className="flex items-center justify-between border-t border-brand-accent-tertiary/10 py-1.5">
                  <div className="h-3 w-16 bg-gray-200/60 rounded" />

                  <div className="flex gap-2 items-center">
                    <div className="w-3.5 h-3.5 bg-gray-200/70 rounded-full" />
                    <div className="w-4 h-4 bg-gray-200/70 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
