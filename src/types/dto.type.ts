import type { Tag } from './notes.types';

export type BlockDto = {
  id?: string;
  order_index?: number;
} & (
  | { type: 'paragraph' | 'heading_1' | 'heading_2'; properties: { text: string } }
  | { type: 'image'; properties: { url: string } }
  | { type: 'todo_list'; properties: { checked: boolean; text?: string } }
  | { type: 'bullet_list'; properties: { items: string[] } }
  | { type: string; properties: Record<string, unknown> }
);

export type CreateNoteDto = {
  title: string | 'Untitled';
  mood_id?: string;
  blocks: BlockDto[];
  tag_ids?: Tag[];
};

export type UpdateNoteDto = {
  title?: string | 'Untitled';
  mood_id?: string | '';
  blocks?: BlockDto[];
  tag_ids?: string[];
};

export type CreateMoodDto = {
  name: string;
  icon: string;
  weight: number;
};

export type updateMoodDto = {
  name: string;
  icon: string;
  weight: number;
};

export type CreateTagDto = {
  name: string;
  color: string;
};

export type UpdateTagDto = {
  name: string;
  color: string;
};

export type UploadFileDto = {
  file: string;
};

export type PaginationMetaDto = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  count: number;
};
