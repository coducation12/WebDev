"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Ship, 
  Truck, 
  Package, 
  Factory, 
  ShieldCheck, 
  Cog, 
  Shield, 
  Network, 
  ChevronDown, 
  Globe2, 
  ClipboardCheck, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Warehouse,
  FlameKindling,
  Forklift
} from "lucide-react";

const APPLE_EASE = [0.32, 0.72, 0, 1];
const ASSET = "/assets/images";

const getSteps = (language: "ko" | "en") => [
  {
    step: "01",
    title: language === "ko" ? "화물 입고" : "Cargo Receiving",
    desc: language === "ko" ? "수출입 화물 터미널로부터 화물을 안전하게 반입" : "Safe receipt of cargo from import/export terminals",
    img: "active/logistics_process_receiving_v6.jpg",
    icon: Truck,
  },
  {
    step: "02",
    title: language === "ko" ? "상·하차 및 하역" : "Loading, Unloading & Handling",
    desc: language === "ko" ? "컨테이너 라이싱 및 전문 인력을 통한 안정적인 적재·하역" : "Stable loading and unloading through container lashing and expert personnel",
    img: "active/logistics_process_handling_v2.jpg",
    icon: Forklift,
  },
  {
    step: "03",
    title: language === "ko" ? "검수 / 검역" : "Inspection / Quarantine",
    desc: language === "ko" ? "입출고 시 수량 및 품질 점검을 통한 오배송 방지" : "Preventing misdelivery through quantity and quality checks during inbound and outbound processes",
    img: "active/logistics_process_inspection_v2.jpg",
    icon: ClipboardCheck,
  },
  {
    step: "04",
    title: language === "ko" ? "유통가공 / 반가공" : "Value-added / Semi-processing",
    desc: language === "ko" ? "제품 조립, 반가공, 소포장 및 수출입 라벨링" : "Product assembly, semi-processing, small packaging, and import/export labeling",
    img: "distribution_processing.png",
    icon: Package,
  },
  {
    step: "05",
    title: language === "ko" ? "보관 및 재고 관리" : "Storage & Inventory Management",
    desc: language === "ko" ? "실시간 온·습도 관리 및 24시간 철저한 CCTV 보안" : "Real-time temperature & humidity control and strict 24-hour CCTV security",
    img: "2.jpg",
    icon: ShieldCheck,
  },
  {
    step: "06",
    title: language === "ko" ? "첨단 자동화 창고 운영" : "Automated Warehouse Operations",
    desc: language === "ko" ? "로보틱스 및 WMS 기반의 위탁 물류 운영" : "Consigned logistics operations based on robotics and WMS",
    img: "automated_warehouse.png",
    icon: Cog,
  },
];

