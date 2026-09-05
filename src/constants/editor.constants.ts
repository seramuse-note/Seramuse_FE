import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyleKit } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';

// Tương thích ngược: re-export từ module slash-command
export type { SlashCommandItem as CommandItem } from '@/components/editor/slash-command';
export { DEFAULT_SLASH_COMMANDS as COMMAND_ITEMS } from '@/components/editor/slash-command';

export const BUBBLE_MENU_OPTIONS = {
  placement: 'bottom' as const,
  offset: 8,
  flip: true,
};

export const EXTENSIONS = [
  Color,
  TextStyleKit,
  Placeholder.configure({
    placeholder: "Nhấn '/' để xem danh sách lệnh hoặc bắt đầu viết...",
    emptyEditorClass: 'is-editor-empty',
  }),
  StarterKit.configure({
    bulletList: { keepMarks: true, keepAttributes: false },
    orderedList: { keepMarks: true, keepAttributes: false },
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: 'task-list',
    },
  }),
  TaskItem.configure({
    nested: true,
    HTMLAttributes: {
      class: 'task-item',
    },
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: 'tiptap-link text-brand-accent-secondary underline cursor-pointer',
    },
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    alignments: ['left', 'center', 'right', 'justify'],
    defaultAlignment: 'left',
  }),
  Image.configure({
    inline: true,
    allowBase64: true,
    HTMLAttributes: {
      class: 'max-w-full rounded-md',
    },
  }),
];
