import type { FC } from 'react';
import { Dropdown } from '@/components/common/Dropdown';
import { useGetMoodsQuery } from '@/services';
import type { DropdownOption } from '@/types';

interface NoteEditorMoodProps {
  value?: string | null;
  onChange: (moodId: string) => void;
}

export const NoteEditorMood: FC<NoteEditorMoodProps> = ({ value, onChange }) => {
  const { data: moodsData } = useGetMoodsQuery({ page: 1, limit: 10 });
  const moods = moodsData?.data ?? [];
  const moodOptions: DropdownOption[] = moods.map((m) => ({ value: m.id, label: m.name }));

  return (
    <div className="shrink-0 z-20">
      <Dropdown
        options={moodOptions}
        value={value ?? ''}
        onChange={onChange}
        placeholder="Trạng thái"
      />
    </div>
  );
};
