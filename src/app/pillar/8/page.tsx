"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Box, Compass, Cpu, Hash, Layers, Ruler, Search, Settings, Share2, Menu, Lock } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import MediaPlaceholder from "@/components/MediaPlaceholder";

// Technical Annotation Component
function Annotation({ x, y, label, value }: { x: string, y: string, label: string, value: string }) {
  return (
    <div className="absolute hidden md:flex flex-col gap-1 pointer-events-none z-20" style={{ left: x, top: y }}>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-orange-500" />
        <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-400">{label}</span>
      </div>
      <div className="pl-4 border-l border-orange-500/30">
        <span className="text-[10px] font-mono font-bold text-neutral-900">{value}</span>
      </div>
    </div>
  );
}

export default function IndustrialBlueprintHome() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="bg-[#f5f5f5] text-neutral-900 font-mono selection:bg-orange-500 selection:text-white cursor-crosshair overflow-x-hidden">
      {/* Background Grid & Rulers */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Dynamic Cursor Guidelines */}
      <div className="fixed inset-0 z-50 pointer-events-none hidden md:block">
        <div className="absolute top-0 bottom-0 w-px bg-orange-500/20" style={{ left: mousePos.x }} />
        <div className="absolute left-0 right-0 h-px bg-orange-500/20" style={{ top: mousePos.y }} />
        <div className="absolute text-[8px] font-mono text-orange-500/60 p-2" style={{ left: mousePos.x, top: mousePos.y }}>
          X:{Math.round(mousePos.x)} Y:{Math.round(mousePos.y)}
        </div>
      </div>

      {/* 1. Technical Title Block Header */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="flex h-20">
          <div className="w-20 flex items-center justify-center border-r border-neutral-200 bg-neutral-900 text-white">
             <Ruler size={24} />
          </div>
          <div className="flex-1 px-8 flex items-center justify-between">
            <div className="flex flex-col">
              <Link href="/" className="text-xl font-black tracking-tighter flex items-center gap-3">
                BORA<span className="text-orange-500">_SYSTEM</span>
              </Link>
              <span className="text-[8px] opacity-40 uppercase tracking-[0.4em]">Drafting Version 8.0.4</span>
            </div>
            
            <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-widest">
              <Link href="#" className="hover:text-orange-500 transition-colors">Spec[01]</Link>
              <Link href="#" className="hover:text-orange-500 transition-colors">Nodes[480]</Link>
              <Link href="#" className="hover:text-orange-500 transition-colors">Protocol</Link>
              <div className="h-10 w-px bg-neutral-200" />
              <button className="px-6 py-2 bg-neutral-900 text-white hover:bg-orange-500 transition-all">Execute_Project</button>
            </div>
            
            <button className="lg:hidden">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-40 pb-20 px-6 md:px-20 max-w-[1600px] mx-auto">
        {/* 2. Drafting Hero Section */}
        <section className="relative mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 text-orange-500">
                   <div className="w-12 h-[2px] bg-current" />
                   <span className="text-xs font-bold uppercase tracking-[0.5em]">Project: Universal Logistics</span>
                </div>
                <h1 className="text-6xl md:text-[12rem] font-black leading-[0.8] tracking-tightest uppercase">
                  RAW<br /> POWER <br /> 
                  <span className="text-transparent px-2" style={{ WebkitTextStroke: '2px #000' }}>PRECISION.</span>
                </h1>
              </motion.div>
            </div>
            <div className="lg:col-span-4 border-l-4 border-neutral-900 pl-10 py-4">
              <p className="text-sm md:text-lg font-bold leading-relaxed max-w-sm mb-10">
                보라로지스의 인프라는 정교한 설계의 집합체입니다. <br />
                우리는 수치로 증명하고, 시스템으로 이동합니다.
              </p>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center border border-neutral-200"><Cpu size={20} /></div>
                <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center border border-neutral-200"><Settings size={20} /></div>
                <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center border border-neutral-200"><Share2 size={20} /></div>
              </div>
            </div>
          </div>

          {/* Abstract Line Art Component */}
          <div className="mt-20 relative h-[600px] border border-neutral-200 bg-white overflow-hidden rounded-sm shadow-xl">
             <div className="absolute top-0 left-0 w-20 h-20 border-r border-b border-neutral-100 flex items-center justify-center text-[8px] opacity-20">0,0</div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[80%] h-[80%] border border-dashed border-neutral-100">
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 flex items-center justify-center"
                   >
                     <div className="w-full h-px bg-neutral-100" />
                     <div className="w-px h-full bg-neutral-100" />
                     <div className="absolute w-64 h-64 border-2 border-orange-500/20 rounded-full" />
                   </motion.div>
                   <MediaPlaceholder label="Technical System Architecture Blueprint" mood="minimal" aspectRatio="wide" className="h-full border-none opacity-40 grayscale" />
                </div>
             </div>
             <Annotation x="15%" y="20%" label="Module_ID" value="LOGIS-804-PX" />
             <Annotation x="75%" y="65%" label="Core_Status" value="SYNC_ACTIVE_99" />
          </div>
        </section>

        {/* 3. Modular Infrastructure Section */}
        <section className="py-20 border-t-4 border-neutral-900 mb-40">
           <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">System_Specs</h2>
              <div className="grid grid-cols-2 gap-x-20 gap-y-6">
                <div>
                  <span className="block text-[8px] opacity-40 mb-1">DATA_STREAM</span>
                  <span className="text-xl font-bold">12.8ms</span>
                </div>
                <div>
                  <span className="block text-[8px] opacity-40 mb-1">LATENCY_CORE</span>
                  <span className="text-xl font-bold">0.002%</span>
                </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200">
              {[
                { title: "Network_Matrix", icon: Layers, val: "0x884" },
                { title: "Node_Security", icon: Lock, val: "SHA-512" },
                { title: "Auto_Optimal", icon: Cpu, val: "V8_ENGINE" },
                { title: "Global_Link", icon: Compass, val: "RT_SYNC" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-12 group hover:bg-neutral-900 hover:text-white transition-colors">
                   <div className="flex justify-between items-start mb-20">
                      <div className="w-12 h-12 bg-neutral-100 group-hover:bg-white/10 flex items-center justify-center rounded-sm">
                         <item.icon size={20} />
                      </div>
                      <span className="text-[10px] font-bold opacity-30">{item.val}</span>
                   </div>
                   <h3 className="text-2xl font-black uppercase mb-6 tracking-tight">{item.title}</h3>
                   <p className="text-xs opacity-40 leading-relaxed group-hover:opacity-60">
                     모든 물류 매트릭스는 실시간으로 계산되며 최고의 효율을 위해 설계된 프로토콜을 따릅니다.
                   </p>
                </div>
              ))}
           </div>
        </section>

        {/* 4. Practical Data Log Strip */}
        <motion.div 
           whileInView={{ opacity: [0.3, 1, 0.3] }}
           transition={{ duration: 2, repeat: Infinity }}
           className="bg-neutral-900 text-orange-500 p-4 font-mono text-[8px] md:text-[10px] flex justify-between overflow-hidden whitespace-nowrap mb-40"
        >
          <span>[SYSTEM_LOG] INITIALIZING_NODE_48... OK</span>
          <span className="hidden md:inline">[ROUTE_SCAN] INCHEON_TO_ROTTERDAM... SUCCESS (ETA: 18.2D)</span>
          <span>[CORE_ID] BORA_LOGIS_V8.04_PRECISION_STABLE</span>
          <span className="hidden md:inline">[SYNC_LEVEL] 99.8% GLOBAL_COVERAGE_ACTIVE</span>
        </motion.div>
      </main>

      {/* 5. Industrial Title Block Footer */}
      <footer className="bg-white border-t-8 border-neutral-900 p-6 md:p-12">
        <div className="max-w-[1600px] mx-auto border-4 border-neutral-900 grid grid-cols-1 lg:grid-cols-4 divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-neutral-900">
           
           {/* Section 1: Brand Info */}
           <div className="p-10 flex flex-col justify-between h-[300px]">
              <div>
                 <span className="text-[8px] font-black uppercase tracking-widest block mb-4">Manufacturer</span>
                 <h3 className="text-4xl font-black tracking-tightest">BORA_LOGIS</h3>
              </div>
              <div className="text-[8px] opacity-40 leading-loose">
                 ESTABLISHED: 1998<br />
                 CATEGORY: INDUSTRIAL LOGISTICS<br />
                 LICENSE: REF-804-CORE
              </div>
           </div>

           {/* Section 2: Contact Specifications */}
           <div className="p-10 flex flex-col justify-between">
              <span className="text-[8px] font-black uppercase tracking-widest block mb-10">Technical Support</span>
              <ul className="text-xs font-bold space-y-4">
                 <li className="flex justify-between"><span>TEL_INTL:</span> <span>+82 2-1234-5678</span></li>
                 <li className="flex justify-between"><span>MAIL_SPEC:</span> <span>ENG@BORA.LOGIS</span></li>
                 <li className="flex justify-between"><span>HQ_COORD:</span> <span>37.5665, 126.9780</span></li>
              </ul>
              <div className="mt-10 h-10 bg-neutral-100 border border-neutral-200" />
           </div>

           {/* Section 3: Indexing */}
           <div className="p-10 flex flex-col justify-between">
              <span className="text-[8px] font-black uppercase tracking-widest block mb-10">System Map</span>
              <div className="grid grid-cols-2 gap-x-10 gap-y-4 text-[10px] font-bold">
                 <Link href="#" className="hover:text-orange-500 underline">DOC_OVERVIEW</Link>
                 <Link href="#" className="hover:text-orange-500 underline">SPEC_MATRIX</Link>
                 <Link href="#" className="hover:text-orange-500 underline">NODE_SECURITY</Link>
                 <Link href="#" className="hover:text-orange-500 underline">LEGAL_CORE</Link>
              </div>
              <div className="mt-auto pt-10 text-[8px] opacity-20">
                PROPRIETARY DATA. UNAUTHORIZED REPRODUCTION IS PROHIBITED.
              </div>
           </div>

           {/* Section 4: Approval / Title Block */}
           <div className="p-10 bg-neutral-900 text-white flex flex-col justify-between">
              <div className="flex justify-between">
                 <span className="text-[8px] tracking-[0.3em] font-bold">REVISION: A</span>
                 <span className="text-[8px] tracking-[0.3em] font-bold">SHEET: 01/01</span>
              </div>
              <div className="text-center py-10">
                 <div className="text-[10px] opacity-40 mb-4 tracking-widest">APPROVED BY</div>
                 <div className="text-4xl font-black tracking-widest border-b-2 border-white inline-block px-10 pb-4">BORA_HQ</div>
              </div>
              <div className="text-[8px] text-center opacity-40 uppercase tracking-widest">
                 © 2026 BORA Logistics Engineering Division
              </div>
           </div>

        </div>
      </footer>
    </div>
  );
}
