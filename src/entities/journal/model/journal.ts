import type { WorkType } from "@/entities/work-type/@x/journal";

export interface Journal {
  id: number;
  workTypeId: number;
  volume: number;
  unit: string;
  workerName: string;
  performedAt: string;
  createdAt: string;
  updatedAt: string;
  workType: WorkType;
}

export interface JournalFilters {
  date?: string;
  from?: string;
  to?: string;
  workTypeId?: number;
  workerName?: string;
}

export interface CreateJournal {
  workTypeId: number;
  volume: number;
  unit: string;
  workerName: string;
  performedAt: string;
}
