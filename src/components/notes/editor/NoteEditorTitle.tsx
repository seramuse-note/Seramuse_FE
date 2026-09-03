import type { FC, ChangeEvent } from 'react';

interface NoteEditorTitleProps {
  value: string;
  onChange: (value: string) => void;
}

export const NoteEditorTitle: FC<NoteEditorTitleProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex justify-between gap-2 md:gap-50 shrink-0">
      <input
        name="title"
        type="text"
        placeholder="Ghi chú tâm trạng hôm nay"
        value={value}
        onChange={handleChange}
        className="font-bold text-brand-accent-primary outline-0 flex-1 pl-1 shrink-0 text-xs md:text-lg"
      />
    </div>
  );
};
