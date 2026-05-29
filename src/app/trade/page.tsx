"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { 
  Globe, 
  Handshake, 
  ArrowRight, 
  CheckCircle2, 
  ClipboardCheck, 
  FileText, 
  MessageSquare, 
  Ship, 
  Warehouse, 
  Package 
} from "lucide-react";

const APPLE_EASE = [0.32, 0.72, 0, 1];
const ASSET = "/assets/images";

const steps = [
  {
    num: "01",
    title: "비즈니스 상담",
    subTitle: "Consulting & Planning",
    desc: "고객사의 사업 목적에 최적화된 맞춤형 무역 솔루션 제안",
    icon: MessageSquare,
  },
  {
    num: "02",
    title: "계약 및 소싱",
    subTitle: "Agreement & Sourcing",
    desc: "안정적인 글로벌 공급선 발굴, 최적 단가 및 계약 조건 매칭",
    icon: Handshake,
  },
  {
    num: "03",
    title: "통관 및 서류 준비",
    subTitle: "Customs Clearance",
    desc: "신속한 인허가 취득, 원산지 증명 및 철저한 무역 행정 대행",
    icon: ClipboardCheck,
  },
  {
    num: "04",
    title: "국제 운송",
    subTitle: "International Transport",
    desc: "해상·항공 포워딩 연계를 통한 비용 효율적 최적 경로 설계",
    icon: Ship,
  },
  {
    num: "05",
    title: "자체 물류 연계",
    subTitle: "Integrated Logistics",
    desc: "당사 소유 보세물류창고와 연동하여 보관 및 즉각적인 가공 처리",
    icon: Warehouse,
  },
  {
    num: "06",
    title: "최종 인도",
    subTitle: "Final Delivery",
    desc: "목적지까지 무결점 품질 상태 유지로 신속·안전하게 최종 인도",
    icon: Package,
  },
];

