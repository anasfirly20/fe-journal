import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routes/routeTree";

// eslint-disable-next-line react-refresh/only-export-components
export const router = createRouter({
  routeTree,
  scrollToTopSelectors: ["#main-scrollable-area"],
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const Providers = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Providers;
