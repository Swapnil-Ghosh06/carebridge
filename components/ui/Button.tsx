import React from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "success";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  loading = false,
  iconLeft,
  iconRight,
  fullWidth = false,
  className = "",
  children,
  disabled,
  ...props
}) => {
  const isBusy = isLoading || loading;

  const baseClasses =
    "inline-flex items-center justify-center font-display font-bold rounded-pill transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-sm min-h-[38px]",
    md: "px-6 py-3 text-base min-h-[48px]",
    lg: "px-8 py-4 text-lg min-h-[54px]",
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-brand-teal text-white hover:bg-brand-teal-600 focus:ring-brand-teal",
    secondary:
      "bg-brand-indigo text-white hover:opacity-90 focus:ring-brand-indigo",
    ghost:
      "bg-transparent text-ink-700 hover:bg-surface-100 hover:text-ink-900 border border-ink-300 focus:ring-ink-500",
    danger:
      "bg-risk-red text-white hover:opacity-90 focus:ring-risk-red",
    success:
      "bg-[var(--risk-green)] text-white hover:opacity-90 focus:ring-[var(--risk-green)]",
  };

  return (
    <button
      className={[
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      disabled={disabled || isBusy}
      {...props}
    >
      {isBusy && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current inline"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!isBusy && iconLeft && <span className="mr-2 inline-flex items-center">{iconLeft}</span>}
      {children}
      {!isBusy && iconRight && <span className="ml-2 inline-flex items-center">{iconRight}</span>}
    </button>
  );
};
