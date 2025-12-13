export interface AppData {
  id: string;
  name: string;
  developer: string;
  category: string;
  os: 'Windows' | 'Mac' | 'Android' | 'iOS' | 'Web';
  license: 'Free' | 'Trial' | 'Paid' | 'Open Source';
  version: string;
  downloads: string;
  rating: number; // 0-10
  description: string;
  iconUrl?: string;
}

export interface AIReviewData {
  summary: string;
  pros: string[];
  cons: string[];
  safetyScore: number; // 0-100
  alternativeApps: string[];
  technicalOpinion: string;
}

export enum ViewState {
  HOME = 'HOME',
  DETAILS = 'DETAILS',
  SEARCH = 'SEARCH'
}
