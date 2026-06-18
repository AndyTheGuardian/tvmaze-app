import { useShows } from "../hooks/useShows";
import { SearchBar } from "../components/SearchBar";
import { ShowCard } from "../components/ShowCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMemo, useRef, useState } from "react";
// import { getRandomShow } from "../utils/getRandomShow";
import { Dices } from "lucide-react";
import { useShowCatalog } from "../hooks/useShowCatalog";
import {
  getSurpriseFilters,
  saveSurpriseFilters,
} from "../utils/surpriseFilters";
import { filterShows } from "../utils/filterShows";

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

  const { data = [], isLoading } = useShows(search);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { data: catalog = [] } = useShowCatalog();

  const handleSurpriseMe = async () => {
    setLoading(true);

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

  function startLongPress() {
    longPressTriggered.current = false;

    longPressTimer.current = window.setTimeout(() => {
      longPressTriggered.current = true;
      setShowSurpriseSettings(true);
      // longPressTimer.current = null;
    }, 500);
  }

  function cancelLongPress() {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }
  // console.log(
  //   catalog
  //     .flatMap((show) => [show.network, show.webChannel])
  //     .filter(Boolean)
  //     .sort(),
  // );

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
              className="mt-2 flex gap-2 text-sm opacity-50 cursor-pointer"
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
            <div
              className="
              mb-3
              rounded-lgbg-gray-200/60
              backdrop-blur-sm
              "
            >
              <div className="mb-3">
                <h2 className="mb-1 font-semibold text-lg opacity-60">
                  Suprise me with Filters!
                </h2>
                <h3 className="mb-1 font-semibold">Decades</h3>
                <div className="flex flex-wrap gap-2">
                  {[1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020].map(
                    (decade) => (
                      <button
                        key={decade}
                        onClick={() => {
                          const selected = filters.decades.includes(decade);

                          const nextDecades = selected
                            ? filters.decades.filter((d) => d !== decade)
                            : [...filters.decades, decade];

                          const nextFilters = {
                            ...filters,
                            decades: nextDecades,
                          };
                          setFilters(nextFilters);
                          saveSurpriseFilters(nextFilters);
                        }}
                        className={`
                          rounded
                          px-3 py-1
                          ${
                            filters.decades.includes(decade)
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200/60 backdrop-blur-sm text-gray-950"
                          }                          
                          `}
                      >
                        {decade}s
                      </button>
                    ),
                  )}
                </div>
              </div>
              <div className="mb-3">
                <h3 className="mb-1 font-semibold">Streaming</h3>
                <div className="mb-3 flex flex-wrap gap-2">
                  {webChannelCounts.slice(0, 30).map(([network, count]) => (
                    <button
                      key={network}
                      onClick={() => {
                        const selected = filters.networks.includes(network);

                        const nextNetworks = selected
                          ? filters.networks.filter((n) => n !== network)
                          : [...filters.networks, network];

                        const nextFilters = {
                          ...filters,
                          networks: nextNetworks,
                        };
                        setFilters(nextFilters);
                        saveSurpriseFilters(nextFilters);
                      }}
                      className={`
                          rounded
                          px-3 py-1
                          ${
                            filters.networks &&
                            filters.networks.includes(network)
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200/60 backdrop-blur-sm text-gray-950"
                          }                          
                          `}
                    >
                      <span>{network} </span>
                      <span className="italic text-sm opacity-40">
                        ({count})
                      </span>
                    </button>
                  ))}
                </div>
                <h3 className="mb-1 font-semibold">Networks</h3>
                <div className="flex flex-wrap gap-2">
                  {networkCounts.slice(0, 30).map(([network, count]) => (
                    <button
                      key={network}
                      onClick={() => {
                        const selected = filters.networks.includes(network);

                        const nextNetworks = selected
                          ? filters.networks.filter((n) => n !== network)
                          : [...filters.networks, network];

                        const nextFilters = {
                          ...filters,
                          networks: nextNetworks,
                        };
                        setFilters(nextFilters);
                        saveSurpriseFilters(nextFilters);
                      }}
                      className={`
                          rounded
                          px-3 py-1
                          ${
                            filters.networks &&
                            filters.networks.includes(network)
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200/60 backdrop-blur-sm text-gray-950"
                          }                          
                          `}
                    >
                      <span>{network} </span>
                      <span className="italic text-sm opacity-50">
                        ({count})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <h3 className="mb-1 font-semibold">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => {
                        const selected = filters.genres.includes(genre);

                        const nextGenres = selected
                          ? filters.genres.filter((g) => g !== genre)
                          : [...filters.genres, genre];

                        const nextFilters = {
                          ...filters,
                          genres: nextGenres,
                        };
                        setFilters(nextFilters);
                        saveSurpriseFilters(nextFilters);
                      }}
                      className={`
                          rounded
                          px-3 py-1
                          ${
                            filters.genres.includes(genre)
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200/60 backdrop-blur-sm text-gray-950"
                          }                          
                          `}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.runningOnly}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      runningOnly: e.target.checked,
                    })
                  }
                />
                Running only
              </label>
            </div>
          )}
          <SearchBar
            value={search}
            onChange={handleSearchChange}
            placeholder="Search TV shows..."
            active={true}
          />

          {isLoading && <p className="mt-4">Loading...</p>}

          <div
            className="
            md:mt-3 grid gap-4 grid-cols-2 md:grid-cols-4"
          >
            {data.map((show) => (
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
        </div>
      </main>
    </div>
  );
}
