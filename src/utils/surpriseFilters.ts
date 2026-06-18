import type { SurpriseFilters } from "../types/tvmaze";

const STORAGE_KEY = "surpriseFilters";

export function getSurpriseFilters(): SurpriseFilters {
  const defaults: SurpriseFilters = {
    genres: [],
    decades: [],
    runningOnly: false,
    networks: [],
  };

  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return defaults;
  }

  return {
    ...defaults,
    ...JSON.parse(saved),
  };
}

export function saveSurpriseFilters(filters: SurpriseFilters) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
}
