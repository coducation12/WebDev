"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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

  return (
    <div className="bg-white text-black font-sans selection:bg-neutral-800 selection:text-white">
      <Header />

      {/* ─── 2. Hero Section ─── */}
      <section className="relative min-h-screen bg-white flex items-center justify-center pt-24 overflow-hidden">
        <div className="w-full max-w-[1400px] px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: APPLE_EASE }}
          >
            <ServiceBento />
          </motion.div>
        </div>

      </section>

      {/* ── 물류 관련 섹션: 물류의 흐름 설계 ── */}
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

          {/* 물류→무역 플로우 바 */}
          <div className="hidden md:flex justify-center items-center gap-4 mb-16 px-10">
            <div className="flex items-center gap-3 px-8 py-4 rounded-full border-2 bg-white shadow-sm transition-all" style={{ borderColor: "#6A0DAD", color: "#6A0DAD" }}>
              <Package size={22} className="stroke-[2.5px]" />
              <span className="text-lg font-black tracking-tight">물류</span>
            </div>

            <div className="flex items-center gap-2.5 px-6">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.15, 0.7, 0.15], scale: [0.75, 1.15, 0.75] }}
                  transition={{ delay: i * 0.12, repeat: Infinity, duration: 2.1, ease: "easeInOut" }}
                  className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_rgba(106,13,173,0.2)]"
                  style={{ backgroundColor: "#6A0DAD" }}
                />
              ))}
              <motion.div animate={{ x: [0, 6, 0], opacity: [0.4, 0.8, 0.4] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
                <ArrowRight size={30} strokeWidth={2.8} style={{ color: "#6A0DAD" }} />
              </motion.div>
            </div>

            <div className="flex items-center gap-3 px-8 py-4 rounded-full border-2 bg-white shadow-sm transition-all" style={{ borderColor: "#4B0082", color: "#4B0082" }}>
              <Globe2 size={22} className="stroke-[2.5px]" />
              <span className="text-lg font-black tracking-tight">무역</span>
            </div>
          </div>

          {/* 물류 관련 3카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {[
              {
                icon: Package,
                title: "포워딩, 통관, 셔틀운송",
                desc: "광양 자유무역지역 4만 평, 보세창고 2만 평. 포워딩, 검역대행, 내륙운송까지 물류 전 과정을 자체 인프라와 장비로 직접 수행합니다.",
                img: "extra_26.jpg",
              },
              {
                icon: Cpu,
                title: "수출입 물류센터 운영",
                desc: "물류 장비 자체 설계·제조, 스마트 팩토리 운영. 4조 3교대 95명 전문 인력이 24시간 쉬지 않고 가동합니다.",
                img: "tech_hero.png",
              },
              {
                icon: Globe2,
                title: "운송 서비스",
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
                className="group relative rounded-3xl overflow-hidden border border-neutral-100 bg-white shadow-sm transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 md:h-72 overflow-hidden">
                  <Image src={`${ASSET}/${item.img}`} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />


                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <h3 className="text-xl md:text-2xl font-black text-neutral-900 mb-4">{item.title}</h3>
                  <p className="text-neutral-500 leading-relaxed text-[15px] flex-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 무역 관련 섹션: 글로벌 비즈니스 확장 ── */}
      <section className="py-40 px-6 md:px-10 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6" style={{ color: "#111827" }}>
              글로벌 시장의 가치를 발견하고, 비즈니스의 경계를 넓힙니다
            </h2>
            <p className="text-lg md:text-xl font-semibold text-neutral-500 tracking-tight max-w-4xl mx-auto leading-relaxed">
              세계를 향한 보라의 네트워크는 단순한 물류를 넘어, 성공적인 글로벌 비즈니스 파트너십을 완성합니다.
            </p>
          </div>

          {/* 물류→무역 플로우 바 (반복) */}
          <div className="hidden md:flex justify-center items-center gap-4 mb-16 px-10">
            <div className="flex items-center gap-3 px-8 py-4 rounded-full border-2 bg-white shadow-sm transition-all" style={{ borderColor: "#6A0DAD", color: "#6A0DAD" }}>
              <Package size={22} className="stroke-[2.5px]" />
              <span className="text-lg font-black tracking-tight">물류</span>
            </div>

            <div className="flex items-center gap-2.5 px-6">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.15, 0.7, 0.15], scale: [0.75, 1.15, 0.75] }}
                  transition={{ delay: i * 0.12, repeat: Infinity, duration: 2.1, ease: "easeInOut" }}
                  className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_rgba(106,13,173,0.2)]"
                  style={{ backgroundColor: "#6A0DAD" }}
                />
              ))}
              <motion.div animate={{ x: [0, 6, 0], opacity: [0.4, 0.8, 0.4] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
                <ArrowRight size={30} strokeWidth={2.8} style={{ color: "#6A0DAD" }} />
              </motion.div>
            </div>

            <div className="flex items-center gap-3 px-8 py-4 rounded-full border-2 bg-white shadow-sm transition-all" style={{ borderColor: "#4B0082", color: "#4B0082" }}>
              <Globe2 size={22} className="stroke-[2.5px]" />
              <span className="text-lg font-black tracking-tight">무역</span>
            </div>
          </div>

          {/* 무역 관련 3카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {[
              {
                icon: Ship,
                title: "해외 제품 수입",
                desc: "유럽 및 아시아 전역의 검증된 프리미엄 제품을 발굴하고, 보라만의 안정적인 물류망을 통해 신속하고 정확하게 국내로 수입합니다.",
                img: "extra_25.jpg",
              },
              {
                icon: Globe,
                title: "K-Food 글로벌 수출",
                desc: "K-Food와 K-Culture의 경쟁력을 전 세계 시장에 알리며, 해외 판로 개척부터 수출 물류까지 통합 솔루션을 제공합니다.",
                img: "extra_13.jpg",
              },
              {
                icon: ArrowUpRight,
                title: "수출입 대행 서비스",
                desc: "복잡한 무역 절차와 서류 작업을 대행하며, 고객사가 오직 비즈니스 성장에만 집중할 수 있도록 최적화된 무역 환경을 구축합니다.",
                img: "extra_35.png",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.7 }}
                className="group relative rounded-3xl overflow-hidden border border-neutral-100 bg-white shadow-sm transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 md:h-72 overflow-hidden">
                  <Image src={`${ASSET}/${item.img}`} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />


                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <h3 className="text-xl md:text-2xl font-black text-neutral-900 mb-4">{item.title}</h3>
                  <p className="text-neutral-500 leading-relaxed text-[15px] flex-1">{item.desc}</p>
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
                name: "RE&UP", 
                desc: "재생에너지 · 업사이클", 
                detail: "태양광, 풍력 발전 자재 특수 물류와 친환경 재생 사업을 통해 지속 가능한 미래를 만듭니다.",
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
