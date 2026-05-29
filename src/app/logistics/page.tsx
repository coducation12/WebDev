"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
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

const steps = [
  {
    step: "01",
    title: "화물 입고",
    desc: "수출입 화물 터미널로부터 화물을 안전하게 반입",
    img: "extra_26.jpg",
    icon: Truck,
  },
  {
    step: "02",
    title: "상·하차 및 하역",
    desc: "컨테이너 라이싱 및 전문 인력을 통한 안정적인 적재·하역",
    img: "service_logistics.jpg",
    icon: Forklift,
  },
  {
    step: "03",
    title: "스마트 검수 / 검역",
    desc: "입출고 시 수량 및 품질 점검을 통한 오배송 방지",
    img: "smart_inspection.png",
    icon: ClipboardCheck,
  },
  {
    step: "04",
    title: "유통가공 / 반가공",
    desc: "제품 조립, 반가공, 소포장 및 수출입 라벨링",
    img: "extra_22.jpg",
    icon: Package,
  },
  {
    step: "05",
    title: "프리미엄 보관 및 재고 관리",
    desc: "실시간 온·습도 관리 및 24시간 철저한 CCTV 보안",
    img: "2.jpg",
    icon: ShieldCheck,
  },
  {
    step: "06",
    title: "첨단 자동화 창고 운영",
    desc: "로보틱스 및 WMS 기반의 위탁 물류 운영",
    img: "extra_32.png",
    icon: Cog,
  },
];

