import { createInstance, type SecondParameter } from "@/shared/api";
import type { Journal, JournalFilters } from "../model/journal";

export const getJournals = (
  params?: JournalFilters,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<Journal[]>(
    { url: `/journals`, method: "GET", params },
    options,
  );
};
