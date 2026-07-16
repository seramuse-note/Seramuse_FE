export const Navbar = () => {
  const isActive = true;
  return (
    <>
      <div className="min-w-0 w-full h-fit flex flex-col items-center gap-0.5 min-h-2.5 text-[10px] box-border  py-4">
        <div className="relative pl-1 ">
          <div className="absolute left-0 top-[25%] w-0.5 h-[50%] rounded-full bg-brand-accent-primary" />
          <span className="text-brand-accent-primary block">Blog</span>
        </div>
        <div>
          <span className="text-brand-accent-tertiary block">Chart</span>
        </div>
      </div>
    </>
  );
};
