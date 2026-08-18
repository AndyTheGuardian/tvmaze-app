export interface TutorialStep {
  id: string;
  title: string;
  text: string;
  target?: string;
  position?: "top" | "bottom" | "left" | "right";
}

export const tutorialSteps: TutorialStep[] = [
  {
    id: "welcome",
    title: "Welcome!",
    text: "Welcome to your TV guide. Let's take a quick tour of the most important features.",
  },
  {
    id: "search",
    title: "Search",
    text: "Search for your favorite shows or cast members. You can start typing here.",
    target: "tutorial-search",
    position: "bottom",
  },
  {
    id: "surprise-settings",
    title: "Surprise me!",
    text: "Can't decide what to watch? Let the dice choose a show for you.",
    target: "tutorial-surprise",
    position: "bottom",
  },
  {
    id: "surprise-settings",
    title: "Surprise me filters",
    text: "Long-press the Surprise me button to choose preferences such as genres, decades, networks or streaming services.",
    target: "tutorial-surprise",
    position: "bottom",
  },
  {
    id: "nav",
    title: "Navigation",
    text: "Switch between this page and your favorites page with these elements.",
    target: "tutorial-nav",
    position: "top",
  },
  {
    id: "shows",
    title: "Shows",
    text: "You can always get back to this page by clicking on this element.",
    target: "tutorial-shows",
    position: "top",
  },
  {
    id: "favorites",
    title: "Favorites",
    text: "Use the heart to save shows you want to keep track of.",
    target: "tutorial-favorites",
    position: "top",
  },
  {
    id: "upcoming",
    title: "Upcoming episodes",
    text: "Your running favorite shows can appear here with their next episode and the number of days until it airs.",
    target: "tutorial-upcoming",
    position: "top",
  },
  {
    id: "rewatch",
    title: "Rewatch tutorial",
    text: "To rewatch this tutorial long-press on Episode Guide and reload page.",
    target: "tutorial-rewatch",
    position: "top",
  },
];
