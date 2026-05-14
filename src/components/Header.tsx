"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu } from "lucide-react";

const ASSET = "/assets/images";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-white/90 backdrop-blur-xl border-b border-neutral-100 py-3 shadow-sm" : "py-6"}`}>
      <div className="max-w-[1400px] mx-auto px-10 flex justify-between items-center relative">
        
        {/* Left: Logo */}
        <Link href="/" className="relative w-28 h-8 flex-shrink-0">
          <Image src={`${ASSET}/logo.png`} alt="BORA" fill className="object-contain object-left" />
        </Link>

        {/* Center: Menus with Individual Dropdowns */}
        <div className="hidden md:flex items-center gap-20 absolute left-1/2 -translate-x-1/2">
          {[
            { 
              name: "회사 소개", 
              subs: ["보라로지스", "보라트랜스", "보라로지텍", "보라인터네셔널", "보라RE&UP"] 
            },
            { 
              name: "물류 서비스", 
              subs: ["국제 물류 서비스", "국제 물류 시스템", "물류 장비 개발 및 제작", "물류 전문 포장"] 
            },
            { 
              name: "글로벌 무역", 
              subs: ["글로벌 수출입 서비스", "구매 및 판매대행", "시장 조사 및 판로 개척"] 
            },
            { 
              name: "미래 사업", 
              subs: ["재생에너지 물류", "태양광 · 풍력 설비", "업사이클 비즈니스", "스마트 팩토리 솔루션"] 
            },
          ].map((menu) => (
            <div key={menu.name} className="group relative py-4">
              <button className="text-[14px] font-bold text-neutral-600 hover:text-[#6A0DAD] transition-colors flex items-center gap-1">
                {menu.name}
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                <div className="bg-white/95 backdrop-blur-xl border border-neutral-100 rounded-2xl shadow-2xl p-4 min-w-[200px] flex flex-col gap-1">
                  {menu.subs.map((sub) => (
                    <Link 
                      key={sub} 
                      href={menu.name === "회사 소개" ? `/company?tab=${menu.subs.indexOf(sub)}` : "#"} 
                      className="px-4 py-2.5 rounded-xl text-[13px] font-semibold text-neutral-500 hover:text-[#6A0DAD] hover:bg-neutral-50 transition-all whitespace-nowrap text-center"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Inquiry Button */}
        <Link 
          href="#" 
          className="group flex-shrink-0 px-6 py-2.5 bg-neutral-900 text-white rounded-full text-[12px] font-bold hover:bg-neutral-800 transition-all flex items-center gap-2 shadow-lg shadow-neutral-200"
        >
          문의하기
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

        <button className="md:hidden">
          <Menu size={20} />
        </button>
      </div>
    </nav>
  );
}
