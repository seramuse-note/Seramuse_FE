export interface Tag {
  id: string;
  name: string;
  color?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tags?: Tag[];
  created_at: string;
}

export interface CreateNoteDto {
  title: string;
  content: string;
}
