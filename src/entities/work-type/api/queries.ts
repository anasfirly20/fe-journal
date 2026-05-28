import { useQuery } from "@tanstack/react-query";
import { getWorkTypes } from "./functions";

export const workTypesKey = ["work-types"] as unknown[];

export function useWorkTypesQuery() {
  return useQuery({
    queryKey: workTypesKey,
    queryFn: () => getWorkTypes(),
  });
}
