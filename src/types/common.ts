import type { Mood } from './mood.types';
import type { Tag } from './tag.types';

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  count: number;
}

export interface Meta {
  pagination?: Pagination;
  description?: string;
}

export interface ApiResponse<T> {
  data: T[];
  meta: Meta;
}

export interface ApiResponseItem<T> {
  data: T;
  meta: Meta;
}

export type UploadFileDto = {
  file: string;
};

export type PaginationMetaRequest = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  count: number;
};

export type FilterState = {
  tags: Tag[];
  moods: Mood[];
};
