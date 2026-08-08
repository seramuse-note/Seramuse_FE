interface ParagraphProperties {
  text: string;
}

export interface Block {
  id: string;
  order_index: number;
  type: string;
  properties: ParagraphProperties;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string | 'Untitled';
  title: string;
  mood_id?: string;
  blocks: Block[] | [];
  created_at: string;
  updated_at: string;
  tags?: Tag[] | [];
  isFavorite: boolean;
}

export interface Mood {
  id: string;
  name: string;
  icon: string;
  weight: number;
  created_at: string;
  updated_at: string;
}

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

interface MoodDistributionItem {
  mood_id: string;
  name: string;
  icon: string;
  weight: number;
  count: number;
  percentage: number;
}

export interface MoodSummary {
  period: string;
  date_range: 'week' | 'month' | 'year';
  total_notes: number;
  average_mood_score: number;
  mood_distribution: MoodDistributionItem[];
}