export default function LogisticsPage() {
  const { language } = useLanguage();
  const steps = getSteps(language);
  const [activeSection, setActiveSection] = useState("intl-service");
  const [activeAutoStep, setActiveAutoStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  // Auto-play active highlight cycle every 3 seconds (when not hovered)
  useEffect(() => {
    if (hoveredStep !== null) return;
    const interval = setInterval(() => {
      setActiveAutoStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [hoveredStep]);

  // Track scroll section for Sticky Sub-Navigation
  useEffect(() => {
    const sections = ["intl-service", "infra", "equipment", "packaging"];
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
              { id: "intl-service", label: language === "ko" ? "국제 물류 서비스" : "International Logistics Services" },
              { id: "infra", label: language === "ko" ? "물류 인프라" : "Logistics Infrastructure" },
              { id: "equipment", label: language === "ko" ? "물류 장비 개발·제작" : "Logistics Equipment Development & Manufacturing" },
              { id: "packaging", label: language === "ko" ? "물류 전문 포장" : "Professional Packaging" },
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

        {/* ─── 1. 국제 물류 서비스 (#intl-service) ─── */}
        <section id="intl-service" className="py-28 px-6 md:px-10 bg-neutral-50 scroll-mt-36">
          <div className="max-w-[1300px] mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-14 text-left max-w-none"
            >
              <div className="flex items-center gap-4.5 justify-start mb-6">
                <div className="flex gap-[4px] items-center flex-shrink-0">
                  <span className="w-[7px] h-8 md:h-10 lg:h-11 bg-[#6A0DAD] rounded-[2px]" />
                  <span className="w-[3px] h-6 md:h-8 lg:h-9 bg-[#6A0DAD]/50 rounded-[1px]" />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-neutral-900">
                  {language === "ko" ? "국제물류서비스" : "International Logistics Services"}
                </h2>
              </div>
              <p className="text-base md:text-lg text-neutral-600 font-semibold leading-relaxed">
                {language === "ko" ? (
                  <>자체 물류 인프라와 글로벌 네트워크를 유기적으로 결합하여, 수출입 요건 확인부터 보세 보관 및 최종 운송까지 단절 없는 <strong className="text-[#6A0DAD] font-black">원스톱 솔루션</strong>을 설계합니다.</>
                ) : (
                  <>Organically combining our own logistics infrastructure and global network, we design a seamless <strong className="text-[#6A0DAD] font-black">one-stop solution</strong> from verification of import/export requirements to bonded storage and final delivery.</>
                )}
              </p>
            </motion.div>

            {/* 1) 글로벌 포워딩 & 수입 요건 확인 */}
            <div className="mb-28 pl-4 md:pl-8 lg:pl-12">
              <h3 className="text-xl md:text-2xl font-black text-neutral-900 mb-8 border-l-4 border-[#6A0DAD] pl-4">
                {language === "ko" ? (
                  <>1) 글로벌 포워딩 <span className="font-sans font-normal">&amp;</span> 수입 요건 확인</>
                ) : (
                  <>1) Global Forwarding <span className="font-sans font-normal">&amp;</span> Import Requirements Verification</>
                )}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-neutral-100/60 flex gap-6 items-start hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 bg-[#EEF2FF] rounded-2xl flex items-center justify-center text-[#2563EB] flex-shrink-0">
                    <Ship size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-[21px] font-black tracking-tight mb-1 text-neutral-900">
                      {language === "ko" ? (
                        <>포워딩<span className="font-sans font-normal">&amp;</span>국제운송</>
                      ) : (
                        <>Forwarding <span className="font-sans font-normal">&amp;</span> International Transport</>
                      )}
                    </h4>
                    <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-4">(Forwarding <span className="font-sans font-normal">&amp;</span> International Transport)</p>
                    <p className="text-neutral-600 font-semibold leading-relaxed text-[16px]">
                      {language === "ko" ? "자체 물류 인프라와 글로벌 네트워크를 연계하여 최적의 수출입 운송 경로를 설계합니다." : "We design optimal import/export transport routes by linking our own logistics infrastructure with our global network."}
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-neutral-100/60 flex gap-6 items-start hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 bg-[#ECFDF5] rounded-2xl flex items-center justify-center text-[#10B981] flex-shrink-0">
                    <ClipboardCheck size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-[21px] font-black tracking-tight mb-1 text-neutral-900">
                      {language === "ko" ? (
                        <>수출입 통관<span className="font-sans font-normal">&amp;</span>검역</>
                      ) : (
                        <>Customs Clearance <span className="font-sans font-normal">&amp;</span> Quarantine</>
                      )}
                    </h4>
                    <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-4">(Customs Clearance <span className="font-sans font-normal">&amp;</span> Quarantine)</p>
                    <p className="text-neutral-600 font-semibold leading-relaxed text-[16px]">
                      {language === "ko" ? "복잡한 관세 행정과 검역 절차를 신속하고 정확하게 대행합니다." : "We quickly and accurately handle complex customs administration and quarantine procedures."}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* 2) 보세창고 물류 프로세스 */}
            <div className="mb-28 pl-4 md:pl-8 lg:pl-12">
              <h3 className="text-xl md:text-2xl font-black text-neutral-900 mb-10 border-l-4 border-[#6A0DAD] pl-4">
                {language === "ko" ? "2) 보세창고 물류 프로세스" : "2) Bonded Warehouse Logistics Process"}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 relative">
                {steps.map((item, idx) => {
                  const StepIcon = item.icon;
                  const isHighlighted = hoveredStep !== null ? hoveredStep === idx : activeAutoStep === idx;
                  return (
                    <div 
                      key={idx}
                      className="relative h-full min-h-[360px]"
                      onMouseEnter={() => setHoveredStep(idx)}
                      onMouseLeave={() => setHoveredStep(null)}
                    >
                      {/* Card that scales & rises on hover */}
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className={`w-full h-full bg-white border rounded-[24px] transition-all duration-500 ease-out flex flex-col items-center text-center group cursor-pointer ${
                          isHighlighted 
                            ? "border-[#6A0DAD]/40 -translate-y-4 scale-[1.06] shadow-xl shadow-[#6A0DAD]/15 z-10" 
                            : "border-neutral-100 shadow-sm z-0"
                        }`}
                      >
                        {/* Flush top Image with rounded top corners */}
                        <div className="relative w-full aspect-[1/1] overflow-hidden rounded-t-[23px] flex-shrink-0">
                          <Image 
                            src={`${ASSET}/${item.img}`} 
                            alt={item.title} 
                            fill 
                            className={`object-cover transition-transform duration-700 ${
                              isHighlighted ? "scale-105" : "scale-100"
                            }`} 
                          />
                          <div className={`absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shadow-md transition-colors duration-500 ${
                            isHighlighted 
                              ? "bg-[#6A0DAD] text-white" 
                              : "bg-black/40 text-white backdrop-blur-sm"
                          }`}>
                            {item.step}
                          </div>
                        </div>
                        
                        {/* Floating Overlapping Icon in colored circle */}
                        <div className={`w-12 h-12 rounded-full bg-[#F8F5FF] text-[#6A0DAD] border border-[#6A0DAD]/15 flex items-center justify-center -mt-6 z-20 shadow-md transition-all duration-500 ${
                          isHighlighted ? "scale-110 shadow-lg shadow-[#6A0DAD]/15" : "shadow-sm"
                        }`}>
                          <StepIcon size={20} strokeWidth={2.5} />
                        </div>
                        
                        {/* Content with padding */}
                        <div className="px-2 sm:px-3 lg:px-4 pt-3 pb-5 flex flex-col items-center flex-1">
                          {/* Title & Description */}
                          <h4 className={`text-base md:text-[17px] font-black mb-2 tracking-tighter break-keep transition-colors duration-500 ${
                            isHighlighted ? "text-[#6A0DAD]" : "text-neutral-900"
                          }`}>{item.title}</h4>
                          <p className={`text-xs md:text-[13px] font-bold leading-normal break-keep transition-colors duration-500 ${
                            isHighlighted ? "text-neutral-500" : "text-neutral-400"
                          }`}>{item.desc}</p>
                        </div>
                      </motion.div>
                      
                      {/* Floating Connector Arrow between cards (Stays perfectly anchored in fixed position!) */}
                      {idx < 5 && (
                        <div className={`hidden xl:flex absolute top-1/2 left-[calc(100%+12px)] -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full items-center justify-center shadow-sm z-20 border border-white transition-all duration-500 origin-center ${
                          isHighlighted 
                            ? "bg-[#6A0DAD] text-white scale-110 shadow-lg shadow-[#6A0DAD]/20" 
                            : "bg-neutral-200 text-neutral-400 hover:bg-neutral-300"
                        }`}>
                          <ArrowRight size={12} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3) 운송 서비스(Transportation Service) */}
            <div className="pl-4 md:pl-8 lg:pl-12">
              <h3 className="text-xl md:text-2xl font-black text-neutral-900 mb-8 border-l-4 border-[#6A0DAD] pl-4">
                {language === "ko" ? "3) 운송 서비스 (Transportation Service)" : "3) Transportation Service"}
              </h3>
              <div className="bg-white rounded-[40px] border border-neutral-100/60 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
                
                <div className="lg:col-span-7 py-8 px-6 md:py-10 md:px-10 lg:pr-6 flex flex-col justify-center text-left">
                  <h4 className="text-xl md:text-2xl font-black tracking-tight text-neutral-900 mb-5 leading-tight">
                    {language === "ko" ? "다양한 화물 특성에 맞춘 최적의 운송 라인업" : "Optimal transport lineup tailored to various cargo characteristics"}
                  </h4>
                  <div className="space-y-4">
                    {[
                      {
                        title: language === "ko" ? "셔틀 운송(Shuttle Transport)" : "Shuttle Transport",
                        desc: language === "ko" ? "항만-보세창고 간 전용 셔틀 서비스" : "Dedicated shuttle service between the port and bonded warehouse"
                      },
                      {
                        title: language === "ko" ? "보세 운송 (Bonded Transport)" : "Bonded Transport",
                        desc: language === "ko" ? "수입 통관 전 세관 규정 준수한 보세운송" : "Bonded transport complying with customs regulations before import clearance"
                      },
                      {
                        title: language === "ko" ? "컨테이너 운송 (Container Transport)" : "Container Transport",
                        desc: language === "ko" ? "최적 배차, 경로 설계로 비용· 규정시간 절감" : "Saving costs and transit time through optimal dispatching and routing"
                      },
                      {
                        title: language === "ko" ? "카고운송 (Cargo Transport)" : "Cargo Transport",
                        desc: language === "ko" ? "팔레트 ·벌크 화물 전용 대형 트럭" : "Heavy-duty trucks dedicated to palletized and bulk cargo"
                      }
                    ].map((svc, i) => (
                      <div key={i} className="flex gap-3.5 items-center">
                        <div className="w-5 h-5 rounded-full bg-[#F8F5FF] flex items-center justify-center text-[#6A0DAD] flex-shrink-0">
                          <CheckCircle2 size={13} strokeWidth={3} />
                        </div>
                        <div className="text-neutral-900 text-base tracking-tight font-bold flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                          <span>{svc.title}</span>
                          <span className="text-neutral-400 font-normal text-sm">:</span>
                          <span className="text-neutral-600 font-semibold text-[14px] break-keep">{svc.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-[400px]">
                  <Image 
                    src={`${ASSET}/active/logistics_transport_lineup_v3.jpg`} 
                    alt="Transportation trucks" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ─── 2. 물류 인프라 (#infra) ─── */}
        <section id="infra" className="py-28 px-6 md:px-10 bg-white scroll-mt-36">
          <div className="max-w-[1300px] mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-14 text-left max-w-none"
            >
              <div className="flex items-center gap-4.5 justify-start mb-6">
                <div className="flex gap-[4px] items-center flex-shrink-0">
                  <span className="w-[7px] h-8 md:h-10 lg:h-11 bg-[#6A0DAD] rounded-[2px]" />
                  <span className="w-[3px] h-6 md:h-8 lg:h-9 bg-[#6A0DAD]/50 rounded-[1px]" />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-neutral-900">
                  {language === "ko" ? "물류 인프라" : "Logistics Infrastructure"}
                </h2>
              </div>
              <p className="text-base md:text-lg text-neutral-600 font-semibold leading-relaxed">
                {language === "ko" ? (
                  <>여수 광양항 자유무역지역 내 보세·자동화 설비의 전문 운영 관리를 기반으로, 직영 인력의 책임 하에 효율적이고 <strong className="text-[#6A0DAD] font-black">'안정적인 화물 관리 인프라'</strong>를 운영합니다.</>
                ) : (
                  <>Based on professional operation and management of bonded and automated facilities in Yeosu Gwangyang Port Free Trade Zone, we operate an efficient and <strong className="text-[#6A0DAD] font-black">'stable cargo management infrastructure'</strong> under the responsibility of direct-hire personnel.</>
                )}
              </p>
            </motion.div>

            {/* 5가지 핵심 인프라 - 반응형 포토카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  no: "01",
                  title: language === "ko" ? "여수광양항 자유무역지역에\n위치한 전략적 거점" : "Strategic Base in the\nYeosu Gwangyang Port Free Trade Zone",
                  desc: language === "ko"
                    ? "광양항 컨테이너 터미널과의 초근접 위치 및 배후단지 내 핵심 세제 혜택(관세 유예, 각종 지방세 감면)을 활용해 수출입 물류의 최적의 허브 역할을 보장합니다."
                    : "Guarantees an optimal hub for import/export logistics by taking advantage of close proximity to the Gwangyang Port Container Terminal and key tax benefits (customs duty suspension, local tax reductions) in the hinterland.",
                  tags: language === "ko"
                    ? ["#항만배후단지인접", "#관세유예및세제혜택", "#압도적접근성"]
                    : ["#CloseToPortHinterland", "#CustomsSuspension&TaxBenefits", "#ExcellentAccessibility"],
                  img: "gwangyang_map_v3.png",
                },
                {
                  no: "02",
                  title: language === "ko" ? "화주 맞춤형 독립 창고" : "Customized Independent Warehouses",
                  desc: language === "ko"
                    ? "총 부지 4만 평(132,000㎡) 및 창고 2만 평(66,000㎡)의 초대형 스케일을 확보하여, 화주별 프라이버시가 존중되는 아파트형 격벽 구조 독립 물류창고를 맞춤형으로 분할 매칭합니다."
                    : "Secures a massive scale with 132,000㎡ of total site area and 66,000㎡ of warehouse area, offering customized partitioning of independent warehouses with apartment-style partition structures that respect each client's privacy.",
                  tags: language === "ko"
                    ? ["#부지4만평_창고2만평", "#아파트형분할구획", "#철저한보안관리"]
                    : ["#132k㎡Site_66k㎡Warehouse", "#ApartmentStylePartition", "#StrictSecurityManagement"],
                  img: "extra_8.jpg",
                },
                {
                  no: "03",
                  title: language === "ko" ? "자체 항만 하역 및\n대형 운송 장비" : "Own Port Handling &\nLarge Transport Equipment",
                  desc: language === "ko"
                    ? "외부 임대 대기 장비 시간을 최소화(Zero)하기 위해 대형 컨테이너 상하차용 리치스태커, 3톤에서 14톤에 달하는 현장 대형 지게차, 특수 트레일러 샤시 라인업을 자사 기기로 완비하고 있습니다."
                    : "To minimize waiting time for leased equipment to zero, we are fully equipped with our own heavy equipment, including reach stackers for container handling, heavy-duty forklifts ranging from 3 to 14 tons, and special trailer chassis.",
                  tags: language === "ko"
                    ? ["#지게차", "#리치스태커", "#트레일러_샤시", "#외주대기시간Zero"]
                    : ["#Forklift", "#ReachStacker", "#TrailerChassis", "#ZeroWaitingTime"],
                  img: "extra_1.jpg",
                },
                {
                  no: "04",
                  title: language === "ko" ? "100% 정규직 직영\n운영 관리" : "100% Direct-Hire Permanent\nStaff Management",
                  desc: language === "ko"
                    ? "재도급 하청이나 단순 일용직 파견 인력 위주의 불안정한 창고 운영이 아닌, 본사 소속 정규직 현장 인력들이 24시간 철저히 검수·하역을 도맡아 무결점 보관 상태를 약속합니다."
                    : "We promise flawless storage status by having full-time staff handle inspection and unloading 24 hours a day, rather than subcontracting or relying on temporary daily workers.",
                  tags: language === "ko"
                    ? ["#도급재하청없음", "#본사정규직현장상주", "#무결점책임물류"]
                    : ["#NoSubcontracting", "#PermanentStaffOnSite", "#FlawlessResponsibleLogistics"],
                  img: "infra_card_4_korean.png",
                },
                {
                  no: "05",
                  title: language === "ko" ? "검증된 사업 인증 자격" : "Proven Business Licenses",
                  desc: language === "ko"
                    ? "국제물류주선업, 화물자동차운송주선업, 근로자파견사업 등 정부 허가 정식 라이선스를 보유하고 있으며, ISO 9001(품질), 14001(환경), 45001(안전보건) 인증에 근거한 규격을 준수합니다."
                    : "We hold official government-approved licenses including international freight forwarding, cargo transport brokerage, and temporary worker dispatch services, and strictly comply with ISO 9001 (Quality), 14001 (Environment), and 45001 (Occupational Health & Safety) standards.",
                  tags: language === "ko"
                    ? ["#국제물류주선업", "#화물운송주선업", "#건설기계대여업", "#근로자파견사업허가", "#식물검역신고대행업", "#ISO45001,ISO14001,ISO9001"]
                    : ["#FreightForwarding", "#CargoBrokerage", "#HeavyMachineryLease", "#LaborDispatchLicense", "#PlantQuarantineAgency", "#ISO45001_14001_9001"],
                  img: "active/logistics_infra_licenses_v2.jpg",
                },
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className={`group relative rounded-[28px] overflow-hidden aspect-[4/5] md:aspect-auto md:h-[360px] shadow-sm hover:shadow-xl transition-all duration-500 border border-neutral-100 flex flex-col justify-end p-6 ${
                    idx === 0 ? "lg:col-span-2" : ""
                  }`}
                >
                  {/* Background Image */}
                  <Image 
                    src={`${ASSET}/${item.img}`} 
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700 z-0" 
                  />
                  {/* Frosted / Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10 z-10 transition-opacity duration-300" />
                  
                  {/* Content Container */}
                  <div className="relative z-20 flex flex-col h-full justify-end text-white">
                    <div>

                      <h4 className="text-xl md:text-2xl font-black mb-3 leading-tight whitespace-pre-line tracking-tight">
                        {item.title}
                      </h4>
                      <div className="flex flex-wrap gap-x-2.5 gap-y-1 text-xs md:text-sm text-white font-bold opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-[150px] overflow-hidden transition-all duration-500">
                        {item.tags.map((tag, tIdx) => (
                          <span key={tIdx}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ─── 3. 물류 장비 개발 및 제작 (#equipment) ─── */}
        <section id="equipment" className="py-28 px-6 md:px-10 bg-[#F8F9FA] scroll-mt-36">
          <div className="max-w-[1300px] mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-14 text-left max-w-none"
            >
              <div className="flex items-center gap-4.5 justify-start mb-6">
                <div className="flex gap-[4px] items-center flex-shrink-0">
                  <span className="w-[7px] h-8 md:h-10 lg:h-11 bg-[#6A0DAD] rounded-[2px]" />
                  <span className="w-[3px] h-6 md:h-8 lg:h-9 bg-[#6A0DAD]/50 rounded-[1px]" />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-neutral-900">
                  {language === "ko" ? "물류 장비 개발 및 제작" : "Logistics Equipment Development & Manufacturing"}
                </h2>
              </div>
              <p className="text-base md:text-lg text-neutral-600 font-semibold leading-relaxed">
                {language === "ko" ? (
                  <>실무 운영 노하우를 바탕으로 최고의 공간 효율을 보장하는 <strong className="text-[#6A0DAD] font-black">'고객 맞춤형 물류 기기 및 랙 시스템'</strong>을 설계·제작합니다.</>
                ) : (
                  <>Based on operational expertise, we design and manufacture <strong className="text-[#6A0DAD] font-black">'customized logistics equipment and rack systems'</strong> that guarantee maximum space efficiency.</>
                )}
              </p>
            </motion.div>

            {/* 3대 핵심 제조 역량 카드 (밝은 테마로 개편) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {[
                {
                  title: language === "ko" ? "보라로지텍 자체 생산" : "Bora Logitech In-house Production",
                  desc: language === "ko"
                    ? "율촌산단 전남테크노파크 내 자체공장을 운영하며 철박스, 포장기계, 각종 물류기기를 기획·설계·제작합니다."
                    : "We operate our own factory in Yulchon Industrial Complex (Jeonnam Technopark) to plan, design, and manufacture steel boxes, packaging machinery, and various logistics equipment.",
                  icon: Cog,
                },
                {
                  title: language === "ko" ? "글로벌 협력 생산 파트너십" : "Global Collaborative Production Partnership",
                  desc: language === "ko"
                    ? "중국 청도 협력업체에서 기본 작업을 진행하고 국내 율촌공장에서 조립, 용접 등 후작업을 거쳐 고품질을 완성합니다."
                    : "We carry out basic fabrication with partners in Qingdao, China, and complete high-quality assembly, welding, and finishing at our Yulchon factory in Korea.",
                  icon: Factory,
                },
                {
                  title: language === "ko" ? "맞춤형 랙 제작 & 시공" : "Custom Rack Manufacturing & Installation",
                  desc: language === "ko"
                    ? "이동식 랙, 팔레트 랙 등 창고 공간을 최적화하고 보관 용량을 극대화하는 솔루션을 제공합니다."
                    : "We provide solutions that optimize warehouse space and maximize storage capacity, such as mobile racks and pallet racks.",
                  icon: Package,
                },
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white border border-neutral-100 rounded-[32px] p-8 md:p-10 shadow-sm hover:shadow-xl hover:border-neutral-200/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#F8F5FF] rounded-2xl flex items-center justify-center text-[#6A0DAD] flex-shrink-0">
                        <item.icon size={24} />
                      </div>
                      <h4 className="text-lg md:text-xl font-black text-neutral-900 tracking-tight">
                        {item.title.includes("&") ? (
                          <>
                            {item.title.split("&")[0]}
                            <span className="font-sans font-normal">&amp;</span>
                            {item.title.split("&")[1]}
                          </>
                        ) : (
                          item.title
                        )}
                      </h4>
                    </div>
                    <p className="text-neutral-600 font-medium leading-relaxed text-[15px] sm:text-[16px]">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 실제 물류 랙 사진 배치 (요구사항 반영) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative h-[300px] md:h-[400px] rounded-[32px] overflow-hidden shadow-md group"
                >
                  <Image 
                    src={`${ASSET}/active/logistics_equipment_stacking_v2.jpg`} 
                    alt="Stacking frame factory production" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300" />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="relative h-[300px] md:h-[400px] rounded-[32px] overflow-hidden shadow-md group"
                >
                  <Image 
                    src={`${ASSET}/Rack_upscaled.png`} 
                    alt="Pallet racking installation" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300" />
                </motion.div>
              </div>

          </div>
        </section>

        {/* ─── 4. 물류 전문 포장 (#packaging) ─── */}
        <section id="packaging" className="py-28 px-6 md:px-10 bg-white scroll-mt-36">
          <div className="max-w-[1300px] mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-14 text-left max-w-none"
            >
              <div className="flex items-center gap-4.5 justify-start mb-6">
                <div className="flex gap-[4px] items-center flex-shrink-0">
                  <span className="w-[7px] h-8 md:h-10 lg:h-11 bg-[#6A0DAD] rounded-[2px]" />
                  <span className="w-[3px] h-6 md:h-8 lg:h-9 bg-[#6A0DAD]/50 rounded-[1px]" />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-neutral-900">
                  {language === "ko" ? "물류 전문 포장" : "Professional Packaging"}
                </h2>
              </div>
              <p className="text-base md:text-lg text-neutral-600 font-semibold leading-relaxed">
                {language === "ko" ? (
                  <>제품 생산라인 협력파트너로서, 포장부터 출고와 시설정비까지 <strong className="text-[#6A0DAD] font-black">'최고의 안전과 노무 관리 체계'</strong>를 갖추었습니다.</>
                ) : (
                  <>As an operational partner for manufacturing production lines, we maintain the <strong className="text-[#6A0DAD] font-black">'highest safety and labor management standards'</strong> from packaging to outbound shipping and facility maintenance.</>
                )}
              </p>
            </motion.div>

            {/* 3대 운영 Pillar 구조화 (치밀한 안전관리, 합리적 노무관리, 지속적 현장혁신 - 각각 고유 이미지 탑재 및 좌우 교차 배치) */}
            {/* 1) Single wide Representative Image (Split into two adjacent images) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 w-full h-[250px] sm:h-[350px] md:h-[480px] rounded-[32px] overflow-hidden shadow-md border border-neutral-100/60 mb-10 group"
            >
              <div className="relative w-full h-full">
                <Image
                  src={`${ASSET}/active/logistics_packaging_1_v2.jpg`}
                  alt="BoraLogis Packing & Assembly Operations 1"
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
              <div className="relative w-full h-full">
                <Image
                  src={`${ASSET}/active/logistics_packaging_2_v2.jpg`}
                  alt="BoraLogis Packing & Assembly Operations 2"
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
            </motion.div>

            {/* 2) 3-Row Vertical List (Value Pillars) */}
            <div className="space-y-6">
              {[
                {
                  title: language === "ko" ? "치밀한 안전관리" : "Rigorous Safety Management",
                  bullets: [
                    {
                      b: language === "ko" ? "전담 안전관리담당 2명 배치" : "Deployment of 2 dedicated safety managers",
                      n: language === "ko" ? "책임자 1명, 실무자 1명" : "1 director, 1 practitioner"
                    },
                    {
                      b: language === "ko" ? "일상적인 지속적 교육" : "Continuous daily training",
                      n: language === "ko" ? "사업장내 교육장 설치, 상시적인 직원 안전교육 실시" : "Establishing on-site training facilities and conducting regular employee safety training"
                    },
                    {
                      b: language === "ko" ? "선제적 사고예방" : "Proactive accident prevention",
                      n: language === "ko" ? "작업현장 내 작업관련 위험요소를 적극적으로 개선" : "Actively improving work-related hazard factors in the workplace"
                    },
                    {
                      b: language === "ko" ? "전직원 안전 상해보험 가입" : "Safety accident insurance coverage for all employees",
                      n: ""
                    }
                  ],
                  bg: "bg-white",
                  border: "border-neutral-100 hover:border-[#6A0DAD]/30",
                  text: "text-neutral-900 group-hover:text-[#6A0DAD]",
                  accentColor: "#6A0DAD",
                },
                {
                  title: language === "ko" ? "합리적 노무관리" : "Reasonable Labor Management",
                  bullets: [
                    {
                      b: language === "ko" ? "노사간 신뢰구축" : "Building trust between labor and management",
                      n: language === "ko" ? "다양한 대화채널 확대 및 상시적 대화" : "Expanding diverse communication channels and maintaining constant dialogue"
                    },
                    {
                      b: language === "ko" ? "경영환경 및 환경변화 공유" : "Sharing business environment and changes",
                      n: language === "ko" ? "경영상황, 전망 등 정보 자료 공유" : "Sharing info and materials such as business conditions and forecasts"
                    },
                    {
                      b: language === "ko" ? "일상적 노무협력" : "Routine labor-management cooperation",
                      n: language === "ko" ? "현장의 소리 적극적 반영, 선제적 대책제시" : "Actively reflecting on-site feedback and proposing proactive measures"
                    },
                    {
                      b: language === "ko" ? "합리적 임단협 진행" : "Reasonable collective bargaining",
                      n: language === "ko" ? "상호 신뢰를 바탕으로 합리적인 대화" : "Reasonable dialogue based on mutual trust"
                    }
                  ],
                  bg: "bg-white",
                  border: "border-neutral-100 hover:border-[#4B49EB]/30",
                  text: "text-neutral-900 group-hover:text-[#4B49EB]",
                  accentColor: "#4B49EB",
                },
                {
                  title: language === "ko" ? "지속적 현장혁신" : "Continuous Workplace Innovation",
                  bullets: [
                    {
                      b: language === "ko" ? "일상적인 작업동선 개선" : "Routine improvement of work flow",
                      n: language === "ko" ? "장비, 인력이동, 화물동선 합리적 개선" : "Rational improvement of equipment, worker movement, and cargo routes"
                    },
                    {
                      b: language === "ko" ? "작업장비 현대화 자동화" : "Modernization and automation of work equipment",
                      n: language === "ko" ? "현장안전 개선 및 인력대체 효과" : "Improving site safety and replacing manual labor"
                    },
                    {
                      b: language === "ko" ? "안전관리 극대화를 위한 혁신" : "Innovation to maximize safety management",
                      n: language === "ko" ? "일상적인 작업현장 안전시설과 장비 혁신" : "Innovative updates to daily safety facilities and work equipment"
                    },
                    {
                      b: language === "ko" ? "자체적으로 혁신팀 운영" : "In-house operation of innovation teams",
                      n: language === "ko" ? "관리자, 현장인력 공동으로 혁신팀 구성" : "Forming joint innovation teams with managers and field personnel"
                    }
                  ],
                  bg: "bg-white",
                  border: "border-neutral-100 hover:border-[#9333EA]/30",
                  text: "text-neutral-900 group-hover:text-[#9333EA]",
                  accentColor: "#9333EA",
                },
              ].map((pillar, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className={`rounded-[24px] p-6 md:p-8 border-y border-r border-l-[6px] ${pillar.bg} ${pillar.border} grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center shadow-sm hover:shadow-lg transition-all duration-300 group`}
                  style={{ borderLeftColor: pillar.accentColor }}
                >
                  {/* Left Column: Category Name */}
                  <div className="md:col-span-3 flex flex-col justify-center text-left h-full">
                    <h4 className={`text-lg md:text-xl font-black flex items-center gap-2.5 transition-colors duration-300 ${pillar.text}`}>
                      {pillar.title}
                    </h4>
                    {/* Decorative underline */}
                    <div className="h-[2px] w-12 mt-3 hidden md:block transition-all duration-300 group-hover:w-20" style={{ backgroundColor: pillar.accentColor, opacity: 0.4 }} />
                  </div>

                  {/* Divider line on desktop */}
                  <div className="hidden md:block md:col-span-1 border-r border-neutral-100 h-10 justify-self-center" />

                  {/* Right Column: Bullets List */}
                  <div className="md:col-span-8">
                    <ul className="space-y-3.5 text-left">
                      {pillar.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3 group/item">
                          <span className="mt-[9px] w-1.5 h-1.5 rounded-full flex-shrink-0 transition-transform duration-300 group-hover/item:scale-125" style={{ backgroundColor: pillar.accentColor }} />
                          <span className="text-[14px] md:text-[15px] text-neutral-600 leading-relaxed font-semibold">
                            <strong className="font-black text-neutral-900 tracking-tight">{bullet.b}</strong>
                            {bullet.n ? (
                              <span className="text-neutral-500 font-medium"> : {bullet.n}</span>
                            ) : ""}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
