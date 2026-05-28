import { useState } from "react";
import { useJournalsQuery } from "@/entities/journal";
import { useWorkTypesQuery } from "@/entities/work-type";
import { Header } from "./Header";
import { FiltersToolbar } from "./FiltersToolbar";
import { CreateJournalDialog } from "./journals/CreateJournalDialog";
import { DeleteJournalDialog } from "./journals/DeleteJournalDialog";
import { DataTable } from "./journals/JournalsTable";
import { getColumns } from "./journals/Columns";

import type { Journal, JournalFilters } from "@/entities/journal/model/journal";

export const MainPage = () => {
  const [filters, setFilters] = useState<JournalFilters>({});

  const { data: journalEntries } = useJournalsQuery(filters);
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
      <FiltersToolbar
        onCreate={handleCreate}
        onChangeFilters={setFilters}
        workTypes={workTypes || []}
      />
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
