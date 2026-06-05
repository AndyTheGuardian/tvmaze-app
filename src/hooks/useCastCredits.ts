import { useQuery } from "@tanstack/react-query";
import { getCastCredits } from "../api/tvmaze";

export function useCastCredits(id: number) {
  return useQuery({
    queryKey: ["credits", id],
    queryFn: () => getCastCredits(id),
  });
}
