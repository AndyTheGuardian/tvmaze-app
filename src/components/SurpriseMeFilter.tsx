import { X } from "lucide-react";
import type { SurpriseFilters } from "../types/tvmaze";
import Checkbox from "./CheckBox";

interface Props {
  handleSurpriseMe: () => void;
  setShowSurpriseSettings: (v: boolean) => void;
  filters: SurpriseFilters;
  setFilters: (f: SurpriseFilters) => void;
  webChannelCounts: [string, number][];
  networkCounts: [string, number][];
  genres: string[];
}

export function SurpriseMeFilter({
  handleSurpriseMe,
  setShowSurpriseSettings,
  filters,
  setFilters,
  webChannelCounts,
  networkCounts,
  genres,
}: Props) {
  return (
    <>
      <div
        className="
                  fixed inset-0
                  z-10000
                bg-black/50
                  flex items-center justify-center
                "
      >
        <div
          className="
                    p-3 m-3 mb-16
                    w-full max-w-xl
                  bg-black/30 
                    backdrop-blur-sm 
                    rounded-lg 
                  "
        >
          <div className="select-none">
            <div className="flex gap-1 mb-3">
              <span
                className="
                        font-semibold 
                        text-xl
                        shadow-sm"
              >
                Surprise me
              </span>
              <span
                className="
                        flex-1 
                        font-semibold 
                        text-xl italic
                        shadow-sm"
              >
                with Filters!
              </span>
              <button
                className="
                          rounded 
                          px-2 py-1 mr-3
                          bg-blue-600 
                          text-white 
                        "
                onClick={(e) => {
                  e.stopPropagation();
                  handleSurpriseMe();
                }}
              >
                Go!
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSurpriseSettings(false);
                }}
              >
                <X size={18} />
              </button>
            </div>
            <Checkbox
              label="Running shows only"
              boxposition="items-center"
              checked={filters.runningOnly}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  runningOnly: e.target.checked,
                })
              }
            />
            <div
              className="  
                        overflow-y-auto 
                        pr-2
                        max-h-[80vh]
                        "
            >
              <h3 className="mb-1 font-semibold">Decades</h3>
              <div className="mb-3 not-odd:flex flex-wrap gap-2">
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
                <div className="mb-3 flex flex-wrap gap-2">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
