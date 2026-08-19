export interface Mood {
  id: string;
  name: string;
  icon: string;
  weight: number;
  created_at: string;
  updated_at: string;
}

export interface GetMoodsRequest {
  page: number;
  limit: number;
}

export interface CreateMoodRequest {
  name: string;
  icon: string;
  weight: number;
}

export interface UpdateMoodRequest {
  name?: string;
  icon?: string;
  weight?: number;
}
