"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Globe, Shield, Zap, Menu, ArrowLeft, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ModernMinimalHome() {
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroImageScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="bg-[#FDFDFD] text-[#1A1A1A] font-sans selection:bg-[#1A1A1A] selection:text-white overflow-x-hidden">
      {/* 1. Refined Editorial Header */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ${isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-neutral-100 py-4" : "py-10"}`}>
        <div className="max-w-[1600px] mx-auto px-10 md:px-20 flex justify-between items-center">
          <Link href="/" className="group relative">
            {/* Editorial Logo Tag */}
            <div className={`
              relative px-10 py-8 bg-bora-dark transition-all duration-700
              ${isScrolled ? "translate-y-[-10px] scale-90" : "translate-y-[-40px]"}
            `}>
              <div className="relative w-28 h-8">
                <Image 
                  src="/assets/images/logo_white.png" 
                  alt="BORA" 
                  fill 
                  className="object-contain"
                />
              </div>
            </div>
          </Link>
          
          <div className={`hidden lg:flex items-center gap-16 text-[11px] font-bold uppercase tracking-[0.4em] transition-colors duration-500 ${isScrolled ? "text-neutral-500" : "text-white/70"}`}>
            {["Services", "Platform", "About", "Network"].map(item => (
              <Link key={item} href="#" className="hover:text-[#1A1A1A] dark:hover:text-white transition-colors">{item}</Link>
            ))}
            <Link href="#" className={`px-8 py-2.5 rounded-full border transition-all ${isScrolled ? "border-neutral-200 text-neutral-900 hover:bg-neutral-900 hover:text-white" : "border-white/20 text-white hover:bg-white hover:text-black"}`}>
              Contact
            </Link>
          </div>

          <button className={isScrolled ? "text-neutral-900" : "text-white"}>
            <Menu size={24} strokeWidth={1} />
          </button>
        </div>
      </nav>

      <main>
        {/* 2. Editorial Hero Section */}
        <section className="relative h-screen bg-neutral-900 flex items-center justify-center overflow-hidden">
          <motion.div 
            style={{ scale: heroImageScale }}
            className="absolute inset-0 z-0"
          >
            <Image 
              src="/assets/images/hero_1.jpg" 
              alt="BORA Excellence" 
              fill 
              className="object-cover opacity-50 grayscale-[0.3]" 
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/20" />
          </motion.div>

          <div className="max-w-[1400px] w-full mx-auto px-10 md:px-20 relative z-10">
            <motion.div
              style={{ y: heroTextY }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.8em] text-white/40 mb-12">
                Logistics redefined by BORA
              </span>
              <h1 className="text-7xl md:text-[10rem] font-serif leading-[0.85] tracking-tightest text-white mb-20 italic">
                The Purest <br /> 
                <span className="text-white/20 not-italic">Connection.</span>
              </h1>
              
              <div className="flex flex-col md:flex-row items-end justify-between gap-12">
                <p className="text-xl md:text-2xl text-white/50 max-w-xl leading-relaxed font-light italic">
                  우리는 물류의 복잡함을 걷어내고, <br />
                  무역의 본질적인 흐름만을 가장 정교하게 연결합니다. 
                </p>
                <div className="flex flex-col items-center gap-6 text-white/20">
                  <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Discover</span>
                  <ChevronDown size={24} className="animate-bounce" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. Catalog-style Narrative Section */}
        <section className="py-60 px-10 md:px-20">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-7">
               <motion.div
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 1.5 }}
                 className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl"
               >
                 <Image src="/assets/images/service_logistics.jpg" alt="Logistics Detail" fill className="object-cover" />
                 <div className="absolute inset-0 bg-black/10" />
               </motion.div>
            </div>
            
            <div className="lg:col-span-5">
               <motion.div
                 initial={{ opacity: 0, x: 30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 1, delay: 0.3 }}
               >
                  <span className="text-neutral-300 font-bold text-[10px] uppercase tracking-[0.5em] mb-10 block">01 / Infrastructure</span>
                  <h2 className="text-5xl md:text-7xl font-serif tracking-tightest leading-tight mb-12 italic">
                    Architectural <br /> Infrastructure.
                  </h2>
                  <p className="text-lg text-neutral-500 leading-relaxed font-light mb-16 italic">
                    단순히 물건을 보관하는 장소를 넘어, 보라의 물류 센터는 <br />
                    하나의 정교한 기계처럼 완벽한 조화를 이룹니다. <br />
                    자체 운영 인력과 독자적인 시스템은 신뢰의 근간입니다.
                  </p>
                  <Link href="#" className="inline-flex items-center gap-6 group">
                     <span className="text-xs font-bold uppercase tracking-widest border-b border-neutral-200 pb-2 group-hover:border-neutral-900 transition-all">Explore Detail</span>
                     <ArrowUpRight size={20} strokeWidth={1} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
               </motion.div>
            </div>
          </div>
        </section>

        {/* 4. Minimalist Statistics Grid */}
        <section className="py-60 bg-[#1A1A1A] text-white px-10 md:px-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none select-none overflow-hidden">
             <span className="text-[40rem] font-black italic absolute -bottom-40 -right-40">BORA</span>
          </div>
          
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24">
              {[
                { label: "Global Nodes", value: "2,400", sub: "Ports Connected" },
                { label: "Network Fidelity", value: "99.9%", sub: "Accuracy Rate" },
                { label: "Experience", value: "25+", sub: "Years of Trust" },
                { label: "Daily Flow", value: "1.2k", sub: "Containers" },
              ].map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-8">{stat.label}</span>
                  <span className="text-6xl md:text-8xl font-serif tracking-tightest italic mb-6">{stat.value}</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/10">{stat.sub}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Full-width Aesthetic Imagery */}
        <section className="relative h-[80vh] overflow-hidden">
          <Image 
            src="/assets/images/service_trade.jpg" 
            alt="Trade Narrative" 
            fill 
            className="object-cover grayscale-[0.5]" 
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 flex items-center justify-center text-center px-10">
            <div className="max-w-4xl">
              <h3 className="text-4xl md:text-6xl font-serif italic text-white tracking-tightest leading-tight">
                "Connecting world-class trade through <br /> architectural logistics design."
              </h3>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Sophisticated Minimal Footer */}
      <footer className="pt-60 pb-20 px-10 md:px-20 border-t border-neutral-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-40 mb-60">
            <div className="max-w-sm">
              <div className="relative w-32 h-10 mb-12">
                <Image src="/assets/images/logo.png" alt="BORA" fill className="object-contain" />
              </div>
              <p className="text-lg text-neutral-400 font-light italic leading-relaxed">
                우리는 단순함 뒤에 숨겨진 정교함을 믿습니다. <br />
                당신의 무역이 가장 우아한 방식으로 전 세계와 연결될 수 있도록.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-20">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-300 mb-10">Platform</span>
                <ul className="text-xs font-bold text-neutral-400 flex flex-col gap-6">
                  <li><Link href="#" className="hover:text-black">Ocean Flow</Link></li>
                  <li><Link href="#" className="hover:text-black">Air Precision</Link></li>
                  <li><Link href="#" className="hover:text-black">Smart Hub</Link></li>
                </ul>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-300 mb-10">About</span>
                <ul className="text-xs font-bold text-neutral-400 flex flex-col gap-6">
                  <li><Link href="#" className="hover:text-black">Vision</Link></li>
                  <li><Link href="#" className="hover:text-black">Team</Link></li>
                  <li><Link href="#" className="hover:text-black">Careers</Link></li>
                </ul>
              </div>
              <div className="md:col-span-2">
                <span className="block text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-300 mb-10">Connect</span>
                <p className="text-xs font-bold text-neutral-400 leading-loose">
                  서울 본사: 서울특별시 중구 세종대로 110 <br />
                  Email: info@boralogis.com <br />
                  Tel: +82 2-1234-5678
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 opacity-30">
            <p className="text-[10px] font-bold uppercase tracking-[0.5em]">© 2026 BORA Logistics & Editorial.</p>
            <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.3em]">
               <Link href="#">Credits</Link>
               <Link href="#">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
