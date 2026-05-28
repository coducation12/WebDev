"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronRight, ChevronDown, Menu, Package, Ship, Globe, Globe2, Cpu, Warehouse, Truck, Users, Building2, Plane } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import LogisticsTradeFlowMain from "@/components/LogisticsTradeFlowMain";
import ServiceBento from "@/components/ServiceBento";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const APPLE_EASE = [0.32, 0.72, 0, 1];
const ASSET = "/assets/images";

export default function AppleEsqueHome() {
  const heroRef = useRef<HTMLDivElement>(null);
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

  const pointerEvents = useTransform(smoothProgress, (value: number) => value > 0.35 ? "auto" : "none");

  const [isBentoActive, setIsBentoActive] = useState(false);
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setIsBentoActive(latest >= 0.7);
  });

  return (
    <div className="bg-white text-black font-sans selection:bg-neutral-800 selection:text-white">
      <Header />

      {/* ─── 2. Hero Reveal Section ─── */}
      <section ref={heroRef} className="relative h-[250vh] bg-white">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

          {/* Stage 1: BORA Logo and Text Scroll Animation */}
          <motion.div
            style={{ scale: logoScale, opacity: logoOpacity, y: logoY }}
            className="relative z-10 w-full flex flex-col items-center px-6 md:px-10 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: APPLE_EASE }}
              className="flex flex-col items-center max-w-4xl mx-auto"
            >
              {/* Logo */}
              <div className="relative w-[180px] h-[64px] sm:w-[240px] sm:h-[85px] md:w-[320px] md:h-[113px] mb-8 sm:mb-12">
                <Image src={`${ASSET}/logo.png`} alt="Bora Logo" fill className="object-contain" priority />
              </div>
              
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 mb-6 sm:mb-8 leading-tight">
                보라, 물류로 무역을 잇다.
              </h1>
              
              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-600 font-semibold leading-relaxed tracking-tight max-w-3xl">
                보라는 물류의 흐름을 설계하고, 신뢰를 운송하며, 세계를 연결합니다.<br className="hidden sm:inline" />
                신뢰할 수 있는 파트너가 되겠습니다.
              </p>
            </motion.div>
          </motion.div>

          {/* Stage 2: Service Bento Dashboard */}
          <motion.div
            style={{ opacity: contentOpacity, y: contentY, scale: contentScale, pointerEvents }}
            className="absolute inset-0 z-20 flex items-center justify-center overflow-y-auto"
          >
            <div className="w-full max-w-[1400px] px-6 md:px-10">
              <ServiceBento isHoverEnabled={isBentoActive} />
            </div>
          </motion.div>

          <footer className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-400 z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Scroll to reveal</span>
            <ChevronDown size={18} className="animate-bounce opacity-40" />
          </footer>
        </div>
      </section>

      {/* ── 핵심 비즈니스 섹션: 국제물류 및 글로벌 무역 ── */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-white border-t border-neutral-50">
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-2 md:mb-3 text-neutral-900 leading-tight">
              국제물류 시스템을 기반으로
            </h2>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-neutral-900 leading-tight">
              글로벌 무역 네트워크를 만들어갑니다.
            </h2>
          </div>

          {/* 물류→무역 플로우 바 (애니메이션 1개 보존 - 소형화) */}
          <div className="hidden md:flex justify-center items-center gap-3 mb-12 px-6">
            <div className="flex items-center gap-2.5 px-6 py-2.5 rounded-full border-2 bg-white shadow-sm transition-all" style={{ borderColor: "#6A0DAD", color: "#6A0DAD" }}>
              <Package size={18} className="stroke-[2.5px]" />
              <span className="text-[15px] font-black tracking-tight">물류</span>
            </div>

            <div className="flex items-center gap-2 px-4">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.15, 0.7, 0.15], scale: [0.75, 1.15, 0.75] }}
                  transition={{ delay: i * 0.12, repeat: Infinity, duration: 2.1, ease: "easeInOut" }}
                  className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(106,13,173,0.2)]"
                  style={{ backgroundColor: "#6A0DAD" }}
                />
              ))}
              <motion.div animate={{ x: [0, 4, 0], opacity: [0.4, 0.8, 0.4] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
                <ArrowRight size={24} strokeWidth={2.8} style={{ color: "#6A0DAD" }} />
              </motion.div>
            </div>

            <div className="flex items-center gap-2.5 px-6 py-2.5 rounded-full border-2 bg-white shadow-sm transition-all" style={{ borderColor: "#4B0082", color: "#4B0082" }}>
              <Globe2 size={18} className="stroke-[2.5px]" />
              <span className="text-[15px] font-black tracking-tight">무역</span>
            </div>
          </div>

          {/* 통합 6카드 그리드 (소형화 및 여백 최적화) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-stretch">
            {[
              {
                icon: Package,
                tag: "물류",
                title: "종합 물류 인프라",
                desc: "광양 자유무역지역 4만 평, 보세창고 2만 평. 포워딩, 검역대행, 내륙운송까지 물류 전 과정을 자체 인프라와 장비로 직접 수행합니다.",
                img: "extra_26.jpg",
              },
              {
                icon: Cpu,
                tag: "물류",
                title: "종합 내륙운송",
                desc: "물류 장비 자체 설계·제조, 스마트 팩토리 운영. 4조 3교대 95명 전문 인력이 24시간 쉬지 않고 가동합니다.",
                img: "tech_hero.png",
              },
              {
                icon: Globe2,
                tag: "물류",
                title: "무역 · 글로벌 확장",
                desc: "국제물류 네트워크를 기반으로 중국·동남아 자원 수입부터 K-culture·K-food 수출까지. 물류에서 무역으로 영역을 확장합니다.",
                img: "extra_33.png",
              },
              {
                icon: Ship,
                tag: "무역",
                title: "해외 제품 수입",
                desc: "유럽 및 아시아 전역의 검증된 프리미엄 제품을 발굴하고, 보라만의 안정적인 물류망을 통해 신속하고 정확하게 국내로 수입합니다.",
                img: "extra_25.jpg",
              },
              {
                icon: Globe,
                tag: "무역",
                title: "K-Food 글로벌 수출",
                desc: "K-Food와 K-Culture의 경쟁력을 전 세계 시장에 알리며, 해외 판로 개척부터 수출 물류까지 통합 솔루션을 제공합니다.",
                img: "extra_13.jpg",
              },
              {
                icon: ArrowUpRight,
                tag: "무역",
                title: "수출입 대행 서비스",
                desc: "복잡한 무역 절차와 서류 작업을 대행하며, 고객사가 오직 비즈니스 성장에만 집중할 수 있도록 최적화된 무역 환경을 구축합니다.",
                img: "extra_35.png",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.6 }}
                className="group relative rounded-2xl overflow-hidden border border-neutral-100 bg-white shadow-sm hover:shadow-xl hover:border-neutral-200 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-40 md:h-48 overflow-hidden">
                   {/* Top Badge */}
                   {item.tag && (
                     <div className="absolute top-3 right-3 z-10">
                       <span className="bg-white/95 text-neutral-800 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-tight border border-neutral-200/30">
                         {item.tag}
                       </span>
                     </div>
                   )}
                  <Image src={`${ASSET}/${item.img}`} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
                </div>
                <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#F8F3FA] flex items-center justify-center text-[#6A0DAD] flex-shrink-0">
                        <item.icon size={16} strokeWidth={2.5} />
                      </div>
                      <h3 className="text-lg md:text-xl font-black text-neutral-900 tracking-tight">{item.title}</h3>
                    </div>
                    <p className="text-neutral-500 leading-relaxed text-[13px] md:text-[14px] flex-1">{item.desc}</p>
                  </div>
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
                name: "어센틱코리아", 
                desc: "글로벌 수출입 · 무역", 
                detail: "안정적인 물류 인프라를 기반으로 글로벌 수출입 비즈니스를 전개하는 종합 무역회사입니다.",
                icon: Globe 
              },
              { 
                name: "RE&UP", 
                desc: "재생에너지 · 업사이클", 
                detail: "친환경 에너지 인프라 구축과 자원 순환 기술을 통해 지속 가능한 미래를 여는 재생에너지 기업입니다.",
                icon: Package 
              },
            ].map((company, idx) => (
              <Link
                key={idx}
                href={`/company?tab=${idx}`}
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
