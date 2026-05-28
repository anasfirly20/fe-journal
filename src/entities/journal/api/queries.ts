import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { CreateJournal, JournalFilters } from "../model/journal";

import {
  addJournal,
  deleteJournal,
  editJournal,
  getJournals,
} from "./functions";

import type { BodyType } from "@/shared/api";

export const journalsKey = ["journals"] as unknown[];

export function useJournalsQuery(params?: JournalFilters) {
  return useQuery({
    queryKey: journalsKey.concat([{ params }]),
    queryFn: () => getJournals(params),
  });
}

export function useAddJournalMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BodyType<CreateJournal>) => addJournal(data),

    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: journalsKey,
        refetchType: "active",
      });
    },
  });
}

export function useEditJournalMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: BodyType<Partial<CreateJournal>>;
    }) => editJournal(id, data),

    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: journalsKey,
        refetchType: "active",
      });
    },
  });
}

export function useDeleteJournalMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteJournal(id),

    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: journalsKey,
        refetchType: "active",
      });
    },
  });
}
