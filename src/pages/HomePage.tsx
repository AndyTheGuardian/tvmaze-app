import { useShows } from "../hooks/useShows";
import { SearchBar } from "../components/SearchBar";
import { ShowCard } from "../components/ShowCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { Dices } from "lucide-react";
import { useShowCatalog } from "../hooks/useShowCatalog";
import {
  getSurpriseFilters,
  saveSurpriseFilters,
} from "../utils/surpriseFilters";
import { filterShows } from "../utils/filterShows";
import { getRandomShow } from "../utils/getRandomShow";
import { usePeopleSearch } from "../hooks/usePeopleSearch";
import { MediaCard } from "../components/MediaCard";
import { useFavoriteShows } from "../hooks/useFavoriteShows";
import { SurpriseMeFilter } from "../components/SurpriseMeFilter";
import { UpcomingEpisodes } from "../components/UpcomingEpisodes";

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("q") ?? "";

  const [filters, setFilters] = useState(getSurpriseFilters);

  const longPressTimer = useRef<number | null>(null);
  const longPressTriggered = useRef(false);

  const [showSurpriseSettings, setShowSurpriseSettings] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearchParams(value ? { q: value } : {});
  };

  const { data: shows = [], isLoading: showsLoading } = useShows(search);

  const { data: people = [], isLoading: peopleLoading } =
    usePeopleSearch(search);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { data: catalog = [] } = useShowCatalog();

  const favoriteShows = useFavoriteShows();

  const handleSurpriseMe = async () => {
    setLoading(true);

    if (
      !filters.decades &&
      !filters.genres &&
      !filters.networks &&
      !filters.runningOnly
    ) {
      try {
        const show = await getRandomShow();

        navigate(`/show/${show.id}`);
      } finally {
        setLoading(false);
        return;
      }
    }
    const candidates = filterShows(catalog, filters);

    if (candidates.length === 0) {
      alert("No matching shows found.");
      setLoading(false);
      return;
    }

    const random = candidates[Math.floor(Math.random() * candidates.length)];

    navigate(`/show/${random.id}`);

    setLoading(false);
  };

  const genres = useMemo(
    () => Array.from(new Set(catalog.flatMap((show) => show.genres))).sort(),
    [catalog],
  );

  const networkCounts = useMemo(() => {
    const counts = new Map<string, number>();

    catalog.forEach((show) => {
      const provider = show.network;

      if (!provider) return;

      counts.set(provider, (counts.get(provider) ?? 0) + 1);
    });

    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [catalog]);

  const webChannelCounts = useMemo(() => {
    const counts = new Map<string, number>();

    catalog.forEach((show) => {
      const provider = show.webChannel;

      if (!provider) return;

      counts.set(provider, (counts.get(provider) ?? 0) + 1);
    });

    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [catalog]);

  const runningFavorites = useMemo(() => {
    return favoriteShows
      .filter((query) => query.data)
      .map((query) => query.data)
      .filter((show) => show.status === "Running")
      .sort((a, b) => {
        const aDate = a._embedded?.nextepisode?.airdate;
        const bDate = b._embedded?.nextepisode?.airdate;

        if (!aDate) return 1;
        if (!bDate) return -1;

        return new Date(aDate).getTime() - new Date(bDate).getTime();
      });
  }, [favoriteShows]);

  useEffect(() => {
    saveSurpriseFilters(filters);
  }, [filters]);

  function startLongPress() {
    longPressTriggered.current = false;

    longPressTimer.current = window.setTimeout(() => {
      longPressTriggered.current = true;
      setShowSurpriseSettings(true);
    }, 500);
  }

  function cancelLongPress() {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }

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
        <div
          className="
          mx-auto max-w-5xl 
          p-3 md:p-6 
          bg-black/50 rounded-lg"
        >
          <div className="mb-3 md:mb-6  flex">
            <h1
              className="
              flex-1 
              text-2xl font-bold"
            >
              Episode Guide
            </h1>
            <button
              className="
                mt-2 flex gap-2 
                text-sm opacity-50 
                cursor-pointer
                select-none
                "
              onMouseDown={startLongPress}
              onMouseUp={cancelLongPress}
              onMouseLeave={cancelLongPress}
              onTouchStart={startLongPress}
              onTouchEnd={cancelLongPress}
              onClick={() => {
                if (longPressTriggered.current) {
                  longPressTriggered.current = false;
                  return;
                }
                handleSurpriseMe();
              }}
              disabled={loading}
            >
              {loading ? "Finding something good..." : "Surprise me!"}
              <Dices size={18} />
            </button>
          </div>
          {showSurpriseSettings && (
            <SurpriseMeFilter
              handleSurpriseMe={handleSurpriseMe}
              setShowSurpriseSettings={setShowSurpriseSettings}
              filters={filters}
              setFilters={setFilters}
              webChannelCounts={webChannelCounts}
              networkCounts={networkCounts}
              genres={genres}
            />
          )}
          <SearchBar
            value={search}
            onChange={handleSearchChange}
            placeholder="Search TV shows..."
            active={true}
          />

          {(showsLoading || peopleLoading) && (
            <p className="mt-4">Loading...</p>
          )}

          {shows.length === 0 &&
            people.length === 0 &&
            runningFavorites.length > 0 && (
              <UpcomingEpisodes runningFavorites={runningFavorites} />
            )}

          {search.trim() && shows.length > 0 && (
            <>
              <h2
                className="
                    mt-3 mb-2 
                    text-lg font-semibold 
                    text-gray-100"
              >
                Shows
              </h2>
              <div
                className="
                  md:mt-3 
                  grid gap-3 
                  grid-cols-2 md:grid-cols-4"
              >
                {shows.map((show) => (
                  <ShowCard
                    key={show.id}
                    animate={true}
                    show={{
                      id: show.id,
                      name: show.name,
                      image: show.image?.medium,
                    }}
                  />
                ))}
              </div>
            </>
          )}
          {search.trim() && people.length > 0 && (
            <>
              <h2
                className="
                  mt-3 mb-2 
                  text-lg font-semibold 
                  text-gray-100"
              >
                Cast
              </h2>

              <div
                className="
                  grid grid-cols-2 
                  md:grid-cols-4 
                  gap-3"
              >
                {people.map(({ person }) => (
                  <MediaCard
                    type="person"
                    item={{
                      id: person.id,
                      name: person.name,
                      image: person.image?.medium,
                    }}
                    to={`/person/${person.id}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
