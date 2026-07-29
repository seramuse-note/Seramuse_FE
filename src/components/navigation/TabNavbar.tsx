export const TabNavbar = () => {
  // const isActive = true;
  return (
    <>
      <div className=" flex flex-col gap-2 text-[10px] font-bold ">
        <div className="relative pl-2 box-border flex items-center cursor-pointer">
          <div className="absolute left-0 top-[20%] w-0.5 h-[60%] bg-brand-accent-primary rounded-full" />
          <span className="text-brand-accent-primary block">Note List</span>
        </div>
        <div className="relative pl-2 box-border cursor-pointer">
          <span className="text-brand-accent-tertiary block">Chart</span>
        </div>
      </div>
    </>
  );
};
