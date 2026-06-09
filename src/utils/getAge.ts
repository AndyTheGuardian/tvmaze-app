export function getAge(
  birthday?: string | null,
  deathday?: string | null,
): number | undefined {
  if (!birthday) return undefined;

  const birth = new Date(birthday);
  const end = deathday ? new Date(deathday) : new Date();

  let age = end.getFullYear() - birth.getFullYear();

  const hadBirthdayThisYear =
    end.getMonth() > birth.getMonth() ||
    (end.getMonth() === birth.getMonth() && end.getDate() >= birth.getDate());

  if (!hadBirthdayThisYear) {
    age--;
  }

  return age;
}
