import type { Episode } from "../types/tvmaze";

export function findEpisodes(episodes: Episode[], search: string) {
  const term = search.trim().toLowerCase();

  if (!term) {
    return episodes;
  }

  return episodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(term) ||
      episode.summary?.toLowerCase().includes(term),
  );
}
