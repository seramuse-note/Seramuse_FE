export interface Mood {
  id: string;
  name: string;
  icon: string;
  weight: number;
  created_at: string;
  updated_at: string;
}

export type CreateMoodDto = {
  name: string;
  icon: string;
  weight: number;
};

export type UpdateMoodDto = {
  name: string;
  icon: string;
  weight: number;
};

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
