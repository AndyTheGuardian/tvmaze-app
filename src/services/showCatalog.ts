import type { CatalogShow, TvMazeShow } from "../types/tvmaze";

const CACHE_KEY = "showCatalog";
const CACHE_DATE_KEY = "showCatalogUpdated";

export async function getShowCatalog(): Promise<CatalogShow[]> {
  const cached = localStorage.getItem(CACHE_KEY);
  const updated = localStorage.getItem(CACHE_DATE_KEY);

  // const oneWeek = 1000 * 60 * 60 * 24 * 7;
  const oneMonth = 1000 * 60 * 60 * 24 * 30;

  if (cached && updated && Date.now() - Number(updated) < oneMonth) {
    return JSON.parse(cached) as CatalogShow[];
  }

  const pages = await Promise.all(
    Array.from({ length: 20 }, (_, page) =>
      fetch(`https://api.tvmaze.com/shows?page=${page}`).then((r) => r.json()),
    ),
  );

  const shows = pages.flat() as TvMazeShow[];

  const catalog = shows.map((show) => ({
    id: Number(show.id),
    name: show.name,
    genres: show.genres,
    premiered: show.premiered,
    status: show.status,
    network: show.network?.name,
    webChannel: show.webChannel?.name,
  }));

  try {
    console.log("Saving catalog", catalog.length);

    localStorage.setItem(CACHE_KEY, JSON.stringify(catalog));
    localStorage.setItem(CACHE_DATE_KEY, Date.now().toString());
    console.log("Catalog saved");
  } catch (error) {
    console.error("Failed to save catalog", error);
  }

  return catalog;
}
