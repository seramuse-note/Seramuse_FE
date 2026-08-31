import { Editor as TiptapEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyleKit } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';

export interface CommandItem {
  title: string;
  description: string;
  action: (editor: TiptapEditor) => void;
}

export const BUBBLE_MENU_OPTIONS = {
  placement: 'bottom' as const,
  offset: 8,
  flip: true,
};

export const EXTENSIONS = [
  Color,
  TextStyleKit,
  StarterKit,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    alignments: ['left', 'center', 'right', 'justify'],
    defaultAlignment: 'left',
  }),
  Image.configure({
    inline: false,
    allowBase64: true,
  }),
];

export const COMMAND_ITEMS: CommandItem[] = [
  {
    title: 'Heading 1',
    description: 'Tiêu đề lớn',
    action: (ed) => ed.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    title: 'Heading 2',
    description: 'Tiêu đề vừa',
    action: (ed) => ed.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    title: 'Bullet List',
    description: 'Danh sách dấu chấm',
    action: (ed) => ed.chain().focus().toggleBulletList().run(),
  },
  {
    title: 'Ordered List',
    description: 'Danh sách số',
    action: (ed) => ed.chain().focus().toggleOrderedList().run(),
  },
  {
    title: 'Code Block',
    description: 'Khối mã code',
    action: (ed) => ed.chain().focus().toggleCodeBlock().run(),
  },
  {
    title: 'Image',
    description: 'Upload image',
    action: () => {},
  },
];
