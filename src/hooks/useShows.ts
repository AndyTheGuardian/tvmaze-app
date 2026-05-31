import { useQuery } from "@tanstack/react-query";
import { searchShows } from "../api/tvmaze";

export function useShows(search: string) {
  return useQuery({
    queryKey: ["shows", search],
    queryFn: () => searchShows(search),
    enabled: search.length > 2,
  });
}
