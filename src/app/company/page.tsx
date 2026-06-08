"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Ship, Truck, Cpu, Globe, Package, CheckCircle2, ArrowRight, BarChart3, ShieldCheck, Globe2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { useLanguage } from "@/context/LanguageContext";

const ASSET = "/assets/images/active";

interface MultiLangText {
  ko: string;
  en: string;
}

interface Company {
  id: string;
  name: MultiLangText;
  desc: MultiLangText;
  icon: React.ComponentType<any>;
  color: string;
  bg: string;
  image: string;
  content: {
    title: MultiLangText;
    description: MultiLangText;
    stats: Array<{ label: MultiLangText; value: MultiLangText }>;
    details: Array<{ title: MultiLangText; text: MultiLangText }>;
  };
}

const COMPANIES: Company[] = [
  { 
    id: "logis",
    name: { ko: "보라로지스", en: "Bora Logis" }, 
    desc: { ko: "국제물류 · 보세창고 운영", en: "International Logistics & Bonded Warehouse Operations" }, 
    icon: Ship,
    color: "#6A0DAD",
    bg: "bg-[#F9F5FF]",
    image: "company_bora_logis_v2.jpg",
    content: {
      title: { ko: "광양항 배후단지 최고의 종합물류 파트너", en: "Your Ultimate Logistics Partner at Gwangyang Port Hinterland" },
      description: {
        ko: "보라로지스는 여수·광양항 자유무역지역 내 동측 배후단지의 물류센터를 전담 운영하는 글로벌 종합물류 기업입니다. 부지 약 132,000㎡(약 4만 평) 및 창고 약 66,000㎡(약 2만 평) 규모의 현장을 기반으로, 수출입 요건 확인부터 통관, 검역대행, 보관, 특수 운송까지 전 과정을 유기적으로 연결하는 '원스톱 종합 물류 서비스'를 실현합니다.",
        en: "Bora Logis is a global comprehensive logistics enterprise exclusively operating a logistics center within the eastern hinterland of the Yeosu-Gwangyang Port Free Trade Zone. Utilizing our site of 132,000㎡ and warehouse of 66,000㎡, we implement a seamless, one-stop integrated logistics service that organically connects the entire cycle—from import/export requirement verification to customs clearance, quarantine agency, storage, and specialized inland transport."
      },
      stats: [
        { label: { ko: "부지 면적", en: "Site Area" }, value: { ko: "132,000㎡", en: "132,000㎡" } },
        { label: { ko: "창고 면적", en: "Warehouse Area" }, value: { ko: "66,000㎡", en: "66,000㎡" } },
        { label: { ko: "전문 분야", en: "Specialty" }, value: { ko: "국제물류센터", en: "Intl. Logistics Center" } }
      ],
      details: [
        { 
          title: { ko: "통합 물류 서비스", en: "Integrated Logistics Services" }, 
          text: { 
            ko: "포워딩, 검역대행, 창고업, 운송업까지 물류의 전 과정을 유기적으로 연결하여 효율적인 최적의 솔루션을 제공합니다.", 
            en: "We provide optimized, efficient solutions by organically linking the entire logistics process from forwarding and quarantine agency to warehousing and transport." 
          } 
        },
        { 
          title: { ko: "자체 전문 장비 운영", en: "In-house Specialized Equipment" }, 
          text: { 
            ko: "리치스태커, 대형 지게차 등 컨테이너 상하차 및 적재에 필요한 전문 장비를 직접 보유하고 전문 인력이 직접 운영합니다.", 
            en: "We directly own and operate specialized container loading/unloading and stacking equipment, including reach stackers and large forklifts, with our expert personnel." 
          } 
        },
        { 
          title: { ko: "압도적 물류 인프라", en: "Outstanding Infrastructure" }, 
          text: { 
            ko: "광양항 배후단지 내 최대 규모의 부지와 창고를 바탕으로 대량의 화물을 안정적으로 수용하고 관리할 수 있는 역량을 갖추고 있습니다.", 
            en: "Based on the largest site and warehouse in Gwangyang Port Hinterland, we possess the capability to stably accommodate and manage massive cargo volumes." 
          } 
        }
      ]
    }
  },
  { 
    id: "trans",
    name: { ko: "보라트랜스", en: "Bora Trans" }, 
    desc: { ko: "내륙 및 컨테이너 운송", en: "Inland & Container Transportation" }, 
    icon: Truck,
    color: "#2563EB",
    bg: "bg-[#EEF2FF]",
    image: "company_bora_trans_v2.jpg",
    content: {
      title: { ko: "항만과 보세창고를 잇는 최적의 운송 시스템", en: "Optimal Transport System Connecting Ports and Bonded Warehouses" },
      description: {
        ko: "보라트랜스는 항만과 보세창고 간의 신속하고 정확한 셔틀 시스템을 운영합니다. 세관 규정에 따른 안전한 보세운송 서비스를 기반으로, 최적의 경로 배차 설계로 물류 비용을 절감하며 팔레트 및 벌크 화물 등 전국 내륙 카고 운송을 전문적으로 수행합니다.",
        en: "Bora Trans operates a rapid and precise shuttle system between ports and bonded warehouses. Based on secure bonded transport service in compliance with customs regulations, we reduce logistics costs through optimized routing and dispatch, specializing in inland cargo transport of palletized and bulk freights nationwide."
      },
      stats: [
        { label: { ko: "주요 서비스", en: "Primary Service" }, value: { ko: "셔틀 시스템", en: "Shuttle System" } },
        { label: { ko: "전문 분야", en: "Specialty" }, value: { ko: "보세운송", en: "Bonded Transport" } },
        { label: { ko: "핵심 역량", en: "Core Capability" }, value: { ko: "배차 최적화", en: "Dispatch Optimization" } }
      ],
      details: [
        { 
          title: { ko: "항만-창고 셔틀 시스템", en: "Port-Warehouse Shuttle System" }, 
          text: { 
            ko: "항만 터미널과 보세창고 사이의 긴밀한 연결을 위해 전용 셔틀 시스템을 가동하여 물류 흐름의 끊김을 방지합니다.", 
            en: "We run a dedicated shuttle system to ensure close connection between port terminals and bonded warehouses, preventing breaks in logistics flow." 
          } 
        },
        { 
          title: { ko: "안전 보세운송 서비스", en: "Secure Bonded Transport" }, 
          text: { 
            ko: "엄격한 세관 관리 규정을 준수하며 수출입 화물을 안전하고 정확하게 목적지까지 운송하는 신뢰도 높은 서비스를 제공합니다.", 
            en: "We strictly comply with customs administration regulations to deliver import/export cargo safely and accurately to its destination." 
          } 
        },
        { 
          title: { ko: "내륙 카고 운송 전문", en: "Specialized Inland Cargo" }, 
          text: { 
            ko: "컨테이너 화물뿐만 아니라 팔레트, 벌크 등 다양한 형태의 화물을 전국 각지로 효율적으로 운송하는 인프라를 갖추고 있습니다.", 
            en: "We possess the infrastructure to efficiently transport containerized, palletized, and bulk freights to various domestic destinations." 
          } 
        }
      ]
    }
  },
  { 
    id: "logitech",
    name: { ko: "보라로지텍", en: "Bora Logitech" }, 
    desc: { ko: "생산라인 물류 · 장비 제조", en: "Production Line Logistics & Equipment Manufacturing" }, 
    icon: Cpu,
    color: "#86B41D",
    bg: "bg-[#F7FBEA]",
    image: "company_bora_logitech_v2.jpg",
    content: {
      title: { ko: "포장과 물류기기 및 장비 제작", en: "Packaging and Logistics Equipment Manufacturing" },
      description: {
        ko: "보라로지텍은 글로벌 기업인 오라이온 카본 코리아와 파트너쉽을 맺고 생산라인 운영의 핵심 업무를 담당하고 있고, 이를 통해 자체 물류 장비 개발 및 제조를 통하여 역량 강화 및 혁신을 이루고 있습니다.",
        en: "Bora Logitech is partnered with the global enterprise Orion Engineered Carbons Korea, taking charge of key production line operations. Through this partnership, we design and manufacture proprietary logistics equipment to continuously strengthen our technological capabilities and drive operational innovation."
      },
      stats: [
        { label: { ko: "현장 인력", en: "On-site Personnel" }, value: { ko: "95명", en: "95 Personnel" } },
        { label: { ko: "전문 분야", en: "Specialty" }, value: { ko: "제품포장 및 데이터관리, 출고, 보수", en: "Product Packaging, Data Management, Outbound, Maintenance" } },
        { label: { ko: "핵심 역량", en: "Core Capability" }, value: { ko: "물류기기 설계 및 자체 제작", en: "Logistics Equipment Design & In-house Production" } }
      ],
      details: [
        { 
          title: { ko: "생산라인 제품포장", en: "Production Line Product Packaging" }, 
          text: { 
            ko: "· 4조 3교대 및 일근직원 95명(현장90, 관리5명)\n· 포장, 출하, 수출, 생산관리, 안전관리, 샘플링, 리런, 생산라인정비\n· 지게차 14대 등 각종 물류기기 보유", 
            en: "· 95 staff operating in 4-crew 3-shift and day-shifts (90 on-site, 5 managers)\n· Packaging, outbound, export, production control, safety management, sampling, re-runs, and line maintenance\n· Equipped with 14 forklifts and other logistics machinery" 
          } 
        },
        { 
          title: { ko: "입·출고 및 데이터관리", en: "Inbound/Outbound & Data Control" }, 
          text: { 
            ko: "· 자체개발 프로그램에 생산 데이터 생성\n· 외부 이송 및 재고 데이터 관리\n· 출고 오더에 의한 출고 업무\n· 일부 수출 컨테이너 작업", 
            en: "· Generating production data in our proprietary program\n· Managing external transport and inventory records\n· Executing dispatch tasks according to shipping orders\n· Handling partial export container stuffing" 
          } 
        },
        { 
          title: { ko: "라인 장비관리 및 정비서비스", en: "Line Equipment & Maintenance" }, 
          text: { 
            ko: "· 일상적인 포장 장비관리\n· 현장 수리\n· 생산라인 정비서비스", 
            en: "· Routine packaging equipment care\n· On-site repairs\n· Production line maintenance services" 
          } 
        }
      ]
    }
  },
  { 
    id: "international",
    name: { ko: "어센틱코리아", en: "Authentic Korea" }, 
    desc: { ko: "글로벌 수출입 · 무역", en: "Global Import/Export & Trade" }, 
    icon: Globe,
    color: "#FF6A00",
    bg: "bg-[#FFF5EF]",
    image: "company_authentic_korea_v2.jpg",
    content: {
      title: { ko: "물류 인프라 기반의 원스톱 무역 솔루션", en: "One-stop Trade Solutions Based on Logistics Infrastructure" },
      description: {
        ko: "어센틱 코리아는 안정적인 물류 인프라를 기반으로 글로벌 수출입 비즈니스를 전개하는 종합 무역회사입니다. 국내 산업 생태계에 필수적인 원재료, 친환경 인프라 기자재 및 고가치 소비재를 글로벌 시장에서 직접 소싱하여 국내에 안정적으로 공급합니다. 동시에 한국의 식품과 문화 컨텐츠를 발굴하고 직접 수출하여, 글로벌 공급망을 주도적으로 구축해 나가고 있습니다.",
        en: "Authentic Korea is a comprehensive trading enterprise expanding global import/export businesses built on our group's stable logistics infrastructure. We directly source industrial raw materials, eco-friendly infrastructure equipment, and high-value consumer goods from global markets to supply them stably within South Korea. Concurrently, we discover and export K-food products and cultural content, taking the lead in establishing a global supply network."
      },
      stats: [
        { label: { ko: "주요 품목", en: "Primary Items" }, value: { ko: "자원 수입", en: "Resource Import" } },
        { label: { ko: "수출 분야", en: "Export Field" }, value: { ko: "K-Food/Culture", en: "K-Food/Culture" } },
        { label: { ko: "서비스", en: "Service" }, value: { ko: "무역 솔루션", en: "Trade Solutions" } }
      ],
      details: [
        { 
          title: { ko: "글로벌 자원 직수입", en: "Direct Global Sourcing" }, 
          text: { 
            ko: "중국과 동남아시아 지역을 중심으로 산업에 필요한 핵심 자원을 발굴하고 안정적인 루트를 통해 국내로 직접 수입합니다.", 
            en: "We discover key resources required for domestic industries centered around China and Southeast Asia, importing them directly through stable logistics routes." 
          } 
        },
        { 
          title: { ko: "K-Contents 글로벌 수출", en: "Export of K-Contents" }, 
          text: { 
            ko: "전 세계적으로 주목받는 한국의 식품과 문화 콘텐츠가 해외 시장에 성공적으로 안착할 수 있도록 판로를 개척하고 지원합니다.", 
            en: "We pave paths and support global distribution channels to ensure that highly demanded Korean food products and cultural content establish a successful foothold overseas." 
          } 
        },
        { 
          title: { ko: "수출입 대행 및 조사", en: "Trade Agency & Research" }, 
          text: { 
            ko: "현지 시장 조사부터 복잡한 수출입 계약 및 행정 대행까지, 무역 전 과정에 걸친 전문가들의 통합 서비스를 제공합니다.", 
            en: "We provide integrated, expert services covering the entire trading process, from local market research to complex import/export contracts and administrative handling." 
          } 
        }
      ]
    }
  },
  { 
    id: "reup",
    name: { ko: "RE&UP", en: "RE&UP" }, 
    desc: { ko: "재생에너지 · 업사이클", en: "Renewable Energy & Upcycling" }, 
    icon: Package,
    color: "#10B981",
    bg: "bg-[#ECFDF5]",
    image: "company_re_and_up_v2.jpg",
    content: {
      title: { ko: "재생에너지 특수 물류 및 지속가능한 미래 경영", en: "Renewable Energy Special Logistics & Sustainable Future Management" },
      description: {
        ko: "RE&UP은 친환경 에너지 인프라 구축과 자원 순환 기술을 핵심 축으로 삼아 지속 가능한 미래를 열어가는 재생에너지 기업입니다. 신재생에너지 발전 효율을 극대화하는 태양광 시설 유지보수 솔루션을 제공하며, 폐자원을 고부가가치 원료로 재탄생시키는 독자적인 친환경 자원화 사업을 전개합니다.",
        en: "RE&UP is a renewable energy enterprise opening a sustainable future with eco-friendly energy infrastructure development and resource circulation technologies at its core. We provide solar facility maintenance solutions that maximize renewable power generation efficiency, alongside proprietary eco-friendly resource recovery businesses that reprocess waste resources into high-value raw materials."
      },
      stats: [
        { label: { ko: "특수 물류", en: "Special Logistics" }, value: { ko: "태양광/풍력", en: "Solar & Wind Power" } },
        { label: { ko: "핵심 역량", en: "Core Capability" }, value: { ko: "친환경 자원화", en: "Eco-friendly Recovery" } },
        { label: { ko: "경영 가치", en: "Management Value" }, value: { ko: "ESG/업사이클", en: "ESG / Upcycling" } }
      ],
      details: [
        { 
          title: { ko: "재생에너지 설비 물류", en: "Renewable Energy Logistics" }, 
          text: { 
            ko: "태양광 모듈과 풍력 발전 설비 등 정밀함과 전문성이 요구되는 거대 에너지 자재의 안전한 보관 및 특수 운송을 수행합니다.", 
            en: "We perform safe storage and specialized transport of massive energy equipment, such as solar modules and wind turbines, which demand high precision and expertise." 
          } 
        },
        { 
          title: { ko: "친환경 자원화 사업", en: "Eco-friendly Resource Recovery" }, 
          text: { 
            ko: "폐자원을 고부가가치 원료로 재탄생시키는 독자적인 친환경 자원화 프로세스를 구축하여 자원 순환을 돕고 미래 가치를 창출합니다.", 
            en: "We establish a proprietary resource recovery process that transforms waste materials into high-value raw materials, promoting resource circulation and future values." 
          } 
        },
        { 
          title: { ko: "업사이클 비즈니스", en: "Upcycling Business" }, 
          text: { 
            ko: "버려지는 자원에 새로운 가치를 부여하는 업사이클링 사업을 통해 자원 순환을 돕고 지속 가능한 환경 보호에 기여합니다.", 
            en: "We contribute to sustainable environmental protection and assist resource loop by running upcycling businesses that assign new value to discarded materials." 
          } 
        }
      ]
    }
  },
];

function CompanyIntroContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(0);
  const { language } = useLanguage();

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

      <main className="pt-32 pb-20 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">

          {/* Tabs Navigation */}
          <div className="relative mb-12 p-1.5 bg-neutral-100/50 backdrop-blur-md rounded-2xl md:rounded-full flex flex-wrap shadow-inner border border-white">
            {COMPANIES.map((company, idx) => (
              <button
                key={company.id}
                onClick={() => setActiveTab(idx)}
                className={`flex-1 min-w-[150px] px-6 py-3 md:py-3.5 rounded-xl md:rounded-full text-base sm:text-lg lg:text-[20px] font-black transition-all flex items-center justify-center gap-3 ${
                  activeTab === idx 
                  ? "bg-white text-black shadow-[0_4px_20px_rgba(0,0,0,0.1)] scale-[1.03]" 
                  : "text-neutral-400 hover:text-neutral-600 hover:bg-white/50"
                }`}
              >
                <company.icon size={22} style={{ color: activeTab === idx ? company.color : "inherit" }} />
                {company.name[language]}
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
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter" style={{ color: activeCompany.color }}>{activeCompany.name[language]}</h2>
                      </div>
                    </div>

                    <h4 className="text-2xl md:text-4xl font-black text-neutral-800 mb-8 leading-tight tracking-tight">
                      {activeCompany.content.title[language]}
                    </h4>
                    
                    <div className="prose prose-xl max-w-none">
                      <p className="text-lg md:text-xl text-neutral-600 leading-relaxed font-bold mb-0 border-l-4 pl-8 py-2" style={{ borderColor: activeCompany.color }}>
                        {activeCompany.content.description[language]}
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-4 lg:pt-4">
                    <div className="relative aspect-square bg-white rounded-[40px] shadow-2xl border border-black/5 overflow-hidden group">
                      <Image 
                        src={`${ASSET}/${activeCompany.image}`} 
                        alt={activeCompany.name[language]} 
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
                      <p className="text-[11px] font-black uppercase tracking-widest text-neutral-400 mb-2">{stat.label[language]}</p>
                      <p className="text-xl md:text-2xl font-black tracking-tighter text-neutral-900 leading-tight">{stat.value[language]}</p>
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
                          <h5 className="text-xl font-black tracking-tight text-neutral-900">{detail.title[language]}</h5>
                        </div>

                        <div className="text-neutral-500 leading-snug font-bold text-[14px] md:text-[15px] space-y-1">
                          {detail.text[language].split("\n").map((line, lineIdx) => (
                            <div key={lineIdx} className="flex items-start gap-2.5">
                              <span className="mt-1.5 flex-shrink-0 text-[8px]" style={{ color: activeCompany.color }}>●</span>
                              <span className="flex-1 text-neutral-600 font-medium">{line.replace(/^·\s*/, "")}</span>
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
                          <h5 className="text-xl font-black tracking-tight text-neutral-900">{detail.title[language]}</h5>
                        </div>
                        <p className="text-neutral-500 leading-relaxed font-bold text-[15px] whitespace-pre-line">
                          {detail.text[language]}
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
