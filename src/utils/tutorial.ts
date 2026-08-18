const TUTORIAL_KEY = "episodeGuideTutorialCompleted";

export function hasCompletedTutorial(): boolean {
  return localStorage.getItem(TUTORIAL_KEY) === "true";
}

export function completeTutorial(): void {
  localStorage.setItem(TUTORIAL_KEY, "true");
}

export function resetTutorial(): void {
  localStorage.removeItem(TUTORIAL_KEY);
}
