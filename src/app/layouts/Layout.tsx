import { Outlet } from "@tanstack/react-router";

export const Layout = () => {
  return (
    <main className="">
      <Outlet />
    </main>
  );
};
