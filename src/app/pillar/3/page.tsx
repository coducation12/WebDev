"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Globe, Search, Settings, ShieldCheck, Zap, Menu, Activity, Plus, Ship, Truck } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ASSET_PATH = "/assets/images";

// Individual Bento Card Component
function BentoCard({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-3xl hover:bg-white/[0.06] transition-all p-8 flex flex-col justify-between group shadow-2xl",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export default function MinimalIntelligenceHome() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-[#020617] text-white font-sans min-h-screen overflow-x-hidden selection:bg-blue-500/30 selection:text-white pb-20">
      
      {/* Background Subtle Gradient Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -left-1/4 w-[70%] h-[70%] bg-blue-600/10 rounded-full blur-[180px]" 
        />
        <motion.div 
          animate={{ x: [0, -20, 0], y: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-1/4 w-[50%] h-[50%] bg-[#6A0DAD]/5 rounded-full blur-[150px]" 
        />
      </div>

      {/* 1. Refined Glass Header */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-7xl">
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full px-10 py-5 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <Link href="/" className="relative w-36 h-8">
            <Image src={`${ASSET_PATH}/logo_white.png`} alt="BORALOGIS" fill className="object-contain" />
          </Link>
          
          <div className="hidden md:flex items-center gap-12">
            {["Ecosystem", "Intelligence", "Network", "About"].map((item) => (
              <Link key={item} href="#" className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all">
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <Link href="#" className="hidden lg:block px-8 py-2.5 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">
              Contact
            </Link>
            <button className="p-2 opacity-60 hover:opacity-100 transition-opacity">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-44 px-6 md:px-10 max-w-7xl mx-auto">
        
        {/* 2. Hero Section - Bento Intelligence */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-5 mb-5">
          
          {/* Main Vision Card */}
          <BentoCard className="md:col-span-3 min-h-[500px] flex-row items-center gap-16" delay={0.1}>
            <div className="flex-1 z-10">
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest mb-10">
                <Activity size={14} /> Integrated Intelligence
              </span>
              <h1 className="text-5xl md:text-[7rem] font-bold tracking-tightest leading-[0.85] mb-12">
                Bora Group <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#6A0DAD]">Global Edge.</span>
              </h1>
              <p className="text-xl text-white/40 max-w-xl font-medium leading-relaxed">
                4만 평의 압도적 인프라와 독자적인 자동화 기술로 <br />
                글로벌 물류의 새로운 기준을 정립합니다.
              </p>
            </div>
            <div className="hidden lg:block w-2/5 aspect-square relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-[#6A0DAD]/30 rounded-[4rem] blur-3xl group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative z-10 w-full h-full rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl">
                 <Image src={`${ASSET_PATH}/AI.jpg`} alt="AI Tech" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
              </div>
            </div>
          </BentoCard>

          {/* Infrastructure Card */}
          <BentoCard className="md:col-span-1 min-h-[500px] bg-blue-700 shadow-[0_30px_60px_rgba(29,78,216,0.3)]" delay={0.2}>
            <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mb-10 border border-white/20 backdrop-blur-xl">
               <Ship size={32} strokeWidth={1.5} />
            </div>
            <div className="mt-auto">
              <h3 className="text-3xl font-bold mb-6 tracking-tight leading-tight">Gwangyang <br /> Powerhouse</h3>
              <p className="text-white/70 text-base mb-10 leading-relaxed font-medium">자유무역지역 최대 규모의 항만 배후단지 인프라 구축.</p>
              <div className="text-5xl font-black italic opacity-30">40,000평</div>
            </div>
          </BentoCard>

          {/* Expert Card */}
          <BentoCard className="md:col-span-1 min-h-[350px]" delay={0.3}>
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
              <ShieldCheck size={28} className="text-blue-400" />
            </div>
            <div>
              <span className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Technical Force</span>
              <h3 className="text-2xl font-bold mb-4">95 Specialists</h3>
              <p className="text-white/40 text-sm leading-relaxed">최고 수준의 물류 및 무역 전문가가 24시간 실시간 관제를 수행합니다.</p>
            </div>
          </BentoCard>

          {/* Eco-Energy Card (RE&UP) */}
          <BentoCard className="md:col-span-2 min-h-[350px]" delay={0.4}>
            <div className="flex justify-between items-start mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/20">
                  <Zap size={24} className="text-green-400" />
                </div>
                <h3 className="text-3xl font-bold tracking-tight">Eco-RE&UP</h3>
              </div>
              <span className="text-xs font-black uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10">New Energy</span>
            </div>
            <p className="text-white/40 text-lg leading-relaxed max-w-md font-medium">
              태양광·풍력 등 재생에너지 특수 물류를 선도하며 <br />
              지속 가능한 미래를 위한 순환경제를 실현합니다.
            </p>
            <div className="absolute bottom-0 right-0 w-48 h-48 opacity-10 pointer-events-none">
               <Image src={`${ASSET_PATH}/extra_14.jpg`} alt="Eco" fill className="object-cover rounded-tl-[4rem]" />
            </div>
          </BentoCard>

          {/* Automation Card */}
          <BentoCard className="md:col-span-1 min-h-[350px] bg-[#6A0DAD]/20 border-[#6A0DAD]/30" delay={0.5}>
             <Cpu size={32} className="mb-10 text-purple-400" />
             <div className="mt-auto">
               <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3 block">Bora Logitech</span>
               <h3 className="text-3xl font-bold tracking-tight mb-4">Smart <br /> Automation</h3>
               <p className="text-white/30 text-sm">자체 설계 물류 로봇 및 공정 자동화 솔루션.</p>
             </div>
          </BentoCard>
        </div>

        {/* 3. Operational Showcase */}
        <section className="py-24">
          <BentoCard className="min-h-[550px] p-0" delay={0.6}>
            <div className="flex flex-col lg:flex-row h-full">
              <div className="flex-1 p-12 md:p-20 space-y-12">
                <div className="space-y-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Masterplan</span>
                  <h2 className="text-4xl md:text-7xl font-bold tracking-tightest leading-[0.9]">Reliability <br /> Defined.</h2>
                  <p className="text-white/40 text-xl max-w-md leading-relaxed font-medium">단순한 보관을 넘어 가공, 제조, IT 기술이 결합된 원스톱 마스터피스 솔루션을 제안합니다.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-10">
                  {[
                    { icon: Globe, title: "Global Network", text: "전 세계를 연결하는 무역 허브" },
                    { icon: Settings, title: "Custom Flow", text: "맞춤형 수출입 프로세스 설계" }
                  ].map((item, i) => (
                    <div key={i} className="space-y-4 group/item">
                      <item.icon size={28} className="text-white/40 group-hover/item:text-blue-400 transition-colors" />
                      <h4 className="text-lg font-bold">{item.title}</h4>
                      <p className="text-sm text-white/30 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-1 w-full min-h-[400px] relative">
                <Image src={`${ASSET_PATH}/extra_22.jpg`} alt="Showcase" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020617] to-transparent lg:block hidden" />
              </div>
            </div>
          </BentoCard>
        </section>

        {/* Final CTA */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="mt-12 p-12 bg-white/5 rounded-[3.5rem] border border-white/10 flex flex-col lg:flex-row justify-between items-center gap-12 text-center lg:text-left"
        >
          <div className="space-y-4">
            <h3 className="text-4xl font-bold tracking-tight">The Next Standard of Commerce</h3>
            <p className="text-white/30 text-xl font-medium">보라그룹이 비즈니스의 경쟁력을 완성하는 파트너가 되겠습니다.</p>
          </div>
          <button className="px-14 py-6 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
            Partner with BORA
          </button>
        </motion.div>
      </main>

      {/* 4. Minimalist Glass Footer */}
      <footer className="relative pt-40 px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start border-t border-white/10 pt-20 gap-20">
          <div className="space-y-8">
            <div className="w-40 h-10 relative">
              <Image src={`${ASSET_PATH}/logo_white.png`} alt="LOGO" fill className="object-contain" />
            </div>
            <div className="text-white/30 text-sm font-medium leading-relaxed max-w-sm">
               <p className="font-bold text-white mb-2 underline decoration-blue-500 underline-offset-8">보라로지스(주)</p>
               <p>전남 광양시 항만8로 18-35 (도이동)</p>
               <p>T: 061-795-9951~3  |  E: admin@boralogis.com</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
             {[
               { title: "Network", links: ["Gwangyang", "Pusan", "Incheon"] },
               { title: "Technology", links: ["Automation", "AI Control", "Security"] },
               { title: "Group", links: ["Logistics", "Logitech", "RE&UP"] }
             ].map((group, i) => (
               <div key={i} className="space-y-8">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">{group.title}</h4>
                 <ul className="space-y-4 text-xs font-bold text-white/40 uppercase tracking-widest">
                   {group.links.map(link => (
                     <li key={link} className="hover:text-blue-400 transition-colors cursor-pointer">{link}</li>
                   ))}
                 </ul>
               </div>
             ))}
          </div>
        </div>
        
        <div className="text-center mt-40 pb-10 border-t border-white/5 pt-10">
           <p className="text-[10px] font-bold uppercase tracking-[1em] opacity-10 italic">Efficiency. Intelligence. Innovation. BORA.</p>
        </div>
      </footer>
    </div>
  );
}
