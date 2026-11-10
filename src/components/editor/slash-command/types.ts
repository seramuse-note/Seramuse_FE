import type { Editor as TiptapEditor } from '@tiptap/react';
import type { LucideIcon } from 'lucide-react';

export type SlashCategory = 'text' | 'list' | 'insert' | 'advanced';

export interface SlashCategoryMeta {
  id: SlashCategory;
  label: string;
}

export interface SlashCommandItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: SlashCategory;
  keywords: string[];
  badge?: string;
  action: (editor: TiptapEditor) => void;
}

export interface GroupedSlashCommands {
  category: SlashCategoryMeta;
  items: SlashCommandItem[];
}

export interface UseSlashCommandOptions {
  editor: TiptapEditor | null;
  onUploadImage?: () => void;
  commands?: SlashCommandItem[];
}

export interface SlashCommandMenuProps {
  editor: TiptapEditor;
  slashQuery: string | null;
  commands: SlashCommandItem[];
  groupedCommands: GroupedSlashCommands[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  onExecuteCommand: (action: (editor: TiptapEditor) => void) => void;
  onUploadImage?: () => void;
}
