import type { PersonCredit } from "../types/tvmaze";

export function groupedCastCreditsByShow(credits: PersonCredit[]) {
  const grouped = new Map<
    number,
    {
      self: boolean;
      voice: boolean;
      show: PersonCredit["show"];
      characters: {
        name: string;
        guest: boolean;
        count: number;
      }[];
    }
  >();

  credits.forEach((credit) => {
    const showId = credit.show.id;

    if (!grouped.has(showId)) {
      grouped.set(showId, {
        self: credit.self,
        voice: credit.voice,
        show: credit.show,
        characters: [],
      });
    }

    const group = grouped.get(showId);

    const existing = group?.characters.find(
      (c) => c.name === credit.character && c.guest === credit.guest,
    );

    if (existing) {
      existing.count++;
    } else {
      group?.characters.push({
        name: credit.character,
        guest: credit.guest,
        count: 1,
      });
    }
  });

  return Array.from(grouped.values()); //.sort((a, b) =>
  //   a.show.name.localeCompare(b.show.name),
  // );
}

// const creditsByShow = credits?.reduce(
//   (acc, credit) => {
//     const show = credit._embedded.show;
//     const characterName = credit._links.character?.name;

//     if (!acc[show.id]) {
//       acc[show.id] = {
//         show,
//         characters: [],
//         self: false,
//         voice: false,
//       };
//     }

//     if (characterName) {
//       acc[show.id].characters.push(characterName);
//     }

//     acc[show.id].self ||= credit.self;
//     acc[show.id].voice ||= credit.voice;

//     return acc;
//   },
//   {} as Record<
//     number,
//     {
//       show: CastCredit["_embedded"]["show"];
//       characters: string[];
//       self: boolean;
//       voice: boolean;
//     }
//   >,
// );

// return Object.values(creditsByShow);
// }
