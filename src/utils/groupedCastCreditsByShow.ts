import type { CastCredit } from "../types/tvmaze";

export function groupedCastCreditsByShow(credits: CastCredit[]) {
  const creditsByShow = credits?.reduce(
    (acc, credit) => {
      const show = credit._embedded.show;
      const characterName = credit._links.character?.name;

      if (!acc[show.id]) {
        acc[show.id] = {
          show,
          characters: [],
          self: false,
          voice: false,
        };
      }

      if (characterName) {
        acc[show.id].characters.push(characterName);
      }

      acc[show.id].self ||= credit.self;
      acc[show.id].voice ||= credit.voice;

      return acc;
    },
    {} as Record<
      number,
      {
        show: CastCredit["_embedded"]["show"];
        characters: string[];
        self: boolean;
        voice: boolean;
      }
    >,
  );

  return Object.values(creditsByShow);
}
