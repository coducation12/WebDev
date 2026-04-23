"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, Zap, BarChart3, Globe2, Layers, Menu, X, Plus, Shield, Cpu, Activity } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ASSET_PATH = "/assets/images";

// Counting Up Stat Component for Impact
function StatItem({ label, value, suffix = "" }: { label: string, value: string, suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <div ref={ref} className="text-center md:text-left">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="flex items-baseline justify-center md:justify-start gap-2 mb-4"
      >
        <span className="text-6xl md:text-8xl font-black tracking-tightest text-[#6A0DAD]">
          {value}
        </span>
        <span className="text-2xl md:text-3xl font-bold text-white/40">{suffix}</span>
      </motion.div>
      <span className="text-[10px] uppercase tracking-[0.4em] font-black text-neutral-500 block">
        {label}
      </span>
    </div>
  );
}

export default function VisualDynamicHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div ref={containerRef} className="bg-neutral-950 text-white font-sans selection:bg-[#6A0DAD] selection:text-white overflow-x-hidden">
      
      {/* 1. Impact Header */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-center">
        <div className="z-50">
          <Link href="/" className="relative block w-40 h-10">
            <Image src={`${ASSET_PATH}/logo_white.png`} alt="BORALOGIS" fill className="object-contain" />
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-4 bg-white/5 backdrop-blur-2xl p-2 rounded-full border border-white/10">
          {["Solutions", "Technology", "Network"].map(item => (
            <Link key={item} href="#" className="px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:text-[#6A0DAD] transition-colors">{item}</Link>
          ))}
          <Link href="#" className="px-10 py-2 bg-[#6A0DAD] text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-[#6A0DAD] transition-all shadow-[0_0_30px_rgba(106,13,173,0.4)]">
            Contact Us
          </Link>
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="z-50 w-12 h-12 bg-[#6A0DAD] rounded-full flex items-center justify-center hover:scale-110 transition-transform"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* 2. Vibrant Tech Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src={`${ASSET_PATH}/tech_hero.png`} 
            alt="Futuristic Logistics" 
            fill 
            className="object-cover opacity-40 grayscale-[0.3]" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-transparent to-neutral-950" />
        </motion.div>

        {/* Animated Background Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#6A0DAD]/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px]" />
        </div>

        <motion.div className="relative z-10 text-center max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block px-8 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.6em] mb-12">
              Next-Gen Logistics Intelligence
            </span>
            
            <h1 className="text-[4.5rem] md:text-[11rem] font-black leading-[0.8] tracking-tightest mb-20 uppercase italic">
              Hyper<br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6A0DAD] via-purple-400 to-white not-italic">Driven</span>
            </h1>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              <p className="text-xl md:text-3xl font-medium text-white/50 max-w-2xl leading-tight">
                광양항 최대 규모의 인프라와 AI 자동화 기술이 만나 <br />
                당신의 비즈니스 속도를 재정의합니다.
              </p>
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                className="w-28 h-28 bg-white rounded-full flex items-center justify-center text-[#6A0DAD] shadow-[0_0_50px_rgba(255,255,255,0.2)]"
              >
                <ArrowRight size={40} strokeWidth={3} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. Dynamic Services Section (Catalog Data) */}
      <section className="py-40 px-6 md:px-20 relative bg-white text-neutral-950 rounded-[5rem] mx-4 md:mx-10 my-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-40">
            <div className="flex-1">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#6A0DAD] block mb-6">Business Units</span>
              <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tightest leading-[0.85] mb-10">
                Core <br /> Powers
              </h2>
              <div className="w-40 h-4 bg-[#6A0DAD]" />
            </div>
            <div className="flex-1 lg:pt-20">
              <p className="text-2xl md:text-4xl font-bold leading-tight mb-10">
                보라그룹은 물류의 전 과정을 <br /> 기술로 혁신하고 신뢰로 연결합니다.
              </p>
              <p className="text-lg text-neutral-500 font-medium leading-relaxed max-w-lg">
                보라로지스의 항만 인프라, 보라로지텍의 자동화 기술, <br />
                그리고 RE&UP의 재생에너지 솔루션이 시너지를 창출합니다.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { title: "Bora Logis", desc: "자유무역지역 기반 4만 평 인프라의 종합 물류 마스터피스", icon: Ship, color: "bg-neutral-950", img: "extra_24.jpg" },
              { title: "Bora Logitech", desc: "스마트 팩토리 및 물류 자동화 설비 자체 설계·제조", icon: Cpu, color: "bg-[#6A0DAD]", img: "AI.jpg" },
              { title: "RE&UP", desc: "신재생에너지 특수 물류 및 순환경제 업사이클링 솔루션", icon: Activity, color: "bg-blue-600", img: "extra_14.jpg" },
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -20 }}
                className="group relative p-10 bg-neutral-50 rounded-[4rem] overflow-hidden border border-neutral-100 h-[650px] flex flex-col"
              >
                <div className="relative h-64 rounded-[3rem] overflow-hidden mb-12">
                   <Image src={`${ASSET_PATH}/${service.img}`} alt={service.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                   <div className={cn("absolute inset-0 opacity-40", service.color)} />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl", service.color)}>
                      {/* Using fallback icon if needed */}
                      <service.icon size={32} />
                    </div>
                    <h3 className="text-4xl font-black uppercase mb-6 tracking-tight">{service.title}</h3>
                    <p className="text-neutral-500 font-bold leading-relaxed text-lg">
                      {service.desc}
                    </p>
                  </div>
                  
                  <button className={cn("w-full py-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-4 text-white", service.color)}>
                    Explore More <Plus size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Impact Metrics Section (Real Catalog Stats) */}
      <section className="py-40 px-6 md:px-20 overflow-hidden bg-neutral-950">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-24 w-full lg:w-3/5">
            <StatItem label="Total Infrastructure" value="40,000" suffix="PY" />
            <StatItem label="Warehouse Capacity" value="20,000" suffix="PY" />
            <StatItem label="Logistics Specialists" value="95" suffix="EXP" />
            <StatItem label="Security Operation" value="24/7" suffix="LIVE" />
          </div>
          
          <div className="relative w-full lg:w-2/5 aspect-square flex items-center justify-center">
            <div className="absolute inset-0 bg-[#6A0DAD]/20 rounded-full blur-[120px] animate-pulse" />
            <div className="relative z-10 w-full h-full border border-white/10 rounded-full p-4">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#6A0DAD]/30 relative">
                 <Image src={`${ASSET_PATH}/extra_21.jpg`} alt="Metrics" fill className="object-cover grayscale opacity-60" />
                 <div className="absolute inset-0 bg-gradient-to-tr from-[#6A0DAD]/40 to-transparent" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="block text-sm font-black tracking-widest mb-2">OPERATIONAL EXCELLENCE</span>
                      <span className="text-7xl font-black italic">TOP-TIER</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bold Tech Footer */}
      <footer className="bg-[#6A0DAD] text-white py-40 px-6 md:px-20 rounded-t-[6rem]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-40 mb-40">
          <div>
            <h2 className="text-7xl md:text-[10rem] font-black uppercase tracking-tightest leading-[0.8] mb-16 italic">
              Hyper<br /> 
              <span className="not-italic opacity-40">Connect.</span>
            </h2>
            <p className="text-2xl md:text-4xl font-bold leading-tight mb-16 max-w-xl">
              최첨단 자동화 설비와 압도적 규모로 <br /> 
              물류의 다음 시대를 먼저 경험하십시오.
            </p>
            <div className="flex gap-6">
              {[Globe2, Zap, Layers, Shield].map((Icon, i) => (
                <div key={i} className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white hover:text-[#6A0DAD] transition-all cursor-pointer border border-white/5 shadow-xl">
                  <Icon size={24} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col justify-end space-y-20">
             <div className="grid grid-cols-2 gap-20">
               <div>
                 <span className="block text-[10px] font-black uppercase tracking-widest opacity-40 mb-8">Business</span>
                 <ul className="space-y-4 font-black uppercase tracking-widest text-sm">
                   <li><Link href="#" className="hover:text-white/60 transition-colors">Logistics</Link></li>
                   <li><Link href="#" className="hover:text-white/60 transition-colors">Logitech</Link></li>
                   <li><Link href="#" className="hover:text-white/60 transition-colors">RE&UP</Link></li>
                 </ul>
               </div>
               <div>
                 <span className="block text-[10px] font-black uppercase tracking-widest opacity-40 mb-8">Company</span>
                 <ul className="space-y-4 font-black uppercase tracking-widest text-sm">
                   <li><Link href="#" className="hover:text-white/60 transition-colors">Network</Link></li>
                   <li><Link href="#" className="hover:text-white/60 transition-colors">Vision</Link></li>
                   <li><Link href="#" className="hover:text-white/60 transition-colors">History</Link></li>
                 </ul>
               </div>
             </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div>
            <Image src={`${ASSET_PATH}/logo_white.png`} alt="LOGO" width={140} height={40} className="mb-6 mx-auto md:mx-0" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
              © 2026 BORALOGIS Group. All Rights Reserved. Powered by Tech.
            </p>
          </div>
          <div className="text-right">
             <p className="text-sm font-bold opacity-60">Designing the Masterpiece of Logistics</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper icons mapping
const Ship = ({ size, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.2.94 4.19 2.42 5.58" />
    <path d="M11 9V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v5" />
    <path d="M13 13h2" />
    <path d="M11 13h2" />
  </svg>
);
