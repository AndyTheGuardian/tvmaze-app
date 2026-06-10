import { fetchJson } from "./client";
import type {
  Episode,
  Show,
  CastMember,
  CastCredit,
  Person,
  GuestCastCredit,
} from "../types/tvmaze";

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
  return fetchJson<Episode[]>(`${API}/shows/${showId}/episodes?specials=1`);
}

export async function getShow(showId: number): Promise<Show> {
  return fetchJson<Show>(`${API}/shows/${showId}`);
}

export async function getCast(showId: number): Promise<CastMember[]> {
  return fetchJson<CastMember[]>(`${API}/shows/${showId}/cast`);
}

export async function getPerson(id: number): Promise<Person> {
  return fetchJson(`${API}/people/${id}`);
}

export async function getCastCredits(id: number): Promise<CastCredit[]> {
  return fetchJson(`${API}/people/${id}/castcredits?embed=show`);
}

export async function getGuestCastByEpisode(id: number): Promise<CastMember[]> {
  return fetchJson(`${API}/episodes/${id}/guestcast`);
}

export async function getGuestCastByPerson(
  id: number,
): Promise<GuestCastCredit[]> {
  return fetchJson(`${API}/people/${id}/guestcastcredits?embed=episode`);
}
