import type { TutorialStep } from "./homeTutorialSteps";

export const drawerTutorialSteps: TutorialStep[] = [
  {
    id: "episode-info",
    title: "Episode information",
    text: "Here you can see the episode's title, season and episode numbers, rating, runtime, first airdate and a summary.",
    target: "tutorial-drawer-info",
  },
  {
    id: "episode-image",
    title: "Episode image",
    text: "A screenshot from the episode is presented here. Tap it to see a larger version.",
    target: "tutorial-drawer-image",
  },
  {
    id: "cast",
    title: "Guest Cast",
    text: "Shows actors appearing in this episode. Tap on a name to get to this persons page.",
    target: "tutorial-drawer-cast",
  },
];
