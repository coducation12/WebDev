"use client";

import React, { Fragment } from "react";

interface Props {
  accentColor?: string;
  accentLight?: string;
  className?: string;
}

const NR = 44;
const CR = 52;

const LEFT = [
  { cx: 160, cy: 110, label: "항만물류", icon: "crane" },
  { cx: 130, cy: 290, label: "보세창고", icon: "warehouse" },
  { cx: 160, cy: 470, label: "내륙운송", icon: "truck" },
];
const RIGHT = [
  { cx: 1040, cy: 110, label: "수출", icon: "ship" },
  { cx: 1070, cy: 290, label: "글로벌 무역", icon: "globe" },
  { cx: 1040, cy: 470, label: "수입·유통", icon: "distribute" },
];
const HUB = { cx: 600, cy: 290 };

const PATHS = [
  { id: "lp1", d: `M ${160 + NR} 110 C 340 110, 460 290, ${HUB.cx - CR} 290` },
  { id: "lp2", d: `M ${130 + NR} 290 C 310 290, 460 290, ${HUB.cx - CR} 290` },
  { id: "lp3", d: `M ${160 + NR} 470 C 340 470, 460 290, ${HUB.cx - CR} 290` },
  { id: "rp1", d: `M ${HUB.cx + CR} 290 C 740 290, 860 110, ${1040 - NR} 110` },
  { id: "rp2", d: `M ${HUB.cx + CR} 290 C 780 290, 900 290, ${1070 - NR} 290` },
  { id: "rp3", d: `M ${HUB.cx + CR} 290 C 740 290, 860 470, ${1040 - NR} 470` },
];

