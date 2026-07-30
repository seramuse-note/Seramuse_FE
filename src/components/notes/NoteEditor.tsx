import { Dropdown } from '@/components/common/Dropdown';
import { ChevronLeft, PanelLeftClose, PanelLeftOpen, Plus, TagIcon } from 'lucide-react';
import { Editor } from '@/components/common/Editor';
import { Tag } from '@/components/common/Tag';
import ScrollContainer from 'react-indiana-drag-scroll';
import type { LayoutMode } from '../layout/NoteMainLayout';

interface EditorPanelProps {
  layoutMode?: LayoutMode;
  // selectedNoteId: string;
  onToggleRecentList: () => void;
  onCloseEditor: () => void;
}

export const NoteEditor = ({
  layoutMode,
  // selectedNoteId,
  onToggleRecentList,
  onCloseEditor,
}: EditorPanelProps) => {
  return (
    <div
      className={` flex-1 h-full min-w-0 min-h-0 flex flex-col
         overflow-x-auto overflow-y-auto
          py-5 px-3 z-0 gap-3
          rounded-tr-xl rounded-br-xl box-border 
        bg-white/80 backdrop-blur-xl  
        shadow-[0_20px_50px_-15px_rgba(134,0,60,0.12)] 
        ${layoutMode === 'FULL_EDITOR' ? 'w-full' : ''}
        `}
    >
      <div className="flex text-xs gap-1 text-brand-accent-fourth items-center">
        <button
          onClick={onToggleRecentList}
          title={
            layoutMode === 'SPLIT'
              ? 'Collapse the list'
              : layoutMode === 'FULL_EDITOR'
                ? 'Open list'
                : ''
          }
        >
          {layoutMode === 'SPLIT' ? (
            <PanelLeftClose className="w-4 h-4 cursor-pointer" />
          ) : layoutMode === 'FULL_EDITOR' ? (
            <PanelLeftOpen className="w-4 h-4 cursor-pointer" />
          ) : (
            ''
          )}
          {/* ${
              <{PanelLeftClose className="w-4 h-4 cursor-pointer" />
            :            layoutMode === 'FULL_EDITOR' ?
            
              (<PanelLeftOpen className="w-4 h-4 cursor-pointer" />)
            } */}
        </button>
        <button onClick={onCloseEditor} title="Go back" className={`cursor-pointer `}>
          <ChevronLeft />
        </button>
        <div>Ghi chú của tôi</div>
        <div>/</div>
        <div className="text-brand-accent-tertiary">Ghi chú tâm trạng hôm nay</div>
      </div>
      <div className="flex justify-between gap-50">
        <input
          type="text"
          className="text-xl font-bold to-brand-accent-primary outline-0 flex-1"
          placeholder="Ghi chú tâm trạng hôm nay"
        />
        <div
          className="flex items-center gap-1 text-[10px] h-fit
          bg-brand-accent-primary text-white rounded-md px-2
            cursor-pointer hover:opacity-80"
        >
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
      <div className="flex gap-3 text-brand-accent-primary font-light text-[10px]">
        <div>Created: 20/08/2025</div>
        <div>Updated: 20/08/2025</div>
        <div>Đang lưu...</div>
      </div>

      <div className="flex z-20 gap-3.5 text-sm items-center w-full">
        <div className="shrink-0 z-20">
          <Dropdown />
        </div>
        <div className="flex flex-1 min-w-0  gap-3 shadow-sm  px-3 py-1.5 rounded-2xl">
          <div className=" flex gap-3 ">
            <div
              className=" flex shrink-0 gap-2 items-center px-3 py-1 text-[12px] text-brand-accent-primary font-medium
              bg-white/60 outline-none backdrop-blur-md  shadow-sm hover:bg-white/70 
              border border-white/60 rounded-xl active:scale-98
              box-border transition-all duration-300 cursor-pointerfocus-within:bg-white/70
              overflow-x-hidden"
            >
              <TagIcon className="w-3.5 h-3.5 text-brand-accent-secondary mr-1.5" />
              <input
                type="text"
                placeholder="Add tag..."
                className="bg-transparent outline-none text-xs w-20 placeholder:text-brand-accent-tertiary text-brand-accent-primary"
              />
              <button type="button" className="px-3 py-1 rounded-lg cursor-pointer" title="Add">
                <Plus className="w-3.5 h-3.5 text-brand-accent-tertiary hover:text-brand-accent-primary transition-colors duration-300" />
              </button>
            </div>
          </div>

          <ScrollContainer
            vertical={false}
            className="flex items-center gap-1.5 overflow-x-auto min-w-0 flex-1 px-3 py-1 box-border  
            scrollbar-none 
             hover:cursor-grab active:cursor-grabbing"
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
      <div className="flex flex-col flex-1 min-h-0 w-full z-1">
        <Editor />
      </div>
    </div>
  );
};
