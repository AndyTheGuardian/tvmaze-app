import { useMemo } from "react";
import { useGuestCredits } from "../hooks/useGuestCredits";
import { useShowsByIds } from "../hooks/useShowsByIds";
import type { PersonCredit } from "../types/tvmaze";

function getShowId(url: string): number {
  return Number(url.split("/").pop());
}

export function getGuestCastCredits(id: number) {
  const { data: guestCredits = [] } = useGuestCredits(id);

  const guestShowIds = [
    ...new Set(
      guestCredits.map((credit) =>
        getShowId(credit._embedded?.episode?._links?.show?.href!),
      ),
    ),
  ];

  const shows = useShowsByIds(guestShowIds);

  const showMap = useMemo(
    () =>
      new Map(shows.flatMap((q) => (q.data ? [[q.data!.id, q.data!]] : []))),
    [shows],
  );

  const guestPersonCredits: PersonCredit[] = guestCredits
    .map((credit) => {
      const showId = getShowId(credit._embedded.episode._links?.show?.href!);

      const show = showMap.get(showId);

      if (!show) return null;

      return {
        self: credit.self,
        voice: credit.voice,
        show: {
          id: show.id,
          name: show.name,
          image: show.image,
        },
        character: credit._links.character.name,
        guest: true,
      };
    })
    .filter(Boolean) as PersonCredit[];

  return guestPersonCredits;
}
