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

  // Hero Logo Animations — heroRef(450vh) 기준 3단계 페이지 전환
  const logoScale = useTransform(smoothProgress, [0, 0.20], [1, 0.65]);
  const logoY = useTransform(smoothProgress, [0, 0.20], [0, -60]);
  const logoOpacity = useTransform(smoothProgress, [0.10, 0.20], [1, 0]);

  // Stage 2: ServiceBento (원형 물류/무역 카드 - 머무르는 구간 확대)
  const contentOpacity = useTransform(smoothProgress, [0.20, 0.28, 0.65, 0.74], [0, 1, 1, 0]);
  const contentScale = useTransform(smoothProgress, [0.20, 0.30, 0.65, 0.74], [0.85, 1, 1, 0.92]);
  const contentY = useTransform(smoothProgress, [0.20, 0.28, 0.65, 0.74], [40, 0, 0, -30]);
  const pointerEvents = useTransform(smoothProgress, (value: number) =>
    value >= 0.26 && value <= 0.68 ? "auto" : "none"
  );

  // Stage 3: Family Companies + Compact Footer
  const familyOpacity = useTransform(smoothProgress, [0.74, 0.84], [0, 1]);
  const familyY = useTransform(smoothProgress, [0.74, 0.84], [40, 0]);
  const familyPointerEvents = useTransform(smoothProgress, (value: number) =>
    value >= 0.76 ? "auto" : "none"
  );

  const [isBentoActive, setIsBentoActive] = useState(false);
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setIsBentoActive(latest >= 0.26 && latest <= 0.68);
  });

  const familyCompanies = [
    { 
      name: { ko: "보라로지스", en: "Bora Logis" }, 
      desc: { ko: "국제물류·보세창고 운영", en: "International Logistics & Bonded Warehouse" }, 
      img: "아이콘-보라로지스.png" 
    },
    { 
      name: { ko: "보라트랜스", en: "Bora Trans" }, 
      desc: { ko: "내륙 컨테이너 및 카고운송", en: "Inland Container & Cargo Transport" }, 
      img: "아이콘-보라트랜스.png" 
    },
    { 
      name: { ko: "보라로지텍", en: "Bora Logitech" }, 
      desc: { ko: "제조물류 및 장비제작", en: "Manufacturing Logistics & Equipment" }, 
      img: "아이콘-보라로지텍.png" 
    },
    { 
      name: { ko: "어센틱코리아", en: "Authentic Korea" }, 
      desc: { ko: "종합무역 · 무역대행", en: "General Trade & Trade Agency" }, 
      img: "아이콘-어센틱코리아.png" 
    },
    { 
      name: { ko: "리앤업", en: "RE&UP" }, 
      desc: { ko: "재생에너지 · 업사이클", en: "Renewable Energy & Upcycling" }, 
      img: "아이콘-RE&UP.png" 
    },
  ];

  return (
    <div className="bg-white text-black font-sans selection:bg-neutral-800 selection:text-white">
      <Header />

      {/* ─── 2. Hero Reveal Section (3-Stage Page Transition) ─── */}
      <section ref={heroRef} className="relative h-[450vh] bg-white">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

          {/* Background: Gray Dotted World Map (Centered) */}
          <motion.div
            style={{ opacity: logoOpacity }}
            className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none px-6"
          >
            <div className="relative w-full max-w-3xl aspect-[16/9] opacity-55">
              <Image
                src={`${ASSET}/dotted_world_map.jpg`}
                alt="World Map"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

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
              {/* Logo + Title Row */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-5">
                <div className="relative w-[130px] h-[46px] sm:w-[160px] sm:h-[56px] flex-shrink-0">
                  <Image src={`${ASSET}/sys_logo_dark.png`} alt="Bora Logo" fill className="object-contain" priority />
                </div>
                <h1 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight md:whitespace-nowrap break-keep">
                  {language === "ko" ? "보라, 물류와 무역으로 세상을 잇다." : "BORA, Connecting Trade and Logistics."}
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm md:text-base text-neutral-600 font-medium tracking-tight max-w-2xl">
                We design the flow of logistics, deliver trust, and empower your competitive edge.
              </p>
            </motion.div>
          </motion.div>

          {/* Stage 2: Service Bento Dashboard */}
          <motion.div
            style={{ opacity: contentOpacity, y: contentY, scale: contentScale, pointerEvents }}
            className="absolute inset-0 z-20 flex items-center justify-center overflow-y-auto pt-14 md:pt-0"
          >
            <div className="w-full max-w-[1400px] px-4 md:px-10">
              <ServiceBento isHoverEnabled={isBentoActive} />
            </div>
          </motion.div>

          {/* Stage 3: Family Companies + Compact Footer */}
          <motion.div
            style={{ opacity: familyOpacity, y: familyY, pointerEvents: familyPointerEvents }}
            className="absolute inset-0 z-30 flex flex-col justify-between bg-white pt-16 md:pt-20 overflow-y-auto"
          >
            <div className="flex-1 flex flex-col justify-start md:justify-center max-w-[1400px] w-full mx-auto px-4 md:px-10 py-4 md:py-6">
              <div className="mb-4 md:mb-10 text-center">
                <h2 className="mb-1.5 md:mb-3 flex items-baseline justify-center gap-0 flex-wrap">
                  <span
                    className="text-2xl sm:text-3xl md:text-5xl font-bold italic tracking-tight text-neutral-900"
                    style={{ fontFamily: "var(--font-title)" }}
                  >
                    Family Companies
                  </span>
                </h2>
                <p className="text-xs md:text-lg font-semibold text-neutral-500 tracking-tight">
                  {language === "ko"
                    ? "물류와 무역을 잇는 보라의 핵심 네트워크를 소개합니다."
                    : "Introducing BORA's core network connecting logistics and trade."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5">
                {familyCompanies.map((company, idx) => (
                  <div key={idx} className="relative flex border-b border-neutral-200 md:border-b-0 last:border-b-0">
                    {/* Left Vertical Divider (shortened top & bottom) */}
                    <span
                      className="hidden md:block absolute left-0 top-5 bottom-5 w-px bg-neutral-900 pointer-events-none"
                      aria-hidden="true"
                    />
                    {/* Rightmost Vertical Divider on last item */}
                    {idx === familyCompanies.length - 1 && (
                      <span
                        className="hidden md:block absolute right-0 top-5 bottom-5 w-px bg-neutral-900 pointer-events-none"
                        aria-hidden="true"
                      />
                    )}
                    <Link
                      href={`/company?tab=${idx}`}
                      className="group relative z-10 hover:z-20 w-full p-3.5 md:py-10 md:px-4 flex flex-row md:flex-col items-center text-left md:text-center gap-3.5 md:gap-0 transition-all duration-300 border-2 border-transparent hover:border-neutral-900 hover:bg-white md:hover:scale-[1.03] rounded-xl"
                    >
                      <div className="relative w-12 h-12 md:w-20 md:h-20 md:mb-4 flex-shrink-0">
                        <img
                          src={encodeURI(`${ASSET}/${company.img}`)}
                          alt={company.name[language]}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0 md:flex-none">
                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-neutral-900 mb-0.5 md:mb-1 tracking-tight">
                          {company.name[language]}
                        </h3>
                        <p className="text-xs text-neutral-500 font-medium md:mb-4 leading-snug md:whitespace-nowrap">
                          {company.desc[language]}
                        </p>
                      </div>
                      <span className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200 group-hover:text-neutral-900 flex items-center justify-center transition-colors duration-300 pointer-events-none flex-shrink-0">
                        <ArrowRight size={15} />
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <Footer />
          </motion.div>

          <motion.footer
            style={{ opacity: logoOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-neutral-400 z-10 pointer-events-none"
          >
            <span className="text-[11px] font-bold uppercase tracking-widest opacity-60">Scroll</span>
            <ChevronDown size={18} className="animate-bounce opacity-60" />
          </motion.footer>
        </div>
      </section>
    </div>
  );
}

