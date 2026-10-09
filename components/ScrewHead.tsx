'use client';

import React, { useId } from 'react';

interface ScrewHeadProps {
  rotation?: number;
  size?: number;
  className?: string;
}

export function ScrewHead({
  rotation = 25,
  size = 24,
  className = '',
}: ScrewHeadProps) {
  const uid = useId().replace(/:/g, '');

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none transition-transform duration-500 ease-out ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Puncture indentation & realistic contact drop shadow */}
      <div
        className="absolute inset-0 rounded-full bg-black/40 blur-[1px] transform scale-105 translate-y-[1px] pointer-events-none"
      />

      {/* Realistic Photorealistic Silver Stainless Steel Screw Head (100% Pure Neutral Grayscale, R=G=B) */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative drop-shadow-[0_2px_3px_rgba(0,0,0,0.55)]"
      >
        <defs>
          {/* Pure silver dome surface (R=G=B neutral metallic gradient) */}
          <radialGradient
            id={`silverDome-${uid}`}
            cx="32%"
            cy="28%"
            r="68%"
          >
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="20%" stopColor="#E5E5E5" />
            <stop offset="50%" stopColor="#C4C4C4" />
            <stop offset="78%" stopColor="#8E8E8E" />
            <stop offset="95%" stopColor="#5E5E5E" />
            <stop offset="100%" stopColor="#454545" />
          </radialGradient>

          {/* Machined outer beveled rim (pure silver specular reflection) */}
          <linearGradient
            id={`silverBevel-${uid}`}
            x1="15%"
            y1="10%"
            x2="85%"
            y2="90%"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#D4D4D4" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#666666" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#222222" stopOpacity="0.95" />
          </linearGradient>

          {/* Inner countersink depression gradient - pure neutral silver to depth */}
          <radialGradient
            id={`innerCountersink-${uid}`}
            cx="36%"
            cy="32%"
            r="60%"
          >
            <stop offset="0%" stopColor="#E0E0E0" />
            <stop offset="45%" stopColor="#999999" />
            <stop offset="85%" stopColor="#4D4D4D" />
            <stop offset="100%" stopColor="#262626" />
          </radialGradient>

          {/* Slot shadow gradient for 3D depth */}
          <linearGradient
            id={`slotShadow-${uid}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#111111" />
            <stop offset="100%" stopColor="#2B2B2B" />
          </linearGradient>
        </defs>

        {/* Outer metallic screw dome */}
        <circle cx="16" cy="16" r="14.5" fill={`url(#silverDome-${uid})`} />

        {/* Outer machined bevel rim */}
        <circle
          cx="16"
          cy="16"
          r="14.5"
          stroke={`url(#silverBevel-${uid})`}
          strokeWidth="1.2"
        />

        {/* Subtle lathe-turned circular grain ring (pure grayscale) */}
        <circle
          cx="16"
          cy="16"
          r="12"
          stroke="#7A7A7A"
          strokeWidth="0.4"
          opacity="0.35"
        />

        {/* Countersunk depression well where the driver bit sits */}
        <circle
          cx="16"
          cy="16"
          r="8.5"
          fill={`url(#innerCountersink-${uid})`}
        />
        <circle
          cx="16"
          cy="16"
          r="8.5"
          stroke="#555555"
          strokeWidth="0.5"
          opacity="0.6"
        />

        {/* Realistic Phillips / Pozidriv 3D cross stamping */}
        <g transform={`rotate(${rotation} 16 16)`}>
          {/* Main stamped recess cross (deep neutral black-gray) */}
          <path
            d="M13.8 8 H18.2 V13.8 H24 V18.2 H18.2 V24 H13.8 V18.2 H8 V13.8 H13.8 V8 Z"
            fill="url(#slotShadow-${uid})"
          />

          {/* Upper/Left light-facing facets (bright silver bevel highlights) */}
          {/* North slot left facet */}
          <polygon points="13.8,8 14.8,9 14.8,14.8 13.8,13.8" fill="#F0F0F0" opacity="0.9" />
          {/* West slot top facet */}
          <polygon points="8,13.8 9,14.8 14.8,14.8 13.8,13.8" fill="#F5F5F5" opacity="0.9" />
          {/* East slot top facet */}
          <polygon points="18.2,13.8 17.2,14.8 23,14.8 24,13.8" fill="#E8E8E8" opacity="0.75" />
          {/* South slot left facet */}
          <polygon points="13.8,18.2 14.8,17.2 14.8,23 13.8,24" fill="#D0D0D0" opacity="0.7" />

          {/* Lower/Right shadow-facing facets (deep neutral shadow lines) */}
          {/* North slot right shadow */}
          <polygon points="18.2,8 17.2,9 17.2,14.8 18.2,13.8" fill="#222222" opacity="0.95" />
          {/* East slot bottom shadow */}
          <polygon points="18.2,18.2 17.2,17.2 23,17.2 24,18.2" fill="#1C1C1C" opacity="0.95" />
          {/* South slot right shadow */}
          <polygon points="18.2,18.2 17.2,17.2 17.2,23 18.2,24" fill="#181818" opacity="0.95" />
          {/* West slot bottom shadow */}
          <polygon points="8,18.2 9,17.2 14.8,17.2 13.8,18.2" fill="#202020" opacity="0.9" />

          {/* Center conical driver point depression */}
          <circle cx="16" cy="16" r="1.3" fill="#0A0A0A" />

          {/* Tiny specular metallic glint at top-left corner of the slot */}
          <circle cx="14.2" cy="14.2" r="0.6" fill="#FFFFFF" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}
