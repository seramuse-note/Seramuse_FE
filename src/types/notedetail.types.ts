export interface BlockProperty {
  text: string;
}

export interface Block {
  type: string;
  properties: BlockProperty;
  order_index: number;
}

export interface NoteDetail {
  id: string;
  title: string;
  mood_id: string | null;
  blocks: Block[];
  created_at: string;
  updated_at: string;
  first_block?: Block;
  search_text: string;
  tags: string[];
}
