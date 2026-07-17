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
      className="relative shrink-0 flex max-w-[150px]  bg-white text-brand-accent-primary rounded-md box-border   "
      onClick={() => setIsOpen(!isOpen)}
    >
      <button className="flex w-full items-center min-h-5 justify-evenly px-2 box-border rounded-md text-sm cursor-pointer">
        <div> Trạng thái</div>
        <ChevronDown className="w-3 h-3" />
      </button>

      {isOpen && (
        <ul className="absolute top-full mt-2 left-0 z-50 w-full bg-white/70 border-0 rounded-md flex flex-col">
          <li className="">
            <button
              onClick={() => {
                // setIsSelected();
                setIsOpen(false);
              }}
              className={
                'w-full h-min-h-5 h-8 border-b border-gray-300 text-[15px] box-border rounded-md bg-brand-accent-secondary hover:opacity-80 cursor-pointer'
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
              1212sssssssssssssss
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
