import { Drawer } from "vaul";
import type { Episode } from "../types/tvmaze";
import { htmlToText } from "../utils/htmlToText";
import { formatEpisode } from "../utils/formatEpisode";

interface EpisodeDrawerProps {
  episode: Episode | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EpisodeDrawer({
  episode,
  open,
  onOpenChange,
}: EpisodeDrawerProps) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-100 bg-black/50" />

        <Drawer.Content
          className="fixed bottom-0 left-0 right-0 max-h-[85vh]
                       z-101 overflow-y-auto rounded-t-xl bg-blue-50/90 p-6"
        >
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-300" />
          {episode && (
            <>
              <h2 className="text-2xl font-bold">{episode.name}</h2>

              <div className="flex gap-2 mb-4">
                <div className="flex-1 text-gray-500">
                  {formatEpisode(episode.season, episode.number)}
                </div>
                <div className="text-gray-500">{episode.rating?.average}</div>
              </div>

              {episode.image && (
                <img
                  src={episode.image.original}
                  alt={episode.name}
                  className="mb-2 rounded-xl shadow"
                />
              )}
              <div className="flex gap-2 mb-3 text-gray-600">
                <div className="flex-1">{episode.runtime} min</div>

                <div className="mb-2">{episode.airdate}</div>
              </div>
              <p>{htmlToText(episode.summary)}</p>
            </>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
