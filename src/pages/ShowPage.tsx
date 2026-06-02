import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useShow } from "../hooks/useShow";
import { useEpisodes } from "../hooks/useEpisodes";
import { htmlToText } from "../utils/htmlToText";
import { groupEpisodesBySeason } from "../utils/groupEpisodesBySeason";
import { formatEpisode } from "../utils/formatEpisode";
import type { Episode } from "../types/tvmaze";
import { Heart, ExternalLink } from "lucide-react";
import { isFavorite, toggleFavorite } from "../utils/favorites";
import { EpisodeDrawer } from "../components/EpisodeDrawer";
import { getYear } from "../utils/getYear";
import { getStation } from "../utils/getStation";
import { useCast } from "../hooks/useCast";

export function ShowPage() {
  const { id } = useParams();

  const showId = Number(id);

  const { data: show } = useShow(showId);

  const { data: episodes = [] } = useEpisodes(showId);

  const [favorite, setFavorite] = useState(() => isFavorite(showId));

  const [showCast, setShowCast] = useState(false);

  const [showBirthday, setShowBirthday] = useState(false);

  const { data: cast = [], isLoading } = useCast(showId, showCast);

  const seasons = useMemo(() => groupEpisodesBySeason(episodes), [episodes]);

  const seasonNumbers = Object.keys(seasons)
    .map(Number)
    .sort((a, b) => a - b);

  const [selectedSeason, setSelectedSeason] = useState<number>();

  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  useEffect(() => {
    if (seasonNumbers.length > 0 && selectedSeason === undefined) {
      setSelectedSeason(seasonNumbers[0]);
    }
  }, [seasonNumbers, selectedSeason]);

  const activeSeason = selectedSeason;

  if (seasonNumbers.length === 0) {
    return <div>No episodes found.</div>;
  }

  return (
    <div className="relative min-h-screen bg-black">
      <div
        className="fixed inset-0 
        scale-105 z-0 
        bg-cover bg-top 
        pointer-events-none"
        style={{
          backgroundImage: `url(${show?.image?.original})`,
        }}
      />
      <div className="fixed inset-0 z-10 bg-black/60 pointer-events-none" />
      <main className="relative z-20 mx-auto max-w-5xl p-3 md:p-6">
        <div className="rounded-2xl bg-black/50 p-6">
          <div className="flex gap-2">
            <h1 className="flex-1 mb-3 text-gray-100 text-2xl font-bold">
              {show?.name}
            </h1>
            <div className="mt-2 mr-1 text-sm font-semibold">
              {show?.rating?.average}
            </div>
            <Heart
              size={20}
              fill={favorite ? "white" : "none"}
              stroke="white"
              className="mt-1.5"
              onClick={() => {
                if (!show) return;

                toggleFavorite({
                  id: show.id,
                  name: show.name,
                  image: show.image?.medium,
                });

                setFavorite(!favorite);
              }}
            />
          </div>
          <div className="flex gap-1">
            <div className="flex-1 mb-4 flex gap-2">
              {show?.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full bg-gray-200/70 text-gray-950 px-3 py-1 text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
            <Link
              className="text-sm font-semibold"
              to={`https://www.imdb.com/title/${show?.externals.imdb}`}
            >
              <div className="flex mt-1 text-gray-300/70">
                IMDB
                <ExternalLink size={14} className="ml-0.5 mt-0.5" />
              </div>
            </Link>
          </div>
          <div className="mb-4 flex gap-2">
            <div className="flex-none text-sm font-semibold">
              {getStation(show?.network?.name, show?.webChannel?.name)}
            </div>
            <div className="flex-1 flex gap-2 overflow-hiodden">
              {show?.schedule.days && show?.schedule.days.length > 6 ? (
                <span className="text-gray-300 mt-1 text-xs">All week</span>
              ) : show?.schedule.days && show?.schedule.days.length > 3 ? (
                <span className="text-gray-300 mt-1 text-xs">
                  {show?.schedule.days[0]}s to{" "}
                  {show?.schedule.days[show?.schedule.days.length - 1]}s
                </span>
              ) : (
                show?.schedule.days.map((day) => (
                  <span
                    key={day}
                    className="text-gray-300 mt-0.75 text-xs text-ellipsis"
                  >
                    {day}s
                  </span>
                ))
              )}
            </div>
            <div className="text-sm font-semibold">
              {getYear(show?.premiered)}-{getYear(show?.ended)}
            </div>
            <div className="text-sm font-semibold">{show?.status}</div>
          </div>

          <p className="mb-1 text-gray-100">{htmlToText(show?.summary)}</p>
          <p
            className="flex justify-end mb-2 text-sm font-semibold cursor-pointer"
            onClick={() => setShowCast((prev) => !prev)}
          >
            {showCast ? "Hide Cast" : "Show Cast"}
          </p>
          <div
            className={`
              grid
              transition-all
              duration-300
              ${showCast ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
              `}
          >
            <div
              className={`
            overflow-hidden
            transition-all
            duration-300
            ${showCast ? "max-h-750 opacity-100 mb-3" : "max-h-0 opacity-0 mb-0"}
            `}
            >
              {isLoading && <div className="text-gray-50">Loading cast...</div>}

              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {cast.map((member) => (
                  <div
                    key={member.person.id}
                    className="rounded-lg bg-gray-800/40 
                    backdrop-blur-sm"
                  >
                    {member.person.image && (
                      <>
                        <img
                          src={member.person.image.medium}
                          alt={member.person.name}
                          className="
                      mb-2 h-40 w-full 
                      rounded-t-lg object-cover"
                          onClick={() => setShowBirthday(!showBirthday)}
                        />
                        <div
                          className={`
                            absolute top-35 right-0 
                            py-0.5 px-2 rounded-tl-lg 
                            bg-gray-950/60 
                            transition-all duration-300 
                            ${showBirthday ? "opacity-100" : "opacity-0"} 
                              text-xs text-gray-50`}
                        >
                          {member.person.birthday}
                        </div>
                      </>
                    )}

                    <div className="font-semibold text-gray-50 px-3">
                      {member.person.name}
                    </div>

                    <div className="text-sm text-gray-300 px-3 pb-3">
                      as {member.character.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:sticky md:top-0 z-50 mb-4 flex flex-wrap gap-2">
            {seasonNumbers.map((season) => (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                className={`rounded px-4 py-2 ${
                  activeSeason === season
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200/80 text-gray-950"
                }`}
              >
                Season {season}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {seasons[activeSeason!]?.map((episode: Episode) => (
              <div
                key={episode.id}
                onClick={() => setSelectedEpisode(episode)}
                className="flex items-start gap-2 rounded-lg shadow 
                bg-gray-200/70 p-3 text-gray-950"
              >
                <div className="flex-none w-1/4 md:w-44">
                  <div className="font-semibold">
                    {formatEpisode(episode.season, episode.number)}
                  </div>
                  <div>{episode.name}</div>

                  <div className="text-sm text-gray-800">{episode.airdate}</div>
                </div>
                <div
                  className={`flex-1 min-w-0 text-wrap ${
                    episode.summary === ""
                      ? "italic text-gray-900/80 flex items-center justify-center"
                      : ""
                  }`}
                >
                  {episode.summary === ""
                    ? "Summary not available"
                    : htmlToText(episode.summary)}
                </div>
              </div>
            ))}
            <EpisodeDrawer
              episode={selectedEpisode}
              open={selectedEpisode !== null}
              onOpenChange={(open) => {
                if (!open) {
                  setSelectedEpisode(null);
                }
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
