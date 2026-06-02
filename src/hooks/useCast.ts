import { useQuery } from "@tanstack/react-query";
import { getCast } from "../api/tvmaze";

export function useCast(showId: number, enabled: boolean) {
  return useQuery({
    queryKey: ["cast", showId],
    queryFn: () => getCast(showId),
    enabled,
    staleTime: Infinity,
  });
}
