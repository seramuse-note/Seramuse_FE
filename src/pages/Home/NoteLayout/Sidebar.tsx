import { Ellipsis, Funnel, Mic, Plus, Star } from 'lucide-react';

interface EditorPanelProps {
  showRecentList: boolean;
}
export const Sidebar = ({ showRecentList }: EditorPanelProps) => {
  return (
    <div
      className={`relative flex flex-col gap-4 bg-white/45 transition-all duration-700 overflow-hidden
     ${showRecentList ? 'py-4 px-3 backdrop-blur-lg border-r border-white/50 ' : 'bg-white/80 backdrop-blur-none py-0  border-0 opacity-0 pointer-events-none'}`}
    >
      <div className="flex justify-between items-center px-1">
        <div className=" items-start text-base font-bold flex-1">Recent</div>
        <div className="flex gap-1.5">
          <div
            className=" p-2 bg-white/60 hover:bg-white/90 rounded-full border border-white/80 transition-all text-brand-accent-primary cursor-pointer"
            title="Use voice chat"
          >
            <Mic className="w-4 h-4"></Mic>
          </div>
          <div
            className=" p-2 bg-white/60 hover:bg-white/90 rounded-full border border-white/80 transition-all text-brand-accent-primary cursor-pointer "
            title="Create a new note"
          >
            <Plus className="w-4 h-4" />
          </div>
        </div>
      </div>
      <form
        action=""
        method="post"
        className="transition-all flex items-center justify-around gap-2"
      >
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-white/60 border border-white/80 rounded-xl px-4 py-2.5 text-xs text-brand-accent-primary placeholder-brand-accent-tertiary outline-none focus:bg-white/90 focus:border-brand-accent-secondary transition-all shadow-sm"
        />
        <div className="px-2.5 py-2.5 bg-white/90 hover:bg-white rounded-xl border border-white/80 transition-all text-brand-accent-tertiary shadow-sm cursor-pointer ">
          <Funnel className="w-4 h-4" />
        </div>
      </form>
      <div className="bg-white/30 backdrop-blur-md hover:bg-white/80 border border-white/40 shadow-sm transition-all px-2.5 py-2 gap-1.5 flex items-center justify-between rounded-2xl overflow-hidden ">
        <div className="flex-1 flex items-center justify-center p-1.5 gap-1 bg-brand-accent-primary text-white shadow-sm font-medium text-xs rounded-xl cursor-pointer">
          <span>All</span>
        </div>
        <div className="flex-1 flex items-center justify-center py-1.5 gap-1 text-brand-accent-tertiary  hover:text-brand-accent-primary font-medium text-xs rounded-xl hover:bg-white/50 cursor-pointer transition-all">
          <span>Pinned</span>
        </div>
        <div className="flex-1 flex items-center justify-center py-1.5 gap-1 text-brand-accent-tertiary hover:text-brand-accent-primary font-medium text-xs rounded-xl hover:bg-white/50 cursor-pointer transition-all">
          <span>Starred</span>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-1">
        <div className="flex flex-col gap-3 mt-1">
          <div
            className="group relative p-4 rounded-2xl
         box-border bg-white/65 backdrop-blur-md
         border border-white/80  
         shadow-[0_10px_20px_-5px_rgba(134,0,60,0.06)]
         hover:bg-white/85  hover:-translate-y-1
         hover:shadow-[0_15px_25px_-5px_rgba(134,0,60,0.12)] 
         transition-all duration-700  cursor-pointer
        "
          >
            <div className="flex relative ">
              <h3
                className="font-semibold font-sm text-brand-accent-primary
            group-hover:text-brand-accent-secondary transition-colors line-clamp-1"
              >
                Business Partners Work at Modern OfficeBusiness Partners Work at Modern Office
              </h3>
            </div>
            <div className=" text-[11px] text-brand-accent-tertiary mt-2 line-clamp-2 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing el. Lorem ipsum dolor sit amet,
              consectetur adipiscing el. Lorem ipsum dolor sit amet, consectetur adipiscing el.
            </div>
            <div className="text-[10px] text-brand-accent-fourth mt-2 border-t  border-white/10 font-medium">
              Feb 8, 2021
            </div>
            <div className="flex gap-2 justify-between">
              <Star className="w-3 fill-brand-accent-tertiary text-brand-accent-tertiary hover:fill-yellow-300 hover:text-yellow-300 cursor-pointer "></Star>
              <Ellipsis className="w-5 text-brand-accent-tertiary hover:text-brand-accent-primary  cursor-pointer"></Ellipsis>
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col gap-3 mt-1">
          <div
            className="group relative p-4 rounded-2xl
         box-border bg-white/65 backdrop-blur-md
         border border-brand-accent-secondary/80  
         shadow-[0_10px_20px_-5px_rgba(134,0,60,0.06)]
         hover:bg-white/85  hover:-translate-y-1
         hover:shadow-[0_15px_25px_-5px_rgba(134,0,60,0.12)] 
         transition-all duration-700  cursor-pointer
        "
          >
            <div className="flex relative ">
              <h3
                className="font-semibold font-sm text-brand-accent-secondary
            group-hover:text-brand-accent-secondary transition-colors line-clamp-1"
              >
                Business Partners Work at Modern OfficeBusiness Partners Work at Modern Office
              </h3>
            </div>
            <div className=" text-[11px] text-brand-accent-tertiary mt-2 line-clamp-2 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing el. Lorem ipsum dolor sit amet,
              consectetur adipiscing el. Lorem ipsum dolor sit amet, consectetur adipiscing el.
            </div>
            <div className="text-[10px] text-brand-accent-secondary mt-2 border-t  border-white/10 font-medium">
              Feb 8, 2021
            </div>
            <div className="flex gap-2 justify-between">
              <Star className="w-3 fill-brand-accent-tertiary text-brand-accent-tertiary hover:fill-yellow-300 hover:text-yellow-300 cursor-pointer "></Star>
              <Ellipsis className="w-5 text-brand-accent-tertiary hover:text-brand-accent-primary  cursor-pointer"></Ellipsis>
            </div>
          </div>
        </div> */}
      </div>
      <div
        className="flex justify-center items-center
        mt-auto w-full p-2.5 bg-white/50
        hover:bg-white/80 backdrop-blur-md rounded-2xl border
        border-white/70 text-xs font-medium text-brand-accent-primary
        hover:text-brand-accent-secondary shadow-sm transition-all
        cursor-pointer whitespace-nowrap truncate "
      >
        All post
      </div>
    </div>
  );
};
