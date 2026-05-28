import { useEffect } from "react";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  ListFilter,
  Plus,
  RotateCcw,
} from "lucide-react";
import { format } from "date-fns";
import { ru } from "react-day-picker/locale";
import { parseAsString, useQueryStates } from "nuqs";
import { Calendar } from "@/shared/ui/Calendar";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { cn } from "@/shared/lib/cn";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover";
import { useDebounce } from "@/shared/lib/useDebounce";

import type { DateRange } from "react-day-picker";
import type { JournalFilters } from "@/entities/journal/model/journal";
import type { WorkType } from "@/entities/work-type/model/work-type";

interface FiltersToolbarProps {
  onCreate: () => void;
  onChangeFilters: (filters: JournalFilters) => void;
  workTypes: WorkType[];
}

export const FiltersToolbar = ({
  onCreate,
  onChangeFilters,
  workTypes,
}: FiltersToolbarProps) => {
  const [filters, setFilters] = useQueryStates({
    from: parseAsString,
    to: parseAsString,
    workTypeId: parseAsString,
    workerName: parseAsString,
  });
  const debouncedWorkerName = useDebounce(filters.workerName, 500);

  const dateRange: DateRange | undefined = filters.from
    ? {
        from: new Date(filters.from),
        to: filters.to ? new Date(filters.to) : undefined,
      }
    : undefined;

  useEffect(() => {
    const workTypeId = filters.workTypeId
      ? Number(filters.workTypeId)
      : undefined;

    const workerName = debouncedWorkerName || undefined;

    if (filters.from && !filters.to) {
      onChangeFilters({
        date: filters.from,
        workTypeId,
        workerName,
      });

      return;
    }

    onChangeFilters({
      from: filters.from || undefined,
      to: filters.to || undefined,
      workTypeId,
      workerName,
    });
  }, [debouncedWorkerName, filters, onChangeFilters]);

  const hasActiveFilters =
    !!filters.from ||
    !!filters.to ||
    !!filters.workTypeId ||
    !!filters.workerName;

  return (
    <section className="mt-5 rounded-lg border border-border bg-card p-4 shadow-card">
      <div className="flex justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-14 min-w-90 justify-between px-5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-md bg-accent">
                    <CalendarIcon size={20} className="text-text-secondary" />
                  </div>

                  <span className="text-base font-semibold text-text-primary">
                    {dateRange?.from
                      ? format(dateRange.from, "dd.MM.yyyy")
                      : "Дата"}
                    {" - "}
                    {dateRange?.to
                      ? format(dateRange.to, "dd.MM.yyyy")
                      : "Дата"}
                  </span>
                </div>

                <ChevronDown size={18} className="text-text-secondary" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="p-0">
              <Calendar
                mode="range"
                selected={dateRange}
                locale={ru}
                numberOfMonths={2}
                onSelect={(range) => {
                  setFilters({
                    from: range?.from ? format(range.from, "yyyy-MM-dd") : null,
                    to: range?.to ? format(range.to, "yyyy-MM-dd") : null,
                  });
                }}
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-14 min-w-[320px] justify-between px-5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-md bg-accent">
                    <ListFilter size={20} className="text-text-secondary" />
                  </div>

                  <span className="text-base font-semibold text-text-primary">
                    {filters.workTypeId
                      ? workTypes.find(
                          (item) => item.id === Number(filters.workTypeId),
                        )?.name
                      : "Все виды работ"}
                  </span>
                </div>

                <ChevronDown size={18} className="text-text-secondary" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[320px] p-2">
              <div className="space-y-1">
                <button
                  className={cn(
                    "flex h-11 w-full items-center rounded-md px-3 text-left text-sm transition-colors",
                    !filters.workTypeId
                      ? "bg-accent font-medium text-text-primary"
                      : "hover:bg-accent",
                  )}
                  onClick={() => {
                    setFilters({
                      workTypeId: null,
                    });
                  }}
                >
                  Все виды работ
                </button>

                {workTypes.map((item) => (
                  <button
                    key={item.id}
                    className={cn(
                      "flex h-11 w-full items-center rounded-md px-3 text-left text-sm transition-colors",
                      filters.workTypeId === String(item.id)
                        ? "bg-accent font-medium text-text-primary"
                        : "hover:bg-accent",
                    )}
                    onClick={() => {
                      setFilters({
                        workTypeId: String(item.id),
                      });
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <div className="relative">
            <Input
              placeholder="Поиск по исполнителю..."
              value={filters.workerName || ""}
              onChange={(e) => {
                setFilters({
                  workerName: e.target.value || null,
                });
              }}
              className="h-14 w-70 px-5 text-base"
            />
          </div>

          <Button
            variant="outline"
            className="h-14 shrink-0 gap-3 px-5"
            disabled={!hasActiveFilters}
            onClick={() => {
              setFilters({
                from: null,
                to: null,
                workTypeId: null,
                workerName: null,
              });
            }}
          >
            <RotateCcw size={18} className="text-text-secondary" />
            <span>Сбросить</span>
          </Button>
        </div>

        <Button
          variant="default"
          className="h-14 shrink-0 gap-3 px-6"
          onClick={onCreate}
        >
          <Plus size={20} />
          <span>Добавить запись</span>
        </Button>
      </div>
    </section>
  );
};
