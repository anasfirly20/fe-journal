import { createRootRoute, Link } from "@tanstack/react-router";

import { ROUTE_PATHS } from "@/shared/constants/routes";

import { Layout } from "../layouts/Layout";

export const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        <Link to={ROUTE_PATHS.main}>Start Over</Link>
      </div>
    );
  },
});
