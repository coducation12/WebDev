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
  category: string;
  icon: React.ComponentType<any>;
  iconImg: string;
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
    category: "Logistics & Distribution",
    icon: Ship,
    iconImg: "icon_bora_logis.png",
    color: "#6A0DAD",
    bg: "bg-[#F9F5FF]",
    image: "company_bora_logis_v2.jpg",
    content: {
      title: { ko: "WMS 기반 최적의 물류를 설계하는 종합 물류 파트너", en: "Comprehensive Logistics Partner Designing Optimal Logistics Based on WMS" },
      description: {
        ko: "보라로지스는 광양항 자유무역지역 내 물류센터를 전담 운영하는 종합물류 회사입니다.\n부지 52,000평 및 창고 약 2만 평 규모의 현장을 기반으로, 3PL부터 수출입 물류, 국내 유통 물류까지 산업군에 맞는 물류 설계로 전 과정을 유기적으로 연결하여 고객사의 비즈니스 효율을 극대화합니다.",
        en: "Bora Logis is a comprehensive logistics company exclusively operating a logistics center in the Gwangyang Port Free Trade Zone.\nBased on a 52,000-pyeong site and approximately 20,000-pyeong warehouse, we organically connect the entire process from 3PL to import/export and domestic distribution logistics to maximize client business efficiency."
      },
      stats: [
        { label: { ko: "사업분야", en: "Business Area" }, value: { ko: "일반창고업, 보관 및 운영, 국제물류주선업", en: "General Warehousing, Storage & Operations, Intl. Freight Forwarding" } },
        { label: { ko: "주소", en: "Address" }, value: { ko: "전남광주통합특별시 광양시 항만8로 18-35", en: "18-35, Hangman 8-ro, Gwangyang-si" } },
        { label: { ko: "인증현황", en: "Certifications" }, value: { ko: "국제물류주선업, 화물운송주선업", en: "Intl. Freight Forwarding, Cargo Transport Brokerage" } }
      ],
      details: [
        { 
          title: { ko: "통합 물류 서비스", en: "Integrated Logistics Services" }, 
          text: { 
            ko: "포워딩, 검역대행, 창고업, 운송업까지 물류의 전 과정을 유기적으로 연결하여 효율적인 최적의 솔루션을 제공합니다.", 
            en: "We provide optimized, high-efficiency solutions by seamlessly integrating the entire logistics process, from forwarding and quarantine agency to warehousing and transport." 
          } 
        },
        { 
          title: { ko: "자체 전문 장비 운영", en: "In-house Specialized Equipment" }, 
          text: { 
            ko: "리치스태커, 대형 지게차 등 컨테이너 상하차 및 적재에 필요한 전문 장비를 직접 보유하고 전문 인력이 직접 운영합니다.", 
            en: "We directly own and operate specialized container loading/unloading and stacking equipment, including reach stackers and large forklifts, managed by our expert personnel." 
          } 
        },
        { 
          title: { ko: "압도적 물류 인프라", en: "Outstanding Infrastructure" }, 
          text: { 
            ko: "광양항 배후단지 내 최대 규모의 부지와 창고를 바탕으로 대량의 화물을 안정적으로 수용하고 관리할 수 있는 역량을 갖추고 있습니다.", 
            en: "Based on the largest site and warehouse in Gwangyang Port Free Trade Zone, we possess the capability to stably accommodate and manage massive cargo volumes." 
          } 
        }
      ]
    }
  },
  { 
    id: "trans",
    name: { ko: "보라트랜스", en: "Bora Trans" }, 
    desc: { ko: "내륙 및 컨테이너 운송", en: "Inland & Container Transportation" }, 
    category: "Inland Transportation",
    icon: Truck,
    iconImg: "icon_bora_trans.png",
    color: "#2563EB",
    bg: "bg-[#EEF2FF]",
    image: "company_bora_trans_v3.jpg",
    content: {
      title: { ko: "TMS 기반 광양항 거점 트레일러 및 카고 전문 운송사", en: "TMS-Based Trailer & Cargo Transport Specialist at Gwangyang Port" },
      description: {
        ko: "보라트랜스는 광양항을 기반으로 트레일러, 카고 및 특수화물 운송 서비스를 제공합니다.\n세관 규정에 따른 안전한 보세운송을 바탕으로 최적의 경로와 배차를 설계해 물류비용을 절감하며,\n팔레트 및 벌크화물 등 전국 내륙 운송을 수행합니다.",
        en: "Bora Trans provides trailer, cargo, and special freight transport services based at Gwangyang Port.\nThrough secure bonded transport complying with customs regulations, we design optimal routes and dispatches to reduce logistics costs\nand perform nationwide inland transport for palletized and bulk cargo."
      },
      stats: [
        { label: { ko: "사업분야", en: "Business Area" }, value: { ko: "트레일러 운송, 카고운송, 기타 특수운송", en: "Trailer, Cargo & Special Transport" } },
        { label: { ko: "주소", en: "Address" }, value: { ko: "전남광주통합특별시 광양시 항만8로 18-35", en: "18-35, Hangman 8-ro, Gwangyang-si" } },
        { label: { ko: "핵심 역량", en: "Core Competency" }, value: { ko: "배차 최적화", en: "Dispatch Optimization" } }
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
    category: "Logistics Equipment & Tech",
    icon: Cpu,
    iconImg: "icon_bora_logitech.png",
    color: "#86B41D",
    bg: "bg-[#F7FBEA]",
    image: "company_bora_logitech_v3.jpg",
    content: {
      title: { ko: "포장 출하 물류와 물류 기기 개발 및 제작", en: "Packaging & Outbound Logistics and Logistics Equipment Development" },
      description: {
        ko: "보라로지텍은 제조업 생산라인의 포장 출하 업무를 전문적으로 수행하며,\n여러 제조사들과 파트너십을 맺고 있습니다.\n또한, 물류 창고 공간의 최대 효율을 내기 위해 다양한 물류 기기와 용기들을 자체 개발하여\n제조 역량을 키워 나가고 있습니다.",
        en: "Bora Logitech specializes in packaging and outbound operations for manufacturing production lines,\npartnering with various manufacturers.\nWe also develop our own logistics equipment and containers to maximize warehouse space efficiency\nand expand our manufacturing capabilities."
      },
      stats: [
        { label: { ko: "사업분야", en: "Business Area" }, value: { ko: "제조업, 기타 기초무기화학 물질,\n제조업(카본블랙, 물류기기)", en: "Manufacturing, Basic Inorganic Chemicals,\nCarbon Black & Logistics Equipment" } },
        { label: { ko: "주소", en: "Address" }, value: { ko: "전남광주통합특별시 여수시 진달래길 310-88 (월내동)", en: "310-88, Jindallae-gil, Yeosu-si" } },
        { label: { ko: "인증현황", en: "Certifications" }, value: { ko: "ISO45001, ISO14001, ISO9001", en: "ISO45001, ISO14001, ISO9001" } }
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
    category: "Global Import & Export",
    icon: Globe,
    iconImg: "icon_authentic_korea.png",
    color: "#FF6A00",
    bg: "bg-[#FFF5EF]",
    image: "company_authentic_korea_v2.jpg",
    content: {
      title: { ko: "물류 인프라 기반의 수출입 솔루션", en: "Import/Export Solutions Based on Logistics Infrastructure" },
      description: {
        ko: "어센틱코리아는 본질(Authenticity)에 충실한 산업 자원과 장인의 고유성이 담긴 제품을\n수출입·유통하는 무역회사입니다.",
        en: "Authentic Korea is a trading company that imports, exports, and distributes\nindustrial resources faithful to authenticity and products containing artisans' uniqueness."
      },
      stats: [
        { label: { ko: "사업분야", en: "Business Area" }, value: { ko: "수출입 업무, 수출입 대행업무", en: "Import/Export Business & Agency" } },
        { label: { ko: "주소", en: "Address" }, value: { ko: "전남광주통합특별시 광양시 항만8로 18-35", en: "18-35, Hangman 8-ro, Gwangyang-si" } },
        { label: { ko: "주요 품목", en: "Primary Items" }, value: { ko: "물류산업 조달 물품, 인테리어 소품, 특산품", en: "Logistics Supplies, Interior Props, Local Specialties" } }
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
          title: { ko: "지역특산품 해외수출", en: "Export of Local Specialties" }, 
          text: { 
            ko: "전 세계적으로 주목받는 한국의 우수한 지역 특산품이 해외 시장에 성공적으로 안착할 수 있도록 판로를 개척하고 지원합니다.", 
            en: "We pioneer and support distribution channels to ensure that Korea's outstanding local specialties successfully establish a foothold in global markets." 
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
    category: "Sustainable Resource Solutions",
    icon: Package,
    iconImg: "icon_re_and_up.png",
    color: "#10B981",
    bg: "bg-[#ECFDF5]",
    image: "company_re_and_up_v3.jpg",
    content: {
      title: { ko: "재생에너지 특수 물류 및 지속가능한 미래 경영", en: "Renewable Energy Special Logistics & Sustainable Future Management" },
      description: {
        ko: "RE & UP은 폐자원을 고부가가치 원료로 재탄생시키는 친환경 자원화 기업입니다.",
        en: "RE&UP is an eco-friendly resource recovery enterprise that transforms waste resources into high-value raw materials."
      },
      stats: [
        { label: { ko: "사업분야", en: "Business Area" }, value: { ko: "업사이클, 자원 재활용", en: "Upcycling & Resource Recycling" } },
        { label: { ko: "주소", en: "Address" }, value: { ko: "전남광주통합특별시 광양시 항만8로 18-35", en: "18-35, Hangman 8-ro, Gwangyang-si" } },
        { label: { ko: "특허현황", en: "Patents" }, value: { ko: "폐플라스틱 분쇄장치 특허 제 10-3007598호", en: "Waste Plastic Shredder Patent No. 10-3007598" } }
      ],
      details: [
        { 
          title: { ko: "재생에너지 설비 물류", en: "Renewable Energy Logistics" }, 
          text: { 
            ko: "태양광 모듈과 풍력 발전 설비 등 정밀함과 전문성이 요구되는 재생 에너지 자재의 안전한 보관 및 특수 운송을 수행합니다.", 
            en: "We perform safe storage and specialized transport of renewable energy equipment, such as solar modules and wind turbines, which demand high precision and expertise." 
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
    <div className="h-screen flex flex-col overflow-hidden bg-white text-black font-sans selection:bg-neutral-900 selection:text-white">
      <Header />

      <main className="flex-1 overflow-y-auto pt-20 md:pt-22 pb-4 md:pb-6">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">

          {/* Top Intro Header */}
          <div className="mb-4 md:mb-7">
            <span className="text-sm md:text-base font-bold text-[#6A0DAD] tracking-tight block mb-1.5">
              {language === "ko" ? "회사 소개" : "Company"}
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-neutral-900 mb-2 md:mb-3">
              About us
            </h1>
            <p className="text-base md:text-lg text-neutral-600 font-medium leading-relaxed max-w-3xl">
              {language === "ko" ? (
                <>
                  수출입 물류 전문 기업으로서 쌓아온 현장 노하우는 보라의 가장 큰 자산입니다.<br className="hidden sm:inline" />
                  보라의 5개의 네트워크가 유기적으로 움직이며, 물류와 무역을 아우르는 통합 서비스를 완성합니다.
                </>
              ) : (
                <>
                  Our field know-how accumulated as an import/export logistics specialist is BORA&apos;s greatest asset.<br className="hidden sm:inline" />
                  BORA&apos;s five networks move organically to complete an integrated service spanning logistics and trade.
                </>
              )}
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="relative mb-5 md:mb-7 p-1 md:p-1.5 bg-neutral-100 rounded-xl flex shadow-inner border border-white">
            {COMPANIES.map((company, idx) => (
              <button
                key={company.id}
                onClick={() => setActiveTab(idx)}
                className={`flex-1 min-w-0 md:min-w-[135px] px-1 md:px-5 py-2 md:py-2.5 rounded-lg font-black transition-all flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2.5 ${
                  activeTab === idx 
                  ? "bg-white text-black shadow-[0_4px_20px_rgba(0,0,0,0.1)] md:scale-[1.02]" 
                  : "text-neutral-400 hover:text-neutral-600 hover:bg-white/50"
                }`}
              >
                <img
                  src={encodeURI(`${ASSET}/${company.iconImg}`)}
                  alt={company.name[language]}
                  className={`w-4 h-4 md:w-5 md:h-5 object-contain transition-opacity ${activeTab === idx ? "opacity-100" : "opacity-45"}`}
                />
                <span className="text-[11px] sm:text-xs md:text-base lg:text-lg leading-tight truncate max-w-full">
                  {company.name[language]}
                </span>
              </button>
            ))}
          </div>

          {/* Tab Content Area */}
          <div className="rounded-xl overflow-hidden transition-colors duration-700 bg-neutral-50 border border-neutral-200/70">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="p-5 sm:p-7 md:p-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 mb-6 md:mb-8 items-start">
                  <div className="lg:col-span-8">
                    <div className="flex items-center gap-4 md:gap-5 mb-4 md:mb-7">
                      <div 
                        className="w-11 h-11 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-white shadow-xl flex-shrink-0"
                        style={{ backgroundColor: activeCompany.color }}
                      >
                        <img
                          src={encodeURI(`${ASSET}/${activeCompany.iconImg}`)}
                          alt={activeCompany.name[language]}
                          className="w-6 h-6 md:w-8 md:h-8 object-contain brightness-0 invert"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xs md:text-sm font-bold tracking-[0.15em] opacity-40 mb-0.5 truncate">{activeCompany.category}</h3>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: activeCompany.color }}>{activeCompany.name[language]}</h2>
                      </div>
                    </div>

                    <h4 className="text-xl md:text-2xl font-bold text-neutral-800 mb-3 md:mb-5 leading-snug tracking-tight break-keep">
                      {activeCompany.content.title[language]}
                    </h4>
                    
                    <div className="max-w-none">
                      <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-medium mb-0 border-l-4 pl-4 md:pl-6 py-1 whitespace-pre-line break-keep" style={{ borderColor: activeCompany.color }}>
                        {activeCompany.content.description[language]}
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-4 lg:pt-2">
                    <div className="relative aspect-[4/3] lg:aspect-square bg-white rounded-xl shadow-xl border border-black/5 overflow-hidden group">
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
                  {activeCompany.content.stats.map((stat, i) => (
                    <div key={i} className="bg-white/60 border border-white p-3.5 md:p-5 rounded-xl backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow flex flex-col justify-start">
                      <p className="text-lg md:text-xl font-bold text-neutral-900 mb-1 md:mb-1.5 tracking-tight">
                        {stat.label[language]}
                      </p>
                      <p className="text-sm md:text-base font-medium text-neutral-500 leading-relaxed whitespace-pre-line break-keep">
                        {stat.value[language]}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
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
