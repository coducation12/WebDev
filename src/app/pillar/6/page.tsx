"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Globe, Anchor, Plane, Target, Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import MediaPlaceholder from "@/components/MediaPlaceholder";

function ChapterSection({ 
  title, 
  subtitle, 
  number, 
  label, 
  mood 
}: { 
  title: string, 
  subtitle: string, 
  number: string, 
  label: string, 
  mood: "minimal" | "dynamic" | "standard" | "eco" | "cinematic"
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  return (
    <section ref={ref} className="relative h-[200vh] flex items-center justify-center overflow-hidden">
      <motion.div 
        style={{ opacity, scale }}
        className="fixed inset-0 z-0"
      >
        <MediaPlaceholder 
          label={label} 
          mood={mood} 
          aspectRatio="wide" 
          className="h-full border-none rounded-none w-full"
        />
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      <motion.div 
        style={{ y: textY }}
        className="relative z-10 text-center max-w-4xl px-6"
      >
        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.6em] text-white/40 mb-10">
          Chapter {number}
        </span>
        <h2 className="text-6xl md:text-9xl font-serif font-bold italic mb-8 tracking-tighter leading-none">
          {title}
        </h2>
        <p className="text-xl md:text-2xl text-white/60 font-medium leading-relaxed max-w-2xl mx-auto italic">
          {subtitle}
        </p>
      </motion.div>
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
        className="fixed top-0 left-0 w-full z-50 p-6 md:p-12 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm"
      >
        <Link href="/" className="text-3xl font-bold tracking-tighter hover:opacity-50 transition-opacity">
          BORA<span className="text-white/20">CINEMA</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-16 text-[11px] font-bold uppercase tracking-[0.4em] text-white/50">
          <Link href="#" className="hover:text-white transition-colors">Prologue</Link>
          <Link href="#" className="hover:text-white transition-colors">The Journey</Link>
          <Link href="#" className="hover:text-white transition-colors">Connect</Link>
          <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
            <Play size={18} fill="currentColor" />
          </button>
        </div>

        <button className="md:hidden">
          <Menu size={24} />
        </button>
      </motion.header>

      {/* 2. Storytelling Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <MediaPlaceholder label="Grand Opening Logistics Cinematic Scene" mood="cinematic" aspectRatio="wide" className="h-full border-none rounded-none opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        </div>

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.8em] text-white/30 mb-20 animate-pulse">
              A Global Visionary Film
            </span>
            <h1 className="text-7xl md:text-[14rem] font-bold tracking-tightest leading-[0.8] mb-20 italic">
              Expansive <br /> & Pure.
            </h1>
            <div className="flex flex-col items-center gap-12">
              <div className="w-px h-24 bg-gradient-to-b from-white/0 via-white/40 to-white/0" />
              <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-white/40">
                Scroll to Begin the Journey
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Story Chapters (Service Scenes) */}
      <ChapterSection 
        number="01" 
        title="Deep Waters" 
        subtitle="우리는 바다의 깊이만큼이나 거대한 무역의 흐름을 통제합니다. 보라로지스의 해상 솔루션은 전 세계를 가장 안전하게 연결합니다."
        label="Large Vessel in Dark Ocean Cinematic" 
        mood="cinematic"
      />
      
      <ChapterSection 
        number="02" 
        title="Infinite Skies" 
        subtitle="시공간의 제약을 넘어, 가장 빠른 별의 궤적을 따라 화물을 운송합니다. 보라의 항공 물류는 불가능을 가능으로 바꿉니다."
        label="Cargo Plane in Night Sky Cinematic" 
        mood="cinematic"
      />

      <ChapterSection 
        number="03" 
        title="The Hub" 
        subtitle="모든 흐름이 모이는 곳, 지능형 거점에서의 완벽한 조화를 경험하십시오. 정교한 기술이 무역의 내일을 디자인합니다."
        label="Advanced Automated Warehouse Cinematic" 
        mood="cinematic"
      />

      {/* 4. Panoramic Network Map Section */}
      <section className="relative h-screen bg-black flex items-center justify-center">
        <div className="absolute inset-0 z-0 opacity-40">
           <MediaPlaceholder label="World Night View Global Network" mood="cinematic" aspectRatio="wide" className="h-full border-none rounded-none" />
           <div className="absolute inset-0 bg-radial-gradient(circle, transparent 40%, black 100%)" />
        </div>
        
        <div className="relative z-10 text-center max-w-5xl px-6">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.5 }}
           >
             <h2 className="text-5xl md:text-8xl font-bold tracking-tightest mb-12">
               The Global <br /> <span className="text-white/20 italic">Afterimage.</span>
             </h2>
             <p className="text-lg md:text-xl text-white/40 font-medium leading-relaxed max-w-2xl mx-auto italic">
               우리가 지나간 자리에는 신뢰라는 빛의 궤적이 남습니다. <br />
               전 세계를 잇는 2,400개의 거점이 보라의 이름을 기억합니다.
             </p>
             <button className="mt-20 px-12 py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform">
                Explore the Network
             </button>
           </motion.div>
        </div>
      </section>

      {/* 5. Epilogue & Dark Footer */}
      <footer className="relative bg-black pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-40 mb-60 relative z-10">
          <div>
            <h3 className="text-6xl md:text-8xl font-black italic tracking-tightest mb-12">BORA.</h3>
            <p className="text-xl text-white/30 italic max-w-sm leading-relaxed mb-12">
              우리는 물류를 통해 세상의 이야기를 기록합니다. <br />
              당신의 무역이 한 편의 걸작이 되도록.
            </p>
            <div className="flex gap-10">
              <Globe size={24} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
              <Anchor size={24} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
              <Plane size={24} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
              <Target size={24} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-20 items-end">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 mb-8">Scenes</span>
              <ul className="text-sm text-white/40 flex flex-col gap-6 italic">
                <li><Link href="#" className="hover:text-white">The Ocean</Link></li>
                <li><Link href="#" className="hover:text-white">The Sky</Link></li>
                <li><Link href="#" className="hover:text-white">The Core</Link></li>
              </ul>
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 mb-8">Production</span>
              <ul className="text-sm text-white/40 flex flex-col gap-6 italic">
                <li><Link href="#" className="hover:text-white">BORA Studio</Link></li>
                <li><Link href="#" className="hover:text-white">Manifesto</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 opacity-20">
          <p className="text-[10px] uppercase tracking-[0.8em]">© 2026 BORA Stories & Flow. Cinematic Concept.</p>
          <div className="flex gap-12 text-[10px] uppercase tracking-[0.3em]">
             <Link href="#">Credits</Link>
             <Link href="#">Privacy</Link>
          </div>
        </div>
        
        {/* Large Aesthetic Watermark */}
        <div className="absolute -bottom-20 -right-20 text-[20rem] md:text-[30rem] font-black italic opacity-[0.03] select-none pointer-events-none">
          STORY
        </div>
      </footer>
    </div>
  );
}
