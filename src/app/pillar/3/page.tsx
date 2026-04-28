"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Globe, Search, Settings, ShieldCheck, Zap, Menu, Activity, Plus, Ship, Truck, Globe2, Package, Anchor } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import TechNetworkAnim from "@/components/TechNetworkAnim";

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
          
          <div className="hidden md:flex items-center gap-10">
            {["물류 서비스", "기술 혁신", "글로벌", "회사 소개"].map((item) => (
              <Link key={item} href="#" className="text-[13px] font-bold tracking-wide text-white/50 hover:text-white transition-all">
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <Link href="#" className="hidden lg:block px-8 py-2.5 bg-white text-black rounded-full font-bold text-[13px] tracking-wide hover:bg-blue-500 hover:text-white transition-all">
              문의하기
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
          
          {/* Main Vision Card - 풀 애니메이션 */}
          <BentoCard className="md:col-span-3 min-h-[500px] p-0 overflow-hidden" delay={0.1}>
            {/* 배경 그리드 + 글로우 */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, rgba(96,165,250,0.4) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
              <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] bg-blue-500/8 rounded-full blur-[100px]" />
              <div className="absolute bottom-1/4 right-1/4 w-[30%] h-[30%] bg-[#9B72CF]/8 rounded-full blur-[80px]" />
            </div>
            <div className="w-full h-full flex items-center justify-center relative z-10">
              <TechNetworkAnim />
            </div>
          </BentoCard>

          {/* Bora Group 소개 카드 */}
          <BentoCard className="md:col-span-1 min-h-[500px]" delay={0.2}>
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
              <Image src={`${ASSET_PATH}/mark.png`} alt="" fill className="object-contain p-12 opacity-30" />
            </div>
            <div className="relative z-10">
              <h3 className="text-5xl font-bold tracking-tight leading-[0.85] mb-6">
                Bora<br />Group<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#9B72CF]">Logistics.</span>
              </h3>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[9px] font-black uppercase tracking-widest w-fit">
                <Activity size={12} /> 종합 물류 플랫폼
              </span>
            </div>
            <div className="mt-auto relative z-10">
              <p className="text-white/50 text-base leading-relaxed font-medium">
                4만 평의 압도적 인프라와 독자적 자동화 기술로 글로벌 물류의 새 기준을 세웁니다.
              </p>
            </div>
          </BentoCard>

          {/* 글로벌 무역 (1col) */}
          <BentoCard className="md:col-span-1 min-h-[350px]" delay={0.3}>
            <div className="absolute inset-0 opacity-[0.18] group-hover:opacity-60 transition-opacity duration-700 pointer-events-none">
              <Image src={`${ASSET_PATH}/extra_3.jpg`} alt="글로벌 무역" fill className="object-cover" />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
                <Globe2 size={28} className="text-blue-400" />
              </div>
            </div>
            <div className="relative z-10">
              <span className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Trade Network</span>
              <h3 className="text-2xl font-bold mb-4">글로벌<br />무역 확장</h3>
              <p className="text-white/40 text-sm leading-relaxed">중국·동남아 수출입부터 K-culture, K-food 수출까지.</p>
            </div>
          </BentoCard>

          {/* 광양항 물류거점 (와이드 2col) */}
          <BentoCard className="md:col-span-2 min-h-[350px]" delay={0.4}>
            <div className="absolute inset-0 opacity-[0.18] group-hover:opacity-55 transition-opacity duration-700 pointer-events-none">
              <Image src={`${ASSET_PATH}/extra_24.jpg`} alt="광양항" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/70 to-transparent" />
            </div>
            <div className="relative z-10 flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                  <Anchor size={24} className="text-blue-400" />
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Gwangyang Free Trade Zone</span>
                  <h3 className="text-2xl font-bold tracking-tight">광양항 물류 거점</h3>
                </div>
              </div>
            </div>
            <div className="relative z-10 mt-auto">
              <p className="text-white/40 text-base leading-relaxed font-medium mb-6">
                자유무역지역 최대 규모 항만 배후단지<br />
                보세창고 · 포워딩 · 검역대행 · 내륙운송
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-white/15">40,000</span>
                <span className="text-xl font-bold text-white/20">평</span>
              </div>
            </div>
          </BentoCard>

          {/* 스마트 자동화 */}
          <BentoCard className="md:col-span-1 min-h-[350px] bg-[#9B72CF]/10 border-[#9B72CF]/15" delay={0.5}>
            <div className="absolute inset-0 opacity-[0.15] group-hover:opacity-55 transition-opacity duration-700 pointer-events-none">
              <Image src={`${ASSET_PATH}/AI.jpg`} alt="자동화" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent" />
            </div>
            <div className="relative z-10">
              <Cpu size={32} className="mb-10 text-purple-400" />
            </div>
            <div className="mt-auto relative z-10">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3 block">보라로지텍</span>
              <h3 className="text-3xl font-bold tracking-tight mb-4">스마트<br />자동화</h3>
              <p className="text-white/40 text-sm">자체 설계 물류 장비 및 공정 자동화 솔루션.</p>
            </div>
          </BentoCard>
        </div>

        {/* 3. Operational Showcase */}
        <section className="py-24">
          <BentoCard className="min-h-[550px] p-0" delay={0.6}>
            <div className="flex flex-col lg:flex-row h-full">
              <div className="flex-1 p-12 md:p-20 space-y-12">
                <div className="space-y-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">토탈 솔루션</span>
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tightest leading-[0.9]">물류에서<br />무역까지,<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#9B72CF]">한번에.</span></h2>
                  <p className="text-white/40 text-lg max-w-md leading-relaxed font-medium">보관을 넘어 가공, 제조, 포워딩이 결합된 원스톱 솔루션. 물류 인프라 위에 무역을 연결합니다.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-10">
                  {[
                    { icon: Globe2, title: "글로벌 네트워크", text: "중국·동남아 수출입 무역 확장" },
                    { icon: Settings, title: "맞춤형 프로세스", text: "고객별 수출입 물류 흐름 설계" }
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
                <Image src={`${ASSET_PATH}/extra_5.jpg`} alt="물류 현장" fill className="object-cover" />
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
            <h3 className="text-4xl font-bold tracking-tight">비즈니스의 경쟁력을 완성합니다</h3>
            <p className="text-white/30 text-xl font-medium">보라그룹이 물류와 무역을 잇는 최적의 파트너가 되겠습니다.</p>
          </div>
          <button className="px-14 py-6 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
            문의하기
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
               { title: "사업 영역", links: ["국제물류", "물류기술", "재생에너지"] },
               { title: "서비스", links: ["보세창고", "포워딩", "내륙운송"] },
               { title: "그룹사", links: ["보라로지스", "보라로지텍", "RE&UP"] }
             ].map((group, i) => (
               <div key={i} className="space-y-8">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">{group.title}</h4>
                 <ul className="space-y-4 text-xs font-bold text-white/40 tracking-widest">
                   {group.links.map(link => (
                     <li key={link} className="hover:text-blue-400 transition-colors cursor-pointer">{link}</li>
                   ))}
                 </ul>
               </div>
             ))}
          </div>
        </div>
        
        <div className="text-center mt-40 pb-10 border-t border-white/5 pt-10">
           <p className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-10">© 2026 BORALOGIS Co.,Ltd. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
