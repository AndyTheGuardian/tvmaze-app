import type { ShowCardData } from "../types/tvmaze";

const STORAGE_KEY = "favorite-shows";

export function getFavorites(): ShowCardData[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveFavorites(favorites: ShowCardData[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function isFavorite(showId: number) {
  return getFavorites().some((show) => show.id === showId);
}

export function toggleFavorite(favorite: ShowCardData) {
  const favorites = getFavorites();

  const exists = favorites.some((show) => show.id === favorite.id);

  if (exists) {
    saveFavorites(favorites.filter((show) => show.id !== favorite.id));
  } else {
    saveFavorites([...favorites, favorite]);
  }
}
