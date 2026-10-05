/**
 * Button component (owner: Swapin)
 * ─────────────────────────────────────────────────────────
 * Variants: primary (teal), secondary (indigo), ghost, danger, success, outline
 * Sizes: sm | md | lg
 *
 * Rules:
 *  - Font: Montserrat 700 (font-display)
 *  - Min height: 48px (touch target requirement)
 *  - Pill radius (--r-pill)
 *  - No arbitrary colours — tokens only
 *  - No emoji — use lucide-react icons
 */

"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "success" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  /** Icon placed before the label */
  iconLeft?: React.ReactNode;
  /** Icon placed after the label */
  iconRight?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--brand-teal)] text-[var(--surface-0)] " +
    "hover:bg-[var(--brand-teal-600)] active:scale-[0.98] " +
    "disabled:opacity-50 disabled:cursor-not-allowed",
  secondary:
    "bg-[var(--brand-indigo)] text-[var(--surface-0)] " +
    "hover:opacity-90 active:scale-[0.98] " +
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ghost:
    "bg-transparent text-[var(--ink-700)] border border-[var(--ink-300)] " +
    "hover:bg-[var(--surface-100)] active:scale-[0.98] " +
    "disabled:opacity-50 disabled:cursor-not-allowed",
  outline:
    "bg-transparent text-[var(--ink-700)] border border-[var(--ink-300)] " +
    "hover:bg-[var(--surface-100)] active:scale-[0.98] " +
    "disabled:opacity-50 disabled:cursor-not-allowed",
  danger:
    "bg-[var(--risk-red)] text-[var(--surface-0)] " +
    "hover:opacity-90 active:scale-[0.98] " +
    "disabled:opacity-50 disabled:cursor-not-allowed",
  success:
    "bg-[var(--risk-green)] text-[var(--surface-0)] " +
    "hover:opacity-90 active:scale-[0.98] " +
    "disabled:opacity-50 disabled:cursor-not-allowed",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-[40px] px-4 text-sm gap-1.5",
  md: "min-h-[48px] px-6 text-base gap-2",
  lg: "min-h-[56px] px-8 text-lg gap-2.5",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      isLoading = false,
      fullWidth = false,
      iconLeft,
      iconRight,
      children,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    const isBusy = loading || isLoading;
    const isDisabled = disabled || isBusy;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={isBusy}
        className={[
          // Base
          "inline-flex items-center justify-center",
          "font-display font-bold",
          "rounded-[var(--r-pill)]",
          "transition-all duration-[180ms] ease-out",
          "focus-visible:outline-2 focus-visible:outline-[var(--brand-teal)] focus-visible:outline-offset-2",
          "select-none whitespace-nowrap",
          // Variant
          variantStyles[variant],
          // Size
          sizeStyles[size],
          // Full width
          fullWidth ? "w-full" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {isBusy ? (
          <Loader2
            className="animate-spin shrink-0"
            size={size === "sm" ? 14 : size === "lg" ? 20 : 16}
            aria-hidden="true"
          />
        ) : (
          iconLeft && (
            <span className="shrink-0" aria-hidden="true">
              {iconLeft}
            </span>
          )
        )}
        {children && <span>{children}</span>}
        {!isBusy && iconRight && (
          <span className="shrink-0" aria-hidden="true">
            {iconRight}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
