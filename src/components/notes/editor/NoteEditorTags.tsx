import type { FC } from 'react';
import clsx from 'clsx';
import ScrollContainer from 'react-indiana-drag-scroll';
import { TagInputWithDropdown } from '@/components/common/TagInputWithDropdown';
import { TagCompoment } from '@/components/common/Tag';
import { useNoteTags } from '../hooks/useNoteTags';
import type { NoteTagItem, Tag } from '@/types';

interface NoteEditorTagsProps {
  initialTags?: Tag[];
  onChangeTags?: (tags: NoteTagItem[]) => void;
}

export const NoteEditorTags: FC<NoteEditorTagsProps> = ({ initialTags, onChangeTags }) => {
  const {
    tagInput,
    setTagInput,
    existingTagNames,
    displayTags,
    handleAddTag,
    handleSelectTag,
    handleRemoveCurrentTag,
    handleDeleteDbTag,
  } = useNoteTags({ initialTags, onChangeTags });

  return (
    <div className="flex flex-1 min-w-0 gap-2 rounded-2xl items-center shrink-0">
      <TagInputWithDropdown
        tagInput={tagInput}
        setTagInput={setTagInput}
        existingTags={existingTagNames}
        currentTags={displayTags.map((i) => i.name)}
        onAddTag={handleAddTag}
        onSelectTag={handleSelectTag}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
          }
        }}
        onDeleteItem={handleDeleteDbTag}
      />
      <ScrollContainer
        vertical={false}
        className={clsx(
          'flex flex-1 items-center gap-1.5 overflow-x-auto min-w-0 min-h-full box-border scrollbar-none transition-all duration-200',
          displayTags.length > 0
            ? 'p-1 bg-white/10 backdrop-blur-md border border-white/20 shadow-sm rounded-2xl hover:cursor-grab active:cursor-grabbing'
            : 'p-0 bg-transparent border-transparent shadow-none'
        )}
      >
        {displayTags.map((tag) => (
          <TagCompoment
            key={tag.id || tag.name}
            tag={{ name: tag.name, color: tag.color ?? '#6366f1' }}
            onRemove={handleRemoveCurrentTag}
          />
        ))}
      </ScrollContainer>
    </div>
  );
};
