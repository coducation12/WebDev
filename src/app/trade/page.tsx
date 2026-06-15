"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
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

const getSteps = (language: "ko" | "en") => [
  {
    num: "01",
    title: language === "ko" ? "비즈니스 상담" : "Business Consulting",
    subTitle: "Consulting & Planning",
    desc: language === "ko" ? "고객사의 사업 목적에 최적화된 맞춤형 무역 솔루션 제안" : "Proposing customized trade solutions optimized for client's business goals",
    icon: MessageSquare,
  },
  {
    num: "02",
    title: language === "ko" ? "계약 및 소싱" : "Contract & Sourcing",
    subTitle: "Agreement & Sourcing",
    desc: language === "ko" ? "안정적인 글로벌 공급선 발굴, 최적 단가 및 계약 조건 매칭" : "Identifying stable global supply lines, matching optimal unit prices and contract terms",
    icon: Handshake,
  },
  {
    num: "03",
    title: language === "ko" ? "통관 및 서류 준비" : "Customs Clearance & Documentation",
    subTitle: "Customs Clearance",
    desc: language === "ko" ? "신속한 인허가 취득, 원산지 증명 및 철저한 무역 행정 대행" : "Acquiring rapid approvals, handling certificate of origin, and comprehensive trade administration",
    icon: ClipboardCheck,
  },
  {
    num: "04",
    title: language === "ko" ? "국제 운송" : "International Transport",
    subTitle: "International Transport",
    desc: language === "ko" ? "해상·항공 포워딩 연계를 통한 비용 효율적 최적 경로 설계" : "Designing cost-effective optimal routes through maritime and air forwarding linkage",
    icon: Ship,
  },
  {
    num: "05",
    title: language === "ko" ? "자체 물류 연계" : "Integrated Logistics Link",
    subTitle: "Integrated Logistics",
    desc: language === "ko" ? "당사 소유 보세물류창고와 연동하여 보관 및 즉각적인 가공 처리" : "Linking with our own bonded logistics warehouse for storage and immediate processing",
    icon: Warehouse,
  },
  {
    num: "06",
    title: language === "ko" ? "최종 인도" : "Final Delivery",
    subTitle: "Final Delivery",
    desc: language === "ko" ? "목적지까지 무결점 품질 상태 유지로 신속·안전하게 최종 인도" : "Delivering quickly and safely while maintaining flawless quality status to the destination",
    icon: Package,
  },
];

