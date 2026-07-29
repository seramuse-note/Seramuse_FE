import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

// interface DropdownOption {
//   value: string;
//   label: string;
// }

// export const Dropdown = ({ options }: { options: DropdownOption[] }) => {
export const Dropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div
      className="relative shrink-0 flex max-w-37.5
        bg-white text-brand-accent-primary border
        border-brand-accent-secondary shadow-sm rounded-md box-border
        focus-within:ring-brand-accent-primary/20  transition-all"
      onClick={() => setIsOpen(!isOpen)}
    >
      <button
        className="flex w-full items-center min-h-0
      justify-evenly px-2 box-border rounded-md text-[12px] cursor-pointer
      hover:bg-gray-100/80 transition-all "
      >
        <div> Trạng thái</div>
        <ChevronDown className="w-3 h-3 flex" />
      </button>

      {isOpen && (
        <ul
          className="absolute top-full mt-2 left-0 w-full
         bg-white border border-gray-200 backdrop-blur-md rounded-md
          flex flex-col min-h-0 h-50 overflow-y-auto"
        >
          <li className="">
            <button
              onClick={() => {
                // setIsSelected();
                setIsOpen(false);
              }}
              className={
                'w-full h-min-h-5 h-8 border-b border-gray-300 text-[15px] box-border rounded-md bg-brand-accent-primary text-white hover:opacity-80 cursor-pointer'
              }
              // ${isSelected ?
              // : 'bg-white/50'}`}
            >
              1212
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                // setIsSelected();
                setIsOpen(false);
              }}
              className={
                'w-full h-min-h-5 h-8 text-[15px] rounded-md hover:opacity-80 cursor-pointer '
              }
              // ${isSelected ?
              // : 'bg-white/50'}`}
            >
              1212
            </button>
          </li>{' '}
          <li>
            <button
              onClick={() => {
                // setIsSelected();
                setIsOpen(false);
              }}
              className={
                'w-full h-min-h-5 h-8 text-[15px] rounded-md hover:opacity-80 cursor-pointer'
              }
              // ${isSelected ?
              // : 'bg-white/50'}`}
            >
              1212
            </button>
          </li>{' '}
          <li>
            <button
              onClick={() => {
                // setIsSelected();
                setIsOpen(false);
              }}
              className={
                'w-full h-min-h-5 h-8 text-[15px] rounded-md hover:opacity-80 cursor-pointer'
              }
              // ${isSelected ?
              // : 'bg-white/50'}`}
            >
              1212
            </button>
          </li>{' '}
          <li>
            <button
              onClick={() => {
                // setIsSelected();
                setIsOpen(false);
              }}
              className={
                'w-full h-min-h-5 h-8 text-[15px] rounded-md hover:opacity-80 cursor-pointer'
              }
              // ${isSelected ?
              // : 'bg-white/50'}`}
            >
              1212
            </button>
          </li>{' '}
          <li>
            <button
              onClick={() => {
                // setIsSelected();
                setIsOpen(false);
              }}
              className={
                'w-full h-min-h-5 h-8 text-[15px] rounded-md hover:opacity-80 cursor-pointer'
              }
              // ${isSelected ?
              // : 'bg-white/50'}`}
            >
              1212
            </button>
          </li>{' '}
          <li>
            <button
              onClick={() => {
                // setIsSelected();
                setIsOpen(false);
              }}
              className={
                'w-full h-min-h-5 h-8 text-[15px] rounded-md hover:opacity-80 cursor-pointer'
              }
              // ${isSelected ?
              // : 'bg-white/50'}`}
            >
              1212
            </button>
          </li>{' '}
          <li>
            <button
              onClick={() => {
                // setIsSelected();
                setIsOpen(false);
              }}
              className={
                'w-full h-min-h-5 h-8 text-[15px] rounded-md hover:opacity-80 cursor-pointer'
              }
              // ${isSelected ?
              // : 'bg-white/50'}`}
            >
              1212
            </button>
          </li>{' '}
          <li>
            <button
              onClick={() => {
                // setIsSelected();
                setIsOpen(false);
              }}
              className={
                'w-full h-min-h-5 h-8 text-[15px] rounded-md hover:opacity-80 cursor-pointer'
              }
              // ${isSelected ?
              // : 'bg-white/50'}`}
            >
              1212
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                // setIsSelected();
                setIsOpen(false);
              }}
              className={
                'w-full h-min-h-5 h-8 text-[15px] rounded-md hover:opacity-80 cursor-pointer'
              }
              // ${isSelected ?
              // : 'bg-white/50'}`}
            >
              1212
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};
