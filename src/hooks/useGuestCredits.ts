import { useQuery } from "@tanstack/react-query";
import { getGuestCastByPerson } from "../api/tvmaze";

export function useGuestCredits(id: number) {
  return useQuery({
    queryKey: ["guestcredits", id],
    queryFn: () => getGuestCastByPerson(id),
  });
}
