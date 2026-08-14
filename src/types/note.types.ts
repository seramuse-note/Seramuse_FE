import type { Tag } from './tag.types';

export type BlockType =
  'paragraph' | 'heading_1' | 'heading_2' | 'image' | 'todo_list' | 'bullet_list';

export type ParagraphProperties = { text: string };
export type Heading1Properties = { text: string };
export type Heading2Properties = { text: string };
export type ImageProperties = { url: string };
export type TodoListProperties = { checked: boolean };
export type BulletListProperties = { items: string[] };

interface BaseBlock {
  id: string;
  order_index: number;
}

export type Block =
  | (BaseBlock & { type: 'paragraph'; properties: ParagraphProperties })
  | (BaseBlock & { type: 'heading_1'; properties: Heading1Properties })
  | (BaseBlock & { type: 'heading_2'; properties: Heading2Properties })
  | (BaseBlock & { type: 'image'; properties: ImageProperties })
  | (BaseBlock & { type: 'todo_list'; properties: TodoListProperties })
  | (BaseBlock & { type: 'bullet_list'; properties: BulletListProperties });

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

export type BlockRequest =
  | { type: 'paragraph'; properties: ParagraphProperties }
  | { type: 'heading_1'; properties: Heading1Properties }
  | { type: 'heading_2'; properties: Heading2Properties }
  | { type: 'image'; properties: ImageProperties }
  | { type: 'todo_list'; properties: TodoListProperties }
  | { type: 'bullet_list'; properties: BulletListProperties };

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

export type BlockResponse = [
  | (BaseBlock & { type: 'paragraph'; properties: ParagraphProperties })
  | (BaseBlock & { type: 'heading_1'; properties: Heading1Properties })
  | (BaseBlock & { type: 'heading_2'; properties: Heading2Properties })
  | (BaseBlock & { type: 'image'; properties: ImageProperties })
  | (BaseBlock & { type: 'todo_list'; properties: TodoListProperties })
  | (BaseBlock & { type: 'bullet_list'; properties: BulletListProperties }),
];
