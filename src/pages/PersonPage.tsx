import { useParams } from "react-router-dom";
import { useCastCredits } from "../hooks/useCastCredits";
import { usePerson } from "../hooks/usePerson";
import { ShowCard } from "../components/ShowCard";
import { ImageOff } from "lucide-react";

export function PersonPage() {
  const { id } = useParams();

  const personId = Number(id);

  const { data: person } = usePerson(personId);

  const { data: credits } = useCastCredits(personId);

  const uniqueShows = Array.from(
    new Map(
      credits?.map((credit) => [
        credit._embedded.show.id,
        credit._embedded.show,
      ]),
    ).values(),
  );

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
      <div className="fixed inset-0 z-10 bg-black/50 pointer-events-none" />
      <main className="relative z-20 mx-auto max-w-5xl p-3 md:p-6">
        <div className="rounded-2xl bg-black/60 backdrop-blur-sm p-6">
          <div className="mb-3 flex gap-3 rounded-lg bg-gray-200/50">
            {person?.image && (
              <img
                src={person.image.medium}
                alt={person.name}
                className="h-60 w-auto rounded-l-lg object-cover"
              />
            )}
            {person?.image === null && (
              <div
                className="h-72 w-full flex flex-col items-center justify-center 
                    bg-none text-gray-800"
              >
                <ImageOff size={64} />
                <p className="">* no image available *</p>
              </div>
            )}
            <div className="mt-2 flex-row text-sm font-semibold text-gray-950">
              <h1 className="mb-2 text-2xl font-bold">{person?.name}</h1>
              {person?.birthday && (
                <div className="flex mb-1">
                  <p className="opacity-50 w-16">Born</p>
                  <p className="">{person?.birthday}</p>
                </div>
              )}
              {person?.deathday && (
                <div className="flex mb-1">
                  <p className="opacity-50 w-16">Died</p>
                  <p className="">{person?.deathday}</p>
                </div>
              )}
              <div className="flex mb-1">
                <p className="opacity-50 w-16">Gender</p>
                <p className="">{person?.gender}</p>
              </div>
              <div className="flex mb-1">
                <p className="opacity-50 w-16">Country</p>
                <p className="">{person?.country?.name}</p>
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
