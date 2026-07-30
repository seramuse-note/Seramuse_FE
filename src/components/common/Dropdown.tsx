import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface DropdownOption {
  value: string;
  label: string;
}

const DEFAULT_OPTIONS: DropdownOption[] = [
  { value: 'Sad', label: 'Sad' },
  { value: 'Normal', label: 'Normal' },
  { value: 'Happy', label: 'Happy' },
  { value: 'Excited', label: 'Excited' },
];

interface DropdownProps {
  options?: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
}

export const Dropdown = ({ options = DEFAULT_OPTIONS, value, onChange }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(value || options[0]?.value);
  // const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(!isOpen);
    onChange?.(value);
  };

  const selectedLabel = options.find((opt) => opt.value === selected)?.label || 'Trạng thái';

  return (
    <div className="relative flex gap-2 min-h-0  shrink-0 " onClick={() => setIsOpen(!isOpen)}>
      <button
        className="flex shrink-0 items-center px-4.5 py-2 text-[12px]  text-brand-accent-primary font-medium
       bg-white/50 backdrop-blur-md hover:bg-white/70
        border border-white/60 shadow-sm rounded-xl active:scale-95 active:shadow-md
        box-border transition-all duration-200 cursor-pointer"
      >
        <div className=" w-15"> {selectedLabel}</div>
        <ChevronDown
          className={`w-3.5 h-3.5  text-gray-400  min-w-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-brand-accent-primary' : ''
          }`}
        />
      </button>

      {isOpen && (
        <ul
          className="absolute top-full mt-2  left-0 w-full
         bg-transparent backdrop-blur-md text-[13px]
        border border-white/60 shadow-md rounded-2xl box-border
          flex flex-col min-h-0 overflow-y-auto cursor-pointer justify-center"
        >
          {options.map((op) => {
            const isSelected = op.value === selected;
            return (
              <li
                className={`px-2 py-1 flex justify-center items-center-safe
                 ${isSelected ? 'text-brand-accent-secondary font-medium hover:shadow-none' : 'hover:font-medium hover:shadow-sm'}`}
              >
                <button
                  key={op.value}
                  type="button"
                  onClick={() => {
                    handleSelect(op.value);
                  }}
                  className={` ${selected ? '' : 'bg-white/50'}  w-15 cursor-pointer  active:scale-95`}
                >
                  {op.value}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
