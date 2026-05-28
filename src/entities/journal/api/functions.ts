import {
  createInstance,
  type BodyType,
  type SecondParameter,
} from "@/shared/api";
import type { CreateJournal, Journal, JournalFilters } from "../model/journal";

export const getJournals = (
  params?: JournalFilters,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<Journal[]>(
    { url: `/journals`, method: "GET", params },
    options,
  );
};

export const addJournal = (
  payload: BodyType<CreateJournal>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<CreateJournal>(
    {
      url: `/journals`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: payload,
    },
    options,
  );
};

export const editJournal = (
  id: number,
  payload: BodyType<Partial<CreateJournal>>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<Partial<CreateJournal>>(
    {
      url: `/journals/${id}`,
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      data: payload,
    },
    options,
  );
};

export const deleteJournal = (
  id: number,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance(
    {
      url: `/journals/${id}`,
      method: "DELETE",
    },
    options,
  );
};
