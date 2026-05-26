import { createRoute } from "@tanstack/react-router";

import { rootRoute } from "./root";
import { MainPage } from "@/pages/main";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: MainPage,
});
