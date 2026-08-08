import type { Block, Tag } from './notes.types';

export interface NoteDetail {
  id: string;
  title: string;
  mood_id: string | null;
  blocks: Block[];
  created_at: string;
  updated_at: string;
  tags: Tag[];
  is_favorite: boolean;
}
