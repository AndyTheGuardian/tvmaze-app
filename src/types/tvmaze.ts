export interface Show {
  id: number;
  name: string;
  summary: string | null;
  genres: string[];
  image?: {
    medium: string;
    original: string;
  };
}

export interface Episode {
  id: number;
  name: string;
  season: number;
  number: number;
  airdate: string;
  summary?: string | null;
}
