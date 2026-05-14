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
      title: "광양항 배후단지 최대규모 국제물류센터",
      description: "보라로지스는 광양항 자유무역지역 내 동측 배후단지에 위치한 최대 규모의 국제물류센터입니다. 부지 약 132,000㎡(약 4만 평)와 창고 약 66,000㎡(약 2만 평)의 압도적인 인프라를 보유하고 있으며, 포워딩, 검역대행, 창고업, 운송업을 망라하는 통합 물류 서비스를 제공합니다.",
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
      title: "생산라인 운영 파트너 및 물류 장비 제조 혁신",
      description: "보라로지텍은 여수국가산단 내 주요 생산라인에서 포장, 출하, 시설 정비를 담당하는 전문 파트너입니다. 95명의 전문 인력이 4조 3교대 체제로 24시간 현장에 상주하며 중단 없는 가동을 지원합니다. 또한 자체 제조 공장을 운영하여 철박스, 포장기계, 컨테이너 등을 직접 설계 및 제조합니다.",
      stats: [
        { label: "현장 인력", value: "95명" },
        { label: "교대 체계", value: "4조 3교대" },
        { label: "자체 생산", value: "장비/컨테이너" }
      ],
      details: [
        { title: "생산라인 통합 수행", text: "여수산단 내 제조 현장에서 제품의 포장부터 최종 출하, 공정 시설의 정비까지 물류와 운영 전반을 책임지고 수행합니다." },
        { title: "자체 제조 공장 운영", text: "물류 현장에 최적화된 철박스(Steel Box), 포장기계, 특수 컨테이너를 독자적인 기술력으로 설계하고 직접 제작합니다." },
        { title: "24시간 상주 운영", text: "숙련된 전문 인력들이 365일 24시간 가동되는 생산 라인에 상주하며 안정적인 운영과 즉각적인 시설 대응 체계를 유지합니다." }
      ]
    }
  },
  { 
    id: "international",
    name: "보라인터네셔널", 
    desc: "글로벌 수출입 · 무역", 
    icon: Globe,
    color: "#2563EB",
    bg: "bg-[#EEF2FF]",
    image: "extra_31.png",
    content: {
      title: "물류 인프라 기반의 원스톱 무역 솔루션",
      description: "보라인터네셔널은 중국 및 동남아 지역의 핵심 자원을 직접 수입하고, K-Food 및 K-Culture 콘텐츠의 글로벌 수출 판로를 개척합니다. 보라 그룹의 강력한 물류 인프라를 기반으로 해외 시장 조사부터 수출입 대행까지 아우르는 종합 무역 서비스를 제공합니다.",
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
    name: "보라RE&UP", 
    desc: "재생에너지 · 업사이클", 
    icon: Package,
    color: "#10B981",
    bg: "bg-[#ECFDF5]",
    image: "extra_14.jpg",
    content: {
      title: "재생에너지 특수 물류 및 지속가능한 미래 경영",
      description: "보라RE&UP은 태양광, 풍력 등 재생에너지 설비 자재에 특화된 특수 물류 서비스를 제공합니다. 특히 해상 풍력 설비 이송을 위한 전문 바지선을 운영하며 항만 물류의 새로운 영역을 선도합니다. 또한 폐자원의 가치를 재발견하는 업사이클링 비즈니스를 통해 ESG 경영을 실천합니다.",
      stats: [
        { label: "특수 물류", value: "태양광/풍력" },
        { label: "해상 인프라", value: "바지선 운영" },
        { label: "경영 가치", value: "ESG/업사이클" }
      ],
      details: [
        { title: "재생에너지 설비 물류", text: "태양광 모듈과 풍력 발전 설비 등 정밀함과 전문성이 요구되는 거대 에너지 자재의 안전한 보관 및 특수 운송을 수행합니다." },
        { title: "전문 바지선 운영", text: "해상 풍력 발전 단지 조성 등 해상 운송이 필수적인 프로젝트를 위해 독자적인 전문 바지선 체계를 구축하여 운영합니다." },
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
              가족사 소개
            </h1>
            <p className="text-xl text-neutral-400 font-bold max-w-2xl leading-relaxed">
              보라 그룹은 물류, 기술, 무역, 재생에너지를 아우르는 <br className="hidden md:block" />
              통합 네트워크를 통해 비즈니스의 새로운 흐름을 만듭니다.
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="sticky top-24 z-40 mb-12 p-1.5 bg-neutral-100/50 backdrop-blur-md rounded-2xl md:rounded-full flex flex-wrap shadow-inner border border-white">
            {COMPANIES.map((company, idx) => (
              <button
                key={company.id}
                onClick={() => setActiveTab(idx)}
                className={`flex-1 min-w-[120px] px-6 py-4 rounded-xl md:rounded-full text-[13px] font-black transition-all flex items-center justify-center gap-2.5 ${
                  activeTab === idx 
                  ? "bg-white text-black shadow-[0_4px_20px_rgba(0,0,0,0.1)] scale-[1.03]" 
                  : "text-neutral-400 hover:text-neutral-600 hover:bg-white/50"
                }`}
              >
                <company.icon size={16} style={{ color: activeTab === idx ? company.color : "inherit" }} />
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
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
                      <p className="text-lg md:text-xl text-neutral-600 leading-relaxed font-bold mb-12 border-l-4 pl-8 py-2" style={{ borderColor: activeCompany.color }}>
                        {activeCompany.content.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {activeCompany.content.stats.map((stat, i) => (
                        <div key={i} className="bg-white/40 border border-white p-6 rounded-3xl backdrop-blur-sm">
                          <p className="text-[11px] font-black uppercase tracking-widest text-neutral-400 mb-2">{stat.label}</p>
                          <p className="text-xl md:text-2xl font-black tracking-tighter text-neutral-900">{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4 lg:pt-28">
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
                      <p className="text-neutral-500 leading-relaxed font-bold text-[15px]">
                        {detail.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
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
