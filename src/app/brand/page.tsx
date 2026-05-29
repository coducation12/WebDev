"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Compass, Hammer } from "lucide-react";

const APPLE_EASE = [0.32, 0.72, 0, 1];

export default function BrandPage() {
  return (
    <div className="bg-white text-black font-sans min-h-screen flex flex-col selection:bg-[#6A0DAD] selection:text-white">
      <Header />
      
      <main className="flex-1 flex flex-col justify-center items-center pt-48 pb-32 px-6 md:px-10 max-w-[1400px] mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: APPLE_EASE }}
          className="text-center w-full max-w-2xl"
        >
          {/* Brand Icon or Symbol */}
          <div className="w-20 h-20 bg-[#F3E8FF] border border-[#6A0DAD]/15 rounded-3xl flex items-center justify-center text-[#6A0DAD] mb-8 mx-auto shadow-sm">
            <Compass size={36} className="animate-spin-slow" style={{ animationDuration: '8s' }} />
          </div>

          <h4 className="text-[#6A0DAD] font-black tracking-widest text-sm mb-4 uppercase">Authentic Brand</h4>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tighter text-neutral-900 mb-8">
            브랜드 소개
          </h1>
          
          {/* Card containing preparation details */}
          <div className="bg-neutral-50 border border-neutral-100 rounded-[32px] p-8 md:p-12 shadow-sm flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4 animate-bounce">
              <Hammer size={20} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#6A0DAD] mb-3">준비중입니다.</h3>
            <p className="text-sm md:text-base text-neutral-500 font-semibold leading-relaxed max-w-md">
              더욱 깊이 있는 가치와 어센틱만의 고유한 브랜드 스토리로 찾아뵙겠습니다. 잠시만 기다려 주시기 바랍니다.
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
