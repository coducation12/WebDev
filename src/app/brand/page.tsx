"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Compass, Hammer } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const APPLE_EASE = [0.32, 0.72, 0, 1];

export default function BrandPage() {
  const { language } = useLanguage();

  return (
    <div className="bg-white text-black font-sans min-h-screen flex flex-col selection:bg-[#FF6A00] selection:text-white">
      <Header />
      
      <main className="flex-1 flex flex-col justify-center items-center pt-48 pb-32 px-6 md:px-10 max-w-[1400px] mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: APPLE_EASE }}
          className="text-center w-full max-w-2xl"
        >
          {/* Brand Icon or Symbol */}
          <div className="w-20 h-20 bg-[#FFF5EF] border border-[#FF6A00]/15 rounded-3xl flex items-center justify-center text-[#FF6A00] mb-8 mx-auto shadow-sm">
            <Compass size={36} className="animate-spin-slow" style={{ animationDuration: '8s' }} />
          </div>

          <h4 className="text-[#FF6A00] font-black tracking-widest text-sm mb-4 uppercase">Authentic Korea</h4>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tighter text-neutral-900 mb-8">
            {language === "ko" ? "브랜드 소개" : "Brand Introduction"}
          </h1>
          
          {/* Card containing preparation details */}
          <div className="bg-neutral-50 border border-neutral-100 rounded-[32px] p-8 md:p-12 shadow-sm flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4 animate-bounce">
              <Hammer size={20} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#FF6A00] mb-3">
              {language === "ko" ? "준비중입니다." : "Coming Soon."}
            </h3>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
