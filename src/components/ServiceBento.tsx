"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface ServiceBentoProps {
  isHoverEnabled?: boolean;
}

export default function ServiceBento({ isHoverEnabled = true }: ServiceBentoProps) {
  const { language } = useLanguage();

  return (
    <div className="w-full max-w-[1100px] mx-auto py-4 md:py-8 px-4 flex flex-col items-center justify-center">
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-0">
        {/* Left Circle: Logistics */}
        <Link
          href="/logistics"
          className={cn(
            "group relative z-10 w-[230px] h-[230px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] rounded-full bg-white border-[10px] sm:border-[16px] md:border-[18px] border-neutral-200/85 flex flex-col items-center justify-between text-center py-5 sm:py-10 md:py-12 px-4 sm:px-6 transition-all duration-700 ease-in-out",
            isHoverEnabled
              ? "hover:border-[#6A0DAD]/85 hover:shadow-[0_0_24px_rgba(106,13,173,0.35),0_0_60px_rgba(106,13,173,0.18)] cursor-pointer"
              : "pointer-events-none cursor-default"
          )}
        >
          <span className="px-3.5 sm:px-5 py-0.5 sm:py-1 rounded-full border border-[#6A0DAD] text-[#6A0DAD] text-[11px] sm:text-xs md:text-sm font-bold tracking-tight">
            {language === "ko" ? "물류 사업" : "Logistics Business"}
          </span>

          <div className="flex flex-col items-center">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#6A0DAD] mb-1.5 sm:mb-2.5 leading-none">
              Logistics
            </h2>
            <p className="text-[11px] sm:text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
              {language === "ko"
                ? "물류를 설계하고 신뢰를 운송합니다."
                : "Designing logistics, delivering trust."}
            </p>
          </div>

          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-100 text-neutral-500 group-hover:bg-[#6A0DAD]/15 group-hover:text-[#6A0DAD] flex items-center justify-center transition-colors duration-500 pointer-events-none">
            <ArrowRight size={14} />
          </span>
        </Link>

        {/* Center Bridge with White Butterfly Mark */}
        <div
          className="hidden md:flex items-center justify-center w-28 h-20 -mx-4 bg-neutral-200/85 z-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="relative w-20 h-16">
            <Image
              src="/assets/images/mark.png"
              alt="Bora Mark"
              fill
              className="object-contain brightness-0 invert"
            />
          </div>
        </div>

        {/* Right Circle: Trade */}
        <Link
          href="/trade"
          className={cn(
            "group relative z-10 w-[230px] h-[230px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] rounded-full bg-white border-[10px] sm:border-[16px] md:border-[18px] border-neutral-200/85 flex flex-col items-center justify-between text-center py-5 sm:py-10 md:py-12 px-4 sm:px-6 transition-all duration-700 ease-in-out",
            isHoverEnabled
              ? "hover:border-[#FF6A00]/85 hover:shadow-[0_0_24px_rgba(255,106,0,0.35),0_0_60px_rgba(255,106,0,0.18)] cursor-pointer"
              : "pointer-events-none cursor-default"
          )}
        >
          <span className="px-3.5 sm:px-5 py-0.5 sm:py-1 rounded-full border border-[#FF6A00] text-[#FF6A00] text-[11px] sm:text-xs md:text-sm font-bold tracking-tight">
            {language === "ko" ? "무역 사업" : "Trade Business"}
          </span>

          <div className="flex flex-col items-center">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#FF6A00] mb-1.5 sm:mb-2.5 leading-none">
              Trade
            </h2>
            <p className="text-[11px] sm:text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
              {language === "ko"
                ? "세계의 벽을 낮추고 가치를 높입니다."
                : "Lowering borders, elevating value."}
            </p>
          </div>

          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-100 text-neutral-500 group-hover:bg-[#FF6A00]/15 group-hover:text-[#FF6A00] flex items-center justify-center transition-colors duration-500 pointer-events-none">
            <ArrowRight size={14} />
          </span>
        </Link>
      </div>
    </div>
  );
}
