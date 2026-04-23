"use client";

import { motion } from "framer-motion";
import { Leaf, Wind, Sun, Droplets, Globe, ShieldCheck, ArrowRight, Menu, Flower2, Zap } from "lucide-react";
import Link from "next/link";
import MediaPlaceholder from "@/components/MediaPlaceholder";
import { useState, useEffect } from "react";

export default function EcoConnectivityHome() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-emerald-50 text-emerald-950 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* 1. Organic Floating Header */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-7xl transition-all duration-500 ${isScrolled ? "scale-95" : "scale-100"}`}>
        <div className="bg-white/70 backdrop-blur-2xl border border-emerald-100 rounded-[2rem] px-8 py-4 flex justify-between items-center shadow-xl shadow-emerald-900/5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
              <Flower2 size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-emerald-900">BORA ECO</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-10 font-bold text-emerald-800/60 text-sm">
            <Link href="#" className="hover:text-emerald-600 transition-colors">Sustainability</Link>
            <Link href="#" className="hover:text-emerald-600 transition-colors">Carbon Policy</Link>
            <Link href="#" className="hover:text-emerald-600 transition-colors">ESG Network</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="#" className="px-8 py-3 bg-emerald-600 text-white rounded-full font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
              Go Green
            </Link>
          </div>

          <button className="lg:hidden text-emerald-900">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <main>
        {/* 2. Green Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          {/* Background Organic Blobs */}
          <div className="absolute top-0 right-0 w-full h-full z-0">
            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[70%] bg-emerald-200/40 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[60%] bg-teal-200/30 rounded-full blur-[100px]" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="inline-flex items-center gap-2 py-1.5 px-4 bg-emerald-600/10 border border-emerald-600/20 rounded-full text-emerald-600 text-xs font-bold uppercase tracking-widest mb-8">
                <Leaf size={14} /> Towards 2050 Net-Zero
              </div>
              <h1 className="text-6xl md:text-8xl font-black leading-[1.1] text-emerald-950 mb-8 tracking-tighter">
                Logistics in <br /> 
                <span className="text-emerald-600">Harmony</span> <br />
                with Nature.
              </h1>
              <p className="text-xl text-emerald-800/60 mb-12 leading-relaxed font-medium max-w-xl">
                보라로지스는 단순한 이동을 넘어, 지구와 공존하는 순환의 흐름을 디자인합니다. <br />
                더 깨끗한 기술로 세상을 연결하는 지속 가능한 무역의 내일을 시작하세요.
              </p>
              
              <div className="flex gap-6">
                <button className="px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-2xl transition-all">
                  Join the Mission
                </button>
                <div className="flex items-center gap-3 text-emerald-600 font-bold cursor-pointer group">
                  Learn Our ESG Policy <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>

            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="relative z-10"
              >
                <MediaPlaceholder label="Sustainable Logistics Park Visualization" mood="eco" aspectRatio="square" className="rounded-[4rem] shadow-[0_50px_100px_rgba(5,150,105,0.15)] border-emerald-100" />
              </motion.div>
              {/* Floating Organic Tags */}
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4 border border-emerald-50">
                <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center"><Wind /></div>
                <div className="text-sm font-bold">Low-Carbon Fleet</div>
              </div>
              <div className="absolute -bottom-10 -left-6 bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4 border border-emerald-50">
                <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center"><Sun /></div>
                <div className="text-sm font-bold">100% Solar Warehousing</div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Sustainable Solutions Section */}
        <section className="py-40 px-6">
          <div className="max-w-7xl mx-auto text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-emerald-900 mb-8 tracking-tighter">Green Value Stream.</h2>
            <p className="text-lg text-emerald-800/50 max-w-2xl mx-auto font-medium leading-relaxed">
              우리는 모든 물류 마일(Mile)에서 지구의 호흡을 생각합니다. <br />
              보라로지스의 세 가지 핵심 ESG 솔루션을 만나보세요.
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Eco Routing", icon: Wind, desc: "AI 기반 탄소 배출 최소화 경로 분석 및 가동 효율 최적화.", color: "bg-teal-50" },
              { title: "Circular Pack", icon: Droplets, desc: "100% 재활용 및 생분해 가능한 친환경 스마트 포장 솔루션.", color: "bg-emerald-50" },
              { title: "Ethical Trade", icon: ShieldCheck, desc: "투명하고 공정한 글로벌 네트워크를 통한 신뢰 중심의 무역.", color: "bg-emerald-100/30" },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className={`${item.color} p-12 rounded-[3.5rem] border border-emerald-200/50 flex flex-col justify-between h-[480px] shadow-sm transition-all`}
              >
                <div>
                  <div className="w-16 h-16 bg-white text-emerald-600 rounded-[1.5rem] shadow-sm flex items-center justify-center mb-10">
                    <item.icon size={32} />
                  </div>
                  <h3 className="text-3xl font-bold mb-6 text-emerald-900 tracking-tight">{item.title}</h3>
                  <p className="text-emerald-800/60 leading-relaxed font-medium">{item.desc}</p>
                </div>
                <button className="w-full py-4 bg-emerald-900 text-white rounded-2xl font-bold text-sm tracking-widest hover:bg-emerald-600 transition-colors uppercase">
                  Details
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. Living Network Map Section */}
        <section className="py-40 bg-emerald-950 text-white overflow-hidden rounded-[5rem] mx-4 md:mx-10 my-20 relative">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-bold leading-tight mb-10 tracking-tighter">
                Growing the <br /> <span className="text-emerald-400">Green Network.</span>
              </h2>
              <div className="space-y-12">
                 <div className="flex gap-8 group">
                   <div className="w-14 h-14 bg-emerald-900 border border-emerald-800 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-400 group-hover:text-emerald-950 transition-all"><Globe size={28} /></div>
                   <div>
                     <h4 className="text-xl font-bold mb-2">Organic Expansion</h4>
                     <p className="text-white/40 text-sm leading-relaxed">자연의 섭리를 닮은 유연하고 지속 가능한 글로벌 거점 확장.</p>
                   </div>
                 </div>
                 <div className="flex gap-8 group">
                   <div className="w-14 h-14 bg-emerald-900 border border-emerald-800 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-400 group-hover:text-emerald-950 transition-all"><Zap size={28} /></div>
                   <div>
                     <h4 className="text-xl font-bold mb-2">Sustainable Energy</h4>
                     <p className="text-white/40 text-sm leading-relaxed">모든 물류 거점에 100% 재생 가능 에너지 시스템 도입.</p>
                   </div>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-[100px]" />
              <MediaPlaceholder label="Eco-Friendly Global Route Map" mood="eco" aspectRatio="video" className="border-emerald-800/50 rounded-[3rem] relative z-10" />
            </div>
          </div>
        </section>

        {/* 5. ESG Commitment Section */}
        <section className="py-40 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-12 shadow-inner"
           >
             <ShieldCheck size={48} strokeWidth={1.5} />
           </motion.div>
           <h2 className="text-4xl md:text-6xl font-black text-emerald-950 mb-8 tracking-tighter leading-tight">
             Proven Commitment <br /> to the Future.
           </h2>
           <p className="text-xl text-emerald-800/50 max-w-3xl leading-relaxed font-medium mb-16">
             보라로지스는 매 분기 지속가능 경영 보고서를 투명하게 공개하며, <br />
             2050년 탄소 중립 달성을 위한 구체적인 수치를 실천으로 증명하고 있습니다.
           </p>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full">
             {[
               { label: "Carbon Save", value: "40%" },
               { label: "Eco Partners", value: "820+" },
               { label: "Greener Areas", value: "125" },
               { label: "Clean Awards", value: "18" },
             ].map((item, idx) => (
               <div key={idx} className="p-8 bg-white rounded-3xl shadow-sm border border-emerald-50">
                 <span className="block text-4xl font-bold text-emerald-600 mb-2">{item.value}</span>
                 <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">{item.label}</span>
               </div>
             ))}
           </div>
        </section>
      </main>

      {/* 6. Soft Nature Footer */}
      <footer className="bg-white pt-32 pb-20 px-6 border-t border-emerald-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="max-w-xs">
            <span className="text-2xl font-bold tracking-tight text-emerald-900 block mb-8">BORA ECO.</span>
            <p className="text-emerald-800/40 text-sm leading-relaxed font-medium mb-12">
              자연의 순환을 존중하는 물류, <br />
              보라로지스가 꿈꾸는 새로운 무역의 가치입니다.
            </p>
            <div className="flex gap-4">
              {[1,2,3].map(i => <div key={i} className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white cursor-pointer transition-all"><Leaf size={20} /></div>)}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-900 mb-8">Ecosystem</h4>
              <ul className="text-emerald-800/40 font-bold flex flex-col gap-6 text-sm">
                <li><Link href="#" className="hover:text-emerald-600">Green Logistics</Link></li>
                <li><Link href="#" className="hover:text-emerald-600">ESG Network</Link></li>
                <li><Link href="#" className="hover:text-emerald-600">Reports</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-900 mb-8">Company</h4>
              <ul className="text-emerald-800/40 font-bold flex flex-col gap-6 text-sm">
                <li><Link href="#" className="hover:text-emerald-600">Ambassadors</Link></li>
                <li><Link href="#" className="hover:text-emerald-600">Forest Project</Link></li>
                <li><Link href="#" className="hover:text-emerald-600">About BORA</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-40 pt-10 border-t border-emerald-100 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300">© 2026 BORA Logistics & ESG. In Harmony.</p>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-emerald-400">
            <Link href="#" className="hover:text-emerald-600">Ethical Policy</Link>
            <Link href="#" className="hover:text-emerald-600">Global Standards</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
