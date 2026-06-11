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

import { useLanguage } from "@/context/LanguageContext";

const APPLE_EASE = [0.32, 0.72, 0, 1];
const ASSET = "/assets/images/active";

export default function AppleEsqueHome() {
  const { language } = useLanguage();
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

  const cards = [
    {
      icon: Package,
      tag: { ko: "물류", en: "Logistics" },
      title: { ko: "종합 물류 인프라", en: "Integrated Logistics Infrastructure" },
      desc: { 
        ko: "광양 자유무역 4만 평, 보세창고 2만 평. 포워딩, 검역대행, 내륙운송까지 물류 전 과정을 자체 인프라와 장비로 수행합니다.", 
        en: "132,000㎡ site and 66,000㎡ warehouse in Gwangyang Free Trade Zone. We perform the entire logistics process directly with our own infrastructure and equipment, including forwarding, quarantine agency, and inland transport." 
      },
      img: "main_logistics_bento_v2.jpg",
    },
    {
      icon: Truck,
      tag: { ko: "물류", en: "Logistics" },
      title: { ko: "종합 내륙운송", en: "Integrated Inland Transportation" },
      desc: { 
        ko: "전국 네트워크를 기반으로 다양한 화물을 안전하게 운송합니다.", 
        en: "We transport various cargoes safely based on our nationwide network." 
      },
      img: "main_logistics_bento_2_v2.jpg",
    },
    {
      icon: Cpu,
      tag: { ko: "물류", en: "Logistics" },
      title: { ko: "물류장비제작", en: "Logistics Equipment Manufacturing" },
      desc: { 
        ko: "물류 창고를 효율적으로 운영하기 위한 설비들을 연구하고 개발하여, 맞춤 제작합니다.", 
        en: "We research, develop, and customize facilities to operate warehouses efficiently." 
      },
      img: "main_logistics_bento_3_v2.jpg",
    },
    {
      icon: Ship,
      tag: { ko: "무역", en: "Trade" },
      title: { ko: "해외 제품 수입", en: "Global Product Import" },
      desc: { 
        ko: "유럽 및 아시아의 검증된 프리미엄 제품을 발굴하고, 보라의 안정적인 물류망을 통해 신속하고 정확하게 수입합니다.", 
        en: "We discover proven premium products across Europe & Asia and import them quickly and accurately through BORA's reliable logistics network." 
      },
      img: "main_trade_bento.jpg",
    },
    {
      icon: Globe,
      tag: { ko: "무역", en: "Trade" },
      title: { ko: "지역 특산품 해외 수출", en: "Global Export of Local Specialties" },
      desc: { 
        ko: "디자인 제품과 지역 식품들을 전세계 시장에 알리며, 해외 판로 개척부터 수출 물류까지 통합 솔루션을 제공합니다.", 
        en: "Promoting design products and local foods to global markets, we provide integrated solutions from market development to export logistics." 
      },
      img: "main_trade_bento_2_v2.jpg",
    },
    {
      icon: ArrowUpRight,
      tag: { ko: "무역", en: "Trade" },
      title: { ko: "수출입 대행 서비스", en: "Import/Export Agency" },
      desc: { 
        ko: "복잡한 무역 절차와 서류 작업을 대행하며, 고객사가 오직 비즈니스 성장에만 집중할 수 있도록 최적화된 무역 환경을 구축합니다.", 
        en: "We handle complex customs procedures and documentation, establishing an optimized trade environment so clients can focus solely on growth." 
      },
      img: "main_trade_bento_3_v2.jpg",
    },
  ];

  const familyCompanies = [
    { 
      name: { ko: "보라로지스", en: "Bora Logis" }, 
      desc: { ko: "국제물류 · 보세창고 운영", en: "International Logistics & Bonded Warehouse Operations" }, 
      detail: { 
        ko: "광양 자유무역지역 내 4만 평 규모 인프라를 기반으로 종합 물류 서비스를 제공합니다.", 
        en: "Provides comprehensive logistics services based on 132,000㎡ infrastructure in Gwangyang Free Trade Zone." 
      },
      icon: Ship 
    },
    { 
      name: { ko: "보라트랜스", en: "Bora Trans" }, 
      desc: { ko: "내륙 및 컨테이너 운송", en: "Inland & Container Transportation" }, 
      detail: { 
        ko: "항만과 창고를 잇는 셔틀 및 내륙 전역을 커버하는 최적의 운송 네트워크를 운영합니다.", 
        en: "Operates dedicated shuttles connecting ports and warehouses, and an optimal transport network covering inland routes." 
      },
      icon: Truck 
    },
    { 
      name: { ko: "보라로지텍", en: "Bora Logitech" }, 
      desc: { ko: "생산라인 물류 · 장비 제조", en: "Production Line Logistics & Equipment Manufacturing" }, 
      detail: { 
        ko: "여수산단 생산라인 물류 운영 및 물류 장비를 자체 설계·생산하는 기술 중심 기업입니다.", 
        en: "A technology-driven company operating production line logistics in Yeosu Complex and designing/manufacturing logistics equipment." 
      },
      icon: Cpu 
    },
    { 
      name: { ko: "어센틱코리아", en: "Authentic Korea" }, 
      desc: { ko: "글로벌 수출입 · 무역", en: "Global Import/Export & Trade" }, 
      detail: { 
        ko: "안정적인 물류 인프라를 기반으로 글로벌 수출입 비즈니스를 전개하는 종합 무역회사입니다.", 
        en: "A comprehensive trading company expanding global import/export business based on stable logistics infrastructure." 
      },
      icon: Globe 
    },
    { 
      name: { ko: "RE&UP", en: "RE&UP" }, 
      desc: { ko: "재생에너지 · 업사이클", en: "Renewable Energy & Upcycling" }, 
      detail: { 
        ko: "친환경 에너지 인프라 구축과 자원 순환 기술을 통해 지속 가능한 미래를 여는 재생에너지 기업입니다.", 
        en: "A renewable energy company opening a sustainable future through eco-friendly energy infrastructure and resource circulation." 
      },
      icon: Package 
    },
  ];

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
              className="flex flex-col items-center max-w-5xl mx-auto"
            >
              {/* Logo */}
              <div className="relative w-[180px] h-[64px] sm:w-[240px] sm:h-[85px] md:w-[320px] md:h-[113px] mb-8 sm:mb-12">
                <Image src={`${ASSET}/sys_logo_dark.png`} alt="Bora Logo" fill className="object-contain" priority />
              </div>
              
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight text-neutral-900 mb-6 sm:mb-8 leading-tight md:whitespace-nowrap">
                {language === "ko" ? "보라, 물류로 무역을 잇다." : "BORA, Connecting Trade through Logistics."}
              </h1>
              
              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-600 font-semibold leading-relaxed tracking-tight max-w-4xl">
                {language === "ko" ? (
                  <>
                    보라는 물류의 흐름을 설계하고, 신뢰를 운송하며, 세계를 연결합니다.<br className="hidden sm:inline" />
                    신뢰할 수 있는 파트너가 되겠습니다.
                  </>
                ) : (
                  <>
                    BORA designs the flow of logistics, transports trust, and connects the world.<br className="hidden sm:inline" />
                    We will be your reliable partner.
                  </>
                )}
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
              {language === "ko" ? "국제물류 시스템을 기반으로" : "Based on International Logistics Systems,"}
            </h2>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-neutral-900 leading-tight">
              {language === "ko" ? "글로벌 무역 네트워크를 만들어갑니다." : "We Build a Global Trade Network."}
            </h2>
          </div>

          {/* 물류→무역 플로우 바 (애니메이션 1개 보존 - 소형화) */}
          <div className="hidden md:flex justify-center items-center gap-3 mb-12 px-6">
            <div className="flex items-center gap-2.5 px-6 py-2.5 rounded-full border-2 bg-white shadow-sm transition-all" style={{ borderColor: "#6A0DAD", color: "#6A0DAD" }}>
              <Package size={18} className="stroke-[2.5px]" />
              <span className="text-[15px] font-black tracking-tight">
                {language === "ko" ? "물류" : "Logistics"}
              </span>
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
              <span className="text-[15px] font-black tracking-tight">
                {language === "ko" ? "무역" : "Trade"}
              </span>
            </div>
          </div>

          {/* 통합 6카드 그리드 (소형화 및 여백 최적화) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-stretch">
            {cards.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.6 }}
                className="group relative rounded-2xl overflow-hidden border border-neutral-100 bg-white shadow-sm hover:shadow-xl hover:border-neutral-200 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 md:h-64 overflow-hidden">
                   {/* Top Badge */}
                   {item.tag && (
                     <div className="absolute top-3 right-3 z-10">
                       <span className="bg-white/95 text-neutral-800 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-tight border border-neutral-200/30">
                         {item.tag[language]}
                       </span>
                     </div>
                   )}
                  <Image src={`${ASSET}/${item.img}`} alt={item.title[language]} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
                </div>
                <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#F8F3FA] flex items-center justify-center text-[#6A0DAD] flex-shrink-0">
                        <item.icon size={16} strokeWidth={2.5} />
                      </div>
                      <h3 className="text-lg md:text-xl font-black text-neutral-900 tracking-tight">{item.title[language]}</h3>
                    </div>
                    <p className="text-neutral-500 leading-relaxed text-[13px] md:text-[14px] flex-1 break-keep">{item.desc[language]}</p>
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
              <span className="text-4xl md:text-6xl font-bold italic tracking-tight text-neutral-900" style={{ fontFamily: "var(--font-serif)" }}>
                Family Companies
              </span>
            </h2>
            <p className="text-base md:text-xl font-semibold text-neutral-500 tracking-tight">
              {language === "ko" ? "물류와 무역을 잇는 보라의 핵심 네트워크를 소개합니다." : "Introducing BORA's core network connecting logistics and trade."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
            {familyCompanies.map((company, idx) => (
              <Link
                key={idx}
                href={`/company?tab=${idx}`}
                className="group p-6 md:p-10 rounded-3xl md:rounded-[40px] bg-white border-2 border-neutral-100 hover:border-[#6A0DAD] cursor-pointer flex flex-col transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-8 md:mb-16">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-neutral-50 rounded-2xl md:rounded-[22px] flex items-center justify-center group-hover:bg-[#6A0DAD] group-hover:text-white transition-all duration-200">
                    <company.icon size={24} className="md:w-8 md:h-8" strokeWidth={1.5} />
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0 hidden md:flex items-center gap-2 text-[#6A0DAD] font-bold text-xs uppercase tracking-widest pt-6">
                    View More <ArrowRight size={14} />
                  </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-2 md:mb-3 group-hover:text-[#6A0DAD] transition-colors duration-200">{company.name[language]}</h3>
                <p className="text-[11px] md:text-sm font-bold text-[#6A0DAD] mb-0 md:mb-6 opacity-80 uppercase tracking-wider">{company.desc[language]}</p>
                <p className="hidden md:block text-[14px] text-neutral-400 leading-relaxed font-medium group-hover:text-neutral-600 transition-colors duration-200">
                  {company.detail[language]}
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

