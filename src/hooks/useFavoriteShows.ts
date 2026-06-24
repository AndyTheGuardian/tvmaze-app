import { useQueries } from "@tanstack/react-query";
import { getFavoriteShows } from "../utils/favorites";

export function useFavoriteShows() {
  const favorites = getFavoriteShows();

  return useQueries({
    queries: favorites.map((show) => ({
      queryKey: ["fav-episodes", show.id],
      queryFn: async () => {
        const res = await fetch(
          `https://api.tvmaze.com/shows/${show.id}?embed[]=previousepisode&embed[]=nextepisode`,
        );

        return res.json();
      },
      staleTime: 1000 * 60 * 60,
    })),
  });
}
