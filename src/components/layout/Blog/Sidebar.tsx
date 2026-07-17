import { Ellipsis, Funnel, GalleryVerticalEnd, Mic, Pin, Plus, Star } from 'lucide-react';

export const Sidebar = () => {
  return (
    <div className="py-4 px-3 flex flex-col gap-3  bg-white/30 overflow-hidden">
      <div className="flex justify-between">
        <div className=" items-start text-sm font-bold">Recent</div>
        <div className="items-end h-full w-full flex justify-end gap-2">
          <div className="bg-brand-accent-primary text-white w-fit h-fit p-1 box-border rounded-full cursor-pointer">
            <Mic className="w-4 h-4"></Mic>
          </div>
          <div className="bg-white text-brand-accent-tertiary p-1 box-border rounded-[30%] cursor-pointer">
            <Plus className="w-4 h-4" />
          </div>
        </div>
      </div>
      <form
        action=""
        method="post"
        className="bg-white/50 rounded-md pl-3 px-1 py-1 w-full min-h-2 h-fit text-sm text-gray light flex items-center justify-around gap-2"
      >
        <input type="text" placeholder="Search" className="w-full focus:outline-0" name="search" />
        <Funnel className="w-3 h-3"></Funnel>
      </form>
      <div className="bg-white/50 px-1 py-2 flex items-center justify-between w-full h-[10%] rounded-md">
        <div className="bg-brand-accent-primary flex-1 h-full text-white flex text-sm items-center gap-1 py-2 px-2 box-border rounded-md cursor-pointer">
          <GalleryVerticalEnd className="w-3 h-3"></GalleryVerticalEnd>
          <span>All</span>
        </div>
        <div className=" flex-1 h-[50%]  text-brand-accent-primary flex text-sm items-center gap-1 py-[10%] px-[5%] box-border rounded-md cursor-pointer">
          <Pin className="w-3 h-3"></Pin>
          <span>Pinned</span>
        </div>
        <div className="flex-1 h-[80%] text-brand-accent-primary flex text-sm items-center gap-1 py-[10%] px-[5%] box-border rounded-md cursor-pointer">
          <Star className="w-3 h-3"></Star>
          <span>Starred</span>
        </div>
      </div>
      <div className="h-[30%] flex flex-col min-w-0 gap-1 justify-between relative bg-white/50 p-2 box-content rounded-md">
        <div className=" text-[16px] max-w-[90%] to-brand-accent-primary line-clamp-2 overflow- text-ellipsis ">
          Business Partners Work at Modern OfficeBusiness Partners Work at Modern Office
        </div>
        <div className=" text-[13px] to-brand-accent-tertiary line-clamp-2 text-ellipsis  overflow-hidden">
          Lorem ipsum dolor sit amet, consectetur adipiscing el. Lorem ipsum dolor sit amet,
          consectetur adipiscing el. Lorem ipsum dolor sit amet, consectetur adipiscing el.
        </div>
        <div className="text-[13px] max-w-[80%] to-brand-accent-tertiary ">Feb 8, 2021</div>
        <div className="flex items-center justify-center gap-1 absolute p-2 top-0 right-0 box-content ">
          <Ellipsis className="w-3 h-3  text-brand-accent-tertiary  cursor-pointer"></Ellipsis>
        </div>
        <Star className="w-3 h-3 items-center justify-center absolute bottom-0 right-0 p-2 box-content cursor-pointer fill-brand-accent-tertiary text-brand-accent-tertiary"></Star>
      </div>
      <div className="bg-white/50 flex justify-center items-center p-2 text-sm hover:opacity-80 border-gray-50 cursor-pointer rounded-md ">
        All post
      </div>
    </div>
  );
};
