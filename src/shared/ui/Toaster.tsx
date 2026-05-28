"use client";

import * as React from "react";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";

import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      richColors={false}
      expand={false}
      closeButton={false}
      position="bottom-right"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-primary" />,
        info: <InfoIcon className="size-4 text-primary" />,
        warning: <TriangleAlertIcon className="size-4 text-yellow-500" />,
        error: <OctagonXIcon className="size-4 text-danger" />,
        loading: <Loader2Icon className="size-4 animate-spin text-primary" />,
      }}
      style={
        {
          "--normal-bg": "rgba(255,255,255,0.96)",
          "--normal-text": "var(--color-text-primary)",
          "--normal-border": "rgba(226,232,240,0.9)",
          "--border-radius": "18px",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group toast border border-border/80 bg-card/95 text-text-primary backdrop-blur-xl rounded-2xl shadow-[0_12px_40px_rgba(15,23,42,0.12)] px-4 py-3",
          title: "text-sm font-semibold text-text-primary tracking-[-0.01em]",
          description: "text-sm leading-relaxed text-text-secondary",
          icon: "shrink-0",
          actionButton:
            "bg-primary text-white hover:bg-primary-hover rounded-xl border-0 h-9 px-4 text-sm font-medium",
          cancelButton:
            "bg-surface-secondary text-text-secondary hover:bg-border-light rounded-xl border border-border h-9 px-4 text-sm font-medium",
          closeButton:
            "bg-card border border-border text-text-secondary hover:bg-accent hover:text-text-primary",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
