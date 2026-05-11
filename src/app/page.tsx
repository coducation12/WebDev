"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ChevronRight, ChevronDown, Menu, Package, Ship, Globe, Globe2, Cpu, Warehouse, Truck, Users, Building2, Plane } from "lucide-react";
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
      {/* ─── 1. Header (Centered with Dropdowns) ─── */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-white/90 backdrop-blur-xl border-b border-neutral-100 py-3 shadow-sm" : "py-6"}`}>
        <div className="max-w-[1400px] mx-auto px-10 flex justify-between items-center relative">
          
          {/* Left: Logo */}
          <Link href="/design-hub" className="relative w-28 h-8 flex-shrink-0">
            <Image src={`${ASSET}/logo.png`} alt="BORA" fill className="object-contain object-left" />
          </Link>

          {/* Center: Menus with Individual Dropdowns */}
          <div className="hidden md:flex items-center gap-20 absolute left-1/2 -translate-x-1/2">
            {[
              { 
                name: "회사 소개", 
                subs: ["보라로지스", "보라트랜스", "보라로지텍", "보라인터네셔널", "보라RE&UP"] 
              },
              { 
                name: "물류 서비스", 
                subs: ["국제 물류 서비스", "국제 물류 시스템", "물류 장비 개발 및 제작", "물류 전문 포장"] 
              },
              { 
                name: "글로벌 무역", 
                subs: ["글로벌 수출입 서비스", "구매 및 판매대행", "시장 조사 및 판로 개척"] 
              },
            ].map((menu) => (
              <div key={menu.name} className="group relative py-4">
                <button className="text-[14px] font-bold text-neutral-600 hover:text-[#6A0DAD] transition-colors flex items-center gap-1">
                  {menu.name}
                </button>
                
                {/* Dropdown Menu - Positioned to prevent dead zone */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                  <div className="bg-white/95 backdrop-blur-xl border border-neutral-100 rounded-2xl shadow-2xl p-4 min-w-[200px] flex flex-col gap-1">
                    {menu.subs.map((sub) => (
                      <Link 
                        key={sub} 
                        href="#" 
                        className="px-4 py-2.5 rounded-xl text-[13px] font-semibold text-neutral-500 hover:text-[#6A0DAD] hover:bg-neutral-50 transition-all whitespace-nowrap text-center"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Inquiry Button */}
          <Link 
            href="#" 
            className="group flex-shrink-0 px-6 py-2.5 bg-neutral-900 text-white rounded-full text-[12px] font-bold hover:bg-neutral-800 transition-all flex items-center gap-2 shadow-lg shadow-neutral-200"
          >
            문의하기
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

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
      <section className="py-40 px-6 md:px-10 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6" style={{ color: "#111827" }}>
              물류의 흐름을 설계하고, 신뢰를 운송합니다
            </h2>
            <p className="text-lg md:text-xl font-semibold text-neutral-500 tracking-tight max-w-4xl mx-auto leading-relaxed">
              보라 그룹은 물류 서비스를 기반으로 무역 업무를 병행하며, 고객사에게 원스톱 토탈 솔루션을 제공합니다.
            </p>
          </div>

          {/* 물류→무역 플로우 바 (상단) */}
          <div className="hidden md:flex justify-center items-center gap-4 mb-16 px-10">
            {/* Start: Logistics */}
            <div className="flex items-center gap-3 px-8 py-4 rounded-full border-2 bg-white shadow-sm transition-all" style={{ borderColor: "#6A0DAD", color: "#6A0DAD" }}>
              <Package size={22} className="stroke-[2.5px]" />
              <span className="text-lg font-black tracking-tight">물류</span>
            </div>

            {/* Pulsing Dots Flow */}
            <div className="flex items-center gap-2.5 px-6">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    opacity: [0.15, 0.7, 0.15], 
                    scale: [0.75, 1.15, 0.75],
                  }}
                  transition={{ 
                    delay: i * 0.12, 
                    repeat: Infinity, 
                    duration: 2.1,
                    ease: "easeInOut"
                  }}
                  className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_rgba(106,13,173,0.2)]"
                  style={{ backgroundColor: "#6A0DAD" }}
                />
              ))}
              <motion.div
                animate={{ x: [0, 6, 0], opacity: [0.4, 0.8, 0.4] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <ArrowRight size={30} strokeWidth={2.8} style={{ color: "#6A0DAD" }} />
              </motion.div>
            </div>

            {/* End: Trade */}
            <div className="flex items-center gap-3 px-8 py-4 rounded-full border-2 bg-white shadow-sm transition-all" style={{ borderColor: "#4B0082", color: "#4B0082" }}>
              <Globe2 size={22} className="stroke-[2.5px]" />
              <span className="text-lg font-black tracking-tight">무역</span>
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
                img: "extra_26.jpg",
              },
              {
                icon: Cpu,
                step: "STEP 02",
                tag: "기술",
                title: "스마트 기술 · 생산",
                desc: "물류 장비 자체 설계·제조, 스마트 팩토리 운영. 4조 3교대 95명 전문 인력이 24시간 쉬지 않고 가동합니다.",
                img: "tech_hero.png",
              },
              {
                icon: Globe2,
                step: "STEP 03",
                tag: "무역",
                title: "무역 · 글로벌 확장",
                desc: "국제물류 네트워크를 기반으로 중국·동남아 자원 수입부터 K-culture·K-food 수출까지. 물류에서 무역으로 영역을 확장합니다.",
                img: "extra_33.png",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.7 }}
                whileHover={{ 
                  boxShadow: "0 25px 50px -12px rgba(106, 13, 173, 0.15)",
                }}
                className="group relative rounded-3xl overflow-hidden border border-neutral-100 bg-white shadow-sm transition-all duration-300 flex flex-col"
              >
                {/* 카드 이미지 (확대) */}
                <div className="relative h-48 md:h-72 overflow-hidden">
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
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-2 md:mb-5">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#F9F5FF", color: "#4B0082" }}>
                      <item.icon size={20} className="md:w-[22px] md:h-[22px]" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-extrabold" style={{ color: "#111827" }}>{item.title}</h3>
                  </div>
                  <p className="hidden md:block text-neutral-500 leading-relaxed text-[15px] flex-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. BORA Family Section ─── */}
      <section className="py-24 md:py-48 bg-neutral-50 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-24 text-center"
          >
            <h2 className="mb-6 md:mb-10 flex items-baseline justify-center gap-0 flex-wrap">
              <span className="text-4xl md:text-6xl font-serif font-bold italic tracking-tight text-neutral-900">
                Family Companies
              </span>
            </h2>
            <p className="text-base md:text-xl font-semibold text-neutral-500 tracking-tight">
              물류와 무역을 잇는 보라의 핵심 네트워크를 소개합니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { 
                name: "보라로지스", 
                desc: "국제물류 · 보세창고 운영", 
                detail: "광양 자유무역지역 내 4만 평 규모 인프라를 기반으로 종합 물류 서비스를 제공합니다.",
                icon: Ship 
              },
              { 
                name: "보라트랜스", 
                desc: "내륙 및 컨테이너 운송", 
                detail: "항만과 창고를 잇는 셔틀 및 내륙 전역을 커버하는 최적의 운송 네트워크를 운영합니다.",
                icon: Truck 
              },
              { 
                name: "보라로지텍", 
                desc: "생산라인 물류 · 장비 제조", 
                detail: "여수산단 생산라인 물류 운영 및 물류 장비를 자체 설계·생산하는 기술 중심 기업입니다.",
                icon: Cpu 
              },
              { 
                name: "보라인터네셔널", 
                desc: "글로벌 수출입 · 무역", 
                detail: "중국 및 동남아 자원 수입과 K-Food/Culture 수출을 선도하는 글로벌 비즈니스 파트너입니다.",
                icon: Globe 
              },
              { 
                name: "보라RE&UP", 
                desc: "재생에너지 · 업사이클", 
                detail: "태양광, 풍력 발전 자재 특수 물류와 친환경 재생 사업을 통해 지속 가능한 미래를 만듭니다.",
                icon: Package 
              },
            ].map((company, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ 
                  borderColor: "#6A0DAD",
                  boxShadow: "0 20px 40px -10px rgba(106, 13, 173, 0.15)"
                }}
                className="group p-6 md:p-10 rounded-3xl md:rounded-[40px] bg-white border-2 border-neutral-100 cursor-pointer flex flex-col transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-8 md:mb-16">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-neutral-50 rounded-2xl md:rounded-[22px] flex items-center justify-center group-hover:bg-[#6A0DAD] group-hover:text-white transition-all duration-200">
                    <company.icon size={24} className="md:w-8 md:h-8" strokeWidth={1.5} />
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0 hidden md:flex items-center gap-2 text-[#6A0DAD] font-bold text-xs uppercase tracking-widest pt-6">
                    View More <ArrowRight size={14} />
                  </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-2 md:mb-3 group-hover:text-[#6A0DAD] transition-colors duration-200">{company.name}</h3>
                <p className="text-[11px] md:text-sm font-bold text-[#6A0DAD] mb-0 md:mb-6 opacity-80 uppercase tracking-wider">{company.desc}</p>
                <p className="hidden md:block text-[14px] text-neutral-400 leading-relaxed font-medium group-hover:text-neutral-600 transition-colors duration-200">
                  {company.detail}
                </p>
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
                <li><Link href="#" className="hover:text-[#6A0DAD] transition-colors">국제물류 서비스</Link></li>
                <li><Link href="#" className="hover:text-[#6A0DAD] transition-colors">국제 물류시스템</Link></li>
                <li><Link href="#" className="hover:text-[#6A0DAD] transition-colors">물류 장비 개발·제작</Link></li>
                <li><Link href="#" className="hover:text-[#6A0DAD] transition-colors">글로벌 수출입 서비스</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6">그룹사</h5>
              <ul className="text-xs font-semibold flex flex-col gap-4 text-neutral-400">
                <li><Link href="#" className="hover:text-[#6A0DAD] transition-colors">보라로지스</Link></li>
                <li><Link href="#" className="hover:text-[#6A0DAD] transition-colors">보라트랜스</Link></li>
                <li><Link href="#" className="hover:text-[#6A0DAD] transition-colors">보라로지텍</Link></li>
                <li><Link href="#" className="hover:text-[#6A0DAD] transition-colors">보라인터네셔널</Link></li>
                <li><Link href="#" className="hover:text-[#6A0DAD] transition-colors">보라RE&UP</Link></li>
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
