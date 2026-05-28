import { useState } from "react";
import { useJournalsQuery } from "@/entities/journal";
import { FiltersToolbar } from "./FiltersToolbar";
import { getColumns } from "./journals/columns";
import { CreateJournalDialog } from "./journals/CreateJournalDialog";
import { DeleteJournalDialog } from "./journals/DeleteJournalDialog";
import { DataTable } from "./journals/data-table";
import { Header } from "./Header";

import type { Journal } from "@/entities/journal/model/journal";
import { useWorkTypesQuery } from "@/entities/work-type";

export const MainPage = () => {
  const { data: journalEntries } = useJournalsQuery();
  const { data: workTypes } = useWorkTypesQuery();

  const [createOpen, setCreateOpen] = useState(false);

  const [editingJournal, setEditingJournal] = useState<Journal | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingJournal, setDeletingJournal] = useState<Journal | null>(null);

  const handleCreate = () => {
    setEditingJournal(null);
    setCreateOpen(true);
  };

  const handleEdit = (journal: Journal) => {
    setEditingJournal(journal);
    setCreateOpen(true);
  };

  const handleDelete = (journal: Journal) => {
    setDeletingJournal(journal);
    setDeleteOpen(true);
  };

  const columns = getColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <section>
      <Header />
      <FiltersToolbar onCreate={handleCreate} />
      <DataTable columns={columns} data={journalEntries || []} />

      <CreateJournalDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        journal={editingJournal}
        workTypes={workTypes || []}
      />
      <DeleteJournalDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        journal={deletingJournal}
      />
    </section>
  );
};
