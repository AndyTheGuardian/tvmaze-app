export function htmlToText(html?: string | null): string {
  if (!html) return "";

  const doc = new DOMParser().parseFromString(html, "text/html");

  return doc.body.textContent ?? "";
}
