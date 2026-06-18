import type { CatalogShow, SurpriseFilters } from "../types/tvmaze";

export function filterShows(shows: CatalogShow[], filters: SurpriseFilters) {
  return shows.filter((show) => {
    if (filters.runningOnly && show.status !== "Running") {
      return false;
    }

    if (
      filters.genres.length > 0 &&
      !show.genres.some((g) => filters.genres.includes(g))
    ) {
      return false;
    }

    if (filters.decades.length > 0) {
      const year = Number(show.premiered?.slice(0, 4));

      const matchesDecade = filters.decades.some(
        (decade) => year >= decade && year < decade + 10,
      );

      if (!matchesDecade) {
        return false;
      }
    }

    if (filters.networks && filters.networks.length > 0) {
      const provider = show.webChannel ?? show.network;

      if (!provider || !filters.networks.includes(provider)) {
        return false;
      }
    }

    return true;
  });
}
