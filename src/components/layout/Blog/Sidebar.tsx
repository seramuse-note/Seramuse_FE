export const Sidebar = () => {
  return (
    <div className="py-4 px-3 flex flex-col gap-3 bg-white/30 overflow-hidden">
      <div className="flex justify-between">
        <div className=" items-start text-sm font-bold">Recent</div>
        <div className="items-end h-full w-full flex justify-end gap-1">
          <div className="bg-brand-accent-primary text-white w-fit h-fit p-1 box-border rounded-full cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-mic-icon lucide-mic"
            >
              <path d="M12 19v3" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <rect x="9" y="2" width="6" height="13" rx="3" />
            </svg>
          </div>
          <div className="bg-white text-brand-accent-tertiary p-1 box-border rounded-[30%] cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-plus-icon lucide-plus"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>{' '}
          </div>
        </div>
      </div>
      <form
        action=""
        method="post"
        className="bg-white/50 rounded-md pl-3 px-1 py-1 w-full min-h-2 h-fit text-sm text-gray light flex items-center justify-around gap-2"
      >
        <input type="text" placeholder="Search" className="w-full focus:outline-0" name="search" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="gray"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-funnel-icon lucide-funnel flex items-center"
        >
          <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" />
        </svg>
      </form>
      <div className="bg-white/50 px-1 py-2 flex items-center justify-between w-full h-[10%] rounded-md">
        <div className="bg-brand-accent-primary flex-1 h-full text-white flex text-sm items-center gap-1 py-2 px-2 box-border rounded-md cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-gallery-vertical-end-icon lucide-gallery-vertical-end"
          >
            <path d="M7 2h10" />
            <path d="M5 6h14" />
            <rect width="18" height="12" x="3" y="10" rx="2" />
          </svg>
          <span>All</span>
        </div>
        <div className=" flex-1 h-[50%]  text-brand-accent-primary flex text-sm items-center gap-1 py-[10%] px-[5%] box-border rounded-md cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-pin-icon lucide-pin"
          >
            <path d="M12 17v5" />
            <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
          </svg>
          <span>Pinned</span>
        </div>
        <div className="flex-1 h-[80%] text-brand-accent-primary flex text-sm items-center gap-1 py-[10%] px-[5%] box-border rounded-md cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-star-icon lucide-star "
          >
            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
          </svg>
          <span>Starred</span>
        </div>
      </div>
      <div className="h-[30%] flex flex-col min-w-0 gap-1 justify-between relative bg-white/50 p-2 box-content rounded-sm">
        <div className=" text-[16px] max-w-[90%] to-brand-accent-primary line-clamp-2 overflow- text-ellipsis ">
          Business Partners Work at Modern OfficeBusiness Partners Work at Modern Office
        </div>
        <div className=" text-[13px] to-brand-accent-tertiary line-clamp-2 text-ellipsis  overflow-hidden">
          Lorem ipsum dolor sit amet, consectetur adipiscing el. Lorem ipsum dolor sit amet,
          consectetur adipiscing el. Lorem ipsum dolor sit amet, consectetur adipiscing el.
        </div>
        <div className="text-[13px] max-w-[80%] to-brand-accent-tertiary ">Feb 8, 2021</div>
        <div className="flex items-center justify-center gap-1 absolute p-2 top-0 right-0 box-content ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-ellipsis-icon lucide-ellipsis"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="gray"
            stroke="gray"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-pin-icon lucide-pin cursor-pointer"
          >
            <path d="M12 17v5" />
            <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
          </svg>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="gray"
          stroke="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-star-icon lucide-star
                  items-center justify-center absolute bottom-0 right-0 p-2 box-content cursor-pointer"
        >
          <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
        </svg>
      </div>
      <div className="bg-white/50 flex justify-center items-center p-2 text-sm hover:opacity-80 border-gray-50 cursor-pointer rounded-sm ">
        All post
      </div>
    </div>
  );
};
