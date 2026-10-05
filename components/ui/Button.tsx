'use client';

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    // 48px minimum height for patient touch targets (DESIGN.md specification)
    const baseStyles =
      'inline-flex items-center justify-center font-display font-bold tracking-tight rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const sizeStyles = {
      sm: 'min-h-[40px] px-4 py-2 text-sm',
      md: 'min-h-[48px] px-6 py-3 text-base',
      lg: 'min-h-[56px] px-8 py-4 text-lg',
    };

    const variantStyles = {
      primary:
        'bg-teal-600 hover:bg-teal-500 text-white shadow-sm focus:ring-teal-500',
      secondary:
        'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm focus:ring-indigo-500',
      outline:
        'border-2 border-teal-600 text-teal-600 bg-transparent hover:bg-teal-50 focus:ring-teal-500',
      ghost:
        'bg-transparent text-navy-900 hover:bg-gray-100 focus:ring-gray-300',
      danger:
        'bg-risk-red hover:opacity-90 text-white shadow-sm focus:ring-risk-red',
      success:
        'bg-risk-green hover:opacity-90 text-white shadow-sm focus:ring-risk-green',
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-current"
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
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
