import * as React from "react";
import { cn } from "../lib/cn";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-md border border-border bg-card px-3 py-2 text-sm text-text-primary shadow-card transition-all outline-none",
        "placeholder:text-text-muted",
        "focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/30",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-surface-secondary disabled:text-text-muted disabled:opacity-70",
        "aria-invalid:border-danger aria-invalid:ring-3 aria-invalid:ring-danger/15",
        "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text-primary",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
