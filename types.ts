export type Mood = 'Happy' | 'Scared' | 'Confused' | 'Peaceful' | 'Excited' | 'Neutral';

export type LucidityLevel = 'None' | 'Low' | 'Medium' | 'High' | 'Fully Lucid';

export interface Dream {
  id: string;
  title: string;
  content: string;
  date: string; // ISO String
  mood: Mood;
  lucidity: LucidityLevel;
  tags: string[];
  interpretation?: string;
  isInterpreting?: boolean;
}

export type ViewState = 'JOURNAL' | 'ADD' | 'STATS' | 'REALITY_CHECK';

export interface RealityCheckStep {
  title: string;
  description: string;
  action: string;
}