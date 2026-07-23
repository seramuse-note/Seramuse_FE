import { Ellipsis, Star } from 'lucide-react';

export const SecondaryLayout = () => {
  return (
    <div className="h-[30%] flex flex-col min-w-0 gap-1 justify-between relative bg-white/50 p-2 box-border rounded-md border-l-5 border-transparent  hover:border-brand-accent-primary cursor-pointer">
      <div className=" text-[16px] max-w-[90%] to-brand-accent-primary line-clamp-1 overflow- text-ellipsis ">
        Business Partners Work at Modern OfficeBusiness Partners Work at Modern Office
      </div>
      <div className=" text-[13px] text-brand-accent-tertiary line-clamp-2 text-ellipsis  overflow-hidden">
        Lorem ipsum dolor sit amet, consectetur adipiscing el. Lorem ipsum dolor sit amet,
        consectetur adipiscing el. Lorem ipsum dolor sit amet, consectetur adipiscing el.
      </div>
      <div className="text-[10px] max-w-[80%] text-brand-accent-fourth ">Feb 8, 2021</div>
      <div className="flex items-center justify-center gap-1 absolute p-2 top-0 right-0 box-content ">
        <Ellipsis className="w-3 h-3  text-brand-accent-tertiary  cursor-pointer"></Ellipsis>
      </div>
      <Star className="w-3 h-3 items-center justify-center absolute bottom-0 right-0 p-2 box-content cursor-pointer fill-brand-accent-tertiary text-brand-accent-tertiary"></Star>
    </div>
  );
};
