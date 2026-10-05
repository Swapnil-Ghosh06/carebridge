import React from "react";
import Link from "next/link";

export interface CareBridgeLogoProps {
  /** Logo sizing variant */
  size?: "sm" | "md" | "lg" | "xl";
  /** Whether to render the 'carebridge' wordmark text */
  showWordmark?: boolean;
  /** Whether to display the CRCE • 2026 incubation badge */
  showBadge?: boolean;
  /** Optional link destination (defaults to '/') */
  href?: string;
  /** Custom additional CSS classes */
  className?: string;
}

const sizeConfig = {
  sm: {
    badge: "w-7 h-7 rounded-[9px] shadow-[1.5px_1.5px_0px_#121214]",
    svgSize: 22,
    text: "text-lg",
    badgeText: "text-[9px] px-1.5 py-0.5",
    gap: "gap-2",
  },
  md: {
    badge: "w-9 h-9 rounded-[11px] shadow-[2px_2px_0px_#121214]",
    svgSize: 28,
    text: "text-xl",
    badgeText: "text-[10px] px-2 py-0.5",
    gap: "gap-2.5",
  },
  lg: {
    badge: "w-12 h-12 rounded-[14px] shadow-[3px_3px_0px_#121214]",
    svgSize: 38,
    text: "text-2xl",
    badgeText: "text-[11px] px-2.5 py-0.5",
    gap: "gap-3",
  },
  xl: {
    badge: "w-16 h-16 rounded-[18px] shadow-[4px_4px_0px_#121214]",
    svgSize: 52,
    text: "text-3xl sm:text-4xl",
    badgeText: "text-xs px-3 py-1",
    gap: "gap-3.5",
  },
};

/**
 * CareBridge Emblem SVG:
 * Tactile suspension bridge arch supporting the central Care Bloom (6-petal daisy with golden sun core).
 */
export const CareBridgeEmblem: React.FC<{ size?: number; className?: string }> = ({
  size = 32,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    aria-hidden="true"
  >
    {/* Bridge Horizontal Deck */}
    <line x1="8" y1="46" x2="50" y2="46" stroke="#121214" strokeWidth="4" strokeLinecap="round" />

    {/* Bridge Vertical Piers */}
    <line x1="13" y1="46" x2="13" y2="52" stroke="#121214" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="45" y1="46" x2="45" y2="52" stroke="#121214" strokeWidth="3.5" strokeLinecap="round" />

    {/* Bridge Suspension Cables */}
    <line x1="21" y1="33" x2="21" y2="46" stroke="#121214" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="37" y1="33" x2="37" y2="46" stroke="#121214" strokeWidth="2.5" strokeLinecap="round" />

    {/* Bridge Suspension Arch */}
    <path
      d="M 13 46 C 13 29, 45 29, 45 46"
      fill="none"
      stroke="#121214"
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* Care Daisy Bloom (6 Petals at 60-degree increments) */}
    <g transform="translate(29, 21.5)">
      {/* Petals */}
      <circle cx="0" cy="-7.5" r="3.5" fill="#FFFFFF" stroke="#121214" strokeWidth="2" />
      <circle cx="6.5" cy="-3.75" r="3.5" fill="#FFFFFF" stroke="#121214" strokeWidth="2" />
      <circle cx="6.5" cy="3.75" r="3.5" fill="#FFFFFF" stroke="#121214" strokeWidth="2" />
      <circle cx="0" cy="7.5" r="3.5" fill="#FFFFFF" stroke="#121214" strokeWidth="2" />
      <circle cx="-6.5" cy="3.75" r="3.5" fill="#FFFFFF" stroke="#121214" strokeWidth="2" />
      <circle cx="-6.5" cy="-3.75" r="3.5" fill="#FFFFFF" stroke="#121214" strokeWidth="2" />

      {/* Golden Center Core */}
      <circle cx="0" cy="0" r="4.8" fill="#FEE159" stroke="#121214" strokeWidth="2.4" />
      {/* Specular Highlight */}
      <circle cx="-1.2" cy="-1.2" r="1.3" fill="#FFFFFF" />
    </g>
  </svg>
);

export const CareBridgeLogo: React.FC<CareBridgeLogoProps> = ({
  size = "md",
  showWordmark = true,
  showBadge = false,
  href = "/",
  className = "",
}) => {
  const conf = sizeConfig[size];

  const content = (
    <div className={`inline-flex items-center ${conf.gap} select-none group ${className}`}>
      {/* Tactile Electric Lime Badge */}
      <div
        className={`${conf.badge} bg-[#D4F77C] border-2 border-ink-900 flex items-center justify-center shrink-0 group-hover:rotate-6 group-hover:scale-105 transition-all duration-200`}
      >
        <CareBridgeEmblem size={conf.svgSize} />
      </div>

      {/* Brand Typography Wordmark */}
      {showWordmark && (
        <div className="flex items-center gap-2">
          <span className={`font-display font-black tracking-tight text-ink-900 ${conf.text} leading-none flex items-baseline`}>
            <span>care</span>
            <span className="text-ink-800">bridge</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C98] ml-0.5 inline-block" />
          </span>

          {showBadge && (
            <span
              className={`hidden sm:inline-block font-mono font-bold uppercase rounded-full bg-[#EDE9FE] border border-ink-900 text-ink-900 ${conf.badgeText}`}
            >
              crce • 2026
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
};
