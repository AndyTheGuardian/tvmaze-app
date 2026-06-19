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
    original?: string;
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

export interface CastMember {
  person: {
    id: number;
    name: string;
    birthday?: string;
    deathday?: string;
    gender?: string;
    country?: {
      name: string;
    };
    image?: {
      medium: string;
      original: string;
    };
  };
  character: {
    id: number;
    name: string;
  };
}

export type Person = CastMember["person"];

export interface CastCredit {
  self: boolean;
  voice: boolean;
  character: {
    name: string;
  };
  _links: {
    character: {
      name: string;
    };
  };
  _embedded: {
    show: {
      id: number;
      name: string;

      image?: {
        medium: string;
        original?: string;
      };
    };
  };
}

export type PersonCredit = {
  self: boolean;
  voice: boolean;
  show: {
    id: number;
    name: string;
    image?: {
      medium: string;
      original?: string;
    };
  };
  character: string;
  guest: boolean;
};

export interface GuestCastCredit {
  self: boolean;
  voice: boolean;
  _links: {
    episode: { href: string; name?: string };
    character: { href: string; name?: string };
  };
  _embedded: {
    episode: {
      _links?: {
        show?: { href: string };
      } | null;
    };
  };
}

//export type ShowCardData = Pick<Show, "id" | "name" | "image">;

export interface CardData {
  id: number;
  name: string;
  image?: string;
}

export type Favorite = {
  id: number;
  name: string;
  image?: string;
};

export interface TvMazeShow {
  id: number;
  name: string;
  genres: string[];
  premiered?: string;
  status: string;
  network?: {
    name: string;
  };
  webChannel?: {
    name: string;
  };
}

export interface CatalogShow {
  id: number;
  name: string;
  genres: string[];
  premiered?: string;
  status: string;
  network?: string;
  webChannel?: string;
}

export interface SurpriseFilters {
  genres: string[];
  decades: number[];
  runningOnly: boolean;
  networks: string[];
}
