export function getRelativeDay(dateString: string) {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const target = new Date(dateString);

  target.setHours(0, 0, 0, 0);

  const days = Math.round(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (days === 0) return "Today";

  if (days === 1) return "Tomorrow";

  if (days < 7) return `In ${days} days`;

  if (days < 14) return "Next week";

  if (days < 30) return `In ${Math.floor(days / 7)} weeks`;

  return target.toLocaleDateString();
}
