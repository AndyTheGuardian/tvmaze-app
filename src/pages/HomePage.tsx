import { useState } from "react";
import { useShows } from "../hooks/useShows";

import { SearchBar } from "../components/SearchBar";
import { ShowCard } from "../components/ShowCard";

export function HomePage() {
  const [search, setSearch] = useState("");

  const { data = [], isLoading } = useShows(search);

  return (
    <div className="bg-gray-900 min-h-screen min-w-screen">
      <main className="relative z-10 mx-auto max-w-5xl p-3 md:p-6">
        <div className="mx-auto max-w-5xl p-3 md:p-6 bg-gray-300/70 rounded-lg">
          <h1 className="mb-6 text-2xl font-bold">Episode Guide</h1>

          <SearchBar value={search} onChange={setSearch} />

          {isLoading && <p className="mt-4">Loading...</p>}

          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {data.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
