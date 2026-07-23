import { Ellipsis, Funnel, GalleryVerticalEnd, Mic, Pin, Plus, Star } from 'lucide-react';

export const Sidebar = () => {
  return (
    <div className="py-4 px-3 flex flex-col gap-4 overflow-hidden  bg-white/45 backdrop-blur-lg border-r border-white/50 ">
      <div className="flex justify-between items-center px-1">
        <div className=" items-start text-base font-bold">Recent</div>
        <div className="flex gap-2">
          <div className=" p-2 bg-white/60 hover:bg-white/90 rounded-full border border-white/80 transition-all text-brand-accent-tertiary cursor-pointer ">
            <Mic className="w-4 h-4"></Mic>
          </div>
          <div className=" p-2 bg-white/60 hover:bg-white/90 rounded-full border border-white/80 transition-all text-brand-accent-tertiary cursor-pointer ">
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
      <div className="bg-white/30 backdrop-blur-md hover:bg-white/80 border border-white/40 shadow-sm transition-all px-1 py-2  gap-1.5 flex items-center justify-between w-full h-[10%] rounded-2xl">
        <div className="flex-1 flex items-center justify-center py-1.5 gap-1 bg-brand-accent-primary text-white shadow-sm font-medium text-xs rounded-md cursor-pointer">
          <GalleryVerticalEnd className="w-3 h-3"></GalleryVerticalEnd>
          <span>All</span>
        </div>
        <div className="flex-1 flex items-center justify-center py-1.5 gap-1 text-brand-accent-tertiary  hover:text-brand-accent-primary font-medium text-xs rounded-xl hover:bg-white/50 cursor-pointer transition-all">
          <Pin className="w-3 h-3"></Pin>
          <span>Pinned</span>
        </div>
        <div className="flex-1 flex items-center justify-center py-1.5 gap-1 text-brand-accent-tertiary hover:text-brand-accent-primary font-medium text-xs rounded-xl hover:bg-white/50 cursor-pointer transition-all">
          <Star className="w-3 h-3"></Star>
          <span>Starred</span>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-1">
        <div
          className="group relative p-4 rounded-2xl
         box-border bg-white/65 backdrop-blur-md
         border border-white/80  
         shadow-[0_10px_20px_-5px_rgba(134,0,60,0.06)]
         hover:bg-white/85  hover:-translate-y-1
         hover:shadow-[0_15px_25px_-5px_rgba(134,0,60,0.12)] 
         transition-all duration-300  cursor-pointer
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
      <div
        className="flex justify-center items-center
        mt-auto w-full py-2.5 bg-white/50
        hover:bg-white/80 backdrop-blur-md rounded-2xl border
        border-white/70 text-xs font-medium text-brand-accent-primary
        hover:to-brand-accent-tertiary shadow-sm transition-all
        cursor-pointer"
      >
        All post
      </div>
    </div>
  );
};
