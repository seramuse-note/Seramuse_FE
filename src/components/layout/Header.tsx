import Avatar from '../common/Avatar';

function Header() {
  return (
    <div className="w-full h-fit  min-h-1 rounded-tl-4xl rounded-br-4xl  rounded-bl-xl rounded-tr-xl text-brand-accent-primary">
      <div className="w-full h-fit px-5 py-2 bg-white/50 rounded-tl-4xl rounded-br-4xl rounded-bl-xl rounded-tr-xl flex justify-center items-center gap-5">
        <Avatar className="shrink-0"></Avatar>
        <div className="flex flex-col grow min-w-0">
          <div className="w-fit py-1 px-2 rounded-4xl  bg-white/50 text-xs flex justify-center items-center text-brand-accent text-[10px] font-semibold ">
            Hello Serena,
          </div>
          <div className=" w-full min-h-fit py-1 px-2  min-w-0 items-center grow relative">
            <div className="absolute left-0 w-fit h-fit z-10 flex shrink-0 justify-center items-center">
              <img
                width="25"
                height="25"
                src="https://img.icons8.com/3d-fluency/94/tired.png"
                alt="tired"
              />
            </div>
            <div className="w-fit grow pl-7 pr-5 bg-white/50 rounded-full min-w-0 max-w-md text-brand-accent font-semibold text-[10px] truncate">
              How are you feeling today?
            </div>
          </div>
        </div>
        <div className="w-8 h-8 min-w-[20px] h-min-[20px] p-2 rounded-full bg-white/80 flex shrink-0 justify-center items-center cursor-pointer hover:opacity-80">
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/ios-filled/50/F25081/combo-chart--v1.png"
            alt="combo-chart--v1"
          />
        </div>
      </div>
    </div>
  );
}
export default Header;