export default function TradePage() {
  const [activeSection, setActiveSection] = useState("export-import");

  // Track scroll section for Sticky Sub-Navigation
  useEffect(() => {
    const sections = ["export-import", "agency"];
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
              { id: "export-import", label: "사업소개" },
              { id: "agency", label: "수출입 업무 대행" },
              { id: "market", label: "브랜드 소개" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === "market") {
                    window.location.href = "/brand";
                    return;
                  }
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

        {/* ─── 1. 무역사업 소개 (#export-import) ─── */}
        <section id="export-import" className="pt-16 pb-20 px-6 md:px-10 bg-neutral-50 scroll-mt-20">
          <div className="max-w-[1300px] mx-auto">
            {/* Title Section - Re-designed to elegant 2-column side-by-side layout to save vertical space */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 pb-8 border-b border-neutral-200/40 w-full"
            >
              <div className="lg:col-span-5 text-left">
                <h2 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tight mb-2">어센틱 코리아</h2>
                <p className="text-sm md:text-base font-black text-[#FF6A00] tracking-widest uppercase">Authentic Korea</p>
              </div>
              <div className="lg:col-span-7 text-left">
                <p className="text-sm md:text-base text-neutral-600 font-semibold leading-relaxed">
                  탄탄한 물류 인프라를 바탕으로, 전 세계의 가치 있는 자원과 상품을 발굴하고 연결하는 수출입회사입니다.<br />우리는 단순한 중개를 넘어, 지구와 공동체에 이로운 흐름을 만드는 무역의 새로운 패러다임을 지향합니다.
                </p>
              </div>
            </motion.div>

            {/* 3 Pillars Alternating Layout */}
            <div className="space-y-10">
              {[
                {
                  title: "Conscious Cycle",
                  subTitle: "의식 있는 순환",
                  desc: "우리는 대량 생산의 결과물보다 작은 공방의 정성이 깃든 제품, 그리고 자연을 생각하며 가꾼 유기농 식재료의 가치를 믿습니다. 깨끗한 환경과 더 나은 공동체를 위해 노력하는 생산자들의 진심을 수입하고, 그들의 철학이 한국 시장에 온전히 전달될 수 있도록 응원합니다.",
                  img: "trade_conscious.png",
                  isRightImage: true,
                },
                {
                  title: "Sustainable Supply & Resources",
                  subTitle: "지속 가능한 자원과 산업",
                  desc: "우리의 책임감은 산업의 기반이 되는 원자료와 자원 무역에서도 이어집니다. 친환경·고효율 산업재와 친환경 제조 연계, 자원 수입 및 다각적인 연계무역을 통해 산업 현장에 안정적이고 지속 가능한 공급망을 제공합니다. 환경에 미치는 영향을 최소화하는 자원 순환형 비즈니스로 산업의 미래를 함께 다집니다.",
                  img: "trade_sustainable.png",
                  isRightImage: false,
                },
                {
                  title: "Cultural Bridge",
                  subTitle: "문화적 교량",
                  desc: "우리의 시선은 안에서 밖으로도 향합니다. 유행에 휩쓸리지 않고 한국 고유의 미학을 담아낸 자체 디자인 제품부터, 각 지역의 풍토가 빚어낸 지역 특산품 및 K-푸드를 통해 우리 문화의 정수를 세계 시장에 알리고 있습니다.",
                  img: "trade_cultural.png",
                  isRightImage: true,
                },
              ].map((pillar, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-[40px] border border-neutral-100 p-6 md:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                  {/* Text Block */}
                  <div className={`lg:col-span-8 flex flex-col justify-center ${pillar.isRightImage ? "" : "lg:order-last"}`}>
                    <div>
                      <h4 className="text-xl md:text-2xl font-black text-[#FF6A00] mb-1">
                        {pillar.title}
                      </h4>
                      <p className="text-[12px] font-black text-neutral-400 uppercase tracking-widest mb-6">
                        ({pillar.subTitle})
                      </p>
                      <p className="text-sm md:text-base font-semibold text-neutral-600 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>

                  {/* Image Block */}
                  <div className="lg:col-span-4 relative h-[180px] md:h-[220px] rounded-[30px] overflow-hidden shadow-sm border border-neutral-100 group">
                    <Image 
                      src={`${ASSET}/${pillar.img}`} 
                      alt={pillar.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Closing statement callout */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 bg-neutral-100 rounded-[32px] p-8 md:p-10 text-center max-w-4xl mx-auto border border-neutral-200/30 shadow-sm"
            >
              <p className="text-sm md:text-base font-black text-neutral-800 leading-relaxed">
                <span className="text-[#FF6A00]">어센틱코리아</span>는 소비재에서 산업재에 이르기까지,<br className="sm:hidden" /> 시간이 흘러도 변하지 않는 <span className="underline decoration-[#FF6A00] decoration-2 underline-offset-4">'진정한 가치'</span>를 전하는 가교가 되겠습니다.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── 2. 수출입 업무 대행 (#agency) ─── */}
        <section id="agency" className="py-32 px-6 md:px-10 bg-white border-y border-neutral-100 scroll-mt-20">
          <div className="max-w-[1400px] mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20 max-w-3xl mx-auto"
            >
              <span className="text-[#FF6A00] font-black tracking-widest text-xs uppercase mb-3 block">Export · Import Agency Service</span>
              <h2 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tight mb-4">
                수출입 대행 서비스 <span className="text-[#FF6A00]">프로세스</span>
              </h2>
              <p className="text-base md:text-lg text-neutral-500 font-bold">
                물류를 아는 전문가가 제안하는 가장 효율적인 무역 솔루션
              </p>
            </motion.div>

            {/* Unified Process Timeline Container */}
            <div className="bg-neutral-50/80 border border-neutral-100 rounded-[48px] p-8 md:p-12 lg:p-16 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 relative">
                {steps.map((item, idx) => {
                  const StepIcon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="relative flex flex-col items-center"
                    >
                      {/* Step Card */}
                      <div className="w-full bg-white border border-neutral-100 hover:border-[#FF6A00]/20 rounded-[32px] p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 group shadow-sm shadow-neutral-100/50">
                        
                        {/* Step Number */}
                        <span className="text-xl font-black text-[#FF6A00] mb-1">{item.num}</span>
                        
                        {/* Step Title & Subtitle */}
                        <h4 className="text-base font-black text-neutral-950 mb-0.5 group-hover:text-[#FF6A00] transition-colors">{item.title}</h4>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-6">{item.subTitle}</p>
                        
                        {/* Circular Icon Container */}
                        <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#FF6A00]/30 flex items-center justify-center p-1.5 transition-all duration-500 group-hover:border-solid group-hover:border-[#FF6A00] group-hover:rotate-6 bg-white mb-6 shadow-sm">
                          <div className="w-full h-full rounded-full bg-[#FFF5EF] text-[#FF6A00] flex items-center justify-center">
                            <StepIcon size={28} strokeWidth={1.8} />
                          </div>
                        </div>

                        {/* Step Description */}
                        <p className="text-xs font-semibold text-neutral-500 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      {/* Timeline Connector Chevron */}
                      {idx < 5 && (
                        <div className="hidden xl:flex absolute top-1/2 -right-3.5 -translate-y-1/2 translate-x-1/2 w-7 h-7 rounded-full bg-white border border-neutral-100 shadow-sm items-center justify-center text-neutral-400 z-10 animate-pulse">
                          <ArrowRight size={12} strokeWidth={3} className="text-[#FF6A00]" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
