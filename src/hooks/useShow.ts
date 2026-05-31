import { useQuery } from "@tanstack/react-query";
import { getShow } from "../api/tvmaze";

export function useShow(showId: number) {
  return useQuery({
    queryKey: ["show", showId],
    queryFn: () => getShow(showId),
    enabled: !!showId,
  });
}
