import { Pagination } from '@/components/common/Pagination';
import { Ellipsis, Funnel, Mic, Plus, Star } from 'lucide-react';
import type { LayoutMode } from '../layout/NoteMainLayout';
// import { Preview } from '@/components/common/Preview';

interface EditorPanelProps {
  layoutMode: LayoutMode;
  selectedNoteId?: string | null;
  onSelectNote: (noteId: string) => void;
  // notesList?:
}

export const NoteSidebar = ({
  layoutMode,
  onSelectNote,
  // notesList,
}: EditorPanelProps) => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 3;

  //MOCK_NOTES=notesList
  // const totalPages = Math.ceil(notesList.length / itemsPerPage) || 1;
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentNotes = notesList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={`h-full relative bg-white/45 backdrop-blur-lg p-4 `}>
      <div
        className={`h-full flex flex-col gap-4
          w-full mx-auto `}
      >
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between items-center px-1 shrink-0">
            <div className=" items-start text-base font-bold flex-1">Recent</div>
            <div className="flex gap-1.5">
              <div
                className=" p-2 bg-white/60 hover:bg-white/90 rounded-full 
                  border border-white/80  text-brand-accent-primary cursor-pointer"
                title="Use voice chat"
              >
                <Mic className="w-4 h-4"></Mic>
              </div>
              <div
                className=" p-2 bg-white/60 hover:bg-white/90 rounded-full border
                  border-white/80  text-brand-accent-primary cursor-pointer "
                title="Create a new note"
              >
                <Plus className="w-4 h-4" />
              </div>
            </div>
          </div>
          <form
            action=""
            method="post"
            className=" flex items-center justify-around gap-2 shrink-0"
          >
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-white/60 border border-white/80 
                rounded-xl px-4 py-2.5 text-xs text-brand-accent-primary 
                placeholder-brand-accent-tertiary outline-none focus:bg-white/90 
                focus:border-brand-accent-secondary  shadow-sm"
            />
            <div
              className="px-2.5 py-2.5 bg-white/90 hover:bg-white rounded-xl border 
              border-white/80  text-brand-accent-tertiary shadow-sm cursor-pointer "
            >
              <Funnel className="w-4 h-4" />
            </div>
          </form>
          <div
            className="min-w-0 min-h-0 overflow-hidden 
            px-2.5 py-2 bg-white/30 backdrop-blur-md 
            hover:bg-white/80 border border-white/40 shadow-sm  
            gap-1.5 flex items-center justify-between rounded-2xl"
          >
            <div
              className="flex-1 flex items-center justify-center p-1.5 gap-1 
              bg-brand-accent-primary text-white shadow-sm font-medium 
              text-xs rounded-xl cursor-pointer"
            >
              <span>All</span>
            </div>
            <div
              className="flex-1 flex items-center justify-center py-1.5 gap-1 
              text-brand-accent-tertiary  hover:text-brand-accent-primary 
              font-medium text-xs rounded-xl hover:bg-white/50 cursor-pointer "
            >
              <span>Pinned</span>
            </div>
            <div
              className="flex-1 flex items-center justify-center py-1.5 gap-1
              text-brand-accent-tertiary hover:text-brand-accent-primary
                font-medium text-xs rounded-xl hover:bg-white/50 cursor-pointer "
            >
              <span>Starred</span>
            </div>
          </div>
        </div>
        <div className="min-h- w-full overflow-y-auto">
          <div
            className={`w-full gap-4 py-3 grid
              ${layoutMode === 'FULL_SIDEBAR' ? 'grid-cols-1 md:grid-cols-2 ' : 'grid-cols-1'}
              `}
          >
            {/* {currentNotes.map((note) => ( */}

            {/* <Preview onSelectNote={onSelectNote} on /> */}

            <div
              // key={note.id}
              // onClick={() => onSelectNote(note.id)}
              onClick={() => onSelectNote('note-1')}
              className="group relative p-4 rounded-2xl
                  box-border bg-white/65 backdrop-blur-md
                  border border-brand-accent-secondary/80  
                  shadow-[0_10px_20px_-5px_rgba(134,0,60,0.06)]
                  hover:bg-white/85  hover:-translate-y-1
                  hover:shadow-[0_15px_25px_-5px_rgba(134,0,60,0.12)] 
                  duration-300  cursor-pointer 
                  flex flex-col"
            >
              <div className="flex relative ">
                <h3
                  className="font-semibold font-sm text-brand-accent-secondary
                  group-hover:text-brand-accent-secondary transition-colors line-clamp-1"
                >
                  {/* {note.title || 'Untitled'}{' '} */}
                  Lorem ipsum dolor sit amet
                </h3>
              </div>
              <div className=" text-[11px] text-brand-accent-tertiary mt-2 line-clamp-2 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing el. Lorem ipsum dolor sit amet,
                consectetur adipiscing el. Lorem ipsum dolor sit amet, consectetur adipiscing el.
              </div>
              <div className="mt-1 pt-1 border-t border-white/20">
                {/* {note.tags && note.tags.length > 0 && ( */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {/* {note.tags.map((tag) => ( */}
                  <span
                    // key={tag.id}
                    className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-white/80 text-brand-accent-primary border border-white/50"
                    style={
                      {
                        // borderColor: tag.color ? `#${tag.color}` : undefined,
                      }
                    }
                  >
                    {/* #{tag.name} */}
                    Lorem ipsum
                  </span>
                  {/* ))} */}
                </div>
                {/* )} */}
              </div>

              <div className="text-[10px] text-brand-accent-secondary mt-2 border-t  border-white/10 font-medium">
                {/* {note.created_at} */}
              </div>

              <div className="flex gap-2 justify-between justify-self-end ">
                <Star className="w-3 fill-brand-accent-tertiary text-brand-accent-tertiary hover:fill-yellow-300 hover:text-yellow-300 cursor-pointer "></Star>
                <Ellipsis className="w-5 text-brand-accent-tertiary hover:text-brand-accent-primary  cursor-pointer"></Ellipsis>
              </div>
            </div>

            <div
              // key={note.id}
              // onClick={() => onSelectNote(note.id)}
              onClick={() => onSelectNote('note-1')}
              className="group relative p-4 rounded-2xl
                  box-border bg-white/65 backdrop-blur-md
                  border border-brand-accent-secondary/80  
                  shadow-[0_10px_20px_-5px_rgba(134,0,60,0.06)]
                  hover:bg-white/85  hover:-translate-y-1
                  hover:shadow-[0_15px_25px_-5px_rgba(134,0,60,0.12)] 
                  duration-300  cursor-pointer 
                  flex flex-col"
            >
              <div className="flex relative ">
                <h3
                  className="font-semibold font-sm text-brand-accent-secondary
                  group-hover:text-brand-accent-secondary transition-colors line-clamp-1"
                >
                  {/* {note.title || 'Untitled'}{' '} */}
                  Lorem ipsum dolor sit amet
                </h3>
              </div>
              <div className=" text-[11px] text-brand-accent-tertiary mt-2 line-clamp-2 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing el. Lorem ipsum dolor sit amet,
                consectetur adipiscing el. Lorem ipsum dolor sit amet, consectetur adipiscing el.
              </div>
              <div className="mt-1 pt-1 border-t border-white/20">
                {/* {note.tags && note.tags.length > 0 && ( */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {/* {note.tags.map((tag) => ( */}
                  <span
                    // key={tag.id}
                    className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-white/80 text-brand-accent-primary border border-white/50"
                    style={
                      {
                        // borderColor: tag.color ? `#${tag.color}` : undefined,
                      }
                    }
                  >
                    {/* #{tag.name} */}
                    Lorem ipsum
                  </span>
                  {/* ))} */}
                </div>
                {/* )} */}
              </div>

              <div className="text-[10px] text-brand-accent-secondary mt-2 border-t  border-white/10 font-medium">
                {/* {note.created_at} */}
              </div>

              <div className="flex gap-2 justify-between justify-self-end ">
                <Star className="w-3 fill-brand-accent-tertiary text-brand-accent-tertiary hover:fill-yellow-300 hover:text-yellow-300 cursor-pointer "></Star>
                <Ellipsis className="w-5 text-brand-accent-tertiary hover:text-brand-accent-primary  cursor-pointer"></Ellipsis>
              </div>
            </div>

            {/* ))} */}
          </div>
        </div>
        {layoutMode === 'FULL_SIDEBAR' ? (
          // <Pagination
          //   currentPage={currentPage}
          //   totalPages={totalPages}
          //   onPageChange={(page) => setCurrentPage(page)}
          // />
          <Pagination
            currentPage={1}
            totalPages={3}
            onPageChange={(page) => console.log('Chuyển sang trang:', page)}
          />
        ) : (
          <div
            className="flex justify-center items-center
          mt-auto w-full p-2.5 bg-white/50
          hover:bg-white/80 backdrop-blur-md rounded-2xl border
          border-white/70 text-xs font-medium text-brand-accent-primary
          hover:text-brand-accent-secondary shadow-sm 
          cursor-pointer whitespace-nowrap truncate shrink-0"
          >
            All post
          </div>
        )}
      </div>
    </div>
  );
};
