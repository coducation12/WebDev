"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { useState, useRef, useLayoutEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Plus, Minus } from "lucide-react";

type ServiceKey = "forwarding" | "warehouse" | "transport";

function LogisticsContent() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get("section");
  const initialSection =
    sectionParam === "integrated-service" || sectionParam === "equipment" ? sectionParam : "infra";

  const [activeSection, setActiveSection] = useState(initialSection);
  const [openService, setOpenService] = useState<ServiceKey | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Stage 1: 물류 인프라
  const infraOpacity = useTransform(smoothProgress, [0, 0.28, 0.36], [1, 1, 0]);
  const infraY = useTransform(smoothProgress, [0.28, 0.36], [0, -30]);
  const infraPointer = useTransform(smoothProgress, (v) => (v <= 0.33 ? "auto" : "none"));

  // Stage 2: 통합 물류 서비스
  const serviceOpacity = useTransform(smoothProgress, [0.32, 0.40, 0.62, 0.70], [0, 1, 1, 0]);
  const serviceY = useTransform(smoothProgress, [0.32, 0.40, 0.62, 0.70], [30, 0, 0, -30]);
  const servicePointer = useTransform(smoothProgress, (v) => (v > 0.33 && v <= 0.67 ? "auto" : "none"));

  // Stage 3: 물류기기 개발 및 제작 + Footer
  const equipOpacity = useTransform(smoothProgress, [0.66, 0.74], [0, 1]);
  const equipY = useTransform(smoothProgress, [0.66, 0.74], [30, 0]);
  const equipPointer = useTransform(smoothProgress, (v) => (v > 0.67 ? "auto" : "none"));

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest <= 0.33) setActiveSection("infra");
    else if (latest <= 0.67) setActiveSection("integrated-service");
    else setActiveSection("equipment");
  });

  const scrollToStage = (id: string, instant = false) => {
    if (!containerRef.current) return;
    const top = containerRef.current.offsetTop;
    const maxScroll = containerRef.current.scrollHeight - window.innerHeight;
    const ratio = id === "infra" ? 0 : id === "integrated-service" ? 0.5 : 0.95;
    if (instant) {
      window.scrollTo({ top: top + maxScroll * ratio, behavior: "instant" });
      scrollYProgress.jump(ratio);
      smoothProgress.jump(ratio);
      requestAnimationFrame(() => {
        scrollYProgress.jump(ratio);
        smoothProgress.jump(ratio);
      });
      setActiveSection(id);
    } else {
      window.scrollTo({ top: top + maxScroll * ratio, behavior: "smooth" });
    }
  };

  useLayoutEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    const target = sectionParam || hash;
    if (target === "infra" || target === "integrated-service" || target === "equipment") {
      scrollToStage(target, true);
    }
  }, [sectionParam]);

  const infraCards = [
    {
      type: "image" as const,
      img: "/assets/images/active/company_bora_logis_v2.jpg",
      top: language === "ko" ? "광양항\n자유무역지역에 위치" : "Located in\nGwangyang FTZ",
      main: language === "ko" ? "전략적 거점" : "Strategic Hub",
      bottom: "",
    },
    {
      type: "solid" as const,
      top: language === "ko" ? "화주별 독립 보관이 가능한" : "Independent Storage per Shipper",
      main: language === "ko" ? "아파트형 창고" : "Apartment-style Warehouse",
      bottom: language === "ko" ? "300평 × 20개" : "300P × 20 Units",
    },
    {
      type: "image" as const,
      img: "/assets/images/active/infra_card_4_v2.jpg",
      top: "",
      main: language === "ko" ? "100% 정규직" : "100% Full-Time",
      bottom:
        language === "ko"
          ? "직영 인력 중심의 정기 안전\n교육 및 현장 관리"
          : "Regular safety training & site\nmanagement by direct staff",
    },
    {
      type: "solid" as const,
      top: "",
      main: "WMS/TMS",
      bottom:
        language === "ko"
          ? "운송 데이터의 실시간\n가시성 및 최적화"
          : "Real-time visibility &\noptimization of transport data",
    },
    {
      type: "solid" as const,
      top: language === "ko" ? "단일 창고 최대 규모" : "Largest Single Warehouse",
      main: language === "ko" ? "부지 52,000평\n창고 20,000평" : "Site 52,000P\nWarehouse 20,000P",
      bottom: "",
    },
    {
      type: "image" as const,
      img: "/assets/images/extra_1.jpg",
      top: language === "ko" ? "자체 항만 하역 시스템 및" : "In-house Port Handling &",
      main: language === "ko" ? "대형 운송 장비 보유" : "Heavy Transport Fleet",
      bottom: "",
    },
    {
      type: "solid" as const,
      top: "",
      main: language === "ko" ? "CCTV 24시간" : "24/7 CCTV",
      bottom: language === "ko" ? "보안 및 모니터링 관리" : "Security & Monitoring Control",
    },
    {
      type: "image" as const,
      img: "/assets/images/active/company_bora_trans_v3.jpg",
      top: language === "ko" ? "항만과 내륙을 연결하는\n신속하고 안정적인 전국" : "Fast & Reliable Nationwide",
      main: language === "ko" ? "운송 네트워크" : "Transport Network",
      bottom: "",
    },
  ];

  const integratedServices: Array<{
    key: ServiceKey;
    title: string;
    summary: string;
    items: Array<{ name: string; detail: string }>;
  }> = [
    {
      key: "forwarding",
      title: language === "ko" ? "포워딩, 통관, 검역" : "Forwarding, Customs & Quarantine",
      summary:
        language === "ko"
          ? "최적의 스케줄과 운임 제안부터 신속·정확한 수출입 통관·검역 대행까지 원스톱으로 지원합니다."
          : "One-stop support from optimal schedule & freight proposals to rapid customs & quarantine agency.",
      items: [
        {
          name: language === "ko" ? "글로벌 포워딩" : "Global Forwarding",
          detail:
            language === "ko"
              ? "화물 특성에 맞는 최적의 해상·항공 스케줄과 경쟁력 있는 운임을 제안합니다."
              : "Proposing optimal sea/air schedules and competitive freight rates.",
        },
        {
          name: language === "ko" ? "수출입 통관·검역" : "Customs & Quarantine",
          detail:
            language === "ko"
              ? "복잡한 관세 행정과 동식물 검역 절차를 신속하고 정확하게 대행합니다."
              : "Handling complex customs administration and quarantine procedures accurately.",
        },
      ],
    },
    {
      key: "warehouse",
      title: language === "ko" ? "수출입 물류창고 운영" : "Import/Export Warehouse Operations",
      summary:
        language === "ko"
          ? "WMS 실시간 재고 관리로 3PL 및 수출입 물류 전반을 위탁 운영하며, 제조 원자재부터 부자재까지 적시 공급망을 제공합니다."
          : "Consigned 3PL and import/export logistics operations with real-time WMS inventory management.",
      items: [
        {
          name: language === "ko" ? "상하·차 / 입·출고" : "Loading / Inbound & Outbound",
          detail:
            language === "ko"
              ? "적재·하역 작업 수행, 컨테이너라이싱 등"
              : "Loading/unloading operations and containerizing",
        },
        {
          name: language === "ko" ? "검수" : "Inspection",
          detail:
            language === "ko"
              ? "입출고 시 수량·품질 점검, 불량·오배송 방지"
              : "Quantity/quality checks to prevent defects and misdelivery",
        },
        {
          name: language === "ko" ? "보관 / 재고관리" : "Storage / Inventory",
          detail:
            language === "ko"
              ? "적정재고 실현 / 온·습도 관리 / 24시간 CCTV 보안"
              : "Optimal inventory / temp & humidity control / 24h CCTV security",
        },
        {
          name: language === "ko" ? "부가가치 서비스" : "Value-added Service",
          detail:
            language === "ko"
              ? "조립, 반가공, 소포장, 라벨링 등"
              : "Assembly, semi-processing, small packaging, labeling",
        },
        {
          name: language === "ko" ? "자동화 창고 운영" : "Automated Warehouse",
          detail:
            language === "ko"
              ? "로보틱스, 자동화관리 시스템 운영"
              : "Robotics and automated management system operations",
        },
      ],
    },
    {
      key: "transport",
      title: language === "ko" ? "운송 서비스" : "Transportation Service",
      summary:
        language === "ko"
          ? "TMS 기반 효율적인 배차 진행과 운송 경로 최적화로 고객사의 물류비 절감을 실현합니다."
          : "Realizing logistics cost reduction through TMS-based dispatch and route optimization.",
      items: [
        {
          name: language === "ko" ? "셔틀 운송" : "Shuttle Transport",
          detail:
            language === "ko"
              ? "항만 <-> 보세창고 간 전용 셔틀 서비스"
              : "Dedicated shuttle service between port and bonded warehouse",
        },
        {
          name: language === "ko" ? "컨테이너 운송" : "Container Transport",
          detail:
            language === "ko"
              ? "최적 배차·경로설계로 비용, 시간 절감"
              : "Cost and time savings via optimal dispatch & routing",
        },
        {
          name: language === "ko" ? "카고 운송" : "Cargo Transport",
          detail:
            language === "ko"
              ? "팔레트 벌크 화물 전용 대형 트럭"
              : "Heavy-duty trucks dedicated to pallet and bulk cargo",
        },
        {
          name: language === "ko" ? "전국 수배송" : "Nationwide Delivery",
          detail:
            language === "ko"
              ? "전국 간선망과 TMS 연동을 통한\n실시간 위치 추적 및 정시 배송 최적화"
              : "Real-time tracking and on-time delivery\nvia nationwide trunk network & TMS",
        },
      ],
    },
  ];

  const equipmentCards = [
    {
      title: language === "ko" ? "물류 기기 제작" : "Logistics Equipment Manufacturing",
      desc:
        language === "ko"
          ? "각 창고 환경에 적합한 철박스, 포장기계, 각종 물류기기를 기획·설계·제작합니다."
          : "Planning, designing, and manufacturing steel boxes, packaging machines, and logistics equipment.",
    },
    {
      title: language === "ko" ? "글로벌 협력 생산 파트너십" : "Global Production Partnership",
      desc:
        language === "ko"
          ? "중국 청도 협력업체에서 기본 작업을 진행하고 국내 율촌공장에서 조립, 용접 등 후작업을 거쳐 고품질을 완성합니다."
          : "Primary fabrication in Qingdao, China, followed by assembly and welding at our Yulchon plant in Korea.",
    },
    {
      title: language === "ko" ? "맞춤형 랙 제작 & 시공" : "Custom Rack Design & Installation",
      desc:
        language === "ko"
          ? "이동식 랙, 팔레트 랙 등 창고 공간을 최적화하고 보관 용량을 극대화하는 솔루션을 제공합니다."
          : "Providing mobile racks, pallet racks, and solutions that maximize warehouse storage capacity.",
    },
  ];

  return (
    <div className="bg-white text-black font-sans min-h-screen flex flex-col selection:bg-[#6A0DAD] selection:text-white">
      <Header />

      {/* ─── Sticky Sub-Navigation Bar ─── */}
      <div className="fixed top-[56px] md:top-[68px] left-0 w-full z-40 bg-white py-2 md:py-2.5 transition-all border-b border-neutral-100 md:border-b-0">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex justify-start sm:justify-center overflow-x-auto scrollbar-none">
          <div className="flex gap-1.5 sm:gap-4 md:gap-6 whitespace-nowrap">
            {[
              { id: "infra", label: language === "ko" ? "물류 인프라" : "Logistics Infrastructure" },
              { id: "integrated-service", label: language === "ko" ? "통합 물류 서비스" : "Integrated Logistics Service" },
              { id: "equipment", label: language === "ko" ? "물류기기 개발 및 제작" : "Logistics Equipment" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToStage(tab.id)}
                className={`px-3 md:px-5 py-1.5 md:py-2 rounded-lg text-xs sm:text-sm font-black transition-all ${
                  activeSection === tab.id
                    ? "bg-[#6A0DAD] text-white shadow-sm"
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
        <div ref={containerRef} className="relative h-[360vh] bg-white">
          <div className="sticky top-0 h-screen overflow-hidden">
            {/* ─── Stage 1. 물류 인프라 ─── */}
            <motion.div
              style={{ opacity: infraOpacity, y: infraY, pointerEvents: infraPointer }}
              className="absolute inset-0 overflow-y-auto pt-28 md:pt-32 pb-10 md:pb-12 bg-white flex flex-col justify-start md:justify-center"
            >
              <section id="infra" className="max-w-[1400px] w-full mx-auto px-6 md:px-10">
                <div className="mb-5 md:mb-8">
                  <span className="text-sm md:text-base font-bold text-[#6A0DAD] block mb-1.5">
                    {language === "ko" ? "물류 사업" : "Logistics Business"}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-black tracking-tight text-neutral-900 mb-2 md:mb-3">
                    {language === "ko" ? "물류 인프라" : "Logistics Infrastructure"}
                  </h1>
                  <p className="text-base md:text-lg text-neutral-600 font-medium break-keep">
                    {language === "ko"
                      ? "직영 인력·장비 및 창고를 기반으로, 고객사별 최적화된 물류 서비스를 제공합니다."
                      : "Providing customized logistics services based on direct staff, equipment, and warehouses."}
                  </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 md:gap-4">
                  {infraCards.map((card, idx) => (
                    <div
                      key={idx}
                      className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-600 text-white flex flex-col items-center justify-center text-center p-2.5 sm:p-4 transition-all duration-300 hover:brightness-125"
                    >
                      {card.type === "image" && card.img && (
                        <>
                          <img
                            src={card.img}
                            alt={card.main}
                            className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover:brightness-75 transition-all duration-300"
                          />
                          <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors duration-300" />
                        </>
                      )}

                      <div className="relative z-10 flex flex-col items-center justify-center gap-1 sm:gap-2">
                        {card.top && (
                          <p className="text-sm md:text-base font-medium text-neutral-100 whitespace-pre-line leading-snug break-keep">
                            {card.top}
                          </p>
                        )}
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white whitespace-pre-line leading-tight break-keep">
                          {card.main}
                        </h3>
                        {card.bottom && (
                          <p className="text-sm md:text-base font-medium text-neutral-100 whitespace-pre-line leading-snug break-keep">
                            {card.bottom}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>

            {/* ─── Stage 2. 통합 물류 서비스 ─── */}
            <motion.div
              style={{ opacity: serviceOpacity, y: serviceY, pointerEvents: servicePointer }}
              className="absolute inset-0 overflow-y-auto pt-28 md:pt-32 pb-10 md:pb-12 bg-white flex flex-col justify-start md:justify-center"
            >
              <section id="integrated-service" className="max-w-[1400px] w-full mx-auto px-6 md:px-10">
                <div className="mb-5 md:mb-8">
                  <span className="text-sm md:text-base font-bold text-[#6A0DAD] block mb-1.5">
                    {language === "ko" ? "물류 사업" : "Logistics Business"}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black tracking-tight text-neutral-900 mb-2 md:mb-3">
                    {language === "ko" ? "통합 물류 서비스" : "Integrated Logistics Service"}
                  </h2>
                  <p className="text-base md:text-lg text-neutral-600 font-medium break-keep">
                    {language === "ko"
                      ? "복잡한 물류를 직영체제로 구축하여 비용과 Lead Time은 줄이고, 안정적인 밸류체인 서비스를 제공합니다."
                      : "Reducing cost and lead time with direct operations while providing stable value-chain services."}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {integratedServices.map((svc) => {
                    const isOpen = openService === svc.key;
                    return (
                      <div
                        key={svc.key}
                        className="bg-neutral-50 border border-neutral-200/70 rounded-xl overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => setOpenService(isOpen ? null : svc.key)}
                          className="w-full px-4 md:px-6 py-4 md:py-5 flex items-center justify-between text-left gap-3"
                        >
                          <div className="min-w-0">
                            <h3 className="text-xl md:text-2xl font-bold text-neutral-900">
                              {svc.title}
                            </h3>
                            <p className="text-sm md:text-base text-neutral-500 font-medium mt-1 break-keep">
                              {svc.summary}
                            </p>
                          </div>
                          <span className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 flex-shrink-0">
                            {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 md:px-6 pb-5 md:pb-6 pt-4 border-t border-neutral-200/60">
                                {svc.key === "forwarding" ? (
                                  <ul className="space-y-2 text-sm md:text-base text-neutral-700">
                                    {svc.items.map((item, idx) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <span className="font-bold text-neutral-900">·</span>
                                        <span className="break-keep">
                                          <strong className="text-neutral-900">{item.name}:</strong> {item.detail}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <div
                                    className={`grid gap-2.5 md:gap-3 ${
                                      svc.key === "warehouse"
                                        ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                                        : "grid-cols-2 lg:grid-cols-4"
                                    }`}
                                  >
                                    {svc.items.map((item, idx) => (
                                      <div
                                        key={idx}
                                        className="bg-white border border-neutral-200/70 rounded-xl p-3 md:p-4 text-center flex flex-col items-center justify-center min-h-[96px] md:min-h-[120px]"
                                      >
                                        <h4 className="text-sm md:text-base font-bold text-[#6A0DAD] mb-1.5 md:mb-2 break-keep">
                                          {item.name}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed whitespace-pre-line break-keep">
                                          {item.detail}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </section>
            </motion.div>

            {/* ─── Stage 3. 물류기기 개발 및 제작 + Footer ─── */}
            <motion.div
              style={{ opacity: equipOpacity, y: equipY, pointerEvents: equipPointer }}
              className="absolute inset-0 overflow-y-auto pt-28 md:pt-32 bg-white flex flex-col justify-between"
            >
              <section id="equipment" className="max-w-[1400px] w-full mx-auto px-6 md:px-10 pb-8 md:pb-12 md:my-auto">
                <div className="mb-6 md:mb-10">
                  <span className="text-sm md:text-base font-bold text-[#6A0DAD] block mb-1.5">
                    {language === "ko" ? "물류 사업" : "Logistics Business"}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black tracking-tight text-neutral-900 mb-2 md:mb-3">
                    {language === "ko" ? "물류기기 개발 및 제작" : "Logistics Equipment Development"}
                  </h2>
                  <p className="text-base md:text-lg text-neutral-600 font-medium break-keep">
                    {language === "ko"
                      ? "실무 운영 노하우를 바탕으로 최고의 공간 효율을 보장하는 ‘고객 맞춤형 물류기기 및 랙 시스템’을 설계, 제작합니다."
                      : "Designing and manufacturing custom logistics equipment and rack systems for maximum space efficiency."}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 md:gap-5">
                  {equipmentCards.map((card, idx) => (
                    <div
                      key={idx}
                      className="bg-neutral-50 border border-neutral-200/70 rounded-xl p-5 md:p-7 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-sm md:text-base font-bold text-[#6A0DAD] block mb-2">
                          0{idx + 1}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-2 md:mb-3 tracking-tight">
                          {card.title}
                        </h3>
                        <p className="text-base md:text-lg text-neutral-600 font-medium leading-relaxed break-keep">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <Footer />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function LogisticsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <LogisticsContent />
    </Suspense>
  );
}
