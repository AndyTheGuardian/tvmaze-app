export function getYear(date: string | undefined) {
  if (!date) return "";

  return date.slice(0, 4);
}
