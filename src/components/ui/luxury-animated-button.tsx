"use client";

import React, { useState } from "react";

interface LuxuryAnimatedButtonProps {
  type?: "button" | "submit" | "reset";
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function LuxuryAnimatedButton({
  type = "submit",
  label = "Request Invitation",
  onClick,
  disabled = false,
  className = "",
}: LuxuryAnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className={`relative group inline-flex items-center justify-center ${className}`}>
      {/* Ambient Outer Gold Glow on Hover */}
      <div
        className={`absolute -inset-1 rounded-full bg-gradient-to-r from-[#C4913A]/0 via-[#E5B869]/30 to-[#C4913A]/0 blur-md transition-all duration-700 ${
          isHovered ? "opacity-100 scale-105" : "opacity-0 scale-95"
        }`}
      />

      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        className={`relative overflow-hidden cursor-pointer rounded-full px-9 py-4 sm:px-11 sm:py-4.5
                   bg-gradient-to-b from-[#2A1E1C] via-[#1D1413] to-[#140D0C]
                   border border-[#C4913A]/50 hover:border-[#E5B869]
                   shadow-[0_8px_25px_rgba(20,13,12,0.35),inset_0_1px_1px_rgba(229,184,105,0.25)]
                   hover:shadow-[0_12px_32px_rgba(196,145,58,0.25),inset_0_1px_2px_rgba(255,223,150,0.4)]
                   transition-all duration-500 ease-out select-none
                   ${isPressed ? "scale-[0.98]" : isHovered ? "scale-[1.02]" : "scale-100"}`}
      >
        {/* Animated Continuous Light Shimmer Sweep */}
        <span
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#E5B869]/15 to-transparent
                     -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"
        />

        {/* Ambient Pulsing Edge Ring */}
        <span
          className="absolute inset-0 rounded-full border border-[#E5B869]/0 group-hover:border-[#E5B869]/40
                     transition-all duration-700 pointer-events-none"
        />

        {/* Content Container */}
        <span className="relative z-10 flex items-center justify-center gap-3">
          {/* Subtle Golden Dot / Wax Accent */}
          <span className="relative flex h-2 w-2">
            <span
              className={`absolute inline-flex h-full w-full rounded-full bg-[#E5B869] opacity-75 transition-transform duration-500 ${
                isHovered ? "animate-ping" : ""
              }`}
            />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C4913A] shadow-[0_0_8px_#E5B869]" />
          </span>

          {/* Button Label Text */}
          <span className="font-body text-[11px] sm:text-[12px] uppercase tracking-[0.32em] font-medium text-[#FAF4EA] group-hover:text-[#FFFFFF] transition-colors duration-300">
            {label}
          </span>

          {/* Subtle Decorative Golden Arrow / Line */}
          <svg
            className={`w-3.5 h-3.5 text-[#E5B869] transition-transform duration-500 ${
              isHovered ? "translate-x-1" : "translate-x-0"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </button>
    </div>
  );
}
