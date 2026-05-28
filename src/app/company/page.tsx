"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Ship, Truck, Cpu, Globe, Package, CheckCircle2, ArrowRight, BarChart3, ShieldCheck, Globe2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ASSET = "/assets/images";

const COMPANIES = [
  { 
    id: "logis",
    name: "보라로지스", 
    desc: "국제물류 · 보세창고 운영", 
    icon: Ship,
    color: "#6A0DAD",
    bg: "bg-[#F9F5FF]",
    image: "extra_12.jpg",
    content: {
      title: "광양항 배후단지 최고의 종합물류 파트너",
      description: "보라로지스는 여수·광양항 자유무역지역 내 동측 배후단지의 물류센터를 전담 운영하는 글로벌 종합물류 기업입니다. 부지 약 132,000㎡(약 4만 평) 및 창고 약 66,000㎡(약 2만 평) 규모의 현장을 기반으로, 수출입 요건 확인부터 통관, 검역대행, 보관, 특수 운송까지 전 과정을 유기적으로 연결하는 '원스톱 종합 물류 서비스'를 실현합니다.",
      stats: [
        { label: "부지 면적", value: "132,000㎡" },
        { label: "창고 면적", value: "66,000㎡" },
        { label: "전문 분야", value: "국제물류센터" }
      ],
      details: [
        { title: "통합 물류 서비스", text: "포워딩, 검역대행, 창고업, 운송업까지 물류의 전 과정을 유기적으로 연결하여 효율적인 최적의 솔루션을 제공합니다." },
        { title: "자체 전문 장비 운영", text: "리치스태커, 대형 지게차 등 컨테이너 상하차 및 적재에 필요한 전문 장비를 직접 보유하고 전문 인력이 직접 운영합니다." },
        { title: "압도적 물류 인프라", text: "광양항 배후단지 내 최대 규모의 부지와 창고를 바탕으로 대량의 화물을 안정적으로 수용하고 관리할 수 있는 역량을 갖추고 있습니다." }
      ]
    }
  },
  { 
    id: "trans",
    name: "보라트랜스", 
    desc: "내륙 및 컨테이너 운송", 
    icon: Truck,
    color: "#4B0082",
    bg: "bg-[#F3F0FF]",
    image: "extra_1.jpg",
    content: {
      title: "항만과 보세창고를 잇는 최적의 운송 시스템",
      description: "보라트랜스는 항만과 보세창고 간의 신속하고 정확한 셔틀 시스템을 운영합니다. 세관 규정에 따른 안전한 보세운송 서비스를 기반으로, 최적의 경로 배차 설계로 물류 비용을 절감하며 팔레트 및 벌크 화물 등 전국 내륙 카고 운송을 전문적으로 수행합니다.",
      stats: [
        { label: "주요 서비스", value: "셔틀 시스템" },
        { label: "전문 분야", value: "보세운송" },
        { label: "핵심 역량", value: "배차 최적화" }
      ],
      details: [
        { title: "항만-창고 셔틀 시스템", text: "항만 터미널과 보세창고 사이의 긴밀한 연결을 위해 전용 셔틀 시스템을 가동하여 물류 흐름의 끊김을 방지합니다." },
        { title: "안전 보세운송 서비스", text: "엄격한 세관 관리 규정을 준수하며 수출입 화물을 안전하고 정확하게 목적지까지 운송하는 신뢰도 높은 서비스를 제공합니다." },
        { title: "내륙 카고 운송 전문", text: "컨테이너 화물뿐만 아니라 팔레트, 벌크 등 다양한 형태의 화물을 전국 각지로 효율적으로 운송하는 인프라를 갖추고 있습니다." }
      ]
    }
  },
  { 
    id: "logitech",
    name: "보라로지텍", 
    desc: "생산라인 물류 · 장비 제조", 
    icon: Cpu,
    color: "#86B41D",
    bg: "bg-[#F7FBEA]",
    image: "extra_20.jpg",
    content: {
      title: "포장과 물류기기 및 장비 제작",
      description: "보라로지텍은 글로벌 기업인 오라이온 카본 코리아와 파트너쉽을 맺고 생산라인 운영의 핵심 업무를 담당하고 있고, 이를 통해 자체 물류 장비 개발 및 제조를 통하여 역량 강화 및 혁신을 이루고 있습니다.",
      stats: [
        { label: "현장 인력", value: "95명" },
        { label: "전문 분야", value: "제품포장 및 데이터관리, 출고, 보수" },
        { label: "핵심 역량", value: "물류기기 설계 및 자체 제작" }
      ],
      details: [
        { title: "생산라인 제품포장", text: "· 4조 3교대 및 일근직원 95명(현장90, 관리5명)\n· 포장, 출하, 수출, 생산관리, 안전관리, 샘플링, 리런, 생산라인정비\n· 지게차 14대 등 각종 물류기기 보유" },
        { title: "입·출고 및 데이터관리", text: "· 자체개발 프로그램에 생산 데이터 생성\n· 외부 이송 및 재고 데이터 관리\n· 출고 오더에 의한 출고 업무\n· 일부 수출 컨테이너 작업" },
        { title: "라인 장비관리 및 정비서비스", text: "· 일상적인 포장 장비관리\n· 현장 수리\n· 생산라인 정비서비스" }
      ]
    }
  },
  { 
    id: "international",
    name: "어센틱코리아", 
    desc: "글로벌 수출입 · 무역", 
    icon: Globe,
    color: "#2563EB",
    bg: "bg-[#EEF2FF]",
    image: "extra_31.png",
    content: {
      title: "물류 인프라 기반의 원스톱 무역 솔루션",
      description: "어센틱 코리아는 안정적인 물류 인프라를 기반으로 글로벌 수출입 비즈니스를 전개하는 종합 무역회사입니다. 국내 산업 생태계에 필수적인 원자재, 친환경 인프라 기자재 및 고가치 소비재를 글로벌 시장에서 직접 소싱하여 국내에 안정적으로 공급합니다. 동시에 한국의 식품과 문화 컨텐츠를 발굴하고 직접 수출하여, 글로벌 공급망을 주도적으로 구축해 나가고 있습니다.",
      stats: [
        { label: "주요 품목", value: "자원 수입" },
        { label: "수출 분야", value: "K-Food/Culture" },
        { label: "서비스", value: "무역 솔루션" }
      ],
      details: [
        { title: "글로벌 자원 직수입", text: "중국과 동남아시아 지역을 중심으로 산업에 필요한 핵심 자원을 발굴하고 안정적인 루트를 통해 국내로 직접 수입합니다." },
        { title: "K-Contents 글로벌 수출", text: "전 세계적으로 주목받는 한국의 식품과 문화 콘텐츠가 해외 시장에 성공적으로 안착할 수 있도록 판로를 개척하고 지원합니다." },
        { title: "수출입 대행 및 조사", text: "현지 시장 조사부터 복잡한 수출입 계약 및 행정 대행까지, 무역 전 과정에 걸친 전문가들의 통합 서비스를 제공합니다." }
      ]
    }
  },
  { 
    id: "reup",
    name: "RE&UP", 
    desc: "재생에너지 · 업사이클", 
    icon: Package,
    color: "#10B981",
    bg: "bg-[#ECFDF5]",
    image: "extra_14.jpg",
    content: {
      title: "재생에너지 특수 물류 및 지속가능한 미래 경영",
      description: "RE&UP은 친환경 에너지 인프라 구축과 자원 순환 기술을 핵심 축으로 삼아 지속 가능한 미래를 열어가는 재생에너지 기업입니다. 신재생에너지 발전 효율을 극대화하는 태양광 시설 유지보수 솔루션을 제공하며, 폐자원을 고부가가치 원료로 재탄생시키는 독자적인 친환경 자원화 사업을 전개합니다.",
      stats: [
        { label: "특수 물류", value: "태양광/풍력" },
        { label: "핵심 역량", value: "친환경 자원화" },
        { label: "경영 가치", value: "ESG/업사이클" }
      ],
      details: [
        { title: "재생에너지 설비 물류", text: "태양광 모듈과 풍력 발전 설비 등 정밀함과 전문성이 요구되는 거대 에너지 자재의 안전한 보관 및 특수 운송을 수행합니다." },
        { title: "친환경 자원화 사업", text: "폐자원을 고부가가치 원료로 재탄생시키는 독자적인 친환경 자원화 프로세스를 구축하여 자원 순환을 돕고 미래 가치를 창출합니다." },
        { title: "업사이클 비즈니스", text: "버려지는 자원에 새로운 가치를 부여하는 업사이클링 사업을 통해 자원 순환을 돕고 지속 가능한 환경 보호에 기여합니다." }
      ]
    }
  },
];

function CompanyIntroContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (tabParam) {
      const index = parseInt(tabParam);
      if (!isNaN(index) && index >= 0 && index < COMPANIES.length) {
        setActiveTab(index);
      }
    }
  }, [tabParam]);

  const activeCompany = COMPANIES[activeTab];

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-neutral-900 selection:text-white">
      <Header />

      <main className="pt-48 pb-20 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          {/* Title Section */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1 rounded-full bg-neutral-100 text-[10px] font-black uppercase tracking-widest mb-6"
            >
              BORA Family Companies
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9]">
              Bora Family Companies
            </h1>
            <p className="text-xl text-neutral-400 font-bold max-w-2xl leading-relaxed">
              보라 그룹은 물류, 기술, 무역, 재생에너지를 아우르는 <br className="hidden md:block" />
              통합 네트워크를 통해 비즈니스의 새로운 흐름을 만듭니다.
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="sticky top-24 z-40 mb-12 p-2 bg-neutral-100/50 backdrop-blur-md rounded-2xl md:rounded-full flex flex-wrap shadow-inner border border-white">
            {COMPANIES.map((company, idx) => (
              <button
                key={company.id}
                onClick={() => setActiveTab(idx)}
                className={`flex-1 min-w-[150px] px-6 py-5 md:py-6 rounded-xl md:rounded-full text-base sm:text-lg lg:text-[20px] font-black transition-all flex items-center justify-center gap-3 ${
                  activeTab === idx 
                  ? "bg-white text-black shadow-[0_4px_20px_rgba(0,0,0,0.1)] scale-[1.03]" 
                  : "text-neutral-400 hover:text-neutral-600 hover:bg-white/50"
                }`}
              >
                <company.icon size={22} style={{ color: activeTab === idx ? company.color : "inherit" }} />
                {company.name}
              </button>
            ))}
          </div>

          {/* Tab Content Area */}
          <div className={`rounded-[48px] overflow-hidden transition-colors duration-700 min-h-[700px] ${activeCompany.bg}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="p-8 md:p-20"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-12 items-center">
                  <div className="lg:col-span-8">
                    <div className="flex items-center gap-6 mb-12">
                      <div 
                        className="w-16 h-16 rounded-[24px] flex items-center justify-center text-white shadow-2xl"
                        style={{ backgroundColor: activeCompany.color }}
                      >
                        <activeCompany.icon size={32} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-[12px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">{activeCompany.id} business</h3>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter" style={{ color: activeCompany.color }}>{activeCompany.name}</h2>
                      </div>
                    </div>

                    <h4 className="text-2xl md:text-4xl font-black text-neutral-800 mb-8 leading-tight tracking-tight">
                      {activeCompany.content.title}
                    </h4>
                    
                    <div className="prose prose-xl max-w-none">
                      <p className="text-lg md:text-xl text-neutral-600 leading-relaxed font-bold mb-0 border-l-4 pl-8 py-2" style={{ borderColor: activeCompany.color }}>
                        {activeCompany.content.description}
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-4 lg:pt-4">
                    <div className="relative aspect-square bg-white rounded-[40px] shadow-2xl border border-black/5 overflow-hidden group">
                      <Image 
                        src={`${ASSET}/${activeCompany.image}`} 
                        alt={activeCompany.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>
                </div>

                {/* 3 Stats Cards: Pulled out to span the full-width (spans empty space on the right) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                  {activeCompany.content.stats.map((stat, i) => (
                    <div key={i} className="bg-white/40 border border-white p-6 rounded-3xl backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-[11px] font-black uppercase tracking-widest text-neutral-400 mb-2">{stat.label}</p>
                      <p className="text-xl md:text-2xl font-black tracking-tighter text-neutral-900 leading-tight">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {activeCompany.id === "logitech" ? (
                  /* Custom grid column spans for Logitech: Column 1 is wider (col-span-5) to prevent wrapping, Column 2 (col-span-4), Column 3 (col-span-3) */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-20 border-t border-black/5">
                    {activeCompany.content.details.map((detail, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        className={`flex flex-col gap-6 ${
                          i === 0 ? "lg:col-span-5" : i === 1 ? "lg:col-span-4" : "lg:col-span-3"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                             {i === 0 && <BarChart3 size={20} style={{ color: activeCompany.color }} />}
                             {i === 1 && <ShieldCheck size={20} style={{ color: activeCompany.color }} />}
                             {i === 2 && <Globe2 size={20} style={{ color: activeCompany.color }} />}
                          </div>
                          <h5 className="text-xl font-black tracking-tight text-neutral-900">{detail.title}</h5>
                        </div>

                        <div className="text-neutral-500 leading-relaxed font-bold text-[14px] md:text-[15px] space-y-3">
                          {detail.text.split("\n").map((line, lineIdx) => (
                            <div key={lineIdx} className="flex items-start gap-2.5">
                              <span className="mt-2 flex-shrink-0 text-[8px]" style={{ color: activeCompany.color }}>●</span>
                              <span className="flex-1 text-neutral-600 font-medium whitespace-nowrap lg:whitespace-normal xl:whitespace-nowrap">{line.replace(/^·\s*/, "")}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  /* Standard 3-column layout for other companies */
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20 border-t border-black/5">
                    {activeCompany.content.details.map((detail, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        className="flex flex-col gap-6"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                             {i === 0 && <BarChart3 size={20} style={{ color: activeCompany.color }} />}
                             {i === 1 && <ShieldCheck size={20} style={{ color: activeCompany.color }} />}
                             {i === 2 && <Globe2 size={20} style={{ color: activeCompany.color }} />}
                          </div>
                          <h5 className="text-xl font-black tracking-tight text-neutral-900">{detail.title}</h5>
                        </div>
                        <p className="text-neutral-500 leading-relaxed font-bold text-[15px] whitespace-pre-line">
                          {detail.text}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer minimal />
    </div>
  );
}

export default function CompanyIntroPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center font-bold text-neutral-400">Loading...</div>}>
      <CompanyIntroContent />
    </Suspense>
  );
}
