import { Dropdown } from '@/components/common/Dropdown';
import { Tag } from '../../common/Tag';
import { ChevronLeft, Plus } from 'lucide-react';
import ScrollContainer from 'react-indiana-drag-scroll';

export const NoteDetail = () => {
  return (
    <div className=" py-4 px-3 flex flex-col gap-3 bg-red/30 rounded-tr-xl rounded-br-xl overflow-x-hidden">
      <div className="flex text-sm gap-1 text-brand-accent-fourth">
        <ChevronLeft />
        <div>Ghi chú của tôi</div>
        <div>/</div>
        <div className="text-brand-accent-tertiary">Ghi chú tâm trạng hôm nay</div>
      </div>
      <div className="flex justify-between gap-50">
        <input
          type="text"
          className="text-2xl font-bold to-brand-accent-primary outline-0 flex-1"
          placeholder="Ghi chú tâm trạng hôm nay"
        />
        <div className="flex items-center gap-1 text-[10px] h-fit bg-brand-accent-primary text-white rounded-md px-2 cursor-pointer hover:opacity-80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-save-icon lucide-save"
          >
            <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
            <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
            <path d="M7 3v4a1 1 0 0 0 1 1h7" />
          </svg>
          <div>Save</div>
        </div>
      </div>
      <div className="flex gap-3 text-brand-accent-primary font-light text-[15px]">
        <div>Created: 20/08/2025</div>
        <div>Updated: 20/08/2025</div>
        <div>Đang lưu...</div>
      </div>

      <div className="bg-white/50 w-full rounded-xl p-3 flex gap-5">
        <Dropdown></Dropdown>
        <div
          className="flex flex-col
         grow gap-2 max-w-full max-h-full justify-evenly bg-white/50 p-2 overflow-x-hidden
         rounded-xl col-span-"
        >
          <div className=" flex gap-3">
            <form
              action=""
              className="flex items-center text-[10px] min-h-3.5 w-full max-w-[150px] gap-1  box-border"
            >
              <input
                type="text"
                placeholder="Add tag"
                className="outline-0 w-full bg-white/90 rounded-xl px-2"
              />
              <div className="lucide lucide-plus-icon lucide-plus bg-brand-accent-primary text-white px-2 p w-fit rounded-sm cursor-pointer hover:opacity-70">
                <Plus className="w-3 min-h-5 h-full"></Plus>
              </div>
            </form>
          </div>
          <ScrollContainer
            vertical={false}
            className="flex overflow-x-auto min-w-0 scrollbar-none cursor-grabbing"
          >
            <Tag></Tag>
            <Tag></Tag>
            <Tag></Tag>
            <Tag></Tag>
            <Tag></Tag>
            <Tag></Tag>
            <Tag></Tag>
          </ScrollContainer>
        </div>
      </div>
      <div className="relative flex flex-col gap-5">{/* <Tiptap></Tiptap> */}</div>
    </div>
  );
};
