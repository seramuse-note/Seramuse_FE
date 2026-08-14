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

export type PaginationMetaDto = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  count: number;
};

interface TagData {
  id: string;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
}

interface MoodData {
  id: string;
  name: string;
  icon: string;
  weight: number;
  created_at: string;
  updated_at: string;
}

export interface FilterPopoverProps {
  tagOptions: TagData[];
  moodOptions: MoodData[];
  initialTags?: string[];
  initialMoods?: string[];
  onClose: () => void;
  onApply: (_data: { tags: string[]; moods: string[] }) => void;
}
