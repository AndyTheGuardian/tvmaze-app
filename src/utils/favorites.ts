import type { Favorite } from "../types/tvmaze";

const STORAGE_KEY = "favorite-shows";
const SHOWS_KEY = "favoriteShows";
const PERSONS_KEY = "favoritePersons";

function getFavorites(key: string): Favorite[] {
  const raw = localStorage.getItem(key);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveFavorites(key: string, favorites: Favorite[]) {
  localStorage.setItem(key, JSON.stringify(favorites));
}

function isFavorite(key: string, id: number) {
  return getFavorites(key).some((f) => f.id === id);
}

function toggleFavorite(key: string, favorite: Favorite) {
  const favorites = getFavorites(key);

  const exists = favorites.some((f) => f.id === favorite.id);

  if (exists) {
    saveFavorites(
      key,
      favorites.filter((f) => f.id !== favorite.id),
    );
  } else {
    saveFavorites(key, [...favorites, favorite]);
  }
}

export const getFavoriteShows = () => getFavorites(SHOWS_KEY);

export const toggleFavoriteShow = (show: Favorite) =>
  toggleFavorite(SHOWS_KEY, show);

export const isFavoriteShow = (id: number) => isFavorite(SHOWS_KEY, id);

export const getFavoritePersons = () => getFavorites(PERSONS_KEY);

export const toggleFavoritePerson = (person: Favorite) =>
  toggleFavorite(PERSONS_KEY, person);

export const isFavoritePerson = (id: number) => isFavorite(PERSONS_KEY, id);

export function migrateFavorites() {
  const oldFavorites = localStorage.getItem(STORAGE_KEY);

  if (oldFavorites && !localStorage.getItem(SHOWS_KEY)) {
    localStorage.setItem(SHOWS_KEY, oldFavorites);
  }
}
