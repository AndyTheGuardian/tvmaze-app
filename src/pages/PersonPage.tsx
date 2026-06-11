import { Link, useParams } from "react-router-dom";
import { useCastCredits } from "../hooks/useCastCredits";
import { usePerson } from "../hooks/usePerson";
import { ShowCard } from "../components/ShowCard";
import { Heart, VenetianMask } from "lucide-react";
import { groupedCastCreditsByShow } from "../utils/groupedCastCreditsByShow";
import { useEffect, useMemo, useState } from "react";
import { isFavoritePerson, toggleFavoritePerson } from "../utils/favorites";
import { AnimatePresence, motion } from "framer-motion";
import { getAge } from "../utils/getAge";
import type { PersonCredit } from "../types/tvmaze";
import { getGuestCastCredits } from "../utils/getGuestCastCredits";

export function PersonPage() {
  const { id } = useParams();

  const personId = Number(id);

  const { data: person } = usePerson(personId);

  const { data: credits = [] } = useCastCredits(personId);

  const guestCredits = getGuestCastCredits(personId);

  const allCredits: PersonCredit[] = [
    ...credits.map((credit) => ({
      self: credit.self,
      voice: credit.voice,
      show: credit._embedded.show,
      character: credit._links.character.name,
      guest: false,
    })),
    ...guestCredits,
  ];

  const [favorite, setFavorite] = useState(() => isFavoritePerson(personId));

  const [inlineBreaks, setInlineBreaks] = useState(false);

  const [zoomed, setZoomed] = useState(false);

  const uniqueShows = Array.from(
    new Map(
      allCredits?.map((credit) => [credit.show.id, credit.show]),
    ).values(),
  );

  const groupedCredits = useMemo(
    () => groupedCastCreditsByShow(allCredits),
    [allCredits],
  );

  const [imageSrc, setImgageSrc] = useState(person?.image?.medium);

  useEffect(() => {
    const img = new Image();
    img.src = person?.image?.original ?? person?.image?.medium!;
    img.onload = () => {
      setImgageSrc(person?.image?.original);
    };
  }, [person?.image?.original]);

  return (
    <div className="relative min-h-screen bg-black">
      <div
        className="fixed inset-0 
        scale-105 z-0 
        bg-cover bg-center 
        pointer-events-none"
        style={{
          backgroundImage: `url(${imageSrc})`,
        }}
      />
      <div
        className="
        fixed inset-0 z-10 
        bg-black/50 pointer-events-none"
      />
      <main
        className="
        relative z-20 
        mx-auto max-w-5xl 
        p-3 md:p-6"
      >
        <div
          id={person?.id.toString()}
          className="
          rounded-2xl 
          bg-black/60 backdrop-blur-sm 
          p-3 md:p-6"
        >
          <div className="flex">
            <h1
              className="
                flex-1 mb-2 text-wrap
                text-2xl font-bold"
            >
              {person?.name}
            </h1>
            <Heart
              size={20}
              fill={favorite ? "white" : "none"}
              stroke="white"
              className="mt-1.5 cursor-pointer"
              onClick={() => {
                if (!person) return;

                toggleFavoritePerson({
                  id: person.id,
                  name: person.name,
                  image: person.image?.medium,
                });

                setFavorite(!favorite);
              }}
            />
          </div>
          <div className="mb-3 flex-row md:flex">
            <div
              className="
                flex-col md:flex gap-3 
                rounded-l-lg"
            >
              <div
                id="imageCol"
                className="
                  min-w-auto
                  h-full
                  text-nowrap
                  flex md:flex-col
                  bg-gray-600/40 
                  backdrop-blur-sm
                  rounded-t-lg 
                  md:rounded-bl-lg
                  items-end
                  md:items-start"
              >
                {person?.image && (
                  <motion.img
                    layoutId={`person-${person.id}`}
                    src={person.image.medium}
                    alt={person.name}
                    className="
                      h-60 w-auto
                      rounded-tl-lg
                      object-cover
                      cursor-pointer
                      z-999
                    "
                    onClick={() => setZoomed(true)}
                  />
                )}
                {!person?.image && (
                  <div
                    className="
                      h-60 p-3 
                      flex flex-col bg-none
                      items-center justify-center 
                      text-gray-500/60 font-medium"
                  >
                    <VenetianMask size={64} />
                    <p>* no image available *</p>
                  </div>
                )}
                <div
                  id="bio"
                  className="
                    m-3 flex-row 
                    text-sm 
                    text-gray-50
                    "
                >
                  <div className="grid grid-cols-[52px_1fr] gap-x-2 gap-y-1">
                    {person?.birthday && (
                      <>
                        <p className="opacity-60 font-semibold w-15">Born</p>
                        <p>{person?.birthday}</p>
                      </>
                    )}
                    {person?.deathday && (
                      <>
                        <p className="opacity-60 font-semibold w-15">Died</p>
                        <p>{person?.deathday}</p>
                      </>
                    )}
                    {person?.birthday && (
                      <>
                        <p className="opacity-60 font-semibold w-15">Age</p>
                        <div className="flex gap-1">
                          {person.deathday && <span>†</span>}
                          <span>
                            {getAge(person?.birthday, person?.deathday)}
                          </span>
                        </div>
                      </>
                    )}
                    <p className="opacity-60 font-semibold w-15">Gender</p>
                    <p>{person?.gender}</p>
                    {person?.country?.name && (
                      <>
                        <div className="opacity-60 font-semibold w-15">
                          Country
                        </div>
                        <div className="text-wrap">{person?.country?.name}</div>
                      </>
                    )}
                    {/* <sp className="whitespace-pre-line">
                      {person?.country?.name.split(" ").join("\n")}
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="p-3 w-full
              text-gray-950 
              bg-gray-200/60
              rounded-b-lg
              md:rounded-bl-none
              md:rounded-r-lg"
            >
              <h2
                className="mb-1 font-bold"
                onClick={() => setInlineBreaks(!inlineBreaks)}
              >
                Credits
                <span className="ml-1 text-sm font-medium italic opacity-50">
                  {groupedCredits.length !== allCredits.length
                    ? `Shows: ${groupedCredits.length}, Total: ${allCredits.length}`
                    : `${allCredits.length}`}
                </span>
              </h2>
              {/* // grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-2 gap-y-1
                // [column-width:150px] gap-4     */}
              <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 [column-fill:balance]">
                {groupedCredits?.map(({ self, voice, show, characters }) => (
                  <Link key={show.id} to={`/show/${show.id}`} className="">
                    <div
                      key={show.id}
                      className={`
                          text-sm mb-2 block 
                          ${inlineBreaks ? "" : "break-inside-avoid"}`}
                    >
                      <div className="opacity-70 font-semibold">
                        {show.name}
                        {self && (
                          <span className="ml-1 text-gray-950/70 italic font-medium">
                            Self
                          </span>
                        )}
                        {voice && (
                          <span className="ml-1 text-gray-950/70 italic font-medium">
                            Voice
                          </span>
                        )}
                      </div>
                      {characters.map((character) => (
                        <div
                          key={`${show.id}-${character.name}-${character.guest ? `guest` : ``}`}
                          className="ml-3 opacity-100"
                        >
                          {character.name}
                          {character.guest && (
                            <span className="ml-1 text-gray-950/50 italic font-medium">
                              Guest
                              {character.count > 1
                                ? `(${character.count})`
                                : ``}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </Link>
                  /* {groupedCredits?.map(({ show, characters, self, voice }) => (
                  <Link key={show.id} to={`/show/${show.id}`} className="">
                    <div
                      key={show.id}
                      className={`text-sm mb-2 block ${inlineBreaks ? "" : "break-inside-avoid"}`}
                    >
                      <div className="opacity-70 font-semibold">
                        {show.name}
                        {self && (
                          <span className="ml-1 text-gray-950/70 italic font-medium">
                            Self
                          </span>
                        )}
                        {voice && (
                          <span className="ml-1 text-gray-950/70 italic font-medium">
                            Voice
                          </span>
                        )}
                      </div>
                      <p className="ml-3 opacity-100 whitespace-pre-line">
                        {characters.join(`\n`)}
                      </p>
                    </div>
                  </Link> */
                ))}
              </div>
            </div>
          </div>
          <div className="mb-2 font-bold text-xl">Known for</div>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {uniqueShows?.map((credit) => {
              return (
                <ShowCard
                  show={{
                    id: credit.id,
                    name: credit.name,
                    image: credit.image?.medium,
                  }}
                  animate={false}
                />
              );
            })}
          </div>
        </div>
        <span
          className="flex-1 mt-1.5 text-gray-50/10 w-full justify-end"
          onClick={(e) => {
            const text = (e.currentTarget as HTMLElement).textContent ?? "";
            navigator.clipboard.writeText(text);
          }}
        >
          {person?.id}
        </span>
      </main>
      <AnimatePresence>
        {zoomed && person?.image && (
          <motion.div
            className="
              fixed inset-0 z-50
              flex items-center justify-center
              bg-black/80
            "
            onClick={() => setZoomed(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              layoutId={`person-${person.id}`}
              src={person.image.original ?? person.image.medium}
              alt={person.name}
              className="
                  max-w-[95vw]
                  max-h-[95vh]
                  rounded-lg
                "
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* {zoomed && person?.image && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/80 backdrop-blur-sm
            p-4
          "
          onClick={() => setZoomed(false)}
        >
          <img
            src={person.image.original ?? person.image.medium}
            alt={person.name}
            className="
              max-w-[95vw]
              max-h-[95vh]
              rounded-lg
              shadow-2xl
              transition-all duration-300
            "
          />
        </div>
      )} */}
    </div>
  );
}
