import { Link, useParams } from "react-router-dom";
import { useCastCredits } from "../hooks/useCastCredits";
import { usePerson } from "../hooks/usePerson";
import { ShowCard } from "../components/ShowCard";
import { ImageOff } from "lucide-react";
import type { CastCredit } from "../types/tvmaze";

export function PersonPage() {
  const { id } = useParams();

  const personId = Number(id);

  const { data: person } = usePerson(personId);

  const { data: credits = [] } = useCastCredits(personId);

  const uniqueShows = Array.from(
    new Map(
      credits?.map((credit) => [
        credit._embedded.show.id,
        credit._embedded.show,
      ]),
    ).values(),
  );

  const creditsByShow = credits?.reduce(
    (acc, credit) => {
      const show = credit._embedded.show;
      const characterName = credit._links.character?.name;

      if (!acc[show.id]) {
        acc[show.id] = {
          show,
          characters: [],
          self: false,
          voice: false,
        };
      }

      if (characterName) {
        acc[show.id].characters.push(characterName);
      }

      acc[show.id].self ||= credit.self;
      acc[show.id].voice ||= credit.voice;

      return acc;
    },
    {} as Record<
      number,
      {
        show: CastCredit["_embedded"]["show"];
        characters: string[];
        self: boolean;
        voice: boolean;
      }
    >,
  );

  const groupedCredits = Object.values(creditsByShow);

  return (
    <div className="relative min-h-screen bg-black">
      <div
        className="fixed inset-0 
        scale-105 z-0 
        bg-cover bg-center 
        pointer-events-none"
        style={{
          backgroundImage: `url(${person?.image?.original})`,
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
          <h1
            className="
                mb-2 text-wrap
                text-2xl font-bold"
          >
            {person?.name}
          </h1>
          <div className="mb-3 flex">
            <div
              className="
                flex gap-3 
                rounded-l-lg"
            >
              <div
                id="imageCol"
                className="
                  min-w-auto
                  text-nowrap
                  flex-col 
                  bg-gray-600/40 
                  backdrop-blur-sm
                  rounded-bl-lg"
              >
                {person?.image && (
                  <img
                    src={person.image.medium}
                    alt={person.name}
                    className="
                      h-60 w-full 
                      rounded-tl-lg rounded-br-lg 
                      object-cover"
                  />
                )}
                {person?.image === null && (
                  <div
                    className="
                      h-72 w-full 
                      flex flex-col 
                      items-center justify-center 
                      bg-none text-gray-800"
                  >
                    <ImageOff size={64} />
                    <p className="">* no image available *</p>
                  </div>
                )}
                <div
                  id="bio"
                  className="
                    m-3 flex-row 
                    text-sm  
                    text-gray-50"
                >
                  {person?.birthday && (
                    <div className="flex mb-1">
                      <p className="opacity-60 font-semibold w-16">Born</p>
                      <p className="">{person?.birthday}</p>
                    </div>
                  )}
                  {person?.deathday && (
                    <div className="flex mb-1">
                      <p className="opacity-60 font-semibold w-16">Died</p>
                      <p className="">{person?.deathday}</p>
                    </div>
                  )}
                  <div className="flex mb-1">
                    <p className="opacity-60 font-semibold w-16">Gender</p>
                    <p className="">{person?.gender}</p>
                  </div>
                  <div className="flex mb-1">
                    <p className="opacity-60 font-semibold w-16">Country</p>
                    <p className="">{person?.country?.name}</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="p-3 w-full
              text-gray-950 
              bg-gray-200/60
              rounded-r-lg"
            >
              <h2 className="mb-1 font-bold">Credits</h2>
              <div
                className="
                grid 
                grid-cols-[repeat(auto-fit,minmax(150px,1fr))] 
                gap-x-2 gap-y-1"
              >
                {groupedCredits?.map(({ show, characters, self, voice }) => (
                  <Link to={`/show/${show.id}`}>
                    <div
                      id={show.id.toString()}
                      className="mb-1 gap-2  text-sm"
                    >
                      <p className="opacity-70 font-semibold">{show.name}</p>
                      <div className="ml-3 flex gap-1">
                        <p className="opacity-100 whitespace-pre-line">
                          {characters.join(`\n`)}
                        </p>
                        {self && <p className="italic opacity-70">Self</p>}
                        {voice && (
                          <p className="ml-1 italic opacity-70">Voice</p>
                        )}
                      </div>
                    </div>
                  </Link>
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
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
