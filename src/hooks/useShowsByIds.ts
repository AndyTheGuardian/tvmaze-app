import { useQueries } from "@tanstack/react-query";
import { getShow } from "../api/tvmaze";

export function useShowsByIds(ids: number[]) {
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: ["show", id],
      queryFn: () => getShow(id),
    })),
  });
}
