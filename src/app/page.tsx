"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ChevronRight, ChevronDown, Menu, Package, Ship, Globe, Globe2, Cpu, Warehouse, Truck, Users, Building2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import LogisticsTradeFlowMain from "@/components/LogisticsTradeFlowMain";
import ServiceBento from "@/components/ServiceBento";

const APPLE_EASE = [0.32, 0.72, 0, 1];
const ASSET = "/assets/images";

export default function AppleEsqueHome() {
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Hero Logo Animations — heroRef(250vh) 기준 (Pillar 7 원본 수치)
  const logoScale = useTransform(smoothProgress, [0, 0.3], [1, 0.6]);
  const logoY = useTransform(smoothProgress, [0, 0.3], [0, -80]);
  const logoOpacity = useTransform(smoothProgress, [0.15, 0.35], [1, 0]);
  const contentOpacity = useTransform(smoothProgress, [0.4, 0.55], [0, 1]);
  const contentScale = useTransform(smoothProgress, [0.4, 0.7], [0.8, 1]); // Zoom-in effect
  const contentY = useTransform(smoothProgress, [0.4, 0.55], [40, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white text-black font-sans selection:bg-neutral-800 selection:text-white">
      {/* ─── 1. Header ─── */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? "bg-white/80 backdrop-blur-2xl border-b border-neutral-100 py-3" : "py-6"}`}>
        <div className="max-w-[1400px] mx-auto px-10 flex justify-between items-center">
          <Link href="/design-hub" className="relative w-28 h-8">
            <Image src={`${ASSET}/logo.png`} alt="BORA" fill className="object-contain object-left" />
          </Link>
          
          <div className="hidden md:flex items-center gap-10 text-[13px] font-semibold text-neutral-400">
            {["물류 서비스", "글로벌 무역", "회사 소개"].map(item => (
              <Link key={item} href="#" className="hover:text-black transition-colors">{item}</Link>
            ))}
            <Link href="#" className="px-6 py-2 bg-neutral-900 text-white rounded-full text-xs hover:bg-neutral-700 transition-all">
              문의하기
            </Link>
          </div>

          <button className="md:hidden">
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* ─── 2. Hero Reveal Section (Pure Animation Focus) ─── */}
      <section ref={heroRef} className="relative h-[250vh] bg-white">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
          
          {/* Stage 1: Flow Animation */}
          <motion.div 
            style={{ scale: logoScale, opacity: logoOpacity }}
            className="relative z-10 w-full flex flex-col items-center px-10"
          >
            <div className="relative w-full max-w-[1400px]">
              <LogisticsTradeFlowMain accentColor="#6A0DAD" className="scale-100 md:scale-110" />
            </div>
          </motion.div>

          {/* Stage 2: Service Bento Dashboard */}
          <motion.div 
            style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
            className="absolute inset-0 z-20 flex items-center justify-center overflow-y-auto"
          >
            <div className="w-full max-w-[1400px] px-10">
              <ServiceBento />
            </div>
          </motion.div>

          <footer className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-neutral-200 z-10">
             <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">Scroll to reveal flow</span>
             <ChevronDown size={20} className="animate-bounce opacity-30" />
          </footer>
        </div>
      </section>

      {/* ── 핵심 가치 섹션: 물류 → 무역 연결 시각화 (Sample 2에서 이식) ── */}
      <section className="py-40 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-xs font-bold uppercase tracking-[0.4em] mb-5 block" style={{ color: "#6A0DAD" }}>
              Core Value
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6" style={{ color: "#111827" }}>
              물류의 흐름을 설계하고,<br />신뢰를 운송합니다
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              보라 그룹은 물류 서비스를 기반으로 무역 업무를 병행하며,<br />
              고객사에게 원스톱 토탈 솔루션을 제공합니다.
            </p>
          </div>

          {/* 물류→무역 플로우 바 (상단) */}
          <div className="hidden md:flex justify-center items-center gap-3 mb-14">
            <div className="flex items-center gap-2 px-6 py-3 rounded-full border-2" style={{ borderColor: "#6A0DAD", color: "#6A0DAD" }}>
              <Package size={18} />
              <span className="text-sm font-extrabold tracking-wide">물류</span>
            </div>
            <div className="flex items-center gap-1.5">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.15, 0.8, 0.15], scale: [0.8, 1.2, 0.8] }}
                  transition={{ delay: i * 0.15, repeat: Infinity, duration: 1.8 }}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: "#6A0DAD" }}
                />
              ))}
              <ArrowRight size={24} strokeWidth={3} style={{ color: "#6A0DAD" }} />
            </div>
            <div className="flex items-center gap-2 px-6 py-3 rounded-full border-2" style={{ borderColor: "#4B0082", color: "#4B0082" }}>
              <Globe2 size={18} />
              <span className="text-sm font-extrabold tracking-wide">무역</span>
            </div>
          </div>

          {/* 물류→무역 플로우 카드 (확대) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {[
              {
                icon: Package,
                step: "STEP 01",
                tag: "물류",
                title: "종합 물류 인프라",
                desc: "광양 자유무역지역 4만 평, 보세창고 2만 평. 포워딩, 검역대행, 내륙운송까지 물류 전 과정을 자체 인프라와 장비로 직접 수행합니다.",
                img: "extra_1.jpg",
              },
              {
                icon: Cpu,
                step: "STEP 02",
                tag: "기술",
                title: "스마트 기술 · 생산",
                desc: "물류 장비 자체 설계·제조, 스마트 팩토리 운영. 4조 3교대 95명 전문 인력이 24시간 쉬지 않고 가동합니다.",
                img: "AI.jpg",
              },
              {
                icon: Globe2,
                step: "STEP 03",
                tag: "무역",
                title: "무역 · 글로벌 확장",
                desc: "국제물류 네트워크를 기반으로 중국·동남아 자원 수입부터 K-culture·K-food 수출까지. 물류에서 무역으로 영역을 확장합니다.",
                img: "extra_13.jpg",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.7 }}
                whileHover={{ y: -10 }}
                className="group relative rounded-3xl overflow-hidden border border-neutral-100 bg-white shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                {/* 카드 이미지 (확대) */}
                <div className="relative h-72 overflow-hidden">
                  <Image src={`${ASSET}/${item.img}`} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                  {/* 스텝 뱃지 */}
                  <div className="absolute top-5 left-5 px-4 py-2 rounded-full text-white text-[10px] font-extrabold tracking-widest" style={{ backgroundColor: "#6A0DAD" }}>
                    {item.step}
                  </div>
                  {/* 태그 뱃지 */}
                  <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider bg-white/80 backdrop-blur-sm" style={{ color: "#4B0082" }}>
                    {item.tag}
                  </div>

                </div>


                {/* 카드 내용 */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#F9F5FF", color: "#4B0082" }}>
                      <item.icon size={22} />
                    </div>
                    <h3 className="text-2xl font-extrabold" style={{ color: "#111827" }}>{item.title}</h3>
                  </div>
                  <p className="text-neutral-500 leading-relaxed text-[15px] flex-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. Full-Width Image Banner (7번 원본) ─── */}
      <section className="relative h-[80vh] overflow-hidden">
        <Image src={`${ASSET}/extra_8.jpg`} alt="24시간 물류 운영" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center text-white max-w-3xl px-6"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-white/50 mb-8 block">Operations</span>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-8">
              24시간, 365일.
            </h2>
            <p className="text-lg md:text-xl text-white/70 font-medium leading-relaxed max-w-xl mx-auto">
              4조 3교대 운영 체제. 자체 설계 물류 장비와 <br />
              스마트 자동화 시스템으로 쉼 없이 가동합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── 5. Statistics (7번 원본) ─── */}
      <section className="py-32 md:py-40 bg-white px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">숫자로 보는 보라 그룹</h2>
            <p className="text-neutral-400 text-lg font-medium">광양 자유무역지역 최대 규모의 종합 물류 인프라</p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "40,000", unit: "평", label: "물류 인프라", icon: Package },
              { value: "20,000", unit: "평", label: "보세창고", icon: Warehouse },
              { value: "95", unit: "명", label: "전문 인력", icon: Users },
              { value: "3", unit: "사", label: "그룹 계열사", icon: Building2 },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="text-center p-8 rounded-3xl bg-neutral-50 hover:bg-neutral-100 transition-colors"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <stat.icon size={22} strokeWidth={1.5} className="text-neutral-600" />
                </div>
                <span className="block text-4xl md:text-5xl font-bold tracking-tight mb-1">
                  {stat.value}<span className="text-lg text-neutral-400 ml-0.5">{stat.unit}</span>
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-neutral-400">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. Footer (7번 원본) ─── */}
      <footer className="bg-white pt-32 pb-16 px-6 md:px-10 border-t border-neutral-100">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-20 md:gap-40">
          <div className="max-w-sm">
            <div className="relative w-28 h-10 mb-8">
              <Image src={`${ASSET}/logo.png`} alt="BORA" fill className="object-contain object-left" />
            </div>
            <p className="text-neutral-400 font-medium leading-relaxed mb-8 text-sm">
              물류에서 무역까지, 한번에. <br />
              보라 그룹이 만드는 글로벌 비즈니스의 흐름.
            </p>
            <div className="text-sm text-neutral-400 leading-loose">
              <span className="font-bold text-neutral-600 block mb-1">보라로지스(주)</span>
              전남 광양시 항만8로 18-35 (도이동) <br />
              T: 061-795-9951~3
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-20">
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6">사업 영역</h5>
              <ul className="text-xs font-semibold flex flex-col gap-4 text-neutral-400">
                <li><Link href="#" className="hover:text-black transition-colors">국제물류</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">보세창고</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">포워딩</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">글로벌 무역</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6">그룹사</h5>
              <ul className="text-xs font-semibold flex flex-col gap-4 text-neutral-400">
                <li><Link href="#" className="hover:text-black transition-colors">보라로지스</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">보라로지텍</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">RE&UP</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6">문의</h5>
              <p className="text-xs font-semibold text-neutral-400 leading-loose">
                비즈니스 파트너십 또는 <br />
                서비스 문의를 환영합니다.
              </p>
              <Link href="#" className="inline-flex items-center gap-2 mt-4 text-neutral-900 font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all">
                Contact <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1400px] mx-auto mt-24 pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-medium text-neutral-300 uppercase tracking-widest">© 2026 BORALOGIS Co.,Ltd. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
