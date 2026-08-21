export function hasCompletedTutorial(key: string): boolean {
  return localStorage.getItem(key) === "true";
}

export function completeTutorial(key: string): void {
  localStorage.setItem(key, "true");
}

export function resetTutorial(key: string): void {
  localStorage.removeItem(key);
}
