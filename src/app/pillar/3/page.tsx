"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Globe, Search, Settings, ShieldCheck, Zap, Menu, Activity } from "lucide-react";
import Link from "next/link";
import MediaPlaceholder from "@/components/MediaPlaceholder";
import { useState, useEffect } from "react";

// Individual Bento Card Component
function BentoCard({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`
        relative overflow-hidden rounded-[2rem] border border-white/5 
        bg-white/5 backdrop-blur-3xl hover:bg-white/10 transition-colors
        p-8 flex flex-col justify-between group
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

export default function NextGenTrendHome() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-[#020617] text-white font-sans min-h-screen overflow-x-hidden selection:bg-blue-500/30 selection:text-white">
      {/* Background Animated Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 80, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -left-1/4 w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[150px]" 
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-1/4 w-[50%] h-[50%] bg-bora-purple/10 rounded-full blur-[120px]" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
      </div>

      {/* 1. Glass Header */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full px-8 py-4 flex justify-between items-center shadow-2xl">
          <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-2 group">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-bora-purple group-hover:scale-110 transition-transform" />
            BORA<span className="opacity-40">NEXT</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-10">
            {["Ecosystem", "Intelligence", "Global"].map((item) => (
              <Link key={item} href="#" className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity uppercase">
                {item}
              </Link>
            ))}
            <Link href="#" className="px-6 py-2 bg-white text-black rounded-full font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-transform active:scale-95">
              Launch Console
            </Link>
          </div>

          <button className="md:hidden opacity-60">
            <Menu size={20} />
          </button>
        </div>
      </nav>

      <main className="relative z-10 pt-40 pb-20 px-6 md:px-10 max-w-7xl mx-auto">
        {/* 2. Bento Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-4 mb-4">
          
          {/* Main Title Card */}
          <BentoCard className="md:col-span-3 min-h-[400px] flex-row items-center gap-12" delay={0.1}>
            <div className="flex-1">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-8">
                <Activity size={12} /> Next-Gen Integration
              </span>
              <h1 className="text-5xl md:text-8xl font-bold tracking-tightest leading-[0.9] mb-10 max-w-2xl">
                Intelligence <br /> For Global <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-bora-purple">Commerce.</span>
              </h1>
              <p className="text-lg text-white/50 max-w-md font-medium leading-relaxed">
                벤토 그리드 모듈화 시스템으로 <br />
                복잡한 무역 데이터를 직관적으로 관제합니다. 
              </p>
            </div>
            <div className="hidden lg:block w-1/3 aspect-square relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/40 to-bora-purple/40 rounded-[3rem] blur-2xl" />
              <MediaPlaceholder label="AI Visualization" mood="dynamic" aspectRatio="square" className="rounded-[3rem] relative z-10 border-white/10" />
            </div>
          </BentoCard>

          {/* Connect Card */}
          <BentoCard className="md:col-span-1 min-h-[400px] bg-blue-600 hover:bg-blue-500 transition-colors" delay={0.2}>
            <Globe size={40} strokeWidth={1} className="mb-8" />
            <div className="mt-auto">
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Worldwide <br /> Sync</h3>
              <p className="text-white/70 text-sm mb-8">전 세계 150개국의 네트워크 데이터를 실시간으로 동기화합니다.</p>
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div animate={{ x: [-100, 100] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-1/2 h-full bg-white" />
              </div>
            </div>
          </BentoCard>

          {/* Security Card */}
          <BentoCard className="md:col-span-1 min-h-[320px]" delay={0.3}>
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
              <ShieldCheck size={24} className="text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Immutable Security</h3>
              <p className="text-white/40 text-sm">무역 서류를 블록체인 기반의 보인 시스템으로 완벽하게 보호합니다.</p>
            </div>
          </BentoCard>

          {/* Efficiency Card */}
          <BentoCard className="md:col-span-2 min-h-[320px]" delay={0.4}>
            <div className="flex justify-between items-start mb-8">
              <Zap size={32} className="text-yellow-400" />
              <span className="text-4xl font-bold">+42%</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Optimized Routing</h3>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
              상태 기반 경로 최적화 엔진을 통해 <br />
              전체 물류 비용의 42%를 절감하는 혁신적인 솔루션입니다.
            </p>
          </BentoCard>

          {/* Insights Card */}
          <BentoCard className="md:col-span-1 min-h-[320px] bg-bora-purple/20 border-bora-purple/30" delay={0.5}>
             <Search size={24} className="mb-6 opacity-40" />
             <div className="mt-auto">
               <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2 block">AI Deep Dive</span>
               <h3 className="text-xl font-bold">Predictive <br /> Analysis</h3>
             </div>
          </BentoCard>
        </div>

        {/* 3. Deep Tech Showcase Section */}
        <section className="py-20">
          <BentoCard className="min-h-[500px]" delay={0.6}>
            <div className="flex flex-col md:flex-row gap-20 items-center h-full">
              <div className="flex-1 space-y-10">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tight">The Core <br /> Console.</h2>
                  <p className="text-white/40 text-lg max-w-md">모든 물류 프로세스를 하나의 직관적인 대시보드에서 실시간으로 제어하고 관리합니다.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Cpu size={24} className="text-blue-500" />
                    <h4 className="font-bold">Edge Computing</h4>
                    <p className="text-xs text-white/30">로컬 정점에서의 빠른 데이터 처리 시스템 탑재.</p>
                  </div>
                  <div className="space-y-3">
                    <Settings size={24} className="text-bora-purple" />
                    <h4 className="font-bold">Automated Flow</h4>
                    <p className="text-xs text-white/30">자동화된 수출입 허가 프로세스 디자인.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 w-full h-full min-h-[300px]">
                <MediaPlaceholder label="Dashboard Console UI Preview" mood="dynamic" aspectRatio="video" className="bg-black/60 border-white/5 rounded-[2.5rem]" />
              </div>
            </div>
          </BentoCard>
        </section>

        {/* Final CTA Strip */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="mt-20 p-10 bg-gradient-to-r from-blue-600/10 via-bora-purple/10 to-blue-600/10 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row justify-between items-center gap-10"
        >
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold mb-2">Ready for the Next Era?</h3>
            <p className="text-white/40">보라로지스와 함께 미래지향적인 무역 생태계를 구축하십시오.</p>
          </div>
          <button className="px-12 py-5 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs hover:bg-blue-400 hover:text-white transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)]">
            Explore Documentation
          </button>
        </motion.div>
      </main>

      {/* 4. Seamless Glass Footer */}
      <footer className="relative pt-40 pb-20 px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-20">
          <div className="text-2xl font-bold tracking-tighter mb-10 md:mb-0">
             BORA<span className="opacity-20">NEXT</span>
             <p className="text-[10px] font-medium opacity-30 mt-2 uppercase tracking-widest">Designing Future Commerce</p>
          </div>
          
          <div className="flex gap-20 text-[10px] font-bold uppercase tracking-widest opacity-40">
            <Link href="#" className="hover:opacity-100">Protocols</Link>
            <Link href="#" className="hover:opacity-100">Manifesto</Link>
            <Link href="#" className="hover:opacity-100">Registry</Link>
          </div>
        </div>
        
        <div className="text-center mt-20">
           <span className="text-[15rem] md:text-[25rem] font-bold opacity-[0.02] tracking-tighter absolute -bottom-1/4 left-1/2 -translate-x-1/2 pointer-events-none">
             TRADETECH
           </span>
           <p className="text-[8px] font-bold uppercase tracking-[1em] opacity-10">© 2026 BORA Logis Technologies</p>
        </div>
      </footer>
    </div>
  );
}
