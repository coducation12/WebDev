"use client";

import { motion } from "framer-motion";
import { Ship, Globe, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const APPLE_EASE = [0.32, 0.72, 0, 1];
const ASSET = "/assets/images";

const logisticsImages = ["extra_3.jpg", "extra_29.png", "extra_32.png", "extra_5.jpg"];
const tradeImages = ["extra_13.jpg", "extra_25.jpg", "extra_35.png"];

export default function ServiceBento() {
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

  return (
    <div className="w-full max-w-[1500px] mx-auto py-24 px-6 md:px-10 flex flex-col">
      
      {/* Outer Header: Company Name & Message */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="mb-10 flex items-baseline justify-center gap-0 flex-wrap">
          <span className="relative inline-block w-40 h-[3rem] md:w-[18rem] md:h-[6rem] translate-y-1.5 md:translate-y-3">
            <Image src={`${ASSET}/logo.png`} alt="BORA" fill className="object-contain" />
          </span>
          <span className="text-4xl md:text-6xl font-black tracking-tighter text-neutral-900 -ml-2 md:-ml-8">
            에서 세계로.
          </span>
        </h2>
        <p className="text-lg md:text-xl font-semibold text-neutral-500 tracking-tight">
          물류 인프라를 지배하고, 글로벌 무역의 새로운 길을 엽니다.
        </p>
      </motion.div>

      {/* Cards Container */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Logistics Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group rounded-[32px] md:rounded-[48px] overflow-hidden bg-neutral-900 h-[300px] md:h-[750px] flex-1 border border-white/10 shadow-2xl"
        >
          {/* Background Images */}
          {logisticsImages.map((img, idx) => (
            <Image 
              key={img}
              src={`${ASSET}/${img}`} 
              alt="Logistics" fill 
              className={cn(
                "object-cover transition-all duration-1000",
                idx === logIdx ? "opacity-60 scale-100" : "opacity-0 scale-110"
              )} 
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          
          <div className="relative h-full p-8 md:p-12 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white font-black text-2xl md:text-4xl tracking-tighter uppercase leading-[0.9]">
                  Logistics<br />Excellence
                </h3>
              </div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-md rounded-2xl md:rounded-[22px] flex items-center justify-center border border-white/20 text-white group-hover:bg-[#6A0DAD] group-hover:border-[#6A0DAD] transition-all duration-500">
                <Ship size={24} className="md:w-8 md:h-8" strokeWidth={1.5} />
              </div>
            </div>

            {/* Menu items hidden on mobile for clarity */}
            <div className="hidden md:block space-y-6">
              {[
                "국제물류 서비스 (포워딩)",
                "국제 물류시스템 운영",
                "물류 장비 개발 및 제작",
                "물류 협력사 전문 포장"
              ].map((item, idx) => (
                <button
                  key={idx}
                  onMouseEnter={() => setLogIdx(idx)}
                  className="flex items-center gap-4 w-full text-left group/item"
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
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trade Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group rounded-[32px] md:rounded-[48px] overflow-hidden bg-neutral-900 h-[300px] md:h-[750px] flex-1 border border-white/10 shadow-2xl"
        >
          {/* Background Images */}
          {tradeImages.map((img, idx) => (
            <Image 
              key={img}
              src={`${ASSET}/${img}`} 
              alt="Trade" fill 
              className={cn(
                "object-cover transition-all duration-1000",
                idx === tradeIdx ? "opacity-60 scale-100" : "opacity-0 scale-110"
              )} 
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          
          <div className="relative h-full p-8 md:p-12 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white font-black text-2xl md:text-4xl tracking-tighter uppercase leading-[0.9]">
                  Global<br />Trade
                </h3>
              </div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-md rounded-2xl md:rounded-[22px] flex items-center justify-center border border-white/20 text-white group-hover:bg-[#6A0DAD] group-hover:border-[#6A0DAD] transition-all duration-500">
                <Globe size={24} className="md:w-8 md:h-8" strokeWidth={1.5} />
              </div>
            </div>

            {/* Menu items hidden on mobile for clarity */}
            <div className="hidden md:block space-y-6">
              {[
                "글로벌 수출입 서비스",
                "구매 및 판매대행 서비스",
                "시장 조사 및 판로 개척"
              ].map((item, idx) => (
                <button
                  key={idx}
                  onMouseEnter={() => setTradeIdx(idx)}
                  className="flex items-center gap-4 w-full text-left group/item"
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
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
