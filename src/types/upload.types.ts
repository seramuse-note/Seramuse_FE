export interface Upload {
  id: string;
  public_id: string;
  url: string;
  secure_url: string;
  format: string;
  resource_type: 'image' | 'video' | 'raw';
  width?: number;
  height?: number;
  bytes: number;
  created_at: string;
  updated_at: string;
}

export interface UploadRequest {
  file: string;
}

export interface UploadListRequest {
  file: string[];
}
