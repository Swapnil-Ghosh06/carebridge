import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-display font-bold rounded-pill transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm min-h-[38px]",
    md: "px-6 py-3 text-base min-h-[48px]",
    lg: "px-8 py-4 text-lg min-h-[54px]",
  }[size];

  const variantClasses = {
    primary:
      "bg-brand-teal text-white hover:bg-brand-teal-600 focus:ring-brand-teal",
    secondary:
      "bg-brand-indigo text-white hover:opacity-90 focus:ring-brand-indigo",
    ghost:
      "bg-transparent text-ink-700 hover:bg-surface-100 hover:text-ink-900 border border-ink-300 focus:ring-ink-500",
    danger:
      "bg-risk-red text-white hover:opacity-90 focus:ring-risk-red",
  }[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
