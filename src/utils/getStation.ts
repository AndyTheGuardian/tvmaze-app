export function getStation(
  network?: string,
  webChannel?: string,
): string | undefined {
  return network ?? webChannel ?? "n/a";
}