function NodeIcon({ type }: { type: string }) {
  // Use a generic object for common SVG styles to avoid ref/type mismatch errors
  const s = {
    fill: "none",
    stroke: "rgba(255,255,255,0.85)",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  
  const ls = {
    stroke: s.stroke,
    strokeWidth: s.strokeWidth,
    strokeLinecap: s.strokeLinecap,
    strokeLinejoin: s.strokeLinejoin,
  };

  switch (type) {
    case "crane":
      return (
        <g>
          <line x1="-14" y1="13" x2="14" y2="13" {...ls} />
          <path d="M-8 13V-7" {...s} />
          <path d="M-11 13L-8 3" {...s} />
          <path d="M8 13V-7" {...s} />
          <path d="M11 13L8 3" {...s} />
          <path d="M-10 -7H14" {...s} />
          <path d="M8 -7L14 -11" {...s} />
          <path d="M-10 -7L-13 -11" {...s} />
          <line x1="2" y1="-7" x2="2" y2="0" {...ls} />
          <line x1="-1" y1="0" x2="2" y2="-7" {...ls} opacity="0.4" />
          <line x1="5" y1="0" x2="2" y2="-7" {...ls} opacity="0.4" />
          <rect x="-2" y="0" width="8" height="5" rx="0.5" {...s} fill="rgba(255,255,255,0.1)" />
          <line x1="2" y1="0" x2="2" y2="5" {...ls} opacity="0.3" />
        </g>
      );

    case "warehouse":
      return (
        <g>
          <path d="M-14 -2L0 -13L14 -2" {...s} />
          <rect x="-12" y="-2" width="24" height="15" {...s} fill="rgba(255,255,255,0.05)" />
          <rect x="-4" y="3" width="8" height="10" rx="0.5" {...s} fill="rgba(255,255,255,0.08)" />
          <line x1="-4" y1="6" x2="4" y2="6" {...ls} opacity="0.3" />
          <line x1="-4" y1="9" x2="4" y2="9" {...ls} opacity="0.3" />
          <rect x="-11" y="1" width="4" height="3" rx="0.3" {...s} opacity="0.5" />
          <rect x="7" y="1" width="4" height="3" rx="0.3" {...s} opacity="0.5" />
        </g>
      );

    case "truck":
      return (
        <g>
          <rect x="-14" y="-8" width="18" height="14" rx="1" {...s} fill="rgba(255,255,255,0.05)" />
          <line x1="-8" y1="-8" x2="-8" y2="6" {...ls} opacity="0.2" />
          <line x1="-2" y1="-8" x2="-2" y2="6" {...ls} opacity="0.2" />
          <path d="M4 -3H10L13 2V6H4Z" {...s} fill="rgba(255,255,255,0.08)" />
          <path d="M5 -2H9L11 1H5Z" {...s} opacity="0.5" />
          <line x1="-14" y1="6" x2="13" y2="6" {...ls} />
          <circle cx="-8" cy="9" r="3" {...s} fill="rgba(255,255,255,0.1)" />
          <circle cx="-8" cy="9" r="1" fill="rgba(255,255,255,0.4)" />
          <circle cx="8" cy="9" r="3" {...s} fill="rgba(255,255,255,0.1)" />
          <circle cx="8" cy="9" r="1" fill="rgba(255,255,255,0.4)" />
        </g>
      );

    case "ship":
      return (
        <g>
          <path d="M-14 4L-10 -2H12L14 4Z" {...s} fill="rgba(255,255,255,0.08)" />
          <line x1="-10" y1="-2" x2="12" y2="-2" {...ls} />
          <rect x="-7" y="-7" width="5" height="5" rx="0.3" {...s} fill="rgba(255,255,255,0.1)" />
          <rect x="-1" y="-7" width="5" height="5" rx="0.3" {...s} fill="rgba(255,255,255,0.06)" />
          <rect x="-4" y="-11" width="5" height="4" rx="0.3" {...s} fill="rgba(255,255,255,0.08)" />
          <rect x="8" y="-7" width="3" height="5" rx="0.3" {...s} fill="rgba(255,255,255,0.12)" />
          <path d="M9.5 -8Q8 -10 9 -12" {...s} opacity="0.3" />
          <path d="M10.5 -8Q12 -10 11 -12" {...s} opacity="0.2" />
          <path d="M-16 7Q-12 4 -8 7Q-4 10 0 7Q4 4 8 7Q12 10 16 7" {...s} opacity="0.3" />
        </g>
      );

    case "globe":
      return (
        <g>
          <circle cx="0" cy="0" r="12" {...s} />
          <ellipse cx="0" cy="0" rx="5" ry="12" {...s} opacity="0.5" />
          <ellipse cx="0" cy="0" rx="9" ry="12" {...s} opacity="0.3" />
          <path d="M-12 0H12" {...s} opacity="0.4" />
          <path d="M-11 -5H11" {...s} opacity="0.3" />
          <path d="M-11 5H11" {...s} opacity="0.3" />
          <path d="M-8 -8Q0 -16 10 -6" {...s} strokeDasharray="2 2" opacity="0.6" />
          <path d="M10 -6L12 -7L11 -5L13 -5Z" fill="rgba(255,255,255,0.7)" stroke="none" />
        </g>
      );

    case "distribute":
      return (
        <g>
          <circle cx="0" cy="0" r="4" {...s} fill="rgba(255,255,255,0.1)" />
          <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.5)" />
          <path d="M0 -4V-10" {...s} />
          <path d="M-2 -8L0 -11L2 -8" {...s} />
          <rect x="-3" y="-14" width="6" height="4" rx="0.5" {...s} fill="rgba(255,255,255,0.08)" />
          <path d="M-3 2L-8 8" {...s} />
          <path d="M-6 5L-9 9L-5 8" {...s} />
          <rect x="-13" y="8" width="6" height="4" rx="0.5" {...s} fill="rgba(255,255,255,0.08)" />
          <path d="M3 2L8 8" {...s} />
          <path d="M5 8L9 9L6 5" {...s} />
          <rect x="7" y="8" width="6" height="4" rx="0.5" {...s} fill="rgba(255,255,255,0.08)" />
        </g>
      );

    default:
      return null;
  }
}