export default function TradePage() {
  const { language } = useLanguage();
  const steps = getSteps(language);
  const [activeSection, setActiveSection] = useState("export-import");
  const [activeTab, setActiveTab] = useState(0);

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
    <div className="bg-white text-black font-sans min-h-screen flex flex-col selection:bg-[#FF6A00] selection:text-white">
      <Header />

      {/* ─── Sticky Sub-Navigation Bar ─── */}
      <div className="hidden md:block sticky top-[64px] z-40 bg-white/95 backdrop-blur-xl border-b border-neutral-100 py-2.5 shadow-sm transition-all mt-[88px]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10 flex justify-center overflow-x-auto scrollbar-none">
          <div className="flex gap-2 sm:gap-4 md:gap-6 whitespace-nowrap">
            {[
              { id: "export-import", label: language === "ko" ? "사업소개" : "Overview" },
              { id: "agency", label: language === "ko" ? "수출입 업무 대행" : "Import & Export Agency" },
              { id: "market", label: language === "ko" ? "브랜드 소개" : "Brand Introduction" },
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
                    ? "bg-[#FF6A00] text-white shadow-lg shadow-[#FF6A00]/15"
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
        <section id="export-import" className="pt-32 pb-20 px-6 md:px-10 bg-neutral-50 scroll-mt-20">
          <div className="max-w-[1300px] mx-auto">
            {/* Title Section - Stacked vertical layout */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-5 mb-12 pb-8 border-b border-neutral-200/40 w-full text-left"
            >
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tight mb-2">
                  {language === "ko" ? "어센틱 코리아" : "Authentic Korea"}
                </h2>
                <p className="text-sm md:text-base font-black text-[#FF6A00] tracking-widest uppercase">Authentic Korea</p>
              </div>
              <div className="max-w-4xl">
                <p className="text-sm md:text-base text-neutral-600 font-semibold leading-relaxed text-pretty">
                  {language === "ko" ? (
                    <>탄탄한 물류 인프라를 바탕으로, 전 세계의 가치 있는 자원과 상품을 발굴하고 연결하는 수출입회사입니다.<br />우리는 단순한 중개를 넘어, 지구와 공동체에 이로운 흐름을 만드는 무역의 새로운 패러다임을 지향합니다.</>
                  ) : (
                    <>Based on a solid logistics infrastructure, we are an import/export company connecting valuable resources and products worldwide.<br />Beyond simple brokerage, we aim for a new trade paradigm that benefits both the planet and our communities.</>
                  )}
                </p>
              </div>
            </motion.div>

            {/* 3 Pillars Signature representative layout (Option 1: Hero Hub) */}
            {(() => {
              const pillars = [
                {
                  num: "01",
                  title: "Conscious Cycle",
                  subTitle: language === "ko" ? "의식 있는 순환" : "Conscious Cycle",
                  desc: language === "ko"
                    ? "우리는 대량 생산의 결과물보다 작은 공방의 정성이 깃든 제품, 그리고 자연을 생각하며 가꾼 유기농 식재료의 가치를 믿습니다. 깨끗한 환경과 더 나은 공동체를 위해 노력하는 생산자들의 진심을 수입하고, 그들의 철학이 한국 시장에 온전히 전달될 수 있도록 응원합니다."
                    : "We believe in the value of products crafted with care in small workshops over mass-produced goods, as well as organic ingredients grown with nature in mind. We import the sincerity of producers who strive for a clean environment and better communities, and support their philosophy to be fully conveyed to the Korean market.",
                },
                {
                  num: "02",
                  title: "Sustainable Supply & Resources",
                  subTitle: language === "ko" ? "지속 가능한 자원과 산업" : "Sustainable Supply & Resources",
                  desc: language === "ko"
                    ? "우리의 책임감은 산업의 기반이 되는 원재료와 자원 무역에서도 이어집니다. 친환경·고효율 산업재와 친환경 제조 연계, 자원 수입 및 다각적인 연계무역을 통해 산업 현장에 안정적이고 지속 가능한 공급망을 제공합니다. 환경에 미치는 영향을 최소화하는 자원 순환형 비즈니스로 산업의 미래를 함께 다집니다."
                    : "Our responsibility continues in raw materials and resource trade, which form the foundation of industry. We provide stable and sustainable supply chains to industrial sites through eco-friendly/high-efficiency industrial goods, green manufacturing partnerships, resource imports, and diversified trade linkages. We build the future of industry together with resource-recycling businesses that minimize environmental impact.",
                },
                {
                  num: "03",
                  title: "Cultural Bridge",
                  subTitle: language === "ko" ? "문화적 교량" : "Cultural Bridge",
                  desc: language === "ko"
                    ? "우리의 시선은 안에서 밖으로도 향합니다. 유행에 휩쓸리지 않고 한국 고유의 미학을 담아낸 자체 디자인 제품부터, 각 지역의 풍토가 빚어낸 지역 특산품 및 K-푸드를 통해 우리 문화의 정수를 세계 시장에 알리고 있습니다."
                    : "Our vision also extends outward. From our own design products reflecting Korea's unique aesthetics without chasing trends, to regional specialties and K-food shaped by local climates, we introduce the essence of Korean culture to the global market.",
                },
              ];
              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
                  {/* Left Column: Single Signature representative image */}
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:col-span-5 relative min-h-[350px] lg:min-h-full rounded-[40px] overflow-hidden shadow-sm border border-neutral-100/50 group"
                  >
                    <Image
                      src={`${ASSET}/extra_9.jpg`}
                      alt="Authentic Korea Signature Visual"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
                  </motion.div>

                  {/* Right Column: 3-tier Value Hub list */}
                  <div className="lg:col-span-7 flex flex-col justify-between gap-12">
                    {pillars.map((pillar, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.08 }}
                        className="text-left flex gap-5 md:gap-6 items-start"
                      >
                        {/* Number Index Circle */}
                        <div className="w-11 h-11 rounded-full bg-[#FFF5EF] text-[#FF6A00] flex items-center justify-center font-black text-sm flex-shrink-0 mt-0.5 shadow-sm">
                          {pillar.num}
                        </div>

                        <div>
                          {/* Title & Korean Subtitle */}
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <h4 className="text-xl md:text-[23px] font-black text-neutral-900 tracking-tight leading-tight">
                              {pillar.title.includes("&") ? (
                                <>
                                  {pillar.title.split("&")[0]}
                                  <span className="font-sans font-normal">&amp;</span>
                                  {pillar.title.split("&")[1]}
                                </>
                              ) : (
                                pillar.title
                              )}
                            </h4>
                            <span className="text-[12px] font-black text-[#FF6A00] uppercase tracking-widest leading-none">
                              ({pillar.subTitle})
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-sm sm:text-[15px] font-medium text-neutral-600 leading-relaxed mt-3 break-keep">
                            {pillar.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Closing statement callout */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 bg-neutral-100 rounded-[32px] p-8 md:p-10 text-center max-w-4xl mx-auto border border-neutral-200/30 shadow-sm"
            >
              <p className="text-sm md:text-base font-black text-neutral-800 leading-relaxed">
                {language === "ko" ? (
                  <>
                    <span className="text-[#FF6A00]">어센틱코리아</span>는 소비재에서 산업재에 이르기까지,<br className="sm:hidden" /> 시간이 흘러도 변하지 않는 <span className="underline decoration-[#FF6A00] decoration-2 underline-offset-4">'진정한 가치'</span>를 전하는 가교가 되겠습니다.
                  </>
                ) : (
                  <>
                    <span className="text-[#FF6A00]">Authentic Korea</span> will serve as a bridge to deliver <span className="underline decoration-[#FF6A00] decoration-2 underline-offset-4">'true value'</span> that remains unchanged over time, spanning from consumer goods to industrial materials.
                  </>
                )}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── 2. 수출입 업무 대행 (#agency) ─── */}
        <section id="agency" className="py-36 px-6 md:px-10 bg-white border-y border-neutral-100 scroll-mt-20">
          <div className="max-w-[1400px] mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24 max-w-3xl mx-auto"
            >
              <span className="text-[#FF6A00] font-black tracking-widest text-xs uppercase mb-3 block">Export · Import Agency Service</span>
              <h2 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tight mb-4">
                {language === "ko" ? (
                  <>수출입 대행 서비스 <span className="text-[#FF6A00]">프로세스</span></>
                ) : (
                  <>Export & Import Agency <span className="text-[#FF6A00]">Process</span></>
                )}
              </h2>
              <p className="text-base md:text-lg text-neutral-500 font-bold">
                {language === "ko" ? "물류를 아는 전문가가 제안하는 가장 효율적인 무역 솔루션" : "The most efficient trade solutions proposed by experts who understand logistics"}
              </p>
            </motion.div>

            {/* Process Timeline Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 relative">
              {steps.map((item, idx) => {
                const StepIcon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="relative flex flex-col items-center h-full"
                  >
                    {/* Step Card */}
                    <div className="w-full h-full bg-neutral-50 hover:bg-white border border-neutral-100/60 hover:border-[#FF6A00]/25 rounded-[24px] sm:rounded-[32px] p-4 sm:p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 group shadow-sm">
                      {/* Step Number */}
                      <span className="text-sm sm:text-xl font-black text-[#FF6A00] mb-0.5 sm:mb-1">{item.num}</span>
                      
                      {/* Step Title & Subtitle */}
                      <h4 className={`text-[13px] sm:text-base font-black text-neutral-950 group-hover:text-[#FF6A00] transition-colors ${language === "ko" ? "mb-0.5" : "mb-3 sm:mb-6"}`}>{item.title}</h4>
                      {language === "ko" && (
                        <p className="text-[9px] sm:text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-3 sm:mb-6">{item.subTitle}</p>
                      )}
                      
                      {/* Circular Icon Container */}
                      <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-[#FF6A00]/30 flex items-center justify-center p-1 sm:p-1.5 transition-all duration-500 group-hover:border-solid group-hover:border-[#FF6A00] group-hover:rotate-6 bg-white mt-auto shadow-sm">
                        <div className="w-full h-full rounded-full bg-[#FFF5EF] text-[#FF6A00] flex items-center justify-center">
                          <StepIcon size={16} strokeWidth={2} className="sm:hidden" />
                          <StepIcon size={28} strokeWidth={1.8} className="hidden sm:block" />
                        </div>
                      </div>
                    </div>

                    {/* Timeline Connector Chevron */}
                    {idx < 5 && (
                      <div className="hidden xl:flex absolute top-1/2 -right-3.5 -translate-y-1/2 translate-x-1/2 w-7 h-7 rounded-full bg-white border border-neutral-100 shadow-sm items-center justify-center text-neutral-400 z-10">
                        <ArrowRight size={12} strokeWidth={3} className="text-[#FF6A00]" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
