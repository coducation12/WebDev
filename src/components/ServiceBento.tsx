"use client";

import { motion } from "framer-motion";
import { Ship, Globe, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import Link from "next/link";

import { useLanguage } from "@/context/LanguageContext";

const APPLE_EASE = [0.32, 0.72, 0, 1];
const ASSET = "/assets/images/active";

const logisticsImages = ["bento_logis_s1.jpg", "bento_logis_s2.jpg", "bento_logis_s3.jpg", "bento_logis_s4.jpg"];
const tradeImages = ["bento_trade_s1.jpg", "bento_trade_s2.jpg", "bento_trade_s3.jpg"];

interface ServiceBentoProps {
  isHoverEnabled?: boolean;
}

export default function ServiceBento({ isHoverEnabled = true }: ServiceBentoProps) {
  const { language } = useLanguage();
  const [logIdx, setLogIdx] = useState(0);
  const [tradeIdx, setTradeIdx] = useState(0);

  useEffect(() => {
    const logInterval = setInterval(() => {
      setLogIdx((prev) => (prev + 1) % logisticsImages.length);
    }, 4000); // 4초마다 물류 이미지 변경

    const tradeInterval = setInterval(() => {
      setTradeIdx((prev) => (prev + 1) % tradeImages.length);
    }, 4500); // 4.5초마다 무역 이미지 변경 (주기를 다르게 하여 자연스럽게)

    return () => {
      clearInterval(logInterval);
      clearInterval(tradeInterval);
    };
  }, []);

  const logisticsMenus = [
    language === "ko" ? "국제물류서비스" : "International Logistics",
    language === "ko" ? "물류 인프라" : "Logistics Infrastructure",
    language === "ko" ? "물류 장비 개발 및 제작" : "Equipment Development",
    language === "ko" ? "물류 전문 포장" : "Specialized Packaging"
  ];

  const tradeMenus = [
    language === "ko" ? "수출입 사업 소개" : "Business Sourcing",
    language === "ko" ? "수출입 업무 대행" : "Import/Export Agency",
    language === "ko" ? "자사 브랜드 소개" : "Brand Introduction"
  ];

  return (
    <div className="w-full max-w-[1500px] mx-auto py-8 md:py-12 px-6 md:px-10 flex flex-col">
      
      {/* Cards Container */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Logistics Card */}
        <Link 
          href="/logistics" 
          className={cn(
            "flex-1 block group transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
            isHoverEnabled ? "md:hover:flex-[1.6] cursor-pointer" : "cursor-default pointer-events-none"
          )}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[32px] md:rounded-[48px] overflow-hidden bg-neutral-900 aspect-square md:aspect-auto md:h-[620px] lg:h-[720px] w-full border border-white/10 shadow-2xl"
          >
          {/* Background Images */}
          {logisticsImages.map((img, idx) => (
            <Image 
              key={img}
              src={`${ASSET}/${img}`} 
              alt="Logistics" fill 
              className={cn(
                "object-cover transition-all duration-1000 group-hover:brightness-105",
                idx === logIdx ? "opacity-60 group-hover:opacity-100 scale-100" : "opacity-0 scale-110"
              )} 
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:opacity-70 transition-opacity duration-700" />
          
          <div className="relative h-full p-8 md:p-12 flex flex-col justify-between">
            <div className="flex justify-between items-start">
                  <h3 className="text-white font-black text-4xl md:text-6xl tracking-tighter uppercase leading-none mb-4" style={{ fontFamily: "var(--font-title)" } /* style={{ fontFamily: "var(--font-serif)" }} */}>
                    LOGISTICS
                  </h3>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-md rounded-2xl md:rounded-[22px] flex items-center justify-center border border-white/20 text-white group-hover:bg-[#6A0DAD] group-hover:border-[#6A0DAD] transition-all duration-500">
                <Ship size={24} className="md:w-8 md:h-8" strokeWidth={1.5} />
              </div>
            </div>

            {/* Menu items hidden on mobile for clarity */}
            <div className="hidden md:block space-y-6">
              {logisticsMenus.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 w-full text-left group/item cursor-default"
                >
                  <div className={cn(
                    "w-2 h-2 rounded-full transition-all duration-500",
                    logIdx === idx ? "bg-[#6A0DAD] scale-150 shadow-[0_0_12px_#6A0DAD]" : "bg-white/30"
                  )} />
                  <span className={cn(
                    "transition-all duration-300",
                    logIdx === idx 
                    ? "text-white text-2xl font-black tracking-tight" 
                    : "text-white/40 text-lg font-bold"
                  )}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        </Link>

        {/* Trade Card */}
        <Link 
          href="/trade" 
          className={cn(
            "flex-1 block group transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
            isHoverEnabled ? "md:hover:flex-[1.6] cursor-pointer" : "cursor-default pointer-events-none"
          )}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-[32px] md:rounded-[48px] overflow-hidden bg-neutral-900 aspect-square md:aspect-auto md:h-[620px] lg:h-[720px] w-full border border-white/10 shadow-2xl"
          >
          {/* Background Images */}
          {tradeImages.map((img, idx) => (
            <Image 
              key={img}
              src={`${ASSET}/${img}`} 
              alt="Trade" fill 
              className={cn(
                "object-cover transition-all duration-1000 group-hover:brightness-105",
                idx === tradeIdx ? "opacity-60 group-hover:opacity-100 scale-100" : "opacity-0 scale-110"
              )} 
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:opacity-70 transition-opacity duration-700" />
          
          <div className="relative h-full p-8 md:p-12 flex flex-col justify-between">
            <div className="flex justify-between items-start">
                  <h3 className="text-white font-black text-4xl md:text-6xl tracking-tighter uppercase leading-none mb-4" style={{ fontFamily: "var(--font-title)" } /* style={{ fontFamily: "var(--font-serif)" }} */}>
                    TRADE
                  </h3>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-md rounded-2xl md:rounded-[22px] flex items-center justify-center border border-white/20 text-white group-hover:bg-[#6A0DAD] group-hover:border-[#6A0DAD] transition-all duration-500">
                <Globe size={24} className="md:w-8 md:h-8" strokeWidth={1.5} />
              </div>
            </div>

            {/* Menu items hidden on mobile for clarity */}
            <div className="hidden md:block space-y-6">
              {tradeMenus.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 w-full text-left group/item cursor-default"
                >
                  <div className={cn(
                    "w-2 h-2 rounded-full transition-all duration-500",
                    tradeIdx === idx ? "bg-[#6A0DAD] scale-150 shadow-[0_0_12px_#6A0DAD]" : "bg-white/30"
                  )} />
                  <span className={cn(
                    "transition-all duration-300",
                    tradeIdx === idx 
                    ? "text-white text-2xl font-black tracking-tight" 
                    : "text-white/40 text-lg font-bold"
                  )}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        </Link>
      </div>
    </div>
  );
}

