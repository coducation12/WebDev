"use client";

interface Props {
  className?: string;
}

const NODES = [
  { cx: 200, cy: 120, label: "항만", r: 6 },
  { cx: 380, cy: 80, label: "창고", r: 5 },
  { cx: 520, cy: 160, label: "포워딩", r: 5 },
  { cx: 140, cy: 280, label: "운송", r: 6 },
  { cx: 460, cy: 320, label: "수출", r: 6 },
  { cx: 580, cy: 260, label: "무역", r: 5 },
  { cx: 300, cy: 380, label: "생산", r: 5 },
  { cx: 100, cy: 160, label: "검역", r: 4 },
  { cx: 540, cy: 400, label: "유통", r: 5 },
];

const CENTER = { cx: 340, cy: 240 };

const CONNECTIONS = [
  [0, 1], [1, 2], [0, 3], [2, 4], [4, 5], [3, 6], [6, 4], [7, 0], [5, 8], [6, 8],
];

export default function TechNetworkAnim({ className = "" }: Props) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <svg viewBox="0 0 680 480" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="techGlow">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="8" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#9B72CF" stopOpacity="0.6" />
          </linearGradient>

          {/* Animated dash pattern */}
          {CONNECTIONS.map((_, i) => (
            <linearGradient key={`cg${i}`} id={`connGrad${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#9B72CF" stopOpacity="0.1" />
            </linearGradient>
          ))}
        </defs>

        {/* Concentric radar rings */}
        {[60, 120, 180].map((r, i) => (
          <circle key={`ring${i}`} cx={CENTER.cx} cy={CENTER.cy} r={r} fill="none" stroke="white" strokeWidth="0.5" opacity={0.04 + i * 0.01}>
            <animate attributeName="r" values={`${r};${r + 8};${r}`} dur={`${4 + i}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values={`${0.04 + i * 0.01};${0.08 + i * 0.01};${0.04 + i * 0.01}`} dur={`${4 + i}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Radar sweep line */}
        <line x1={CENTER.cx} y1={CENTER.cy} x2={CENTER.cx + 180} y2={CENTER.cy} stroke="url(#lineGrad)" strokeWidth="0.8" opacity="0.15">
          <animateTransform attributeName="transform" type="rotate" from={`0 ${CENTER.cx} ${CENTER.cy}`} to={`360 ${CENTER.cx} ${CENTER.cy}`} dur="12s" repeatCount="indefinite" />
        </line>

        {/* Connection lines */}
        {CONNECTIONS.map(([a, b], i) => {
          const n1 = NODES[a], n2 = NODES[b];
          return (
            <g key={`conn${i}`}>
              {/* Base line */}
              <line x1={n1.cx} y1={n1.cy} x2={n2.cx} y2={n2.cy} stroke="white" strokeWidth="0.6" opacity="0.06" />
              {/* Animated flowing dot */}
              <circle r="2" fill="#60A5FA" opacity="0.7" filter="url(#techGlow)">
                <animate attributeName="cx" values={`${n1.cx};${n2.cx};${n1.cx}`} dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="cy" values={`${n1.cy};${n2.cy};${n1.cy}`} dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;0.8;0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}

        {/* Center globe + hub */}
        <defs>
          <clipPath id="globeClip">
            <circle cx={CENTER.cx} cy={CENTER.cy} r="140" />
          </clipPath>
          <radialGradient id="globeFade" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="globeMask">
            <rect x={CENTER.cx - 150} y={CENTER.cy - 150} width="300" height="300" fill="url(#globeFade)" />
          </mask>
        </defs>
        {/* Globe image (clipped to circle + faded edges) */}
        <image href="/assets/images/globe_wireframe.png" x={CENTER.cx - 150} y={CENTER.cy - 150} width="300" height="300" opacity="0.25" clipPath="url(#globeClip)" mask="url(#globeMask)">
          <animate attributeName="opacity" values="0.18;0.3;0.18" dur="6s" repeatCount="indefinite" />
        </image>
        {/* Hub rings */}
        <circle cx={CENTER.cx} cy={CENTER.cy} r="120" fill="none" stroke="#60A5FA" strokeWidth="0.4" opacity="0.06" />
        <circle cx={CENTER.cx} cy={CENTER.cy} r="80" fill="none" stroke="#60A5FA" strokeWidth="0.5" opacity="0.08" />
        <circle cx={CENTER.cx} cy={CENTER.cy} r="45" fill="none" stroke="#9B72CF" strokeWidth="0.6" opacity="0.1">
          <animate attributeName="r" values="45;50;45" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* Bora mark (on top of globe) */}
        <image href="/assets/images/mark.png" x={CENTER.cx - 20} y={CENTER.cy - 18} width="40" height="36" opacity="0.85" />

        {/* Nodes */}
        {NODES.map((node, i) => (
          <g key={`node${i}`}>
            {/* Outer glow ring */}
            <circle cx={node.cx} cy={node.cy} r={node.r + 8} fill="none" stroke="#60A5FA" strokeWidth="0.5" opacity="0.08">
              <animate attributeName="r" values={`${node.r + 8};${node.r + 14};${node.r + 8}`} dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.08;0.02;0.08" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
            </circle>
            {/* Node dot */}
            <circle cx={node.cx} cy={node.cy} r={node.r} fill="#60A5FA" opacity="0.15" />
            <circle cx={node.cx} cy={node.cy} r={node.r * 0.5} fill="white" opacity="0.6" filter="url(#techGlow)">
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            {/* Label */}
            <text x={node.cx} y={node.cy + node.r + 16} textAnchor="middle" fill="white" fontSize="9" fontWeight="600" opacity="0.25" letterSpacing="0.05em">
              {node.label}
            </text>
          </g>
        ))}

        {/* Orbiting satellite dots */}
        {[0, 1, 2].map(i => (
          <circle key={`sat${i}`} r="1.5" fill="#9B72CF" opacity="0.5" filter="url(#techGlow)">
            <animateMotion dur={`${6 + i * 2}s`} repeatCount="indefinite" begin={`${i * 2}s`}>
              <mpath href={`#orbit${i}`} />
            </animateMotion>
          </circle>
        ))}
        {/* Orbit paths (invisible) */}
        <ellipse id="orbit0" cx={CENTER.cx} cy={CENTER.cy} rx="140" ry="100" fill="none" stroke="none" />
        <ellipse id="orbit1" cx={CENTER.cx} cy={CENTER.cy} rx="100" ry="160" fill="none" stroke="none" />
        <ellipse id="orbit2" cx={CENTER.cx} cy={CENTER.cy} rx="170" ry="80" fill="none" stroke="none" />
      </svg>
    </div>
  );
}
