export function emitTutorialEvent(event: string) {
  window.dispatchEvent(new CustomEvent(event));
}
