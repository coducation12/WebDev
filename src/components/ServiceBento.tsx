"use client";

import { motion } from "framer-motion";
import { Ship, Globe, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const APPLE_EASE = [0.32, 0.72, 0, 1];
const ASSET = "/assets/images";

const logisticsImages = ["extra_4.jpg", "AI.jpg", "extra_1.jpg", "extra_5.jpg"];
const tradeImages = ["extra_11.jpg", "trade_sales_agency.png", "trade_market_research.png"];

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
    <div className="w-full max-w-[1400px] mx-auto py-24 px-6 md:px-10 flex flex-col">
      
      {/* Outer Header: Company Name & Message */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center"
      >
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-neutral-900 mb-4">
          보라로지스
        </h2>
        <p className="text-lg md:text-xl font-semibold text-neutral-500 tracking-tight">
          물류 인프라를 지배하고, 글로벌 무역의 새로운 길을 엽니다.
        </p>
      </motion.div>

      {/* Cards Container */}
      <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8 h-[50vh] min-h-[400px]">
      
      {/* Logistics Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: APPLE_EASE }}
        viewport={{ once: true }}
        className="relative rounded-[48px] overflow-hidden group cursor-pointer transition-all duration-700 ease-out flex-1 md:hover:flex-[1.3] shadow-2xl"
      >
        {/* Auto Slide Backgrounds */}
        {logisticsImages.map((img, idx) => (
          <Image 
            key={img}
            src={`${ASSET}/${img}`} 
            alt={`Logistics ${idx}`} 
            fill 
            className={cn(
              "object-cover transition-all duration-[1500ms] ease-in-out group-hover:scale-105",
              idx === logIdx ? "opacity-100 z-0" : "opacity-0 -z-10"
            )} 
          />
        ))}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-90 z-10" />
        
        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-20">
          <div className="flex justify-between items-start">
             <div className="w-14 h-14 rounded-[18px] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-colors duration-500 group-hover:bg-[#6A0DAD] group-hover:border-[#6A0DAD]">
                <Ship size={28} strokeWidth={1.5} />
             </div>
             <div className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:bg-white group-hover:text-black transition-all duration-500">
                <ArrowUpRight size={20} />
             </div>
          </div>
          
          <div>
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white/60 mb-3 block">Core Pillar 01</span>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">LOGISTICS<br />EXCELLENCE</h3>
            
            <div className="space-y-3">
               {["국제물류 서비스 (포워딩)", "국제 물류시스템 운영", "물류 장비 개발 및 제작", "물류 협력사 전문 포장"].map((item, i) => (
                 <div key={i} className="flex items-center text-white/80 font-medium text-base gap-4 transform transition-all duration-500 group-hover:translate-x-2">
                   <div className={cn(
                     "w-1.5 h-1.5 rounded-full transition-colors duration-500",
                     i === logIdx ? "bg-[#6A0DAD] scale-125 shadow-[0_0_8px_#6A0DAD]" : "bg-white/30"
                   )} />
                   <span className={i === logIdx ? "text-white" : ""}>{item}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Trade Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: APPLE_EASE }}
        viewport={{ once: true }}
        className="relative rounded-[48px] overflow-hidden group cursor-pointer transition-all duration-700 ease-out flex-1 md:hover:flex-[1.3] shadow-2xl"
      >
        {/* Auto Slide Backgrounds */}
        {tradeImages.map((img, idx) => (
          <Image 
            key={img}
            src={`${ASSET}/${img}`} 
            alt={`Trade ${idx}`} 
            fill 
            className={cn(
              "object-cover transition-all duration-[1500ms] ease-in-out group-hover:scale-105",
              idx === tradeIdx ? "opacity-100 z-0" : "opacity-0 -z-10"
            )} 
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-90 z-10" />
        
        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-20">
          <div className="flex justify-between items-start">
             <div className="w-14 h-14 rounded-[18px] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-colors duration-500 group-hover:bg-[#6A0DAD] group-hover:border-[#6A0DAD]">
                <Globe size={28} strokeWidth={1.5} />
             </div>
             <div className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:bg-white group-hover:text-black transition-all duration-500">
                <ArrowUpRight size={20} />
             </div>
          </div>
          
          <div>
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white/60 mb-3 block">Core Pillar 02</span>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">GLOBAL<br />TRADE</h3>
            
            <div className="space-y-3">
               {["글로벌 수출입 서비스", "구매 및 판매대행 서비스", "시장 조사 및 판로 개척"].map((item, i) => (
                 <div key={i} className="flex items-center text-white/80 font-medium text-base gap-4 transform transition-all duration-500 group-hover:translate-x-2">
                   <div className={cn(
                     "w-1.5 h-1.5 rounded-full transition-colors duration-500",
                     i === tradeIdx ? "bg-[#6A0DAD] scale-125 shadow-[0_0_8px_#6A0DAD]" : "bg-white/30"
                   )} />
                   <span className={i === tradeIdx ? "text-white" : ""}>{item}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </motion.div>
      </div>

    </div>
  );
}
