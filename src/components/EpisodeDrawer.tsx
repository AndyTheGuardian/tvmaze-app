import { Drawer } from "vaul";
import type { CastMember, Episode } from "../types/tvmaze";
import { htmlToText } from "../utils/htmlToText";
import { formatEpisode } from "../utils/formatEpisode";
import { useGuestCast } from "../hooks/useGuestCast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { hasCompletedTutorial } from "../utils/tutorial";
import { Tutorial } from "./Tutorial/Tutorial";
import { drawerTutorialSteps } from "./Tutorial/drawerTutorialSteps";

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
  const DRAWER_TUTORIAL_KEY = "tutorial-drawer";
  const [activeImage, setActiveImage] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const episodeId = episode?.id ?? 0;
  const { data: guests = [] } = useGuestCast(episodeId);

  useEffect(() => {
    if (!open) return;
    if (!hasCompletedTutorial(DRAWER_TUTORIAL_KEY)) {
      const timer = setTimeout(() => {
        setShowTutorial(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <>
      <Drawer.Root
        open={open}
        onOpenChange={(value) => {
          onOpenChange(value);
        }}
        onClose={() => setActiveImage(false)}
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-100 bg-black/50" />

          <Drawer.Content
            id="tutorial-drawer"
            onInteractOutside={(event) => {
              if ((event.target as HTMLElement).closest("[data-tutorial]")) {
                event.preventDefault();
              }
            }}
            className="
            fixed bottom-0 left-0 right-0 
            max-h-[90dvh]
            z-101             
            rounded-t-xl 
            bg-gray-200/60 
            backdrop-blur-sm 
            p-6
            flex flex-col"
          >
            <div
              className="mx-auto mb-4 h-1.5 w-12 
            rounded-full bg-gray-300"
            />
            {episode && (
              <>
                <div id="tutorial-drawer-info">
                  <div className="flex">
                    <h2 className="flex-1 mb-2 text-2xl font-bold">
                      {episode.name}
                    </h2>
                    <span
                      className="flex-none mt-1.5 text-gray-50/10"
                      onClick={(e) => {
                        const text =
                          (e.currentTarget as HTMLElement).textContent ?? "";
                        navigator.clipboard.writeText(text);
                      }}
                    >
                      {episode.id}
                    </span>
                  </div>
                  <div className="relative" />
                  {episode.image && !activeImage && (
                    <motion.img
                      id="tutorial-drawer-image"
                      layoutId={`ep-${episode.id}`}
                      src={episode?.image?.original}
                      alt={episode.name}
                      className="
                    absolute
                    left-1/2 top-28 -translate-1/2
                    h-17 rounded-lg shadow z-9999
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
                  {/* <div
                  className="
                        max-h-[80vH]
                        landscape:max-h-[50vH]
                        overflow-y-auto
                        pr-1"
                > */}
                  <p className="mb-3" onClick={() => setActiveImage(true)}>
                    {htmlToText(episode.summary)}
                  </p>
                </div>
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
                  {guests.length > 0 && (
                    <>
                      <div id="tutorial-drawer-cast">
                        <h2 className="mb-1 text-lg font-semibold">
                          Guest cast
                        </h2>
                        <div
                          className="
                        grid
                        grid-cols-2
                        sm:grid-cols-4
                        gap-x-2 
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
                </div>
                {/* </div> */}
              </>
            )}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
      {showTutorial && (
        <Tutorial
          steps={drawerTutorialSteps}
          storageKey={DRAWER_TUTORIAL_KEY}
        />
      )}
    </>
  );
}
