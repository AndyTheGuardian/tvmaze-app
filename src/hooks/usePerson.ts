import { useQuery } from "@tanstack/react-query";
import { getPerson } from "../api/tvmaze";

export function usePerson(id: number) {
  return useQuery({
    queryKey: ["person", id],
    queryFn: () => getPerson(id),
  });
}
