import { useJournalsQuery } from "@/entities/journal";
import { FiltersToolbar } from "./FiltersToolbar";
import { Header } from "./Header";
import { columns } from "./journals/columns";
import { DataTable } from "./journals/data-table";

export const MainPage = () => {
  const { data } = useJournalsQuery();
  console.log("trig data", data);

  return (
    <section>
      <Header />
      <FiltersToolbar />
      <DataTable columns={columns} data={data || []} />
    </section>
  );
};
