"use client";

import { motion } from "framer-motion";
import { 
  Ship, Cpu, Package, LayoutGrid, Globe, ShoppingCart, 
  BarChart3
} from "lucide-react";
import { useRef, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

const NR = 32; // Node Radius
const CR = 65; // Center Radius (Enlarged)

const LEFT = [
  { id: "L1", label: "국제물류 서비스", icon: Ship, cx: 180, cy: 120 },
  { id: "L2", label: "물류 시스템 운영", icon: LayoutGrid, cx: 120, cy: 300 },
  { id: "L3", label: "물류 장비 개발", icon: Cpu, cx: 180, cy: 480 },
  { id: "L4", label: "전문 포장 서비스", icon: Package, cx: 300, cy: 300 },
];

const RIGHT = [
  { id: "R1", label: "글로벌 무역", icon: Globe, cx: 820, cy: 120 },
  { id: "R2", label: "시장 조사 및 개척", icon: BarChart3, cx: 880, cy: 300 },
  { id: "R3", label: "수출입 서비스", icon: ShoppingCart, cx: 820, cy: 480 },
];

function NodeIcon({ type: Icon, isDark }: { type: any; isDark: boolean }) {
  const color = isDark ? "rgba(255,255,255,0.9)" : "rgba(26,26,26,0.8)";
  return <Icon size={24} color={color} strokeWidth={1.5} />;
}

export default function LogisticsTradeFlowMain({ accentColor = "#6A0DAD", isDark = false, className = "" }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const gridColor = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";
  const centerPos = { cx: 500, cy: 300 };

  const paths = useMemo(() => {
    const all = [];
    for (const l of LEFT) all.push({ from: l, to: centerPos, id: `L-${l.id}` });
    for (const r of RIGHT) all.push({ from: centerPos, to: r, id: `R-${r.id}` });
    return all;
  }, []);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn("relative w-full aspect-[1000/600] flex items-center justify-center overflow-visible", className)}
      style={{ perspective: "2000px" }}
    >
      {/* 3D Tilted Container */}
      <motion.div 
        animate={{ 
          rotateY: mousePos.x * 12, 
          rotateX: -mousePos.y * 12 
        }}
        transition={{ type: "spring", stiffness: 60, damping: 25 }}
        className="relative w-full h-full flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Deep Layer: World Map & Grid */}
        <div 
          className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center" 
          style={{ transform: "translateZ(-250px)" }}
        >
           {/* New Generated Line-Art World Map */}
           <div 
             className="absolute inset-0 opacity-[0.15] mix-blend-multiply transition-opacity duration-1000"
             style={{ 
               backgroundImage: `url('/assets/images/world_map_lines.png')`, 
               backgroundSize: '120% auto',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
               filter: isDark ? 'invert(1) contrast(1.2)' : 'contrast(1.1)'
             }}
           />
           
           {/* Tech Grid Overlay */}
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
        </div>

        <svg 
          viewBox="0 0 1000 600" 
          className="w-full h-full overflow-visible drop-shadow-2xl"
          shapeRendering="geometricPrecision"
        >
          <defs>
            <filter id="laserGlow" filterUnits="userSpaceOnUse" x="-200" y="-200" width="1400" height="1000">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <radialGradient id="nodeGrad" cx="50%" cy="50%">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.4" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hubGlow" cx="50%" cy="50%">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.6" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
            </radialGradient>
            <linearGradient id="laserGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1000" y2="600">
               <stop offset="0%" stopColor={accentColor} stopOpacity="0" />
               <stop offset="20%" stopColor={accentColor} stopOpacity="0.6" />
               <stop offset="50%" stopColor="#fff" stopOpacity="1" />
               <stop offset="80%" stopColor={accentColor} stopOpacity="0.6" />
               <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Connection Paths */}
          {paths.map((p, i) => (
            <g key={p.id} vectorEffect="non-scaling-stroke">
              {/* Base Path (Faint) */}
              <path
                id={`path-${p.id}`}
                d={`M ${p.from.cx} ${p.from.cy} L ${p.to.cx} ${p.to.cy}`}
                fill="none"
                stroke={accentColor}
                strokeWidth="1.2"
                opacity="0.12"
              />
              
              {/* Real Laser Stream (Compatible Method) */}
              <motion.path
                d={`M ${p.from.cx} ${p.from.cy} L ${p.to.cx} ${p.to.cy}`}
                fill="none"
                stroke="url(#laserGrad)"
                strokeWidth="4"
                filter="url(#laserGlow)"
                strokeDasharray="100 1000"
                vectorEffect="non-scaling-stroke"
                animate={{ 
                  strokeDashoffset: [0, -1000, 0],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut", 
                  delay: i * 0.3 
                }}
              />
            </g>
          ))}

          {/* Central HUB (BORA) - Enlarged */}
          <g transform={`translate(${centerPos.cx}, ${centerPos.cy})`}>
             <motion.circle 
               r={CR + 80} fill="url(#hubGlow)" 
               animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
               transition={{ duration: 4, repeat: Infinity }}
             />
             <circle r={CR} fill={isDark ? "#111" : "#fff"} stroke={accentColor} strokeWidth="4" />
             <motion.circle 
               r={CR - 15} fill="none" stroke={accentColor} strokeWidth="1" strokeDasharray="15 10" 
               animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
             />
             {/* Enlarged Logo */}
             <image href="/assets/images/mark.png" x={-35} y={-35} width={70} height={70} style={{ filter: isDark ? "invert(1)" : "none" }} />
             
             <text y={-(CR + 65)} textAnchor="middle" className="text-[36px] font-black tracking-tight" fill={isDark ? "#fff" : "#111"}>물류로 무역을 잇다</text>
          </g>

          {/* Nodes */}
          {[...LEFT, ...RIGHT].map((n, i) => (
            <g key={n.id} transform={`translate(${n.cx}, ${n.cy})`}>
              <circle r={NR + 25} fill="url(#nodeGrad)" opacity="0.3" />
              <circle r={NR} fill={isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.95)"} stroke={accentColor} strokeWidth="1.2" strokeOpacity="0.4" />
              
              <g transform="translate(-12, -12)">
                <NodeIcon type={n.icon} isDark={isDark} />
              </g>

              <g transform="translate(0, 60)">
                <text textAnchor="middle" className="text-[14px] font-black tracking-tight" fill={isDark ? "#fff" : "#111"}>{n.label}</text>
              </g>
            </g>
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
