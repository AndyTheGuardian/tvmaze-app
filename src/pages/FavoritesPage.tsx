import { useEffect, useState } from "react";
import { SquareArrowRightExit, SquareArrowRightEnter } from "lucide-react";

import { getFavoriteShows, getFavoritePersons } from "../utils/favorites";
import type { CardData } from "../types/tvmaze";
import { MediaCard } from "../components/MediaCard";
import { useSearchParams } from "react-router-dom";

export function FavoritesPage() {
  const [favoriteShows, setFavoriteShows] = useState<CardData[]>([]);
  const [favoritePersons, setFavoritePersons] = useState<CardData[]>([]);

  useEffect(() => {
    setFavoriteShows(getFavoriteShows);
    setFavoritePersons(getFavoritePersons);
  }, []);

  const sortedFavoriteShows = [...favoriteShows].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const sortedFavoritePersons = [...favoritePersons].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") ?? "shows";

  const copyFavs = activeTab === "shows" ? "favoriteShows" : "favoritePersons";

  const favorites =
    activeTab === "shows" ? sortedFavoriteShows : sortedFavoritePersons;

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
      <div
        className="fixed inset-0 z-10 
      bg-black/60 pointer-events-none"
      />

      <main
        className="
        relative z-10 
        mx-auto max-w-5xl 
        p-3 md:p-6"
      >
        {/* <div className="min-h-screen bg-gray-900"> */}
        <div
          className="
          mx-auto max-w-5xl 
          p-3 md:p-6 
          bg-black/50 rounded-lg"
        >
          <div className="flex gap-4">
            <h1
              className="
              mb-3 md:mb-6 flex-1
              text-2xl font-bold"
            >
              Favorites
            </h1>
            <button
              onClick={async () => {
                const data = localStorage.getItem(copyFavs);
                navigator.clipboard.writeText(data ?? "");

                alert(`Favorite ${copyFavs.slice(8, copyFavs.length)} copied!`);
              }}
              className="-mt-3.5 md:-mt-6 opacity-50"
            >
              <SquareArrowRightExit size={17} />
            </button>
            <p className="text-sm text-gray-500/80 mt-1.25">|</p>
            <button
              onClick={async () => {
                const data = await navigator.clipboard.readText();
                localStorage.setItem(copyFavs, data);
                location.reload();
              }}
              className="-mt-3.25 md:-mt-6 opacity-50"
            >
              <SquareArrowRightEnter size={18} />
            </button>
          </div>
          <div className="mb-4 flex gap-4 text-sm text-gray-950">
            <button
              onClick={() => setSearchParams({ tab: "shows" })}
              className={`flex-1 rounded px-2 py-1 ${
                activeTab === "shows"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200/70"
              }`}
            >
              <div className="flex-1 justify-center">
                <span>Shows</span>
                <span className="opacity-50">
                  {` (${sortedFavoriteShows.length})`}
                </span>
              </div>
            </button>
            <button
              onClick={() => setSearchParams({ tab: "persons" })}
              className={`flex-1 flex rounded px-2 py-1 ${
                activeTab === "persons"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200/70"
              }`}
            >
              <div className="flex-1 justify-center">
                <span>Cast</span>
                <span className="opacity-50">
                  {` (${sortedFavoritePersons.length})`}
                </span>
              </div>
            </button>
          </div>

          {favorites.length === 0 ? (
            <div className="rounded-lg bg-black/40 p-6 text-center">
              No favorites yet.
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
              {favorites.map((favorite) => (
                <MediaCard
                  item={favorite}
                  to={
                    activeTab === "shows"
                      ? `/show/${favorite.id}`
                      : `/person/${favorite.id}`
                  }
                  type={activeTab === "shows" ? "show" : "person"}
                  animate
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
