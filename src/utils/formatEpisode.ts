export function formatEpisode(season: number, episode: number | null) {
  const epText = episode
    ? `E${episode?.toString().padStart(2, "0")}`
    : "-Special";
  return `S${season.toString().padStart(2, "0")}${epText}`;
}
