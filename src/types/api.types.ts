export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  count: number;
}

export interface Meta {
  pagination?: Pagination;
}

export interface ApiResponse<T> {
  data: T[];
  meta: Meta;
}
export interface ApiResponseItemNote<T> {
  data: T;
  meta: Meta;
}
