import type { Episode } from "../types/tvmaze";
import { formatEpisode } from "../utils/formatEpisode";
import { htmlToText } from "../utils/htmlToText";

interface Props {
  episode: Episode;
  setSelectedEpisode: (e: Episode) => void;
}

export function EpisodeCard({ episode, setSelectedEpisode }: Props) {
  return (
    <div
      key={episode.id}
      onClick={() => setSelectedEpisode(episode)}
      className="flex items-start gap-2 rounded-lg shadow 
                        bg-gray-200/60 p-3 text-gray-950 backdrop-blur-sm"
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
  );
}
