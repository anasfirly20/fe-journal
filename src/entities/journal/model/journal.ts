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

interface WorkType {
  id: number;
  name: string;
}

export interface JournalFilters {
  date?: string;
  from?: string;
  to?: string;
}
