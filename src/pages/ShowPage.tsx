import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { useShow } from "../hooks/useShow";
import { useEpisodes } from "../hooks/useEpisodes";
import { htmlToText } from "../utils/htmlToText";
import { groupEpisodesBySeason } from "../utils/groupEpisodesBySeason";
import { formatEpisode } from "../utils/formatEpisode";
import type { Episode } from "../types/tvmaze";
import { Heart } from "lucide-react";
import { isFavorite, toggleFavorite } from "../utils/favorites";

export function ShowPage() {
  const { id } = useParams();

  const showId = Number(id);

  const { data: show } = useShow(showId);

  const { data: episodes = [] } = useEpisodes(showId);

  const seasons = useMemo(() => groupEpisodesBySeason(episodes), [episodes]);

  const seasonNumbers = Object.keys(seasons)
    .map(Number)
    .sort((a, b) => a - b);

  const [selectedSeason, setSelectedSeason] = useState<number>();

  useEffect(() => {
    if (seasonNumbers.length > 0 && selectedSeason === undefined) {
      setSelectedSeason(seasonNumbers[0]);
    }
  }, [seasonNumbers, selectedSeason]);

  const activeSeason = selectedSeason;

  const [favorite, setFavorite] = useState(() => isFavorite(showId));

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
          <div className="flex">
            <h1 className="flex-1 mb-4 text-gray-100 text-2xl font-bold">
              {show?.name}
            </h1>
            <Heart
              size={20}
              fill={favorite ? "white" : "none"}
              stroke="white"
              className="mt-1"
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
          <div className="mb-4 flex gap-2">
            {show?.genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full bg-gray-200/70 text-gray-950 px-3 py-1 text-sm"
              >
                {genre}
              </span>
            ))}
          </div>
          <p className="mb-4 text-gray-100">{htmlToText(show?.summary)}</p>

          <div className="md:sticky md:top-0 z-50 mb-6 flex flex-wrap gap-2">
            {seasonNumbers.map((season) => (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                className={`rounded px-4 py-2 ${
                  activeSeason === season
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200/80"
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
                className="flex items-start gap-2 rounded-lg shadow bg-gray-200/70 p-3 text-gray-950"
              >
                <div className="flex-none w-1/4 md:w-44">
                  <div className="font-semibold">
                    {formatEpisode(episode.season, episode.number)}
                  </div>
                  <div>{episode.name}</div>

                  <div className="text-sm text-gray-800">{episode.airdate}</div>
                </div>
                <div className="flex-1 min-w-0 *:text-wrap">
                  {htmlToText(episode.summary) === ""
                    ? "* Not available yet *"
                    : htmlToText(episode.summary)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
