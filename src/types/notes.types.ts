export interface Tag {
  id: string;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
}

interface ParagraphProperties {
  text: string;
}

interface Block {
  id: string;
  order_index: number;
  type: string;
  properties: ParagraphProperties;
}

export interface Note {
  id: string;
  title: string;
  mood_id?: string;
  blocks: Block[];
  created_at: string;
  updated_at: string;
  tags?: Tag[];
  isFavorite: boolean;
}

export interface CreateNoteDto {
  title: string;
  mood_id?: string;
  blocks: Block[];
  tags?: Tag[];
}
