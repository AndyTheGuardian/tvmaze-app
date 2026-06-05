import { useShows } from "../hooks/useShows";
import { SearchBar } from "../components/SearchBar";
import { ShowCard } from "../components/ShowCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { getRandomShow } from "../utils/getRandomShow";
import { Dices } from "lucide-react";

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("q") ?? "";

  const handleSearchChange = (value: string) => {
    setSearchParams(value ? { q: value } : {});
  };

  const { data = [], isLoading } = useShows(search);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSurpriseMe = async () => {
    setLoading(true);

    try {
      const show = await getRandomShow();

      navigate(`/show/${show.id}`);
    } finally {
      setLoading(false);
    }
  };

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
        <div className="mx-auto max-w-5xl p-3 md:p-6 bg-black/50 rounded-lg">
          <div className="flex">
            <h1 className="mb-6 flex-1 text-2xl font-bold">Episode Guide</h1>
            <button
              className="mt-1 flex gap-2 text-sm opacity-50 cursor-pointer"
              onClick={handleSurpriseMe}
              disabled={loading}
            >
              {loading ? "Finding something good..." : "Surprise me!"}
              <Dices size={18} />
            </button>
          </div>
          <SearchBar
            value={search}
            onChange={handleSearchChange}
            placeholder="Search TV shows..."
            active={true}
          />

          {isLoading && <p className="mt-4">Loading...</p>}

          <div className="mt-3 grid gap-4 grid-cols-2 md:grid-cols-4">
            {data.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
