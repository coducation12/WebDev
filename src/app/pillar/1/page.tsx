"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Globe, Shield, Menu, ArrowRight, Play, Award, Search, Languages, Zap, Package } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const ASSET_PATH = "/assets/images"; 

const navItems = [
  { 
    title: "Services", 
    subItems: ["International Logistics", "Customs Clearance", "Bonded Warehouse", "Intermodal Transport"] 
  },
  { 
    title: "Platform", 
    subItems: ["Bora Logitech", "Smart Factory", "Logistics Automation", "IoT Monitoring"] 
  },
  { 
    title: "Sustainability", 
    subItems: ["RE&UP Project", "Eco-friendly Energy", "Carbon Neutral", "Circular Economy"] 
  },
  { 
    title: "About", 
    subItems: ["Company Vision", "Group History", "Global Network", "Our People"] 
  }
];

export default function EditorialModernHome() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="bg-[#f8f7f4] text-[#1a1a1a] font-sans selection:bg-[#1a1a1a] selection:text-white overflow-x-hidden">
      
      {/* 1. Individual Expansion Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? "bg-white/90 backdrop-blur-md py-4 shadow-sm" : "py-8"}`}>
        <div className="max-w-[1600px] mx-auto px-10 md:px-20 flex justify-between items-center relative">
          <Link href="/" className="relative z-50">
            <div className="w-32 h-10 relative">
              <Image 
                src={`${ASSET_PATH}/logo.png`} 
                alt="BORALOGIS" 
                fill 
                className={`object-contain transition-all duration-500 ${!isScrolled ? "brightness-0 invert" : ""}`}
              />
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-16 h-full">
            {navItems.map((item) => (
              <div 
                key={item.title} 
                className="relative h-full flex items-center"
                onMouseEnter={() => setHoveredMenu(item.title)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link 
                  href="#" 
                  className={`text-[10px] font-bold uppercase tracking-[0.5em] transition-colors py-4 ${!isScrolled ? "text-white" : "text-[#1a1a1a]"} hover:opacity-50`}
                >
                  {item.title}
                </Link>

                <AnimatePresence>
                  {hoveredMenu === item.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: 10, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-48 pt-6 overflow-hidden"
                    >
                      <div className="bg-white/95 backdrop-blur-md border border-black/5 p-6 rounded-2xl shadow-2xl shadow-black/5">
                        <ul className="flex flex-col gap-4">
                          {item.subItems.map((sub) => (
                            <li key={sub}>
                              <Link 
                                href="#" 
                                className="text-[9px] font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors block"
                              >
                                {sub}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-8">
            <button className={`hidden md:block text-[10px] font-bold uppercase tracking-widest ${!isScrolled ? "text-white" : "text-[#1a1a1a]"}`}>
               Contact
            </button>
            <button className={`p-2 ${!isScrolled ? "text-white" : "text-[#1a1a1a]"}`}>
              <Menu size={28} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Full-Screen Cinematic Hero (Container Ship) */}
      <section className="relative h-[110vh] bg-[#0d0d0d] overflow-hidden">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <Image 
            src={`${ASSET_PATH}/hero_1.jpg`} 
            alt="Container Ship" 
            fill 
            className="object-cover opacity-80 grayscale-[0.2]" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#f8f7f4]" />
        </motion.div>

        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-10 md:px-20 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block text-[11px] font-bold uppercase tracking-[1em] text-white/40 mb-12">
              DESIGN THE FLOW, TRANSPORT THE TRUST
            </span>
            <h1 className="text-[5.5rem] md:text-[9.5rem] font-serif leading-[0.85] tracking-tightest text-white mb-20 italic">
              Legacy & <br /> 
              <span className="text-white/20 not-italic">Competence.</span>
            </h1>
            
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
              <div className="flex gap-10 items-center">
                <button className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                  <Play size={24} fill="currentColor" />
                </button>
                <p className="text-lg md:text-xl text-white/50 max-w-sm leading-relaxed font-light italic">
                  물류의 흐름을 설계하고, 신뢰를 운송하며, <br />
                  비즈니스 경쟁력을 제공하는 최적의 솔루션.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Narrative Section 1 */}
      <section className="py-40 md:py-60 px-10 md:px-20 bg-[#f8f7f4]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-2xl"
            >
              <Image 
                src={`${ASSET_PATH}/extra_24.jpg`} 
                alt="Infrastructure" 
                fill 
                className="object-cover"
              />
            </motion.div>
          </div>
          <div className="order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-5xl md:text-8xl font-serif italic font-bold tracking-tighter leading-none mb-12">
                Supreme <br /> Assets.
              </h2>
              <div className="space-y-10">
                <p className="text-xl text-[#1a1a1a]/60 leading-relaxed font-light">
                  광양컨테이너부두 배후단지의 압도적 인프라. <br />
                  4만 평의 부지와 2만 평의 창고를 통해 <br />
                  전 세계로 뻗어 나가는 물류 네트워크를 실현합니다.
                </p>
                <div className="h-px w-24 bg-[#1a1a1a]/20" />
                <div className="grid grid-cols-2 gap-12">
                  <div>
                    <span className="block text-4xl font-serif italic mb-2">40,000평</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40">Facility Scale</span>
                  </div>
                  <div>
                    <span className="block text-4xl font-serif italic mb-2">95명</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40">Expert Group</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Full-Width Visual Parallax */}
      <section className="relative h-[80vh] overflow-hidden">
        <Image 
          src={`${ASSET_PATH}/extra_21.jpg`} 
          alt="Parallax" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center px-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-serif italic text-white font-bold max-w-5xl"
          >
            "물류의 복잡함을 걷어내고 <br /> 본질적인 가치를 연결합니다"
          </motion.h2>
        </div>
      </section>

      {/* 5. Narrative Section 2 */}
      <section className="py-40 md:py-60 px-10 md:px-20 bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-5xl md:text-8xl font-serif italic font-bold tracking-tighter leading-none mb-12">
                Purest <br /> Logistics.
              </h2>
              <div className="space-y-10">
                <p className="text-xl text-[#1a1a1a]/60 leading-relaxed font-light">
                  단순 보관을 넘어 조립, 반가공, 라벨링 등 제조 연계 작업을 수행합니다. <br />
                  정교한 품질 검수와 온·습도 관리 시스템은 <br />
                  보라가 제안하는 프리미엄 물류의 기준입니다.
                </p>
                <div className="h-px w-24 bg-[#1a1a1a]/20" />
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 rounded-2xl bg-[#f8f7f4] flex items-center justify-center">
                      <Package size={24} className="text-[#1a1a1a]/40" />
                   </div>
                   <span className="text-lg font-bold italic tracking-tight">Crafting Excellence</span>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-[3rem] shadow-2xl">
              <Image 
                src={`${ASSET_PATH}/extra_25.jpg`} 
                alt="Operation" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#6A0DAD] rounded-3xl p-10 text-white flex flex-col justify-between shadow-2xl">
               <Zap size={36} />
               <div>
                 <span className="block text-4xl font-serif italic mb-1">99.8%</span>
                 <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Accuracy Delivered</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="py-32 px-10 md:px-20 bg-[#f8f7f4] border-t border-black/5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="flex flex-col gap-10">
            <div className="w-40 h-10 relative">
              <Image src={`${ASSET_PATH}/logo.png`} alt="LOGO" fill className="object-contain" />
            </div>
            <div className="text-[#1a1a1a]/40 text-sm font-medium leading-relaxed max-w-sm">
              <p className="font-bold text-[#1a1a1a] mb-2">보라로지스(주)</p>
              <p>전남 광양시 항만8로 18-35 (도이동)</p>
              <p>T: 061-795-9951~3  |  E: admin@boralogis.com</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-32">
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/20">Organization</h4>
              <ul className="text-sm font-bold flex flex-col gap-4 text-[#1a1a1a]/60">
                <li>Bora Logis</li><li>Bora Logitech</li><li>Bora Trans</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/20">New Business</h4>
              <ul className="text-sm font-bold flex flex-col gap-4 text-[#1a1a1a]/60">
                <li>RE&UP</li><li>Bora International</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-32 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-black/20">
           <p>Copyrightⓒ BORALOGIS Co.,Ltd. All Rights Reserved</p>
           <p>Designed for Legacy & Innovation</p>
        </div>
      </footer>
    </div>
  );
}
