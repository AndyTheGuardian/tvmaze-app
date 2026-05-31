import type { Episode } from "../types/tvmaze";

export function groupEpisodesBySeason(episodes: Episode[]) {
  return episodes.reduce<Record<number, Episode[]>>((acc, episode) => {
    if (!acc[episode.season]) {
      acc[episode.season] = [];
    }

    acc[episode.season].push(episode);

    return acc;
  }, {});
}
