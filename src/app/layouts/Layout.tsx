import { Outlet } from "@tanstack/react-router";

export const Layout = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex w-full max-w-400 flex-col px-10 py-10">
        <Outlet />
      </div>
    </main>
  );
};
