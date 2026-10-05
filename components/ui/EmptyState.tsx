/**
 * EmptyState component (owner: Swapin)
 * ─────────────────────────────────────────────────────────
 * Friendly zero-data state with illustration or icon slot.
 *
 * Rules:
 *  - Font: Montserrat (title), DM Sans (description)
 *  - Supports custom illustration or built-in graphic
 *  - Optional action button
 */

"use client";

import * as React from "react";
import { FolderOpen } from "lucide-react";
import { Button } from "./Button";

export interface EmptyStateProps {
  title: string;
  description: string;
  illustration?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  description,
  illustration,
  actionLabel,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 bg-[var(--surface-0)] rounded-[var(--r-lg)] border border-[var(--ink-300)] ${className}`}
    >
      {/* Graphic / Illustration Slot */}
      <div className="mb-4 flex items-center justify-center max-w-[200px]">
        {illustration ? (
          illustration
        ) : (
          <div className="w-16 h-16 rounded-[var(--r-pill)] bg-[var(--surface-100)] flex items-center justify-center text-[var(--ink-500)]">
            <FolderOpen className="w-8 h-8" />
          </div>
        )}
      </div>

      {/* Content */}
      <h4 className="font-display font-bold text-lg text-[var(--ink-900)] mb-1">
        {title}
      </h4>
      <p className="font-body text-sm text-[var(--ink-500)] max-w-sm mb-5 leading-relaxed">
        {description}
      </p>

      {/* Action CTA */}
      {actionLabel && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
