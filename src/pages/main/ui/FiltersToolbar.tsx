import {
  Calendar as CalendarIcon,
  ChevronDown,
  ListFilter,
  Plus,
  RotateCcw,
} from "lucide-react";

import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { addDays, format } from "date-fns";

import { Calendar } from "@/shared/ui/Calendar";
import { Button } from "@/shared/ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover";

export const FiltersToolbar = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 4, 1),
    to: addDays(new Date(new Date().getFullYear(), 4, 1), 30),
  });

  return (
    <section className="rounded-lg mt-5 border border-border bg-card p-4 shadow-card">
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
                    {" — "}
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
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button
            variant="outline"
            className="h-14 min-w-[320px] justify-between px-5"
          >
            <div className="flex items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-md bg-accent">
                <ListFilter size={20} className="text-text-secondary" />
              </div>
              <span className="text-base font-semibold text-text-primary">
                Все виды работ
              </span>
            </div>
            <ChevronDown size={18} className="text-text-secondary" />
          </Button>
          <Button variant="outline" className="h-14 shrink-0 gap-3 px-5">
            <RotateCcw size={18} className="text-text-secondary" />
            <span>Сбросить</span>
          </Button>
        </div>
        <Button variant="default" className="h-14 shrink-0 gap-3 px-6">
          <Plus size={20} />
          <span>Добавить запись</span>
        </Button>
      </div>
    </section>
  );
};
