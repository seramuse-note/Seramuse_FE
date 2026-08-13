export interface Tag {
  id: string;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export type CreateTagDto = {
  name: string;
  color: string;
};

export type UpdateTagDto = {
  name: string;
  color: string;
};
