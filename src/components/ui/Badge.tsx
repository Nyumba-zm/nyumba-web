// src/components/ui/Badge.tsx

import { cn } from "@/lib/utils/cn";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "danger" | "info" | "default";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  const variants = {
    success: "bg-success-600 text-white",
    warning: "bg-warning-600 text-white",
    danger: "bg-danger-600 text-white",
    info: "bg-primary-600 text-white",
    default: "bg-gray-600 text-white",
  };

  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-xs px-3 py-1",
    lg: "text-sm px-4 py-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-bold rounded-full",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