export default function LogisticsTradeFlow({ accentColor = "#9B72CF", accentLight = "#C4A6E3", className = "" }: Props) {
  return (
    <div className={`relative w-full ${className}`}>
      <svg viewBox="0 0 1200 600" className="w-full h-auto">
        <defs>
          <filter id="dotGlow">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="hubGrad" cx="50%" cy="50%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.03" />
          </radialGradient>
        </defs>

        {/* Column headers */}
        <text x="150" y="38" textAnchor="middle" fill="white" opacity="0.45" fontSize={14} fontWeight={700} letterSpacing="0.15em">물류 LOGISTICS</text>
        <text x="1050" y="38" textAnchor="middle" fill="white" opacity="0.45" fontSize={14} fontWeight={700} letterSpacing="0.15em">무역 TRADE</text>

        {/* Connection paths */}
        {PATHS.map(p => (
          <path key={p.id} id={p.id} d={p.d} fill="none" stroke={accentLight} strokeWidth="1.2" opacity="0.12" />
        ))}

        {/* Flowing dots */}
        {PATHS.map(p => (
          <Fragment key={`dots-${p.id}`}>
            {[0, 1, 2].map(i => (
              <circle key={`${p.id}-d${i}`} r={3 - i * 0.4} fill={accentLight} opacity={0.9 - i * 0.2} filter="url(#dotGlow)">
                <animateMotion dur={`${2.6 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.8}s`}>
                  <mpath href={`#${p.id}`} />
                </animateMotion>
              </circle>
            ))}
          </Fragment>
        ))}

        {/* ── Center Hub ── */}
        <circle cx={HUB.cx} cy={HUB.cy} r="85" fill="url(#hubGrad)" />
        <circle cx={HUB.cx} cy={HUB.cy} r="68" fill="none" stroke={accentColor} strokeWidth="1.5" opacity="0.12">
          <animate attributeName="r" values="68;78;68" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.12;0.04;0.12" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx={HUB.cx} cy={HUB.cy} r={CR} fill="none" stroke={accentColor} strokeWidth="1" opacity="0.2" />
        <circle cx={HUB.cx} cy={HUB.cy} r={CR} fill={accentColor} opacity="0.06" />
        
        {/* Logo Mark */}
        <image href="/assets/images/active/sys_mark.png" x={HUB.cx - 35} y={HUB.cy - 30} width="70" height="60" opacity="0.95" />

        {/* ── Left Nodes ── */}
        {LEFT.map((n, i) => (
          <g key={`ln${i}`}>
            <circle cx={n.cx} cy={n.cy} r={NR} fill={accentColor} opacity="0.07" />
            <circle cx={n.cx} cy={n.cy} r={NR} fill="none" stroke={accentColor} strokeWidth="1" opacity="0.2" />
            <circle cx={n.cx} cy={n.cy} r={NR - 6} fill={accentColor} opacity="0.04" />
            <g transform={`translate(${n.cx},${n.cy})`}><NodeIcon type={n.icon} /></g>
            <text x={n.cx} y={n.cy + NR + 22} textAnchor="middle" fill="white" fontSize={13} fontWeight={600} opacity="0.7">{n.label}</text>
          </g>
        ))}

        {/* ── Right Nodes ── */}
        {RIGHT.map((n, i) => (
          <g key={`rn${i}`}>
            <circle cx={n.cx} cy={n.cy} r={NR} fill={accentColor} opacity="0.07" />
            <circle cx={n.cx} cy={n.cy} r={NR} fill="none" stroke={accentColor} strokeWidth="1" opacity="0.2" />
            <circle cx={n.cx} cy={n.cy} r={NR - 6} fill={accentColor} opacity="0.04" />
            <g transform={`translate(${n.cx},${n.cy})`}><NodeIcon type={n.icon} /></g>
            <text x={n.cx} y={n.cy + NR + 22} textAnchor="middle" fill="white" fontSize={13} fontWeight={600} opacity="0.7">{n.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
