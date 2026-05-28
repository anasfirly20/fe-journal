import { createInstance, type SecondParameter } from "@/shared/api";
import type { WorkType } from "../model/work-type";

export const getWorkTypes = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<WorkType[]>(
    { url: `/work-types`, method: "GET" },
    options,
  );
};
