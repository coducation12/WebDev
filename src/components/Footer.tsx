"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const ASSET = "/assets/images/active";

interface FooterProps {
  minimal?: boolean;
}

export default function Footer({ minimal = false }: FooterProps) {
  const { language } = useLanguage();

  return (
    <footer className="bg-white border-t border-neutral-100 py-5 md:py-6 w-full">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col gap-3">
        {!minimal && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500">
              <div className="relative w-[76px] h-[24px] flex-shrink-0">
                <Image src={`${ASSET}/sys_logo_dark.png`} alt="BORA" fill className="object-contain object-left" />
              </div>
              <span className="font-bold text-neutral-700">
                {language === "ko" ? "(주)보라로지스" : "Bora Logis Co., Ltd."}
              </span>
              <span className="hidden sm:inline text-neutral-300">|</span>
              <span>
                {language === "ko"
                  ? "전남 광양시 항만8로 18-35 (도이동)"
                  : "18-35, Hangman 8-ro, Gwangyang-si, Jeollanam-do"}
              </span>
              <span className="hidden sm:inline text-neutral-300">|</span>
              <span>T: 061-795-9951~3</span>
            </div>

            <nav className="flex flex-wrap items-center gap-4 md:gap-6 text-xs font-semibold text-neutral-500">
              <Link href="/company" className="hover:text-[#6A0DAD] transition-colors">
                {language === "ko" ? "회사소개" : "About"}
              </Link>
              <Link href="/logistics" className="hover:text-[#6A0DAD] transition-colors">
                {language === "ko" ? "물류사업" : "Logistics"}
              </Link>
              <Link href="/trade" className="hover:text-[#FF6A00] transition-colors">
                {language === "ko" ? "무역사업" : "Trade"}
              </Link>
              <Link href="/contact" className="hover:text-neutral-900 transition-colors">
                {language === "ko" ? "문의하기" : "Contact"}
              </Link>
            </nav>
          </div>
        )}

        <div className="flex justify-between items-center text-[11px] text-neutral-400 pt-2 border-t border-neutral-100/80">
          <span>© 2026 BORA. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
