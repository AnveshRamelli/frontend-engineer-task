"use client";
import * as React from "react";
import { cn } from "@/utils/helpers";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "border rounded-lg bg-white shadow-sm hover:shadow-md transition p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
