import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routes/routeTree";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/react";

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

const queryClient = new QueryClient();

const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <NuqsAdapter>
        <RouterProvider router={router} />
      </NuqsAdapter>
    </QueryClientProvider>
  );
};

export default Providers;
