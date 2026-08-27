import type { TutorialStep } from "./homeTutorialSteps";

export const personTutorialSteps: TutorialStep[] = [
  {
    id: "person-info",
    title: "Person Info",
    text: "This is the person page with infos about a selected cast member.",
  },
  {
    id: "person-name",
    title: "Person name",
    text: "You get all availible details about this person.",
    target: "tutorial-person-name",
  },
  {
    id: "person-favorite",
    title: "Mark as favorite",
    text: "Tap this icon to save this person to your favorites. Tap again to unsave.",
    target: "tutorial-person-favorite",
  },
  {
    id: "person-image",
    title: "Image",
    text: "If there is an image of this person available, it will be shown here. If you tap the image a larger version will be shown (depending on the the image source).",
    target: "tutorial-person-image",
    waitFor: "tutorial-image-opened",
    clickThrough: true,
  },
  {
    id: "person-imagelarge",
    title: "Image Zoom",
    text: "Tap the image again to reset it's size.",
    target: "tutorial-person-imagelarge",
    waitFor: "tutorial-image-closed",
    clickThrough: true,
  },
  {
    id: "person-details",
    title: "Personal details",
    text: "Details about the person are shown here. Depending on their availability, not all details show all infos.",
    target: "tutorial-person-details",
  },
  {
    id: "person-credits",
    title: "Credits",
    text: "All credits, including main and guest appearances, are shown here. Guest and voice appearances are marked as such. The number in brackets refers to the number of episode guest appearances. Tap on an entry to get to it's show page.",
    target: "tutorial-person-credits",
  },
  {
    id: "person-knownfor",
    title: "Known for",
    text: "In addidtion to the credits, you can browse credited shows in this section. Tap a show to get to it's page.",
    target: "tutorial-person-knownfor",
  },
  {
    id: "person-element",
    title: "Show",
    text: "Tap an element to get to it's page.",
    target: "tutorial-showcard",
  },
  {
    id: "rewatch",
    title: "Rewatch tutorial",
    text: "To rewatch this tutorial long-press on the person's name and reload page.",
    target: "tutorial-person-name",
  },
];
