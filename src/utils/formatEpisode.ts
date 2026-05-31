export function formatEpisode(season: number, episode: number) {
  return `S${season.toString().padStart(2, "0")}E${episode.toString().padStart(2, "0")}`;
}
