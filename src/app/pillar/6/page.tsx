"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Globe, Anchor, Plane, Target, Menu, Package, Zap, Globe2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const ASSET_PATH = "/assets/images";

function ChapterSection({ 
  title, 
  subtitle, 
  number, 
  imageSrc,
  overlayOpacity = "bg-black/30"
}: { 
  title: string, 
  subtitle: string, 
  number: string, 
  imageSrc: string,
  overlayOpacity?: string
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // 이미지 페이드인/아웃
  const imgOpacity = useTransform(scrollYProgress, [0, 0.15, 0.75, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);
  // 텍스트 각 요소 순차 페이드인, 동시 페이드아웃
  const labelOpacity = useTransform(scrollYProgress, [0, 0.12, 0.22, 0.75, 1], [0, 0, 1, 1, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.28, 0.75, 1], [0, 0, 1, 1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.34, 0.75, 1], [0, 0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.15, 0.28], [30, 0]);
  const subtitleY = useTransform(scrollYProgress, [0.2, 0.34], [20, 0]);

  return (
    <section ref={ref} className="relative h-[130vh] flex items-center justify-center overflow-hidden">
      <motion.div 
        style={{ opacity: imgOpacity, scale }}
        className="fixed inset-0 z-0"
      >
        <Image src={imageSrc} alt={title} fill className="object-cover" sizes="100vw" />
        <div className={`absolute inset-0 ${overlayOpacity}`} />
      </motion.div>

      <div className="fixed inset-0 z-10 flex items-center justify-center">
        <div className="text-center max-w-4xl px-6">
          <motion.span 
            style={{ opacity: labelOpacity }}
            className="inline-block text-[10px] font-bold uppercase tracking-[0.6em] text-white/50 mb-10"
          >
            Chapter {number}
          </motion.span>
          <motion.h2 
            style={{ opacity: titleOpacity, y: titleY }}
            className="text-6xl md:text-9xl font-serif font-bold italic mb-8 tracking-tighter leading-none drop-shadow-2xl"
          >
            {title}
          </motion.h2>
          <motion.p 
            style={{ opacity: subtitleOpacity, y: subtitleY }}
            className="text-xl md:text-2xl text-white/70 font-medium leading-relaxed max-w-2xl mx-auto italic drop-shadow-lg"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export default function CinematicFlowHome() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHeaderVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="bg-black text-white font-serif selection:bg-white selection:text-black">
      {/* 1. Immersive Auto-hiding Header */}
      <motion.header
        animate={{ y: isHeaderVisible ? 0 : -100 }}
        className="fixed top-0 left-0 w-full z-50 p-6 md:p-12 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm"
      >
        <Link href="/" className="relative w-36 h-8">
          <Image src={`${ASSET_PATH}/logo_white.png`} alt="BORA" fill className="object-contain object-left" />
        </Link>
        
        <div className="hidden md:flex items-center gap-12 text-[13px] font-bold uppercase tracking-[0.3em] text-white/50">
          <Link href="#" className="hover:text-white transition-colors">물류 서비스</Link>
          <Link href="#" className="hover:text-white transition-colors">글로벌 무역</Link>
          <Link href="#" className="hover:text-white transition-colors">회사 소개</Link>
          <Link href="#" className="px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all text-[11px]">
            문의하기
          </Link>
        </div>

        <button className="md:hidden">
          <Menu size={24} />
        </button>
      </motion.header>

      {/* 2. Hero Section — 물류의 시작 */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={`${ASSET_PATH}/extra_7.jpg`} alt="광양항 물류" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />
        </div>

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.8em] text-white/40 mb-16">
              Bora Group — Logistics to Trade
            </span>
            <h1 className="text-7xl md:text-[12rem] font-bold tracking-tightest leading-[1.15] mb-16 italic">
              물류에서 <br /> <span className="text-white/40">무역으로.</span>
            </h1>
            <p className="text-lg text-white/50 font-medium italic tracking-wide mb-20">
              광양항에서 세계로, 보라 그룹이 그리는 물류와 무역의 여정.
            </p>
            <div className="flex flex-col items-center gap-8">
              <div className="w-px h-20 bg-gradient-to-b from-white/0 via-white/30 to-white/0" />
              <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-white/30">
                스크롤하여 시작하기
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Story Chapters */}
      
      {/* Chapter 01: 물류 인프라 — 밝은 창고 이미지 */}
      <ChapterSection 
        number="01" 
        title="The Foundation" 
        subtitle="광양 자유무역지역 4만 평. 보세창고 2만 평의 압도적 인프라. 보라로지스의 물류는 여기서 시작됩니다."
        imageSrc={`${ASSET_PATH}/extra_2.jpg`}
        overlayOpacity="bg-black/25"
      />
      
      {/* Chapter 02: 항만·운송 — 밝은 컨테이너선 이미지 */}
      <ChapterSection 
        number="02" 
        title="The Flow" 
        subtitle="포워딩, 검역대행, 내륙운송까지 자체 인프라로 수행합니다. 광양항에서 전 세계로, 끊김 없는 물류의 흐름."
        imageSrc={`${ASSET_PATH}/extra_3.jpg`}
        overlayOpacity="bg-black/20"
      />

      {/* Chapter 03: 글로벌 무역 — 컨테이너항 이미지 */}
      <ChapterSection 
        number="03" 
        title="The Trade" 
        subtitle="물류 인프라 위에 무역을 연결합니다. 중국·동남아 수출입부터 K-culture, K-food 수출까지. 글로벌 무역의 새 기준."
        imageSrc={`${ASSET_PATH}/extra_1.jpg`}
        overlayOpacity="bg-black/25"
      />

      {/* 4. 핵심 수치 섹션 */}
      <section className="relative h-screen bg-black flex items-center justify-center">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image src={`${ASSET_PATH}/extra_10.jpg`} alt="물류 네트워크" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center max-w-5xl px-6">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.5 }}
           >
             <h2 className="text-5xl md:text-8xl font-bold tracking-tightest mb-16">
               보라 그룹의 <br /> <span className="text-white/30 italic">경쟁력.</span>
             </h2>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
               {[
                 { value: "40,000", unit: "평", label: "물류 인프라" },
                 { value: "20,000", unit: "평", label: "보세창고" },
                 { value: "95", unit: "명", label: "전문 인력" },
                 { value: "3", unit: "사", label: "그룹사" },
               ].map((item, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: idx * 0.15, duration: 0.8 }}
                   className="p-6"
                 >
                   <span className="block text-5xl md:text-6xl font-bold tracking-tight mb-1">
                     {item.value}<span className="text-2xl text-white/40 ml-1">{item.unit}</span>
                   </span>
                   <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">{item.label}</span>
                 </motion.div>
               ))}
             </div>

             <p className="text-lg md:text-xl text-white/40 font-medium leading-relaxed max-w-2xl mx-auto italic mb-12">
               4조 3교대, 24시간 가동. 자체 설계 물류 장비와 스마트 자동화 시스템으로<br />
               글로벌 물류의 새로운 기준을 세웁니다.
             </p>
             <Link href="#" className="inline-block px-12 py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform">
               문의하기
             </Link>
           </motion.div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="relative bg-black pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-40 mb-60 relative z-10">
          <div>
            <div className="relative w-40 h-10 mb-12">
              <Image src={`${ASSET_PATH}/logo_white.png`} alt="BORA" fill className="object-contain object-left" />
            </div>
            <p className="text-xl text-white/30 italic max-w-sm leading-relaxed mb-8">
              물류에서 무역까지, 한번에.<br />
              보라 그룹이 만드는 글로벌 비즈니스의 흐름.
            </p>
            <p className="text-sm text-white/20 leading-relaxed mb-12">
              <span className="font-bold text-white/40 block mb-2">보라로지스(주)</span>
              전남 광양시 항만8로 18-35 (도이동)<br />
              T: 061-795-9951~3
            </p>
            <div className="flex gap-10">
              <Globe size={24} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
              <Anchor size={24} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
              <Package size={24} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
              <Zap size={24} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-20 items-end">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 mb-8">사업 영역</span>
              <ul className="text-sm text-white/40 flex flex-col gap-6 italic">
                <li><Link href="#" className="hover:text-white">국제물류</Link></li>
                <li><Link href="#" className="hover:text-white">보세창고</Link></li>
                <li><Link href="#" className="hover:text-white">포워딩</Link></li>
                <li><Link href="#" className="hover:text-white">글로벌 무역</Link></li>
              </ul>
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 mb-8">그룹사</span>
              <ul className="text-sm text-white/40 flex flex-col gap-6 italic">
                <li><Link href="#" className="hover:text-white">보라로지스</Link></li>
                <li><Link href="#" className="hover:text-white">보라로지텍</Link></li>
                <li><Link href="#" className="hover:text-white">RE&UP</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 opacity-20">
          <p className="text-[10px] uppercase tracking-[0.8em]">© 2026 BORALOGIS Co.,Ltd. All Rights Reserved.</p>
        </div>
        
        {/* Large Aesthetic Watermark */}
        <div className="absolute -bottom-20 -right-20 text-[20rem] md:text-[30rem] font-black italic opacity-[0.02] select-none pointer-events-none">
          BORA
        </div>
      </footer>
    </div>
  );
}
