import { Link, useParams } from "react-router-dom";
import { useCastCredits } from "../hooks/useCastCredits";
import { usePerson } from "../hooks/usePerson";
import { ShowCard } from "../components/ShowCard";
import { VenetianMask } from "lucide-react";
import { groupedCastCreditsByShow } from "../utils/groupedCastCreditsByShow";
import { useState } from "react";

export function PersonPage() {
  const { id } = useParams();

  const personId = Number(id);

  const { data: person } = usePerson(personId);

  const { data: credits = [] } = useCastCredits(personId);

  const [inlineBreaks, setInlineBreaks] = useState(false);

  const uniqueShows = Array.from(
    new Map(
      credits?.map((credit) => [
        credit._embedded.show.id,
        credit._embedded.show,
      ]),
    ).values(),
  );

  const groupedCredits = groupedCastCreditsByShow(credits);

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
                  rounded-t-lg md:rounded-bl-lg"
              >
                {person?.image && (
                  <img
                    src={person.image.medium}
                    alt={person.name}
                    className="
                      h-60 w-auto
                      rounded-tl-lg 
                      object-cover"
                  />
                )}
                {!person?.image && (
                  <div
                    className="
                      h-60 p-3 
                      flex flex-col 
                      items-center justify-center 
                      bg-none text-gray-500/60 font-medium"
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
                    text-gray-50"
                >
                  <div className="grid grid-cols-[52px_1fr] gap-x-2 gap-y-1">
                    {person?.birthday && (
                      <>
                        <p className="opacity-60 font-semibold w-15">Born</p>
                        <p className="">{person?.birthday}</p>
                      </>
                    )}
                    {person?.deathday && (
                      <>
                        <p className="opacity-60 font-semibold w-15">Died</p>
                        <p className="">{person?.deathday}</p>
                      </>
                    )}
                    <p className="opacity-60 font-semibold w-15">Gender</p>
                    <p className="">{person?.gender}</p>
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
                <span className="ml-2 text-sm font-medium italic opacity-50">
                  {groupedCredits.length !== credits.length
                    ? `Shows: ${groupedCredits.length}, Total: ${credits.length}`
                    : `${credits.length}`}
                </span>
              </h2>
              {/* // grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-2 gap-y-1
                // [column-width:150px] gap-4     */}
              <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 [column-fill:balance]">
                {groupedCredits?.map(({ show, characters, self, voice }) => (
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
