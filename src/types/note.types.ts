import type { Tag } from './tag.types';

export interface ParagraphProperties {
  text: string;
}

export interface Block {
  id: string;
  order_index: number;
  type: string;
  properties: ParagraphProperties;
}

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

export interface Note {
  id: string | 'Untitled';
  title: string;
  mood_id?: string;
  blocks: Block[];
  created_at: string;
  updated_at: string;
  tags?: Tag[] | [];
  is_favorite?: boolean;
}

export interface NoteDetail {
  id: string;
  title: string;
  mood_id: string | null;
  blocks: BlockDto[];
  created_at: string;
  updated_at: string;
  tags: Tag[];
  is_favorite: boolean;
}

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

export interface NoteFilterParams {
  search?: string;
  mood_id?: string;
  tag_id?: string;
  operator?: 'and' | 'or';
  is_favorite?: 'true' | 'false' | boolean;
}

export interface GetNotesQueryParams extends NoteFilterParams {
  page?: number;
  limit?: number;
}
