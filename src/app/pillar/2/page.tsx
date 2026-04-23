"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, Zap, BarChart3, Globe2, Layers, Menu, X, Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import MediaPlaceholder from "@/components/MediaPlaceholder";
import { cn } from "@/lib/utils";

// Counting Up Stat Component for Impact
function StatItem({ label, value, prefix = "" }: { label: string, value: string, prefix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <div ref={ref} className="text-center md:text-left">
      <motion.span 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="block text-6xl md:text-8xl font-black tracking-tighter text-bora-purple mb-4"
      >
        {prefix}{value}
      </motion.span>
      <span className="text-[10px] uppercase tracking-[0.4em] font-black text-neutral-400">
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

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);

  return (
    <div ref={containerRef} className="bg-neutral-900 text-white font-sans selection:bg-white selection:text-bora-purple">
      {/* 1. Impact Header */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <Link href="/" className="text-3xl font-black tracking-tightest group flex items-center gap-2">
            <div className="w-8 h-8 bg-bora-purple rounded-lg flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
              <Zap size={20} fill="white" />
            </div>
            BORA<span className="text-bora-purple">X</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-4 pointer-events-auto bg-black/40 backdrop-blur-xl p-2 rounded-full border border-white/10">
          <Link href="#" className="px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:text-bora-purple transition-colors">Solutions</Link>
          <Link href="#" className="px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:text-bora-purple transition-colors">Tech</Link>
          <Link href="#" className="px-10 py-2 bg-bora-purple text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-bora-purple transition-all shadow-[0_0_20px_rgba(106,13,173,0.5)]">
            Start Project
          </Link>
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden pointer-events-auto w-12 h-12 bg-bora-purple rounded-full flex items-center justify-center"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* 2. Vibrant Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-bora-purple/40 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        </div>

        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="relative z-10 text-center max-w-6xl"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-6 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.5em] mb-10"
          >
            Efficiency Redefined
          </motion.span>
          
          <h1 className="text-7xl md:text-[12rem] font-black leading-[0.85] tracking-tightest mb-16 uppercase">
            Fast<br /> Forward <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bora-purple via-purple-400 to-white">Logistics</span>
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <p className="text-lg md:text-2xl font-medium text-white/60 max-w-xl leading-relaxed">
              데이터와 속도의 한계를 넘는 혁신적인 <br />
              보라로지스만의 임팩트 있는 무역 플랫폼. 
            </p>
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-bora-purple shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              <ArrowRight size={32} strokeWidth={3} />
            </motion.button>
          </div>
        </motion.div>

        {/* Floating elements */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-20 h-20 border border-white/10 rounded-2xl backdrop-blur-sm hidden md:block" 
        />
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-20 w-32 h-32 bg-bora-purple/20 rounded-[3rem] hidden md:block" 
        />
      </section>

      {/* 3. Dynamic Services Section */}
      <section className="py-40 px-6 md:px-20 relative bg-white text-neutral-900 rounded-[4rem] mx-4 md:mx-10 my-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-32">
            <div>
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
                Active <br /> Dynamics
              </h2>
              <div className="w-32 h-4 bg-bora-purple" />
            </div>
            <p className="text-xl md:text-3xl font-bold max-w-xl leading-tight">
              가장 빠르고 명확한 물류 솔루션을 위해 <br />
              우리는 매 순간 역동적으로 움직입니다. 
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Rapid Transit", icon: Zap, color: "bg-orange-500" },
              { title: "Tech Storage", icon: Layers, color: "bg-blue-600" },
              { title: "Market Matrix", icon: BarChart3, color: "bg-bora-purple" },
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="group relative p-12 bg-neutral-50 rounded-[3rem] overflow-hidden border border-neutral-100 h-[500px] flex flex-col justify-between"
              >
                <div className={cn("absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-30 transition-opacity", service.color)} style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                
                <div className="relative z-10">
                  <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center text-white mb-10 shadow-xl", service.color)}>
                    <service.icon size={40} />
                  </div>
                  <h3 className="text-4xl font-black uppercase mb-6 tracking-tight">{service.title}</h3>
                  <p className="text-neutral-500 font-bold leading-relaxed">
                    실시간 트래킹과 지능형 분석으로 <br />
                    비즈니스의 속도를 극대화합니다.
                  </p>
                </div>
                
                <button className="relative z-10 w-full py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs group-hover:bg-bora-purple transition-all flex items-center justify-center gap-4">
                  Get Started <Plus size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Impact Metrics Section */}
      <section className="py-40 px-6 md:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32">
            <StatItem label="Global Nodes" value="480" prefix="+" />
            <StatItem label="Data Processing" value="99.9" prefix="" />
            <StatItem label="Daily Volume" value="1.2" prefix="M" />
            <StatItem label="Active Partners" value="2,500" prefix="+" />
          </div>
          
          <div className="relative w-full md:w-1/2 aspect-square">
            <div className="absolute inset-0 bg-bora-purple/20 rounded-full blur-3xl animate-pulse" />
            <MediaPlaceholder label="Global Impact Map Visualization" mood="dynamic" aspectRatio="square" className="rounded-full shadow-[0_0_100px_rgba(106,13,173,0.3)] border-white/20" />
          </div>
        </div>
      </section>

      {/* 5. Bold Footer */}
      <footer className="bg-bora-purple text-white py-32 px-6 md:px-20 rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-32 mb-40">
          <div>
            <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tightest mb-12">
              Join <br /> The Force
            </h2>
            <p className="text-xl md:text-3xl font-bold opacity-60 leading-tight mb-12">
              최고의 속도와 혁신으로 <br /> 무역의 미래를 함께 만듭니다.
            </p>
            <div className="flex gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/40 transition-colors cursor-pointer"><Globe2 /></div>
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/40 transition-colors cursor-pointer"><Zap /></div>
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/40 transition-colors cursor-pointer"><Layers /></div>
            </div>
          </div>
          
          <div className="flex flex-col justify-end">
            <div className="flex flex-wrap gap-x-20 gap-y-10 text-sm font-black uppercase tracking-widest mb-20 md:mb-0">
              <Link href="#" className="hover:opacity-40">Network</Link>
              <Link href="#" className="hover:opacity-40">Intelligence</Link>
              <Link href="#" className="hover:opacity-40">Security</Link>
              <Link href="#" className="hover:opacity-40">Sustainability</Link>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-10 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-10">
          <span className="text-4xl font-black tracking-tighter">BORA.</span>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
            © 2026 BORA Logistics & Trade. Built for Speed.
          </p>
        </div>
      </footer>
    </div>
  );
}
