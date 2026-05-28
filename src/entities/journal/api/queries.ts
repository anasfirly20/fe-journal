import { useQuery } from "@tanstack/react-query";
import type { JournalFilters } from "../model/journal";
import { getJournals } from "./functions";

export const journalsKey = ["journals"] as unknown[];

export function useJournalsQuery(params?: JournalFilters) {
  return useQuery({
    queryKey: journalsKey.concat([{ params }]),
    queryFn: () => getJournals(params),
  });
}
