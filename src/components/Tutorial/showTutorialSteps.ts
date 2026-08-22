import type { TutorialStep } from "./homeTutorialSteps";

export const showTutorialSteps: TutorialStep[] = [
  {
    id: "show-header",
    title: "Show Information",
    text: "Here you can see information about the show, genres, rating and summary.",
    target: "tutorial-show-header",
  },
  {
    id: "favorite",
    title: "Favorites",
    text: "Use the heart button to add or remove the show from your favorites.",
    target: "tutorial-show-favorite",
  },
  {
    id: "season-picker",
    title: "Seasons",
    text: "Switch between seasons here.",
    target: "tutorial-season-picker",
  },
  {
    id: "episode-list",
    title: "Episodes",
    text: "Tap an episode to open detailed information.",
    target: "tutorial-episode-list",
  },
  {
    id: "search-episodes",
    title: "Search in Episodes",
    text: "Search in episode summaries for specific terms.",
    target: "tutorial-search-episodes",
  },
  {
    id: "cast",
    title: "Show Cast",
    text: "See the main cast.",
    target: "tutorial-show-cast",
  },
  {
    id: "show-image",
    title: "Show Poster",
    text: "Tap on the show's title to see the promotional poster.",
    target: "tutorial-title",
  },
  {
    id: "rewatch",
    title: "Rewatch tutorial",
    text: "To rewatch this tutorial long-press on the title and reload page.",
    target: "tutorial-title",
  },
  {
    id: "episode",
    title: "Episodes",
    text: "Tap an episode to see details, images, guest cast and more.",
    target: "tutorial-episode-card",
    waitFor: "episode-drawer-open",
    clickThrough: true,
  },
  // {
  //   id: "episode-info",
  //   title: "Episode information",
  //   text: "Here you can see the summary, runtime and other details.",
  //   target: "tutorial-drawer-info",
  //   waitFor: "episode-drawer-open",
  // },
  // {
  //   id: "episode-image",
  //   title: "Episode image",
  //   text: "A screenshot from the episode is presented here. Tap it to see a larger version.",
  //   target: "tutorial-drawer-image",
  // },
  // {
  //   id: "cast",
  //   title: "Guest Cast",
  //   text: "Scroll down to see actors appearing in this episode.",
  //   target: "tutorial-drawer-cast",
  // },
];
