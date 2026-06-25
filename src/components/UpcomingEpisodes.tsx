import { useState } from "react";
import { formatEpisode } from "../utils/formatEpisode";
import { getRelativeDay } from "../utils/getRelativeDay";
import { Link } from "react-router-dom";

interface Props {
  runningFavorites: any[];
}

export function UpcomingEpisodes({ runningFavorites }: Props) {
  const [showNext, setShowNext] = useState(true);
  return (
    <>
      <h2
        className="my-2 text-lg font-bold cursor-pointer"
        onClick={() => setShowNext(!showNext)}
      >
        {showNext ? "Upcoming Episodes" : "Latest Episodes"}
      </h2>

      <div className="grid gap-3 mb-3">
        {runningFavorites.map((show) => {
          const nextEpisode = show._embedded?.nextepisode;
          const previousEpisode = show._embedded?.previousepisode;

          return (
            <Link
              key={show.id}
              to={`/show/${show.id}`}
              className="
                                  rounded-lg
                                  bg-gray-200/60
                                  backdrop-blur-sm
                                  p-3
                                  block
                                "
            >
              <div className="flex gap-3">
                {show.image?.medium && (
                  <img
                    src={show.image.medium}
                    alt={show.name}
                    className="
                                          -my-3 -ml-3
                                          w-14 md:w-16
                                          rounded-l
                                          object-cover
                                          shrink-0
                                        "
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-gray-950 -mt-0.5">
                    {show.name}
                  </div>
                  {nextEpisode && showNext && (
                    <div className="md:flex md:gap-2">
                      <div className="flex gap-1 mt-0.5 text-gray-950 font-semibold">
                        <span className="text-sm font-medium opacity-70">
                          Next:
                        </span>
                        <span className="text-sm">
                          {formatEpisode(
                            nextEpisode.season,
                            nextEpisode.number,
                          )}
                        </span>
                        <span className="italic text-sm">
                          {nextEpisode.name}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-0.5 text-gray-950 font-semibold">
                        <span className="text-sm opacity-80">
                          {getRelativeDay(nextEpisode.airdate)}
                        </span>
                        <span className="text-sm opacity-60">
                          ({nextEpisode.airdate})
                        </span>
                      </div>
                    </div>
                  )}
                  {!nextEpisode && showNext && (
                    <div className="mt-0.5 text-sm opacity-80 italic font-semi-bold text-gray-950">
                      * No date yet *
                    </div>
                  )}
                  {previousEpisode && !showNext && (
                    <>
                      <div className="flex gap-1 mt-0.5 text-gray-950 font-semibold">
                        <span className="text-sm font-medium opacity-70">
                          Last aired:
                        </span>
                        <span className="text-sm">
                          {formatEpisode(
                            previousEpisode.season,
                            previousEpisode.number,
                          )}
                        </span>
                        <span className="italic text-sm">
                          {previousEpisode.name}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-0.5 text-gray-950 font-semibold">
                        <span className="text-sm opacity-60">
                          {previousEpisode.airdate}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
