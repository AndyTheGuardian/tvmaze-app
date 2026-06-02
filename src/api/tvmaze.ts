import { fetchJson } from "./client";
import type { Episode, Show, CastMember } from "../types/tvmaze";

const API = "https://api.tvmaze.com";

interface SearchResult {
  score: number;
  show: Show;
}

export async function searchShows(query: string): Promise<Show[]> {
  const data = await fetchJson<SearchResult[]>(
    `${API}/search/shows?q=${encodeURIComponent(query)}`,
  );

  return data.map((item: { show: Show }) => item.show);
}

export async function getShowEpisodes(showId: number): Promise<Episode[]> {
  return fetchJson<Episode[]>(`${API}/shows/${showId}/episodes`);
}

export async function getShow(showId: number): Promise<Show> {
  return fetchJson<Show>(`${API}/shows/${showId}`);
}

export async function getCast(showId: number): Promise<CastMember[]> {
  return fetchJson<CastMember[]>(`${API}/shows/${showId}/cast`);
}
