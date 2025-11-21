"use client";

import { cn } from "@/lib/utils/cn";

export type KYCStatusType = "pending" | "verified" | "rejected" | "not_started";

interface KYCStatusProps {
  status: KYCStatusType;
  className?: string;
}

const statusConfig = {
  pending: {
    label: "KYC Pending",
    color: "text-yellow-700 bg-yellow-50 border-yellow-200",
    icon: "⏳",
  },
  verified: {
    label: "KYC Verified",
    color: "text-green-700 bg-green-50 border-green-200",
    icon: "✓",
  },
  rejected: {
    label: "KYC Rejected",
    color: "text-red-700 bg-red-50 border-red-200",
    icon: "✗",
  },
  not_started: {
    label: "KYC Not Started",
    color: "text-gray-700 bg-gray-50 border-gray-200",
    icon: "○",
  },
};

export function KYCStatus({ status, className }: KYCStatusProps) {
  const config = statusConfig[status];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium",
        config.color,
        className
      )}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </div>
  );
}
