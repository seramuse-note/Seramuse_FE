import type { Block, Tag } from './notes.types';

export interface BlockDto {
  id: string;
  order_index?: string;
  type: Block[];
  properties: Tag[];
}

export interface CreateNoteDto {
  title: string;
  mood_id?: string;
  blocks: Block[];
  tag_ids?: Tag[];
}

export interface UpdateNoteDto {
  title?: string | 'Untitled';
  mood_id?: string;
  blocks?: BlockDto[];
  tag_ids?: string[];
}

export interface CreateMoodDto {
  name: string;
  icon: string;
  weight: number;
}

export interface updateMoodDto {
  name: string;
  icon: string;
  weight: number;
}

export interface CreateTagDto {
  name: string;
  color: string;
}

export interface UpdateTagDto {
  name: string;
  color: string;
}

export interface UploadFileDto {
  file: string;
}

export interface PaginationMetaDto {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  count: number;
}
