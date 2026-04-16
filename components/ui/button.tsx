"use client";

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export function Button({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) {
  return (
    <button
      {...props}
      className={clsx(
        "px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
}
