import { useDeleteJournalMutation, type Journal } from "@/entities/journal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/Dialog";
import { Button } from "@/shared/ui/Button";
import { Loader2, Trash2 } from "lucide-react";

interface DeleteJournalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  journal: Journal | null;
}

export const DeleteJournalDialog = ({
  open,
  onOpenChange,
  journal,
}: DeleteJournalDialogProps) => {
  const { mutateAsync, isPending } = useDeleteJournalMutation();

  const handleDelete = async () => {
    if (!journal) return;
    await mutateAsync(journal.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-4xl border-border bg-card p-0 shadow-card sm:max-w-[680px]">
        <div className="px-8 pt-10 pb-8">
          <DialogHeader className="items-center text-center">
            <div className="flex size-24 items-center justify-center rounded-full border border-danger/10 bg-danger/5 shadow-sm">
              <div className="flex size-16 items-center justify-center rounded-full bg-danger/10">
                <Trash2 size={30} className="text-danger" />
              </div>
            </div>

            <div className="space-y-3 pt-7">
              <DialogTitle className="text-[42px] font-semibold tracking-[-0.04em] text-text-primary">
                Удаление записи
              </DialogTitle>

              <DialogDescription className="mx-auto max-w-120 text-[17px] leading-relaxed text-text-secondary">
                Вы уверены, что хотите удалить запись из журнала работ? Это
                действие нельзя будет отменить.
              </DialogDescription>
            </div>
          </DialogHeader>

          {journal && (
            <div className="mt-9 overflow-hidden rounded-3xl border border-border bg-background">
              <div className="border-b border-border bg-accent/30 px-6 py-4">
                <span className="text-sm font-semibold uppercase tracking-[0.08em] text-text-secondary">
                  Информация о записи
                </span>
              </div>

              <div className="space-y-5 px-6 py-6">
                <div className="grid grid-cols-[160px_1fr] items-center gap-y-5">
                  <span className="text-[15px] font-medium text-text-secondary">
                    Исполнитель
                  </span>
                  <span className="text-[15px] font-semibold text-text-primary">
                    {journal.workerName}
                  </span>

                  <span className="text-[15px] font-medium text-text-secondary">
                    Вид работ
                  </span>
                  <span className="text-[15px] font-semibold text-text-primary">
                    {journal.workType.name}
                  </span>

                  <span className="text-[15px] font-medium text-text-secondary">
                    Объем работ
                  </span>
                  <span className="text-[15px] font-semibold text-text-primary">
                    {journal.volume} {journal.unit}
                  </span>

                  <span className="text-[15px] font-medium text-text-secondary">
                    Дата выполнения
                  </span>
                  <span className="text-[15px] font-semibold text-text-primary">
                    {new Date(journal.performedAt).toLocaleDateString("ru-RU")}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="border-t border-border bg-background/70 px-8 py-6">
          <Button
            type="button"
            variant="outline"
            className="h-14 rounded-2xl px-8 text-base font-medium"
            onClick={() => onOpenChange(false)}
          >
            Отмена
          </Button>

          <Button
            type="button"
            variant="destructive"
            className="h-14 rounded-2xl px-8 text-base font-medium shadow-sm"
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Trash2 size={18} />
            )}
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
