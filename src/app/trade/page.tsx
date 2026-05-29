"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Globe, RefreshCcw, Landmark, LineChart, Handshake, Compass, Lightbulb, Search } from "lucide-react";

const APPLE_EASE = [0.32, 0.72, 0, 1];
const ASSET = "/assets/images";

export default function TradePage() {
  const [activeSection, setActiveSection] = useState("export-import");

  // Track scroll section for Sticky Sub-Navigation
  useEffect(() => {
    const sections = ["export-import", "agency", "market"];
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // triggers when section dominates the viewport
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="bg-white text-black font-sans min-h-screen flex flex-col selection:bg-[#6A0DAD] selection:text-white">
      <Header />

      {/* ─── Sticky Sub-Navigation Bar ─── */}
      <div className="sticky top-[64px] z-40 bg-white/95 backdrop-blur-xl border-b border-neutral-100 py-2.5 shadow-sm transition-all mt-[88px]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10 flex justify-center overflow-x-auto scrollbar-none">
          <div className="flex gap-2 sm:gap-4 md:gap-6 whitespace-nowrap">
            {[
              { id: "export-import", label: "글로벌 수출입 서비스" },
              { id: "agency", label: "구매 및 판매대행" },
              { id: "market", label: "시장 조사 및 판로 개척" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  const el = document.getElementById(tab.id);
                  if (el) {
                    const offset = 125; // adjustment for header + subnav
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = el.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth",
                    });
                  }
                }}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all ${
                  activeSection === tab.id
                    ? "bg-[#6A0DAD] text-white shadow-lg shadow-[#6A0DAD]/15"
                    : "text-neutral-400 hover:text-neutral-800 hover:bg-neutral-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1">
        
        {/* ─── Hero Banner ─── */}
        <section className="px-6 md:px-10 pt-20 pb-16 max-w-[1400px] mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: APPLE_EASE }}
          >
            <h4 className="text-[#6A0DAD] font-bold tracking-widest text-sm mb-4 uppercase">Global Trade</h4>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter text-neutral-900 mb-6">
              국경을 넘는<br />글로벌 무역 파트너
            </h1>
            <p className="text-lg md:text-xl text-neutral-500 font-medium max-w-2xl mx-auto">
              안정적인 국제물류시스템을 기반으로 다양한 글로벌 무역 비즈니스를 지원합니다.
            </p>
          </motion.div>
        </section>

        {/* ─── 1. 글로벌 수출입 서비스 (#export-import) ─── */}
        <section id="export-import" className="py-24 px-6 md:px-10 bg-neutral-50 scroll-mt-20">
          <div className="max-w-[1400px] mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16 max-w-3xl mx-auto"
            >
              <div className="w-16 h-16 bg-[#6A0DAD] rounded-full flex items-center justify-center text-white mb-6 mx-auto shadow-lg">
                <Globe size={32} />
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">글로벌 수출입 서비스</h2>
              <p className="text-lg text-neutral-600 font-medium leading-relaxed">
                (주)어센틱코리아는 기존의 안정적인 국제물류서비스 시스템을 기반으로 성공적인 연계 무역을 추진합니다.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[40px] p-10 lg:p-14 shadow-sm border border-neutral-100 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-black mb-4">중국·동남아 중심 자원 수입</h3>
                  <p className="text-neutral-500 font-medium leading-loose mb-8">
                    현지 핵심 파트너와의 네트워크를 통해 필수 제조 자원 및 원자재를 안정적으로 소싱합니다. 물류가 결합된 원스톱 수입 솔루션으로 비용을 최소화합니다.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="px-4 py-2 bg-neutral-100 rounded-full text-sm font-bold text-neutral-600">원자재 확보</div>
                  <div className="px-4 py-2 bg-neutral-100 rounded-full text-sm font-bold text-neutral-600">공급망 안정성</div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-[#6A0DAD] rounded-[40px] p-10 lg:p-14 shadow-lg text-white flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-black mb-4">K-Culture & K-Food 수출</h3>
                  <p className="text-white/80 font-medium leading-loose mb-8">
                    전 세계적으로 수요가 급증하는 K-Food와 K-Culture 관련 상품들의 해외 진출을 전폭적으로 지원합니다.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="px-4 py-2 bg-white/20 rounded-full text-sm font-bold text-white">이마트24 K-FOOD LAB</div>
                  <div className="px-4 py-2 bg-white/20 rounded-full text-sm font-bold text-white">글로벌 유통망</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── 2. 구매 및 판매대행 (#agency) ─── */}
        <section id="agency" className="py-24 px-6 md:px-10 bg-white border-y border-neutral-100 scroll-mt-20">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Handshake size={28} className="text-[#6A0DAD]" />
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter">구매 및 판매대행 서비스</h2>
              </div>
              <p className="text-lg text-neutral-600 font-medium mb-10 leading-relaxed">
                복잡한 무역 절차와 서류 작업에 시간을 뺏기지 마세요. 어센틱코리아가 전문가의 노하우로 번거로운 과정을 모두 대행하며, 오직 비즈니스 성장에만 집중할 수 있는 환경을 제공합니다.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
                  <Landmark size={24} className="text-[#BC90C1] mb-4" />
                  <h4 className="font-bold text-neutral-900 mb-2">통관 및 서류 대행</h4>
                  <p className="text-sm text-neutral-500">세관 규정, 원산지 증명 등 필수 무역 서류의 신속한 발급 및 처리</p>
                </div>
                <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
                  <RefreshCcw size={24} className="text-[#BC90C1] mb-4" />
                  <h4 className="font-bold text-neutral-900 mb-2">유통 채널 최적화</h4>
                  <p className="text-sm text-neutral-500">현지 공급망 관리를 통한 구매/판매 사이클 단축 및 비용 최소화</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[400px] lg:h-[600px] rounded-[40px] overflow-hidden bg-neutral-100"
            >
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="relative w-full h-full max-w-md mx-auto drop-shadow-2xl">
                   <Image src={`${ASSET}/trade_agency_new.png`} alt="Sales Agency" fill className="object-contain" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── 3. 시장 조사 및 판로 개척 (#market) ─── */}
        <section id="market" className="py-24 px-6 md:px-10 bg-neutral-900 text-white scroll-mt-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1 relative h-[300px] lg:h-[500px]"
              >
                <Image src={`${ASSET}/trade_market_new.png`} alt="Market Research" fill className="object-contain drop-shadow-[0_0_30px_rgba(188,144,193,0.3)]" />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Compass size={28} className="text-[#BC90C1]" />
                  <h2 className="text-3xl md:text-4xl font-black tracking-tighter">시장 조사 및 판로 개척</h2>
                </div>
                <p className="text-lg text-white/70 font-medium mb-12 leading-relaxed">
                  성공적인 해외 진출을 위해서는 정확한 시장 분석이 필수적입니다. 글로벌 네트워크를 바탕으로 진출 대상 국가의 트렌드를 분석하고 맞춤형 판로를 설계합니다.
                </p>

                <div className="space-y-8">
                  <div className="flex gap-5 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Search size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">현지 트렌드 분석</h4>
                      <p className="text-white/60">소비자 동향, 경쟁사 분석 및 규제 환경 조사를 통해 안전한 진입 전략 수립</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-5 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-[#BC90C1]/20 flex items-center justify-center flex-shrink-0">
                      <LineChart size={20} className="text-[#BC90C1]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">판로 확보 및 바이어 매칭</h4>
                      <p className="text-white/60">현지 유력 바이어 발굴 및 유통망 매칭을 통한 실질적인 수출 성과 창출</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-5 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-[#6A0DAD]/30 flex items-center justify-center flex-shrink-0">
                      <Lightbulb size={20} className="text-[#BC90C1]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">비즈니스 컨설팅</h4>
                      <p className="text-white/60">장기적인 성장 동력 확보를 위한 맞춤형 무역 전략 컨설팅 지원</p>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
