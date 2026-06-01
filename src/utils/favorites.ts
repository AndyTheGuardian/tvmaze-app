import type { FavoriteShow } from "../types/favoriteShow";

const STORAGE_KEY = "favorite-shows";

export function getFavorites(): FavoriteShow[] {
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

export function saveFavorites(favorites: FavoriteShow[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function isFavorite(showId: number) {
  return getFavorites().some((show) => show.id === showId);
}

export function toggleFavorite(favorite: FavoriteShow) {
  const favorites = getFavorites();

  const exists = favorites.some((show) => show.id === favorite.id);

  if (exists) {
    saveFavorites(favorites.filter((show) => show.id !== favorite.id));
  } else {
    saveFavorites([...favorites, favorite]);
  }
}
