"use client";

import type { Journal } from "@/entities/journal/model/journal";
import { Button } from "@/shared/ui/Button";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";

export const columns: ColumnDef<Journal>[] = [
  {
    accessorKey: "performedAt",
    header: "Дата",
    cell: ({ row }) => {
      return new Date(row.original.performedAt).toLocaleDateString("ru-RU");
    },
  },
  {
    accessorKey: "workType.name",
    header: "Вид работ",
  },
  {
    accessorKey: "volume",
    header: "Объём",
    cell: ({ row }) => {
      const { volume, unit } = row.original;

      return `${volume} ${unit}`;
    },
  },
  {
    accessorKey: "unit",
    header: "Ед. изм.",
  },
  {
    accessorKey: "workerName",
    header: "Исполнитель",
  },
  {
    id: "actions",
    header: "Действия",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit />
          </Button>
          <Button variant="outline">
            <Trash2 className="text-danger" />
          </Button>
        </div>
      );
    },
  },
];
