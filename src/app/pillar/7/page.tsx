"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ChevronRight, Play, Cpu, Globe, Lock, Star, ChevronDown, Menu } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import MediaPlaceholder from "@/components/MediaPlaceholder";

const APPLE_EASE = [0.32, 0.72, 0, 1];

export default function AppleEsqueHome() {
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Hero Logo Animations
  const logoScale = useTransform(smoothProgress, [0, 0.15], [1, 0.6]);
  const logoY = useTransform(smoothProgress, [0, 0.15], [0, -100]);
  const contentOpacity = useTransform(smoothProgress, [0.1, 0.2], [0, 1]);
  const contentY = useTransform(smoothProgress, [0.1, 0.2], [50, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="bg-white text-black font-sans selection:bg-neutral-800 selection:text-white overflow-x-hidden">
      {/* 1. Precision Header */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? "bg-white/80 backdrop-blur-2xl border-b border-neutral-100 py-3" : "py-6"}`}>
        <div className="max-w-[1400px] mx-auto px-10 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold tracking-tighter flex items-center gap-1">
             <div className="w-5 h-5 bg-black rounded-[4px]" /> BORA
          </Link>
          
          <div className="hidden md:flex items-center gap-10 text-xs font-medium text-neutral-500">
            {["Design", "Logistics", "Trade", "About"].map(item => (
              <Link key={item} href="#" className="hover:text-black transition-colors">{item}</Link>
            ))}
            <Link href="#" className="px-5 py-1.5 bg-neutral-900 text-white rounded-full text-xs hover:bg-neutral-800 transition-all">
              Connect
            </Link>
          </div>

          <button className="md:hidden">
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* 2. Reveal Hero Section */}
      <section className="relative h-[250vh] bg-white">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
          {/* Animated Hero Logo / Visual */}
          <motion.div 
            style={{ scale: logoScale, y: logoY }}
            className="relative z-10 flex flex-col items-center"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: APPLE_EASE }}
              className="w-40 h-40 md:w-64 md:h-64 bg-neutral-900 rounded-[3rem] shadow-2xl flex items-center justify-center mb-10 overflow-hidden"
            >
               <MediaPlaceholder label="Premium Close-up Device/Logo" mood="minimal" aspectRatio="square" className="h-full border-none rounded-none" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-center"
            >
              The Perfection. <br /> In every detail.
            </motion.h1>
          </motion.div>

          {/* Revealed Sub Content */}
          <motion.div 
            style={{ opacity: contentOpacity, y: contentY }}
            className="absolute z-20 max-w-4xl text-center px-10 pt-40"
          >
            <h2 className="text-5xl md:text-8xl font-bold tracking-tightest mb-12">
              Next-Level <br /> Logistics Flow.
            </h2>
            <p className="text-xl md:text-2xl text-neutral-500 font-medium leading-relaxed max-w-2xl mx-auto mb-16">
              0.1mm의 오차도 허용하지 않는 정교함으로 <br />
              당신의 무역을 가장 우아한 방식으로 완성합니다. 
            </p>
            <div className="flex justify-center gap-10 font-semibold text-blue-600">
               <span className="flex items-center gap-2 cursor-pointer hover:underline">Watch the film <Play size={16} fill="currentColor" /></span>
               <span className="flex items-center gap-2 cursor-pointer hover:underline">Learn more <ChevronRight size={16} /></span>
            </div>
          </motion.div>

          <footer className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-neutral-300">
             <span className="text-[10px] font-bold uppercase tracking-widest">Scroll to unveil</span>
             <ChevronDown size={20} className="animate-bounce" />
          </footer>
        </div>
      </section>

      {/* 3. Detail Gallery Section */}
      <section className="py-40 bg-neutral-50 px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200 border border-neutral-200 overflow-hidden rounded-[3rem]">
            {/* Gallery Item 1 */}
            <div className="bg-white p-20 flex flex-col justify-between h-[800px]">
              <div>
                 <span className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-4 block">Precision Routing</span>
                 <h3 className="text-5xl font-bold tracking-tight mb-8 leading-tight">Engineered for <br /> Maximum Speed.</h3>
              </div>
              <MediaPlaceholder label="Ultra-precise Logistics Dashboard Detail" mood="minimal" aspectRatio="square" className="rounded-3xl shadow-sm h-1/2" />
            </div>
            {/* Gallery Item 2 */}
            <div className="bg-white p-20 flex flex-col justify-between h-[800px]">
              <div>
                 <span className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-4 block">Design Philosophy</span>
                 <h3 className="text-5xl font-bold tracking-tight mb-8 leading-tight">Aesthetic <br /> Infrastructure.</h3>
              </div>
              <p className="text-lg text-neutral-400 font-medium leading-relaxed mb-auto">
                우리는 물류의 모든 물리적 터치를 디자인으로 치환합니다. <br />
                창고의 배치부터 선박의 항로까지, 모든 것이 예술이 됩니다.
              </p>
              <div className="w-full flex justify-end">
                 <ArrowRight size={48} strokeWidth={1} className="text-neutral-200" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Motion Features Section */}
      <section className="py-40 bg-white">
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
             {[
               { icon: Cpu, title: "Silicon Hub", desc: "고성능 프로세싱 유닛을 통한 초저지연 배송 관리 시스템." },
               { icon: Globe, title: "Seamless Map", desc: "끊김 없는 글로벌 네트워크를 하나의 고화질 인터페이스로 통합." },
               { icon: Lock, title: "Secure Vault", desc: "당신의 모든 비즈니스 인텔리전스를 완벽한 레이어로 보호." },
             ].map((feat, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="flex flex-col items-center text-center group"
               >
                 <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center mb-8 border border-neutral-100 group-hover:scale-110 transition-transform">
                    <feat.icon size={28} strokeWidth={1.5} />
                 </div>
                 <h4 className="text-2xl font-bold mb-4">{feat.title}</h4>
                 <p className="text-neutral-500 font-medium leading-relaxed">{feat.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 5. Precision Statistics Section */}
      <section className="py-40 bg-black text-white px-10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
              {[
                { label: "Design Iterations", value: "8,200+" },
                { label: "Network Fidelity", value: "99.99%" },
                { label: "Global Reach", value: "240" },
                { label: "Expert Engineers", value: "1,500" },
              ].map((stat, idx) => (
                <div key={idx} className="border-l border-white/10 pl-8">
                   <span className="block text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-6">{stat.label}</span>
                   <span className="text-6xl font-bold tracking-tighter">{stat.value}</span>
                </div>
              ))}
           </div>
           
           <div className="mt-60 text-center">
              <h2 className="text-4xl md:text-7xl font-bold tracking-tightest mb-16 opacity-20">Built for the few.</h2>
           </div>
        </div>
      </section>

      {/* 6. Sophisticated Footer */}
      <footer className="bg-white pt-40 pb-20 px-10 border-t border-neutral-100">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-40">
          <div className="max-w-sm">
             <span className="text-2xl font-bold tracking-tighter block mb-12 flex items-center gap-2">
                <div className="w-4 h-4 bg-black rounded-[3px]" /> BORA
             </span>
             <p className="text-neutral-400 font-medium leading-relaxed mb-12">
                보라로지스는 단순함을 추구합니다. <br />
                그 단순함 뒤에는 수 만 번의 정교한 설계와 <br />
                완벽을 향한 집착이 숨겨져 있습니다. 
             </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-20">
             <div>
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-8 font-sans">Platforms</h5>
                <ul className="text-xs font-semibold flex flex-col gap-5 text-neutral-400">
                  <li><Link href="#" className="hover:text-black transition-colors">Bora Air</Link></li>
                  <li><Link href="#" className="hover:text-black transition-colors">Bora Sea</Link></li>
                  <li><Link href="#" className="hover:text-black transition-colors">Bora Tech</Link></li>
                </ul>
             </div>
             <div>
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-8 font-sans">Company</h5>
                <ul className="text-xs font-semibold flex flex-col gap-5 text-neutral-400">
                  <li><Link href="#" className="hover:text-black transition-colors">Vision</Link></li>
                  <li><Link href="#" className="hover:text-black transition-colors">Creators</Link></li>
                  <li><Link href="#" className="hover:text-black transition-colors">Careers</Link></li>
                </ul>
             </div>
             <div className="md:col-span-2">
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-8 font-sans">Connect</h5>
                <p className="text-xs font-semibold text-neutral-400 leading-loose">
                  전 세계 물류의 새로운 기준을 경험하고 싶다면 <br />
                  지금 보라로지스의 파트너십을 신청하십시오.
                </p>
                <Link href="#" className="inline-flex items-center gap-2 mt-6 text-blue-600 font-bold text-xs uppercase tracking-widest">
                  Contact Sales <ArrowRight size={14} />
                </Link>
             </div>
          </div>
        </div>
        
        <div className="max-w-[1400px] mx-auto mt-40 pt-10 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-10">
           <p className="text-[10px] font-medium text-neutral-300 uppercase tracking-widest">© 2026 BORA Logistics & Detail. Refined in Seoul.</p>
           <div className="flex gap-12 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
              <Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-black transition-colors">Legal</Link>
              <Link href="#" className="hover:text-black transition-colors">Site Map</Link>
           </div>
        </div>
      </footer>
    </div>
  );
}
