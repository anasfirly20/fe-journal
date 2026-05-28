import type { Journal } from "@/entities/journal/model/journal";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/shared/ui/Button";
import { Edit, Trash2 } from "lucide-react";

interface ColumnsProps {
  onEdit: (journal: Journal) => void;
  onDelete: (journal: Journal) => void;
}

export const getColumns = ({
  onEdit,
  onDelete,
}: ColumnsProps): ColumnDef<Journal>[] => [
  {
    accessorKey: "performedAt",
    header: "Дата",
    cell: ({ row }) => {
      return new Date(row.original.performedAt).toLocaleDateString("ru-RU");
    },
  },
  {
    accessorKey: "workerName",
    header: "Исполнитель",
  },
  {
    accessorKey: "workType.name",
    header: "Вид работ",
  },
  {
    id: "volume",
    header: "Объём",
    cell: ({ row }) => {
      const { volume, unit } = row.original;

      const unitMap: Record<string, string> = {
        M2: "м²",
        M3: "м³",
        PCS: "шт",
        KG: "кг",
        TON: "т",
        METER: "м",
      };

      return (
        <div className="font-medium text-text-primary">
          {volume} {unitMap[unit] || unit}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Действия",
    cell: ({ row }) => {
      const journal = row.original;

      return (
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onEdit(journal)}>
            <Edit />
          </Button>

          <Button variant="outline" onClick={() => onDelete(journal)}>
            <Trash2 className="text-danger" />
          </Button>
        </div>
      );
    },
  },
];
