import { Drawer } from "vaul";
import type { CastMember, Episode } from "../types/tvmaze";
import { htmlToText } from "../utils/htmlToText";
import { formatEpisode } from "../utils/formatEpisode";
import { useGuestCast } from "../hooks/useGuestCast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

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
  const [activeImage, setActiveImage] = useState(true);
  const episodeId = episode?.id ?? 0;
  const { data: guests } = useGuestCast(episodeId);
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-100 bg-black/50" />

        <Drawer.Content
          className="fixed bottom-0 left-0 right-0 max-h-[90vh]
                       z-101 overflow-y-auto 
                       rounded-t-xl bg-gray-200/60 
                       backdrop-blur-sm p-6"
        >
          <div
            className="mx-auto mb-4 h-1.5 w-12 
            rounded-full bg-gray-300"
          />
          {episode && (
            <>
              <div className="flex">
                <div className="flex-1 flex">
                  <h2 className="flex-1 mb-2 text-2xl font-bold">
                    {episode.name}
                  </h2>
                  <span
                    className="flex-none mt-1.5 text-gray-50/30"
                    onClick={(e) => {
                      const text =
                        (e.currentTarget as HTMLElement).textContent ?? "";
                      navigator.clipboard.writeText(text);
                    }}
                  >
                    {episode.id}
                  </span>
                </div>
              </div>
              <div className="relative" />
              {!activeImage && (
                <motion.img
                  layoutId={`ep-${episode.id}`}
                  src={episode?.image?.original}
                  alt={episode.name}
                  className="
                  absolute
                  left-1/2 top-28 -translate-1/2
                  h-18 rounded-lg shadow z-9999
                  "
                  onClick={() => setActiveImage(true)}
                />
              )}
              <div className="relative flex gap-2 mb-2 opacity-60">
                <div className="flex-1">
                  {formatEpisode(episode.season, episode.number)}
                </div>
                <div className="flex-none">{episode.rating?.average}</div>
              </div>
              {episode.image && activeImage && (
                <motion.img
                  layoutId={`ep-${episode.id}`}
                  src={episode?.image?.original}
                  alt={episode.name}
                  className="mb-2 w-full rounded-xl shadow"
                  onClick={() => setActiveImage(false)}
                />
              )}

              <div className="mb-2 flex gap-2 opacity-60">
                <div className="flex-1">{episode.runtime} min</div>

                <div className="flex-none">{episode.airdate}</div>
              </div>
              <p className="mb-3" onClick={() => setActiveImage(true)}>
                {htmlToText(episode.summary)}
              </p>
              <div
                className={`
                  transition-all duration-500 ease-in-out
                  ${
                    activeImage
                      ? "opacity-0 max-h-0 overflow-hidden"
                      : "opacity-100 max-h-250"
                  }
                `}
              >
                <h2 className="mb-1 text-lg font-semibold">Guest cast</h2>
                <div
                  className="columns-2 sm:columns-4 
                  lg:columns-4 gap-2 [column-fill:balance] 
                 "
                >
                  {guests?.map((member: CastMember) => (
                    <Link
                      key={member.person.id}
                      to={`/person/${member.person.id}`}
                      className=""
                    >
                      <div
                        key={member.person.id}
                        className={`text-sm mb-2  block break-inside-avoid`}
                      >
                        <div className="opacity-70 font-semibold">
                          {member.person.name}
                        </div>
                        <p className="ml-3 opacity-100">
                          {member.character.name}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
