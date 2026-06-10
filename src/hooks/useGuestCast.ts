import { useQuery } from "@tanstack/react-query";
import { getGuestCastByEpisode } from "../api/tvmaze";

export function useGuestCast(id: number) {
  return useQuery({
    queryKey: ["guests", id],
    queryFn: () => getGuestCastByEpisode(id),
  });
}
