"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Plus, Minus } from "lucide-react";

export default function TradePage() {
  const { language } = useLanguage();
  const [isIndustrialOpen, setIsIndustrialOpen] = useState(false);

  const importSteps = [
    { step: "01", title: language === "ko" ? "해외 공급처 발굴·선정" : "Overseas Supplier Sourcing" },
    { step: "02", title: language === "ko" ? "수입요건 검토·계약 체결" : "Import Requirements & Contract" },
    { step: "03", title: language === "ko" ? "발주·결제 관리" : "Order & Payment Management" },
    { step: "04", title: language === "ko" ? "생산·품질·납기 관리" : "Production, Quality & Delivery" },
    { step: "05", title: language === "ko" ? "해외 출하·국제운송" : "Overseas Shipment & Transport" },
    { step: "06", title: language === "ko" ? "수입통관·국내운송" : "Import Customs & Domestic" },
    { step: "07", title: language === "ko" ? "입고·재고 관리" : "Receiving & Inventory Control" },
    { step: "08", title: language === "ko" ? "유통·판매 지원 및 사후관리" : "Distribution, Sales & Aftercare" },
  ];

  const exportSteps = [
    { step: "01", title: language === "ko" ? "해외시장 조사·바이어 발굴" : "Market Research & Buyer Sourcing" },
    { step: "02", title: language === "ko" ? "수출요건·인증 확인" : "Export Requirements & Certs" },
    { step: "03", title: language === "ko" ? "수출계약·결제조건 확정" : "Export Contract & Payment Terms" },
    { step: "04", title: language === "ko" ? "수출물품 확보" : "Securing Export Goods" },
    { step: "05", title: language === "ko" ? "운송·보험 계약" : "Transport & Insurance Contract" },
    { step: "06", title: language === "ko" ? "수출통관·선적" : "Export Customs & Loading" },
    { step: "07", title: language === "ko" ? "선적서류·대금 회수" : "Shipping Docs & Collection" },
    { step: "08", title: language === "ko" ? "관세환급·사후관리" : "Duty Drawback & Aftercare" },
  ];

  return (
    <div className="bg-white text-black font-sans min-h-screen flex flex-col selection:bg-[#FF6A00] selection:text-white">
      <Header />

      {/* Sub-Navigation Bar */}
      <div className="fixed top-[56px] md:top-[68px] left-0 w-full z-40 bg-white py-2 md:py-2.5 border-b border-neutral-100 md:border-b-0">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex justify-center gap-6 md:gap-8 text-xs sm:text-sm font-bold">
          <Link
            href="/trade"
            className="pb-1.5 border-b-2 border-[#FF6A00] text-[#FF6A00]"
          >
            {language === "ko" ? "종합무역" : "General Trade"}
          </Link>
          <Link
            href="/brand"
            className="pb-1.5 border-b-2 border-transparent text-neutral-400 hover:text-neutral-800 transition-colors"
          >
            {language === "ko" ? "브랜드 소개" : "Brand"}
          </Link>
        </div>
      </div>

      <main className="flex-1 flex flex-col justify-start md:justify-center pt-28 md:pt-32 pb-12 md:pb-16">
        <div className="max-w-[1400px] w-full mx-auto px-6 md:px-10">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <span className="text-sm md:text-base font-bold text-[#FF6A00] block mb-1.5">
              {language === "ko" ? "무역 사업" : "Trade Business"}
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-neutral-900 mb-2 md:mb-3">
              {language === "ko" ? "종합무역" : "General Trade"}
            </h1>
            <p className="text-base md:text-lg text-neutral-600 font-medium break-keep">
              {language === "ko"
                ? "어센틱코리아는 본질(Authenticity)에 충실한 산업 자원과 장인의 고유성이 담긴 제품을 수출입·유통하는 무역회사입니다."
                : "Authentic Korea is a trading company importing and exporting industrial resources and artisan products."}
            </p>
          </div>

          <div className="flex flex-col gap-3.5 md:gap-4">
            {/* 1. 산업재 종합무역 (Accordion) */}
            <div className="bg-neutral-50 border border-neutral-200/70 rounded-xl overflow-hidden transition-all">
              <button
                onClick={() => setIsIndustrialOpen((prev) => !prev)}
                className="w-full px-4 md:px-6 py-4 md:py-5 flex items-center justify-between text-left gap-3"
              >
                <p className="text-base md:text-lg text-neutral-800 font-medium leading-relaxed break-keep">
                  <strong className="font-black text-neutral-900">
                    {language === "ko" ? "산업재 종합무역" : "Industrial General Trade"}
                  </strong>{" "}
                  :{" "}
                  {language === "ko"
                    ? "고객사의 사양과 요청에 최적화된 해외 원부자재 소싱부터 수출입 통관, 현장 공급까지 직접 진행합니다."
                    : "Direct sourcing of overseas raw materials, customs clearance, and on-site supply tailored to client specifications."}
                </p>
                <span className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 flex-shrink-0">
                  {isIndustrialOpen ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isIndustrialOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 md:px-6 pb-6 md:pb-8 pt-4 md:pt-5 border-t border-neutral-200/60 space-y-6 md:space-y-8">
                      {/* 수입·유통 프로세스 */}
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-[#FF6A00] mb-3 md:mb-4">
                          {language === "ko" ? "수입·유통 프로세스" : "Import & Distribution Process"}
                        </h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-3">
                          {importSteps.map((item) => (
                            <div
                              key={item.step}
                              className="relative bg-white border border-neutral-200/80 rounded-xl p-3 sm:p-4 pt-6 text-center flex items-center justify-center min-h-[76px] sm:min-h-[84px]"
                            >
                              <span className="absolute top-0 right-2.5 sm:right-3 bg-[#FF6A00] text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-b-md">
                                {item.step}
                              </span>
                              <p className="text-sm md:text-base font-bold text-neutral-800 leading-snug break-keep">
                                {item.title}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 수출 프로세스 */}
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-[#FF6A00] mb-3 md:mb-4">
                          {language === "ko" ? "수출 프로세스" : "Export Process"}
                        </h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-3">
                          {exportSteps.map((item) => (
                            <div
                              key={item.step}
                              className="relative bg-white border border-neutral-200/80 rounded-xl p-3 sm:p-4 pt-6 text-center flex items-center justify-center min-h-[76px] sm:min-h-[84px]"
                            >
                              <span className="absolute top-0 right-2.5 sm:right-3 bg-[#FF6A00] text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-b-md">
                                {item.step}
                              </span>
                              <p className="text-sm md:text-base font-bold text-neutral-800 leading-snug break-keep">
                                {item.title}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. 한국-프랑스 문화상품 플랫폼 구축 (Static) */}
            <div className="bg-neutral-50 border border-neutral-200/70 rounded-xl px-4 md:px-6 py-4 md:py-5">
              <p className="text-base md:text-lg text-neutral-800 font-medium leading-relaxed mb-3 break-keep">
                <strong className="font-black text-neutral-900">
                  {language === "ko"
                    ? "한국-프랑스 문화상품 플랫폼 구축"
                    : "Korea-France Cultural Product Platform"}
                </strong>{" "}
                :{" "}
                {language === "ko"
                  ? "한국과 프랑스의 각 지역 장인의 고유성을 담은 제품을 수출입 유통합니다."
                  : "Importing and exporting products reflecting the uniqueness of regional artisans in Korea and France."}
              </p>
              <ul className="space-y-1.5 text-base md:text-lg text-neutral-700 pl-1">
                <li className="flex items-center gap-2">
                  <span className="font-bold text-neutral-900">·</span>
                  <span>{language === "ko" ? "남도지역 특산품" : "Namdo Regional Specialties"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-bold text-neutral-900">·</span>
                  <span>{language === "ko" ? "지역의 공예작가 작품" : "Local Craft Artisan Works"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-bold text-neutral-900">·</span>
                  <span>
                    {language === "ko"
                      ? "해외 디자인 조명, 수공예 인테리어 소품"
                      : "Overseas Design Lighting & Handmade Interior Props"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
