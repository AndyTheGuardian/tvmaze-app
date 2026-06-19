import { useQuery } from "@tanstack/react-query";

export interface PersonSearchResult {
  score: number;
  person: {
    id: number;
    name: string;
    image?: {
      medium?: string;
    };
    country?: {
      name: string;
    };
  };
}

export function usePeopleSearch(query: string) {
  return useQuery({
    queryKey: ["peopleSearch", query],
    enabled: query.trim().length > 1,
    queryFn: async () => {
      const res = await fetch(
        `https://api.tvmaze.com/search/people?q=${encodeURIComponent(query)}`,
      );

      return (await res.json()) as PersonSearchResult[];
    },
  });
}
