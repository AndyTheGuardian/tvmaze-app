export interface TutorialStep {
  id: string;
  title: string;
  text: string;
  target?: string;
  waitFor?: string;

  // Allows the highlighted element to receive clicks
  clickThrough?: boolean;

  // Keeps the tutorial UI clickable
  // interactive?: boolean;
}

export const homeTutorialSteps: TutorialStep[] = [
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
  },
  {
    id: "surprise-settings",
    title: "Surprise me!",
    text: "Can't decide what to watch? Let the dice choose a show for you.",
    target: "tutorial-surprise",
  },
  {
    id: "surprise-settings",
    title: "Surprise me filters",
    text: "Long-press the Surprise me button to choose preferences such as genres, decades, networks or streaming services.",
    target: "tutorial-surprise",
  },
  // {
  //   id: "nav",
  //   title: "Navigation",
  //   text: "Switch between this page and your favorites page with these elements.",
  //   target: "tutorial-nav",
  // },
  {
    id: "shows",
    title: "Shows",
    text: "You can always get back to this page by clicking on this element.",
    target: "tutorial-shows",
  },
  {
    id: "favorites",
    title: "Favorites",
    text: "Use the heart to save shows you want to keep track of. You'll find these shows here.",
    target: "tutorial-favorites",
  },
  {
    id: "upcoming",
    title: "Upcoming episodes",
    text: "Your running favorite shows can appear here with their next episode and the number of days until it airs.",
    target: "tutorial-upcoming",
  },
  {
    id: "upcoming-header",
    title: "Switch to Latest Episodes",
    text: "Tap on Upcoming Episodes to switch to Latest episodes.",
    target: "tutorial-upcoming-latest",
    waitFor: "tutorial-latest-on",
    clickThrough: true,
  },
  {
    id: "lastest",
    title: "Latest episodes",
    text: "Latest Episodes lists the most recently aired episodes of your favorite running shows.",
    target: "tutorial-upcoming",
  },
  {
    id: "lastest-header",
    title: "Switch to Upcoming Episodes",
    text: "Tap on Latest Episodes to switch back to Upcoming Episodes.",
    target: "tutorial-upcoming-latest",
    waitFor: "tutorial-latest-off",
    clickThrough: true,
  },
  {
    id: "rewatch",
    title: "Rewatch tutorial",
    text: "To rewatch this tutorial long-press on Episode Guide and reload page.",
    target: "tutorial-rewatch",
  },
];
