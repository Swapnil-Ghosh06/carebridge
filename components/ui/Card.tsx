/**
 * Card component (owner: Swapin)
 * ─────────────────────────────────────────────────────────
 * White card with --r-lg and --shadow-card.
 * Variants: default | flat | bordered
 * Sub-components: CardHeader, CardBody, CardFooter
 *
 * Rules:
 *  - Background: --surface-0
 *  - Radius: --r-lg
 *  - Shadow: --shadow-card
 *  - No arbitrary colours
 */

import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "flat" | "bordered";
  /** Makes the card a pressable/interactive element */
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const variantStyles: Record<NonNullable<CardProps["variant"]>, string> = {
  default:  "bg-[var(--surface-0)] shadow-[var(--shadow-card)]",
  flat:     "bg-[var(--surface-50)]",
  bordered: "bg-[var(--surface-0)] border border-[var(--ink-300)]",
};

const paddingStyles: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "p-0",
  sm:   "p-4",
  md:   "p-6",
  lg:   "p-8",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      interactive = false,
      padding = "md",
      children,
      className = "",
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={[
        "rounded-[var(--r-lg)]",
        "overflow-hidden",
        variantStyles[variant],
        paddingStyles[padding],
        interactive &&
          "cursor-pointer transition-shadow duration-[180ms] hover:shadow-lg active:scale-[0.99]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...(interactive ? { role: "button", tabIndex: 0 } : {})}
      {...props}
    >
      {children}
    </div>
  )
);

Card.displayName = "Card";

/* ── Sub-components ──────────────────────────────────────────── */

export type CardSectionProps = React.HTMLAttributes<HTMLDivElement>;

export const CardHeader = React.forwardRef<HTMLDivElement, CardSectionProps>(
  ({ children, className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={["border-b border-[var(--ink-300)] pb-4 mb-4", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

export const CardBody = React.forwardRef<HTMLDivElement, CardSectionProps>(
  ({ children, className = "", ...props }, ref) => (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  )
);
CardBody.displayName = "CardBody";

export const CardFooter = React.forwardRef<HTMLDivElement, CardSectionProps>(
  ({ children, className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={["border-t border-[var(--ink-300)] pt-4 mt-4", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = "CardFooter";
