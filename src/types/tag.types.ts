export interface Tag {
  id: string;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface TagRequest {
  name: string;
  color: string;
}

export interface GetTagsRequest {
  page?: number;
  limit?: number;
}
