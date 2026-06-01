export interface Show {
  id: number;
  name: string;
  summary: string | null;
  genres: string[];
  status: string;
  premiered: string;
  ended: string;
  schedule: {
    days: string[];
  };
  rating?: {
    average: number;
  };
  network?: {
    name: string;
  };
  webChannel?: {
    name: string;
  };
  externals: {
    imdb?: string;
  };
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
  airtime: string;
  runtime: number;
  rating?: {
    average: number;
  };
  summary?: string | null;

  image?: {
    medium: string;
    original: string;
  };
}