export default function LogisticsPage() {
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
              { id: "intl-service", label: "국제 물류 서비스" },
              { id: "infra", label: "물류 인프라" },
              { id: "equipment", label: "물류 장비 개발·제작" },
              { id: "packaging", label: "물류 전문 포장" },
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
              <div className="flex items-center gap-3 justify-start mb-5">
                <div className="w-10 h-10 rounded-full bg-[#F3E8FF] text-[#6A0DAD] flex items-center justify-center flex-shrink-0 border border-[#6A0DAD]/10 shadow-sm">
                  <Ship size={18} strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-neutral-900">국제물류서비스</h2>
              </div>
              <p className="text-base md:text-lg text-neutral-600 font-semibold leading-relaxed">
                해외 소싱 연계 및 전문 통관 파트너십을 시작으로 보세 보관, 전문 포장, 특수 운송까지 아우르는 <strong className="text-[#6A0DAD] font-black">'원스톱 종합 물류 서비스'</strong>를 지향합니다.
              </p>
            </motion.div>

            {/* 1) 글로벌 포워딩 & 수입 요건 확인 */}
            <div className="mb-28 pl-4 md:pl-8 lg:pl-12">
              <h3 className="text-xl md:text-2xl font-black text-neutral-900 mb-8 border-l-4 border-[#6A0DAD] pl-4">1) 글로벌 포워딩 <span className="font-sans font-normal">&amp;</span> 수입 요건 확인</h3>
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
                    <h4 className="text-xl font-bold mb-1 text-neutral-900">포워딩<span className="font-sans font-normal">&amp;</span>국제운송</h4>
                    <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-4">(Forwarding <span className="font-sans font-normal">&amp;</span> International Transport)</p>
                    <p className="text-neutral-500 font-medium leading-relaxed text-[15px]">
                      자체 물류 인프라와 글로벌 네트워크를 연계하여 최적의 수출입 운송 경로를 설계합니다.
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
                    <h4 className="text-xl font-bold mb-1 text-neutral-900">수출입 통관<span className="font-sans font-normal">&amp;</span>검역</h4>
                    <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-4">(Customs Clearance <span className="font-sans font-normal">&amp;</span> Quarantine)</p>
                    <p className="text-neutral-500 font-medium leading-relaxed text-[15px]">
                      복잡한 관세 행정과 검역 절차를 신속하고 정확하게 대행합니다.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* 2) 보세창고 물류 프로세스 */}
            <div className="mb-28 pl-4 md:pl-8 lg:pl-12">
              <h3 className="text-xl md:text-2xl font-black text-neutral-900 mb-10 border-l-4 border-[#6A0DAD] pl-4">2) 보세창고 물류 프로세스</h3>
              
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
                        <div className="p-5 pt-3 flex flex-col items-center flex-1">
                          {/* Title & Description */}
                          <h4 className={`text-sm md:text-base font-black mb-2 tracking-tight transition-colors duration-500 ${
                            isHighlighted ? "text-[#6A0DAD]" : "text-neutral-900"
                          }`}>{item.title}</h4>
                          <p className={`text-[11px] md:text-xs font-bold leading-normal transition-colors duration-500 ${
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
              <h3 className="text-xl md:text-2xl font-black text-neutral-900 mb-8 border-l-4 border-[#6A0DAD] pl-4">3) 운송 서비스 (Transportation Service)</h3>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 md:p-12 rounded-[40px] border border-neutral-100/60 shadow-sm">
                
                <div className="lg:col-span-6">
                  <h4 className="text-2xl font-black tracking-tight text-neutral-900 mb-6 leading-tight">
                    다양한 화물 특성에 맞춘<br />최적의 운송 라인업
                  </h4>
                  <div className="space-y-6">
                    {[
                      { title: "셔틀 운송 (Shuttle Transport)", desc: "여수·광양 항만 터미널과 보세창고를 상시 왕복하여 정체 없는 신속 연계 셔틀 운행" },
                      { title: "보세 운송 (Bonded Transport)", desc: "수입 통관 완료 전에 규정에 부합하는 공인 보세 차량 및 면허를 통한 안전 운송 보장" },
                      { title: "컨테이너 운송 (Container Transport)", desc: "자자체 전문 배차 최적화 시스템과 기한 준수 운송 노선을 가동하여 효율성 극대화" },
                      { title: "카고 운송 (Cargo Transport)", desc: "벌크, 대형 중량물 및 팔레트 단위 화물 처리를 위한 전천후 대형 윙바디 카고 라인업 운영" }
                    ].map((svc, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="mt-1 w-5 h-5 rounded-full bg-[#F8F5FF] flex items-center justify-center text-[#6A0DAD] flex-shrink-0">
                          <CheckCircle2 size={13} strokeWidth={3} />
                        </div>
                        <div>
                          <h5 className="font-bold text-neutral-900 text-sm md:text-base">{svc.title}</h5>
                          <p className="text-xs md:text-sm text-neutral-500 font-medium mt-0.5">{svc.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-6 relative h-[350px] md:h-[450px] rounded-[30px] overflow-hidden shadow-md">
                  <Image 
                    src={`${ASSET}/extra_10.jpg`} 
                    alt="Transportation trucks" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
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
              <div className="flex items-center gap-3 justify-start mb-5">
                <div className="w-10 h-10 rounded-full bg-[#F3E8FF] text-[#6A0DAD] flex items-center justify-center flex-shrink-0 border border-[#6A0DAD]/10 shadow-sm">
                  <Warehouse size={18} strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-neutral-900">물류 인프라</h2>
              </div>
              <p className="text-base md:text-lg text-neutral-600 font-semibold leading-relaxed">
                여수 광양항 자유무역지역 내 보세·자동화 설비의 전문 운영 관리를 기반으로, 직영 인력의 책임 하에 효율적이고 <strong className="text-[#6A0DAD] font-black">'안정적인 화물 관리 인프라'</strong>를 운영합니다.
              </p>
            </motion.div>

            {/* 5가지 핵심 인프라 - 반응형 포토카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  no: "01",
                  title: "여수광양항 자유무역지역에\n위치한 전략적 거점",
                  desc: "광양항 컨테이너 터미널과의 초근접 위치 및 배후단지 내 핵심 세제 혜택(관세 유예, 각종 지방세 감면)을 활용해 수출입 물류의 최적의 허브 역할을 보장합니다.",
                  tags: ["#항만배후단지인접", "#관세유예및세제혜택", "#압도적접근성"],
                  img: "gwangyang_map.png",
                },
                {
                  no: "02",
                  title: "화주 맞춤형 독립 창고",
                  desc: "총 부지 4만 평(132,000㎡) 및 창고 2만 평(66,000㎡)의 초대형 스케일을 확보하여, 화주별 프라이버시가 존중되는 아파트형 격벽 구조 독립 물류창고를 맞춤형으로 분할 매칭합니다.",
                  tags: ["#부지4만평_창고2만평", "#아파트형분할구획", "#철저한보안관리"],
                  img: "extra_8.jpg",
                },
                {
                  no: "03",
                  title: "자체 항만 하역 및\n대형 운송 장비",
                  desc: "외부 임대 대기 장비 시간을 최소화(Zero)하기 위해 대형 컨테이너 상하차용 리치스태커, 3톤에서 14톤에 달하는 현장 대형 지게차, 특수 트레일러 샤시 라인업을 자사 기기로 완비하고 있습니다.",
                  tags: ["#지게차", "#리치스태커", "#트레일러_샤시", "#외주대기시간Zero"],
                  img: "extra_1.jpg",
                },
                {
                  no: "04",
                  title: "100% 정규직 직영\n운영 관리",
                  desc: "재도급 하청이나 단순 일용직 파견 인력 위주의 불안정한 창고 운영이 아닌, 본사 소속 정규직 현장 인력들이 24시간 철저히 검수·하역을 도맡아 무결점 보관 상태를 약속합니다.",
                  tags: ["#도급재하청없음", "#본사정규직현장상주", "#무결점책임물류"],
                  img: "extra_10.jpg",
                },
                {
                  no: "05",
                  title: "검증된 사업 인증 자격",
                  desc: "국제물류주선업, 화물자동차운송주선업, 근로자파견사업 등 정부 허가 정식 라이선스를 보유하고 있으며, ISO 9001(품질), 14001(환경), 45001(안전보건) 인증에 근거한 규격을 준수합니다.",
                  tags: ["#국제물류주선업", "#화물운송주선업", "#건설기계대여업", "#근로자파견사업허가", "#식물검역신고대행업", "#ISO45001,ISO14001,ISO9001"],
                  img: "extra_11.jpg",
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
                      <p className="text-xs md:text-sm text-white/70 font-medium leading-relaxed opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-[150px] overflow-hidden transition-all duration-500">
                        {item.desc}
                      </p>
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
              <div className="flex items-center gap-3 justify-start mb-5">
                <div className="w-10 h-10 rounded-full bg-[#F3E8FF] text-[#6A0DAD] flex items-center justify-center flex-shrink-0 border border-[#6A0DAD]/10 shadow-sm">
                  <Cog size={18} strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-neutral-900">물류 장비 개발 및 제작</h2>
              </div>
              <p className="text-base md:text-lg text-neutral-600 font-semibold leading-relaxed">
                실무 운영 노하우를 바탕으로 최고의 공간 효율을 보장하는 <strong className="text-[#6A0DAD] font-black">'고객 맞춤형 물류 기기 및 랙(Rack) 시스템'</strong>을 설계·제작합니다.
              </p>
            </motion.div>

            {/* 3대 핵심 제조 역량 카드 (밝은 테마로 개편) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {[
                {
                  title: "보라로지텍 자체 생산",
                  desc: "율촌산업단지 전남테크노파크 내 자체 대규모 제조 공장을 운영하여 특수 철박스, 맞춤형 적재 기계, 각종 물류 장비를 기획부터 설계·용접·가공·조립까지 일괄 생산체계로 제작합니다.",
                  icon: Cog,
                },
                {
                  title: "글로벌 협력 생산 파트너십",
                  desc: "중국 청도 핵심 협력 거점 생산라인에서 철제 부품 및 기본 하우징 가공을 진행하고, 국내 율촌공장에서 최종 정밀 조립, 특수 용접, 도색 후처리 검사 공정을 거쳐 품질 편차를 극대화합니다.",
                  icon: Factory,
                },
                {
                  title: "맞춤형 렉(Rack) 제작 & 시공",
                  desc: "제조 라인 및 초대형 배후단지 창고의 다양한 높이와 지게차 주행 노선을 고려하여 최적의 효율을 보장하는 이동식 렉, 파렛트 렉, 적층형 중이층 렉 시스템을 주문 제작·설치합니다.",
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
                    <div className="w-12 h-12 bg-[#F8F5FF] rounded-2xl flex items-center justify-center text-[#6A0DAD] mb-6">
                      <item.icon size={24} />
                    </div>
                    <h4 className="text-xl font-bold text-neutral-900 mb-4">{item.title}</h4>
                    <p className="text-neutral-500 font-medium leading-relaxed text-[14px]">
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
                    src={`${ASSET}/extra_20.jpg`} 
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
                    src={`${ASSET}/extra_29.png`} 
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
              <div className="flex items-center gap-3 justify-start mb-5">
                <div className="w-10 h-10 rounded-full bg-[#F3E8FF] text-[#6A0DAD] flex items-center justify-center flex-shrink-0 border border-[#6A0DAD]/10 shadow-sm">
                  <Users size={18} strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-neutral-900">물류 전문 포장</h2>
              </div>
              <p className="text-base md:text-lg text-neutral-600 font-semibold leading-relaxed">
                여수산단 대기업의 상시 조업라인을 대행하며 완벽한 안전 관리 하에 <strong className="text-[#6A0DAD] font-black">'최고 수준의 제품 포장·출고 솔루션'</strong>을 지원합니다.
              </p>
            </motion.div>

            {/* 3대 운영 Pillar 구조화 (치밀한 안전관리, 합리적 노무관리, 지속적 현장혁신 - 각각 고유 이미지 탑재 및 좌우 교차 배치) */}
            <div className="space-y-6">
              {[
                {
                  title: "치밀한 안전관리",
                  bullets: [
                    "전담 안전관리담당자 2명 전격 상주 배치 (책임자 1명, 실무자 1명)",
                    "일상적인 지속적 안전 예방 교육 : 사업장 내 자체 안전보건 교육장 개설 및 일 단위 상시 직원 안전수칙 전파",
                    "선제적 위험 요인 발굴 및 예방 조치 : 현장의 유기물 취급, 중장비 동선 상 위험요소 상시 모니터링",
                    "전 조업원 대상 단체 안전 상해보험 가입 지원으로 복리후생 책임성 강화",
                  ],
                  bg: "bg-[#FFF9F9]",
                  border: "border-red-100/50",
                  text: "text-red-900",
                  dot: "bg-red-500",
                  img: "extra_10.jpg",
                  isRightImage: true,
                },
                {
                  title: "합리적 노무관리",
                  bullets: [
                    "노사 간 양방향 신뢰 구축 : 다각적 소통 대화 채널 개방 및 노사협의회 상시 소집 운영",
                    "투명한 경영상황 및 대내외 환경 변화 수시 공유 : 분기별 경영 상황, 수주 전망 정보 개방",
                    "일상적 노무 협력 프로세스 : 일일 조장 회의를 통한 현장의 세부 애로사항 발굴 및 선제적 노사분규 차단",
                    "합리적인 임단협 가이드 준수 : 상호 신뢰와 투명 경영 수치를 기본으로 한 대화 타결",
                  ],
                  bg: "bg-[#F9FCFF]",
                  border: "border-blue-100/50",
                  text: "text-blue-900",
                  dot: "bg-blue-500",
                  img: "extra_11.jpg",
                  isRightImage: false,
                },
                {
                  title: "지속적 현장혁신",
                  bullets: [
                    "일상적인 작업 효율 동선 개선 : 장비의 배치 변경, 인력 및 지게차 이동 노선 구역 세분화",
                    "작업 장비 현대화 및 기계화/자동화 : 현장 수작업 포장 공정 자동화 설비 제안 및 정합성 최적화 지원",
                    "현장 안전 및 설비 성능 혁신 활동 : 상시 고장 부위 분석을 통한 예방 정비 기동 체계 구비",
                    "현장-관리 합동 혁신 TF팀 운영 : 상시 직급을 파괴한 아이디어 공유 회의 진행",
                  ],
                  bg: "bg-[#F9FFF9]",
                  border: "border-green-100/50",
                  text: "text-green-900",
                  dot: "bg-green-500",
                  img: "extra_5.jpg",
                  isRightImage: true,
                },
              ].map((pillar, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className={`rounded-[24px] p-6 border ${pillar.bg} ${pillar.border} grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-sm`}
                >
                  {/* Text content Column */}
                  <div className={`lg:col-span-8 flex flex-col justify-center h-full ${pillar.isRightImage ? "" : "lg:order-last"}`}>
                    <div>
                      <h4 className={`text-xl font-black mb-3 flex items-center gap-2 ${pillar.text}`}>
                        <span className={`w-2.5 h-2.5 rounded-full ${pillar.dot}`} />
                        {pillar.title}
                      </h4>
                      <ul className="space-y-2">
                        {pillar.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5">
                            <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${pillar.dot}`} />
                            <span className="text-[13px] font-semibold text-neutral-600 leading-normal">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Image Column */}
                  <div className="lg:col-span-4 relative h-[160px] lg:h-[180px] rounded-[20px] overflow-hidden shadow-sm">
                    <Image 
                      src={`${ASSET}/${pillar.img}`} 
                      alt={pillar.title} 
                      fill 
                      className="object-cover"
                    />
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
