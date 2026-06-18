import { useQuery } from "@tanstack/react-query";
import { getShowCatalog } from "../services/showCatalog";
import type { CatalogShow } from "../types/tvmaze";

export function useShowCatalog() {
  return useQuery<CatalogShow[]>({
    queryKey: ["showCatalog"],
    queryFn: getShowCatalog,
    staleTime: Infinity,
  });
}
