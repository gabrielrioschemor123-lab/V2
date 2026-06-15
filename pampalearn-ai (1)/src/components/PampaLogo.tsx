import React from "react";

interface PampaLogoProps {
  className?: string; // Additional classes for sizing/spacing
  showText?: boolean;  // Whether to show the "PampaLearn AI" text alongside the emblem
  size?: "sm" | "md" | "lg" | "xl";
}

export const PampaLogo: React.FC<PampaLogoProps> = ({
  className = "",
  showText = true,
  size = "md",
}) => {
  // Dimensions map based on size parameter
  const dimensions = {
    sm: { svg: "h-9 w-9", textClass: "text-lg" },
    md: { svg: "h-11 w-11", textClass: "text-xl" },
    lg: { svg: "h-16 w-16", textClass: "text-3xl" },
    xl: { svg: "h-28 w-28", textClass: "text-5xl" },
  };

  const currentSize = dimensions[size];

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Dynamic Brand Emblem SVG */}
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${currentSize.svg} shrink-0 transition-transform duration-300 hover:rotate-3 [filter:drop-shadow(0_2px_8px_rgba(0,0,0,0.8))]`}
      >
        {/* Top-left Thin Circle Arc */}
        <path
          d="M 40,111 A 71,71 0 1,1 158,82"
          fill="none"
          stroke="#5a8626"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Orange Half-Sun */}
        <circle cx="90" cy="115" r="26" fill="#f8970f" />

        {/* Acacia Savanna Tree */}
        {/* Tree Trunk */}
        <path
          d="M 141,120 L 141,102 Q 139,94 135,92 M 141,102 Q 144,95 149,93"
          stroke="#1b411d"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Tree Foliage (Acacia Flat Canopy Layers) */}
        <ellipse cx="143" cy="91" rx="20" ry="6" fill="#1b411d" />
        <ellipse cx="132" cy="94" rx="12" ry="5" fill="#153617" />
        <ellipse cx="152" cy="95" rx="14" ry="5" fill="#204c23" />

        {/* Curved Pampa Hills / Horizon Grounds */}
        {/* Yellow Ground on Bottom Right */}
        <path
          d="M 68,168 C 95,148 135,138 178,138 C 172,156 156,170 138,173 C 114,173 89,173 68,168 Z"
          fill="#e2ad35"
        />

        {/* Green Ground on Top of yellow */}
        <path
          d="M 40,111 C 70,110 110,123 178,111 C 178,111 178,113 178,113 C 145,116 100,121 68,168 C 50,154 40,131 40,111 Z"
          fill="#497817"
        />

        {/* Lower Left/Center Green Hill Overlay */}
        <path
          d="M 40,111 C 70,110 110,123 178,111 C 114,120 75,140 52,160 C 44,146 40,129 40,111 Z"
          fill="#335910"
        />

        {/* Thick elegant white curved divider line representing the pathway */}
        <path
          d="M 68,168 C 100,138 138,116 178,113"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Styled Brand Lettering */}
      {showText && (
        <div className="text-left select-none flex flex-col justify-center pl-1">
          <h1 className={`${currentSize.textClass} font-black tracking-tight flex items-center leading-none text-white font-sans`}>
            <span className="text-[#1e4620]">Pampa</span>
            <span className="text-[#4c7c1a]">Learn</span>
            <span className="text-[#f8970f] ml-1">AI</span>
          </h1>
          <span className="text-[11px] font-medium text-slate-400 tracking-wide mt-0.5 block">
            Cursos premium y biblioteca gratuita
          </span>
        </div>
      )}
    </div>
  );
};
