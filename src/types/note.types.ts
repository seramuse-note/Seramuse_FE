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

export type BlockRequest = {
  id?: string;
  order_index?: number;
} & (
  | { type: 'paragraph' | 'heading_1' | 'heading_2'; properties: { text: string } }
  | { type: 'image'; properties: { url: string } }
  | { type: 'todo_list'; properties: { checked: boolean; text?: string } }
  | { type: 'bullet_list'; properties: { items: string[] } }
  | { type: string; properties: Record<string, unknown> }
);

export interface CreateNoteRequest {
  title: string | 'Untitled';
  mood_id?: string | null;
  blocks: BlockRequest[];
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

export interface UpdateNoteRequest {
  title?: string | 'Untitled';
  mood_id?: string | null;
  blocks?: BlockRequest[];
  tag_ids?: string[];
}

// ===================================================
// 3. API RESPONSE TYPES (Data thô nhận VỀ từ API)
// ===================================================
