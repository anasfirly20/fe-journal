// CreateJournalDialog.tsx

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { format } from "date-fns";
import { ru } from "date-fns/locale";

import { CalendarIcon, Loader2, Plus, Save } from "lucide-react";

import { useForm } from "react-hook-form";

import { z } from "zod";

import type { Journal } from "@/entities/journal/model/journal";

import {
  useAddJournalMutation,
  useEditJournalMutation,
} from "@/entities/journal";

import { Button } from "@/shared/ui/Button";

import { Calendar } from "@/shared/ui/Calendar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/Dialog";

import { Input } from "@/shared/ui/Input";

import { Label } from "@/shared/ui/Label";

import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select";
import type { WorkType } from "@/entities/work-type/model/work-type";
import { UNITS } from "../../model/units";

const createJournalSchema = z.object({
  workTypeId: z.coerce.number({
    error: "Выберите вид работ",
  }),
  volume: z.coerce.number().min(1, "Введите объем"),
  unit: z.enum(["M2", "M3", "PCS", "KG", "TON", "METER"], {
    error: "Выберите единицу измерения",
  }),
  workerName: z.string().min(1, "Введите исполнителя"),
  performedAt: z.date({
    error: "Выберите дату выполнения",
  }),
});

type CreateJournalFormData = z.infer<typeof createJournalSchema>;

interface CreateJournalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  journal?: Journal | null;
  workTypes: WorkType[];
}

export const CreateJournalDialog = ({
  open,
  onOpenChange,
  journal,
  workTypes,
}: CreateJournalDialogProps) => {
  const { mutateAsync: createJournal, isPending: isCreating } =
    useAddJournalMutation();

  const { mutateAsync: editJournal, isPending: isEditing } =
    useEditJournalMutation();

  const isPending = isCreating || isEditing;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateJournalFormData>({
    resolver: zodResolver(createJournalSchema),
    defaultValues: {
      workerName: "",
    },
  });

  useEffect(() => {
    if (journal) {
      reset({
        workTypeId: journal.workTypeId,
        volume: journal.volume,
        unit: journal.unit as CreateJournalFormData["unit"],
        workerName: journal.workerName,
        performedAt: new Date(journal.performedAt),
      });

      return;
    }

    reset({
      workTypeId: undefined,
      volume: undefined,
      unit: undefined,
      workerName: "",
      performedAt: undefined,
    });
  }, [journal, reset, open]);

  const performedAt = watch("performedAt");

  const onSubmit = async (data: CreateJournalFormData) => {
    const payload = {
      workTypeId: data.workTypeId,
      volume: data.volume,
      unit: data.unit,
      workerName: data.workerName,
      performedAt: data.performedAt.toISOString(),
    };

    if (journal) {
      await editJournal({
        id: journal.id,
        data: payload,
      });
    } else {
      await createJournal(payload);
    }

    reset();

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[720px] rounded-[28px] border-border bg-card p-0 shadow-card">
        <DialogHeader className="px-8 pt-8 pb-6">
          <div className="space-y-2">
            <DialogTitle className="text-[40px] font-semibold tracking-[-0.03em] text-text-primary">
              {journal ? "Редактирование записи" : "Добавление записи"}
            </DialogTitle>
            <DialogDescription className="text-base text-text-secondary">
              Заполните информацию о выполненных работах
            </DialogDescription>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6 px-8 pb-8">
            <div className="space-y-3">
              <Label>
                Вид работ <span className="text-danger">*</span>
              </Label>

              <Select
                value={String(watch("workTypeId") || "")}
                onValueChange={(value) => setValue("workTypeId", Number(value))}
              >
                <SelectTrigger className="h-14! rounded-2xl">
                  <SelectValue placeholder="Выберите вид работ" />
                </SelectTrigger>
                <SelectContent>
                  {workTypes.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.workTypeId && (
                <p className="text-sm text-danger">
                  {errors.workTypeId.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label>
                  Объем <span className="text-danger">*</span>
                </Label>
                <Input
                  type="number"
                  placeholder="Введите объем"
                  className="h-14 rounded-2xl"
                  {...register("volume")}
                />

                {errors.volume && (
                  <p className="text-sm text-danger">{errors.volume.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label>
                  Ед. изм. <span className="text-danger">*</span>
                </Label>
                <Select
                  value={watch("unit")}
                  onValueChange={(value) =>
                    setValue("unit", value as CreateJournalFormData["unit"])
                  }
                >
                  <SelectTrigger className="h-14! rounded-2xl">
                    <SelectValue placeholder="Выберите единицу" />
                  </SelectTrigger>
                  <SelectContent>
                    {UNITS.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.unit && (
                  <p className="text-sm text-danger">{errors.unit.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Label>
                Исполнитель <span className="text-danger">*</span>
              </Label>
              <Input
                placeholder="Введите ФИО исполнителя"
                className="h-14 rounded-2xl"
                {...register("workerName")}
              />

              {errors.workerName && (
                <p className="text-sm text-danger">
                  {errors.workerName.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label>
                Дата выполнения <span className="text-danger">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-14 w-full justify-between rounded-2xl px-4 font-normal"
                  >
                    {performedAt ? (
                      format(performedAt, "dd MMMM yyyy", {
                        locale: ru,
                      })
                    ) : (
                      <span className="text-text-secondary">Выберите дату</span>
                    )}

                    <CalendarIcon className="size-5" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={performedAt}
                    onSelect={(date) => setValue("performedAt", date as Date)}
                  />
                </PopoverContent>
              </Popover>

              {errors.performedAt && (
                <p className="text-sm text-danger">
                  {errors.performedAt.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-border px-8 py-6">
            <Button
              type="button"
              variant="outline"
              className="h-12 rounded-2xl px-6"
              onClick={() => onOpenChange(false)}
            >
              Отмена
            </Button>

            <Button
              type="submit"
              className="h-12 rounded-2xl px-6"
              disabled={isPending}
            >
              {isPending && <Loader2 className="animate-spin" />}

              {journal ? (
                <>
                  <Save className="size-5" />
                  <span>Сохранить</span>
                </>
              ) : (
                <>
                  <Plus className="size-5" />
                  <span>Создать</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
