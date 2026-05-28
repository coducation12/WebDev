"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, Globe, ChevronDown } from "lucide-react";

const ASSET = "/assets/images";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLang, setCurrentLang] = useState("한국어");

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
              subs: ["회사 개요", "CI", "Family Companies"] 
            },
            { 
              name: "물류 서비스", 
              subs: ["국제 물류 서비스", "물류 인프라", "물류 장비 개발 및 제작", "물류 전문 포장"] 
            },
            { 
              name: "글로벌 무역", 
              subs: ["글로벌 수출입 서비스", "구매 및 판매대행", "시장 조사 및 판로 개척"] 
            },
            { 
              name: "문의하기", 
              subs: ["물류 문의", "무역 문의"] 
            },
          ].map((menu) => (
            <div key={menu.name} className="group relative py-4">
              <Link 
                href={menu.name === "회사 소개" ? "/about" : menu.name === "물류 서비스" ? "/logistics" : menu.name === "글로벌 무역" ? "/trade" : "#"}
                className="text-[14px] font-bold text-neutral-600 hover:text-[#6A0DAD] transition-colors flex items-center gap-1"
              >
                {menu.name}
              </Link>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                <div className="bg-white/95 backdrop-blur-xl border border-neutral-100 rounded-2xl shadow-2xl p-4 min-w-[200px] flex flex-col gap-1">
                  {menu.subs.map((sub) => {
                    let href = "#";
                    if (menu.name === "회사 소개") {
                      if (sub === "회사 개요") href = "/about";
                      else if (sub === "CI") href = "/about#ci";
                      else if (sub === "Family Companies") href = "/company";
                    } else if (menu.name === "물류 서비스") {
                      if (sub === "국제 물류 서비스") href = "/logistics#intl-service";
                      else if (sub === "물류 인프라") href = "/logistics#infra";
                      else if (sub === "물류 장비 개발 및 제작") href = "/logistics#equipment";
                      else if (sub === "물류 전문 포장") href = "/logistics#packaging";
                    } else if (menu.name === "글로벌 무역") {
                      if (sub === "글로벌 수출입 서비스") href = "/trade#export-import";
                      else if (sub === "구매 및 판매대행") href = "/trade#agency";
                      else if (sub === "시장 조사 및 판로 개척") href = "/trade#market";
                    }
                    return (
                      <Link 
                        key={sub} 
                        href={href} 
                        className="px-4 py-2.5 rounded-xl text-[13px] font-semibold text-neutral-500 hover:text-[#6A0DAD] hover:bg-neutral-50 transition-all whitespace-nowrap text-center"
                      >
                        {sub}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Language Dropdown */}
        <div className="relative group flex-shrink-0">
          <button className="flex items-center gap-3 px-4 py-2 border border-neutral-200 rounded-full text-[12px] font-bold text-neutral-600 hover:text-neutral-900 bg-white hover:bg-neutral-50 transition-all shadow-sm min-w-[95px] justify-between">
            <div className="flex items-center gap-2">
              <Globe size={14} className="flex-shrink-0" />
              <span className="whitespace-nowrap">{currentLang}</span>
            </div>
            <ChevronDown size={12} className="opacity-60 group-hover:rotate-180 transition-transform duration-300 flex-shrink-0" />
          </button>
          
          <div className="absolute right-0 top-full pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
            <div className="bg-white/95 backdrop-blur-xl border border-neutral-100 rounded-2xl shadow-2xl p-2 min-w-[130px] flex flex-col gap-1">
              <button 
                onClick={() => setCurrentLang("한국어")}
                className={`px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-all text-left flex items-center justify-between whitespace-nowrap ${currentLang === "한국어" ? "text-[#6A0DAD] bg-[#F9F5FF]" : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50"}`}
              >
                한국어
              </button>
              <button 
                onClick={() => setCurrentLang("English")}
                className={`px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-all text-left flex items-center justify-between whitespace-nowrap ${currentLang === "English" ? "text-[#6A0DAD] bg-[#F9F5FF]" : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50"}`}
              >
                English
              </button>
            </div>
          </div>
        </div>

        <button className="md:hidden">
          <Menu size={20} />
        </button>
      </div>
    </nav>
  );
}
