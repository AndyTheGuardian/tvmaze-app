import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SquareArrowRightExit, SquareArrowRightEnter } from "lucide-react";

import type { FavoriteShow } from "../types/favoriteShow";
import { getFavorites } from "../utils/favorites";

export function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteShow[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const sortedFavorites = [...favorites].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <div className="bg-gray-900 min-h-screen min-w-screen">
      <div
        className="fixed inset-0 
        scale-105 z-0 
        bg-cover bg-top 
        pointer-events-none"
        style={{
          backgroundImage: `url(https://www.posterized.in/cdn/shop/files/50setseriesw.jpg)`,
        }}
      />
      <div className="fixed inset-0 z-10 bg-black/60 pointer-events-none" />

      <main className="relative z-10 mx-auto max-w-5xl p-3 md:p-6">
        {/* <div className="min-h-screen bg-gray-900"> */}
        <div className="mx-auto max-w-5xl p-3 md:p-6 bg-black/50 rounded-lg">
          <div className="flex gap-4">
            <h1 className="mb-6 text-2xl font-bold flex-1">Favorite Shows</h1>
            <button
              onClick={async () => {
                const data = localStorage.getItem("favorite-shows");
                navigator.clipboard.writeText(data ?? "");

                alert("Favorites copied!");
              }}
              className="-mt-6"
            >
              <SquareArrowRightExit size={18} />
            </button>
            <p className="text-sm text-gray-500/80 mt-1.25">|</p>
            <button
              onClick={async () => {
                const data = await navigator.clipboard.readText();

                localStorage.setItem("favorite-shows", data);

                location.reload();
              }}
              className="-mt-6"
            >
              <SquareArrowRightEnter size={18} />
            </button>
          </div>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {sortedFavorites.map((show) => (
              <Link key={show.id} to={`/show/${show.id}`}>
                <div className="overflow-hidden rounded-lg shadow bg-gray-200/70">
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
      </main>
    </div>
  );
}
