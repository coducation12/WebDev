"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Globe, Shield, Menu, ArrowRight, Play, Award, Search, Languages } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const ASSET_PATH = "/assets/pillar/4"; // Using centralized assets

export default function EditorialModernHome() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      
      {/* 1. Minimal Floating Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? "bg-white/90 backdrop-blur-md py-4 shadow-sm" : "py-8"}`}>
        <div className="max-w-[1600px] mx-auto px-10 md:px-20 flex justify-between items-center">
          <Link href="/" className="relative z-50">
            <div className="w-32 h-10 relative">
              {/* 로고 검은 배경 문제 해결: invert 필터를 사용하여 검은 로고를 흰색으로/혹은 그대로 사용 */}
              <Image 
                src={`${ASSET_PATH}/logo.png`} 
                alt="BORALOGIS" 
                fill 
                className={`object-contain transition-all duration-500 ${!isScrolled ? "brightness-0 invert" : ""}`}
              />
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.5em] text-[#1a1a1a]">
            {["Services", "Network", "Sustainability", "About"].map(item => (
              <Link key={item} href="#" className={`hover:opacity-50 transition-opacity ${!isScrolled ? "text-white" : "text-[#1a1a1a]"}`}>{item}</Link>
            ))}
            <div className={`h-8 w-px ${!isScrolled ? "bg-white/20" : "bg-black/10"}`} />
            <button className={`flex items-center gap-2 ${!isScrolled ? "text-white" : "text-[#1a1a1a]"}`}>
              <Languages size={14} /> EN
            </button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`relative z-50 p-2 ${!isScrolled ? "text-white" : "text-[#1a1a1a]"}`}>
            <Menu size={28} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* 2. Full-Screen Cinematic Hero */}
      <section className="relative h-[110vh] bg-[#0d0d0d] overflow-hidden">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <Image 
            src={`${ASSET_PATH}/hero_1.jpg`} 
            alt="Hero" 
            fill 
            className="object-cover opacity-60 grayscale-[0.2]" 
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
              ESTABLISHED RELIABILITY
            </span>
            <h1 className="text-[6rem] md:text-[12rem] font-serif leading-[0.8] tracking-tightest text-white mb-20 italic">
              Legacy <br /> 
              <span className="text-white/20 not-italic">& Vision.</span>
            </h1>
            
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
              <div className="flex gap-10 items-center">
                <button className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                  <Play size={24} fill="currentColor" />
                </button>
                <p className="text-lg md:text-xl text-white/50 max-w-sm leading-relaxed font-light italic">
                  60년의 신뢰를 바탕으로, <br />
                  무역의 모든 순간을 예술처럼 정교하게 디자인합니다.
                </p>
              </div>
              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white/30"
              >
                <div className="w-px h-24 bg-white/20 mx-auto" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Editorial Narrative Section */}
      <section className="py-40 md:py-60 px-10 md:px-20 bg-[#f8f7f4]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-2xl">
              <Image 
                src={`${ASSET_PATH}/about_company.jpg`} 
                alt="Story" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-5xl md:text-8xl font-serif italic font-bold tracking-tighter leading-none mb-12">
                Purest <br /> Logistics.
              </h2>
              <div className="space-y-10">
                <p className="text-xl text-[#1a1a1a]/60 leading-relaxed font-light">
                  우리는 물류의 복잡함을 걷어내고, 무역의 본질적인 흐름만을 가장 정교하게 연결합니다. 
                  보라로지스의 솔루션은 단순한 운송이 아닌, 파트너의 가치를 전달하는 가장 품격 있는 여정입니다.
                </p>
                <div className="h-px w-24 bg-[#1a1a1a]/20" />
                <div className="grid grid-cols-2 gap-12">
                  <div>
                    <span className="block text-4xl font-serif italic mb-2">99.8%</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40">Safe Delivery</span>
                  </div>
                  <div>
                    <span className="block text-4xl font-serif italic mb-2">120+</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40">Global Nodes</span>
                  </div>
                </div>
                <Link href="#" className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] pt-8 group">
                  Discover Our Heritage <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Luxury Service Grid */}
      <section className="py-40 bg-white">
        <div className="max-w-[1400px] mx-auto px-10 md:px-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-8">
            <h2 className="text-4xl md:text-6xl font-serif font-bold italic tracking-tighter">Our Excellence</h2>
            <p className="text-sm text-black/40 font-bold uppercase tracking-widest pb-2">Crafting Global Connections</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {[
              { title: "Intelligent Logistics", desc: "데이터 사이언스를 기반으로 한 최적의 공급망 최적화 서비스", icon: Zap },
              { title: "Strategic Trade", desc: "글로벌 시장의 흐름을 읽는 통찰력 있는 무역 컨설팅", icon: Globe }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -20 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden rounded-[3rem] mb-12">
                   <Image 
                     src={idx === 0 ? `${ASSET_PATH}/service_logistics.jpg` : `${ASSET_PATH}/service_trade.jpg`}
                     alt={service.title}
                     fill
                     className="object-cover group-hover:scale-110 transition-transform duration-1000"
                   />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                </div>
                <div className="flex justify-between items-start">
                   <div>
                     <h3 className="text-3xl font-serif font-bold mb-4 italic">{service.title}</h3>
                     <p className="text-[#1a1a1a]/50 font-light text-lg">{service.desc}</p>
                   </div>
                   <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                     <service.icon size={20} />
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Minimal Editorial Footer */}
      <footer className="py-32 px-10 md:px-20 bg-[#f8f7f4] border-t border-black/5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="flex flex-col gap-10">
            <div className="w-40 h-10 relative">
              <Image src={`${ASSET_PATH}/logo.png`} alt="LOGO" fill className="object-contain" />
            </div>
            <p className="text-[#1a1a1a]/40 text-sm font-medium leading-relaxed max-w-xs">
              전남 광양시 항만8로 18-35 (도이동) <br />
              T: 061-795-9951~3  |  E: admin@boralogis.com
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-32">
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/20">Information</h4>
              <ul className="text-sm font-bold flex flex-col gap-4 text-[#1a1a1a]/60">
                <li><Link href="#" className="hover:text-black">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-black">Terms of Use</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/20">Connect</h4>
              <ul className="text-sm font-bold flex flex-col gap-4 text-[#1a1a1a]/60">
                <li><Link href="#" className="hover:text-black">LinkedIn</Link></li>
                <li><Link href="#" className="hover:text-black">Global Network</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-32 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-black/20">
           <p>Copyrightⓒ BORALOGIS Co.,Ltd. All Rights Reserved</p>
           <p>Designed for Excellence</p>
        </div>
      </footer>
    </div>
  );
}
