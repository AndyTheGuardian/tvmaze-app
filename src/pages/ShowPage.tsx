import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useShow } from "../hooks/useShow";
import { useEpisodes } from "../hooks/useEpisodes";
import { htmlToText } from "../utils/htmlToText";
import { groupEpisodesBySeason } from "../utils/groupEpisodesBySeason";
import type { Episode } from "../types/tvmaze";
import { Heart, ExternalLink } from "lucide-react";
import { isFavorite, toggleFavorite } from "../utils/favorites";
import { EpisodeDrawer } from "../components/EpisodeDrawer";
import { getYear } from "../utils/getYear";
import { getStation } from "../utils/getStation";
import { useCast } from "../hooks/useCast";
import { findEpisodes } from "../utils/findEpisodes";
import { SearchBar } from "../components/SearchBar";
import { EpisodeCard } from "../components/EpisodeCard";
import { CastCard } from "../components/CastCard";

export function ShowPage() {
  const { id } = useParams();

  const showId = Number(id);

  const { data: show } = useShow(showId);

  const { data: episodes = [] } = useEpisodes(showId);

  const [favorite, setFavorite] = useState(() => isFavorite(showId));

  const [showCast, setShowCast] = useState(false);

  const [showBirthday, setShowBirthday] = useState(false);

  const { data: cast = [], isLoading } = useCast(showId, showCast);

  const [showSearch, setShowSeach] = useState(false);

  const seasons = useMemo(() => groupEpisodesBySeason(episodes), [episodes]);

  const seasonNumbers = Object.keys(seasons)
    .map(Number)
    .sort((a, b) => a - b);

  const [selectedSeason, setSelectedSeason] = useState<number>();

  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  const [episodeSearch, setEpisodeSearch] = useState("");

  const filteredEpisodes = useMemo(
    () => findEpisodes(episodes, episodeSearch),
    [episodes, episodeSearch],
  );

  useEffect(() => {
    if (seasonNumbers.length > 0 && selectedSeason === undefined) {
      setSelectedSeason(seasonNumbers[0]);
    }
  }, [seasonNumbers, selectedSeason]);

  const activeSeason = selectedSeason;

  const genreCount = show?.genres.length ?? 0;

  if (seasonNumbers.length === 0) {
    return (
      <div
        className="m-6 p-6 text-xl font-semibold 
        bg-black/50 rounded-2xl"
      >
        No episodes found.
      </div>
    );
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
      <div className="fixed inset-0 z-10 bg-black/50 pointer-events-none" />
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
                  className="rounded-full flex bg-gray-200/70 text-gray-950 px-3 py-1 text-sm items-center text-center"
                >
                  {genre === "Science-Fiction" && genreCount > 2
                    ? "Sci-Fi"
                    : genre}
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
          <div className="flex justify-end gap-3 text-sm font-semibold mb-3">
            <p
              className="justify-end text-sm font-semibold text-left cursor-pointer"
              onClick={() => {
                if (showCast) setShowCast(false);
                setShowSeach(!showSearch);
              }}
            >
              {showSearch ? "Hide Search" : "Search in Episodes"}
            </p>
            <p className="text-gray-500">|</p>
            <p
              className={`justify-end text-sm font-semibold cursor-pointer ${showSearch ? "opacity-50 cursor-text" : ""}`}
              onClick={() => {
                if (!showSearch) setShowCast((prev) => !prev);
              }}
            >
              {showCast ? "Hide Cast" : "Show Cast"}
            </p>
          </div>
          <div
            className={`
              transition-all duration-300
              grid ${showCast ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
              `}
          >
            <div
              className={`
                overflow-hidden transition-all duration-300
                ${showCast ? "max-h-fit opacity-100 mb-3" : "max-h-0 opacity-0 mb-0"}
              `}
            >
              {isLoading && <div className="text-gray-50">Loading cast...</div>}
              {cast.length === 0 ? (
                <div className="rounded-lg p-3 bg-black/60 backdrop-blur-sm">
                  <p className="text-sm text-gray-50">
                    No cast info available.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {cast.map((member) => (
                    <CastCard
                      key={member.person.id}
                      member={member}
                      showBirthday={showBirthday}
                      setShowBirthday={setShowBirthday}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flow flow-cols">
            <SearchBar
              value={episodeSearch}
              onChange={setEpisodeSearch}
              placeholder="Search in episodes..."
              active={showSearch}
            />
            {!showSearch && (
              <div className="md:sticky md:top-0 z-50 mb-3 flex flex-wrap gap-2">
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
            )}
          </div>

          <div className="space-y-3">
            {!showSearch &&
              seasons[activeSeason!]?.map((episode: Episode) => (
                <EpisodeCard
                  key={episode.id}
                  episode={episode}
                  setSelectedEpisode={setSelectedEpisode}
                />
              ))}
            {showSearch && (
              <>
                <div className="flex mb-3 text-gray-100 text-sm font-semibold gap-1">
                  <span>
                    {filteredEpisodes.length}{" "}
                    {filteredEpisodes.length === 1
                      ? `episode ${!!episodeSearch ? "contains" : ""}`
                      : `episodes ${!!episodeSearch ? "containing" : ""}`}
                  </span>
                  <span className="italic text-white/80 font-semibold">
                    {episodeSearch}
                  </span>
                </div>
                {filteredEpisodes.map((episode) => (
                  <EpisodeCard
                    key={episode.id}
                    episode={episode}
                    setSelectedEpisode={setSelectedEpisode}
                  />
                ))}
              </>
            )}
            <EpisodeDrawer
              episode={selectedEpisode}
              open={!!selectedEpisode}
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
