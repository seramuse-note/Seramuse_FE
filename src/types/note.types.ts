import type { Tag } from './tag.types';

export type BlockType = 'paragraph' | 'heading' | 'code' | 'image' | 'todo' | 'quote';

export type BlockProperties = Record<string, unknown>;

export interface Block {
  id?: string;
  order_index?: number;
  type: BlockType;
  properties: BlockProperties;
}

export interface Note {
  id: string;
  title: string;
  mood_id?: string | null;
  blocks: Block[];
  created_at: string;
  updated_at: string;
  tags?: Tag[];
  is_favorite?: boolean;
}

export type CreateBlockPayload = {
  type: BlockType;
  properties: BlockProperties;
};

export interface NoteRequest {
  title?: string;
  mood_id?: string | null;
  blocks?: CreateBlockPayload[];
  tag_ids?: string[];
}

export interface GetNotesRequest {
  page?: number;
  limit?: number;
  mood_id?: string;
  tag_id?: string;
  search?: string;
  operator?: 'and' | 'or';
  is_favorite?: 'true' | 'false' | boolean;
}
