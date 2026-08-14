import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (_value: string) => void;
  placeholder?: string;
}

export const Dropdown = ({ options, value, onChange, placeholder = 'Lựa chọn' }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (selectedId: string) => {
    setIsOpen(!isOpen);
    onChange(selectedId);
  };

  const selectedLabel = options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <div className="relative flex gap-2 min-h-0 shrink-0 " onClick={() => setIsOpen(!isOpen)}>
      <button
        className="flex shrink-0 items-center px-3 py-.5  text-brand-accent-primary font-medium
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
          bg-transparent backdrop-blur-md
          border border-white/60 shadow-md rounded-2xl box-border
          flex flex-col min-h-0 overflow-y-auto cursor-pointer justify-center"
        >
          {options.map((op) => {
            const isSelected = op.value === value;

            return (
              <li
                key={op.value}
                className={`px-2 py-1 flex justify-center items-center-safe
                 ${isSelected ? 'text-brand-accent-secondary font-medium hover:shadow-none' : 'hover:font-medium hover:shadow-sm'}`}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(op.value);
                  }}
                  className={` ${value ? '' : 'bg-white/50'}  w-15 cursor-pointer  active:scale-95`}
                >
                  {op.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
