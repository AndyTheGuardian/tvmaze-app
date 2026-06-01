import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { FavoriteShow } from "../types/favoriteShow";
import { getFavorites } from "../utils/favorites";

export function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteShow[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  favorites.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="mx-auto max-w-5xl p-6 bg-gray-900 min-h-screen">
      <h1 className="mb-6 text-2xl font-bold">Favorite Shows</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {favorites.map((show) => (
          <Link key={show.id} to={`/show/${show.id}`}>
            <div className="overflow-hidden rounded-lg shadow border bg-gray-200">
              {show.image && (
                <img
                  src={show.image}
                  alt={show.name}
                  className="h-72 w-full object-cover"
                />
              )}

              <div className="p-4">
                <h2 className="font-semibold text-gray-950">{show.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {favorites.length === 0 && (
        <div className="rounded-lg bg-black/40 p-6 text-center">
          No favorites yet.
        </div>
      )}
    </div>
  );
}
