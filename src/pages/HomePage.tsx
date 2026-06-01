import { useShows } from "../hooks/useShows";
import { SearchBar } from "../components/SearchBar";
import { ShowCard } from "../components/ShowCard";
import { useSearchParams } from "react-router-dom";

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("q") ?? "";

  const handleSearchChange = (value: string) => {
    setSearchParams(value ? { q: value } : {});
  };

  const { data = [], isLoading } = useShows(search);

  return (
    <div className="bg-gray-900 min-h-screen min-w-screen">
      <div
        className="fixed inset-0 
        scale-105 z-0 
        bg-cover bg-top 
        pointer-events-none"
        style={{
          backgroundImage: `url(https://www.posterized.in/cdn/shop/files/50setseriesw.jpg)`,
        }}
      />
      <div className="fixed inset-0 z-10 bg-black/60 pointer-events-none" />

      <main className="relative z-10 mx-auto max-w-5xl p-3 md:p-6">
        <div className="mx-auto max-w-5xl p-3 md:p-6 bg-black/70 rounded-lg">
          <h1 className="mb-6 text-2xl font-bold">Episode Guide</h1>

          <SearchBar value={search} onChange={handleSearchChange} />

          {isLoading && <p className="mt-4">Loading...</p>}

          <div className="mt-6 grid gap-4 grid-cols-2 md:grid-cols-4">
            {data.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
