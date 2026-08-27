import type { TutorialStep } from "./homeTutorialSteps";

export const favoritesTutorialSteps: TutorialStep[] = [
  {
    id: "favorites-info",
    title: "Favorites",
    text: "This is your favorites page. Every show or person, that you mark as your favorite, will be listed here.",
  },
  {
    id: "favorites-shows",
    title: "Shows",
    text: "Tap Shows to see your favorite shows. This is selected by default. The number in brackets shows the total of favorites in this section.",
    target: "tutorial-favorites-shows",
  },
  {
    id: "favorites-cast",
    title: "Cast",
    text: "Tap Cast to see your favorite cast. The number in brackets shows the total of favorites in this section.",
    target: "tutorial-favorites-cast",
  },
  {
    id: "favorites-copy",
    title: "Copy to clipboard",
    text: "This feature is for copying your favorites from one browser to another, since each browser has it`s own storage. Tap this icon to copy your favorites to the clipboard.",
    target: "tutorial-favorites-copy",
  },
  {
    id: "favorites-paste",
    title: "Paste from clipboard",
    text: "Tap this icon to paste your favorites from the clipboard.",
    target: "tutorial-favorites-paste",
  },
  {
    id: "favorites-elements",
    title: "Favorite list",
    text: "All your favorites are listed here. Depending on your selection above either shows or cast.",
    target: "tutorial-favorites-elements",
  },
  {
    id: "favorites-element",
    title: "Favorite element",
    text: "Tap an element to get to it's page.",
    target: "tutorial-mediacard",
  },
  {
    id: "rewatch",
    title: "Rewatch tutorial",
    text: "To rewatch this tutorial long-press on Favorites and reload page.",
    target: "tutorial-rewatch",
  },
];
