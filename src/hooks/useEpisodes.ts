import { useQuery } from "@tanstack/react-query";
import { getShowEpisodes } from "../api/tvmaze";

export function useEpisodes(showId: number) {
  return useQuery({
    queryKey: ["episodes", showId],
    queryFn: () => getShowEpisodes(showId),
    enabled: !!showId,
  });
}
