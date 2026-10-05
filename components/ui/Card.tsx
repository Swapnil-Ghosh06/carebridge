/**
 * Card component (Daisy × Claud Tactile Neo-Brutalist Edition)
 * ─────────────────────────────────────────────────────────────
 * Clean white or warm surface with 2px ink border and tactile drop shadow.
 */

import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "flat" | "bordered" | "lavender" | "yellow" | "lime";
  interactive?: boolean;
  hoverEffect?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const variantStyles: Record<NonNullable<CardProps["variant"]>, string> = {
  default:  "bg-white border-2 border-[var(--ink-900)] shadow-[4px_4px_0px_var(--ink-900)]",
  flat:     "bg-[var(--surface-50)] border-2 border-[var(--ink-900)]",
  bordered: "bg-white border-2 border-[var(--ink-900)] shadow-[2px_2px_0px_var(--ink-900)]",
  lavender: "bg-[var(--accent-lavender)] border-2 border-[var(--ink-900)] shadow-[4px_4px_0px_var(--ink-900)]",
  yellow:   "bg-[var(--accent-yellow)] border-2 border-[var(--ink-900)] shadow-[4px_4px_0px_var(--ink-900)]",
  lime:     "bg-[var(--accent-lime)] border-2 border-[var(--ink-900)] shadow-[4px_4px_0px_var(--ink-900)]",
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
      hoverEffect = false,
      padding = "md",
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const isInteractive = interactive || hoverEffect;

    return (
      <div
        ref={ref}
        className={[
          "rounded-[var(--r-xl)]",
          variantStyles[variant],
          paddingStyles[padding],
          isInteractive &&
            "cursor-pointer transition-all duration-150 hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--ink-900)] active:translate-y-0.5 active:shadow-[2px_2px_0px_var(--ink-900)]",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...(isInteractive ? { role: "button", tabIndex: 0 } : {})}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export type CardSectionProps = React.HTMLAttributes<HTMLDivElement>;

export const CardHeader = React.forwardRef<HTMLDivElement, CardSectionProps>(
  ({ children, className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={["border-b-2 border-[var(--ink-900)] pb-4 mb-4", className]
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
      className={["border-t-2 border-[var(--ink-900)] pt-4 mt-4", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = "CardFooter";
