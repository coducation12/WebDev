"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ASSET = "/assets/images/active";

interface FooterProps {
  minimal?: boolean;
}

export default function Footer({ minimal = false }: FooterProps) {
  const { language } = useLanguage();

  return (
    <footer className={`bg-white px-6 md:px-10 border-t border-neutral-100 ${minimal ? "py-16" : "pt-32 pb-16"}`}>
      <div className="max-w-[1400px] mx-auto">
        {!minimal && (
          <div className="flex flex-col md:flex-row justify-between items-start gap-20 md:gap-40 mb-24">
            <div className="max-w-sm flex gap-5">
              <div className="w-[6px] bg-[#6A0DAD] rounded-[1px] self-stretch" />
              <div className="flex flex-col py-0.5">
                <h4 className="text-[#6A0DAD] font-black text-[25px] leading-tight tracking-tight mb-4" style={{ fontFamily: "var(--font-title)" }}>
                  Every step,<br />
                  One partner
                </h4>
                
                <div className="relative w-[150px] h-[52px] mb-5">
                  <Image src={`${ASSET}/sys_logo_dark.png`} alt="BORA" fill className="object-contain object-left" />
                </div>

                <div className="text-[13px] text-neutral-400 font-medium leading-relaxed space-y-1">
                  <span className="font-bold text-neutral-600 block mb-1">
                    {language === "ko" ? "(주)보라로지스" : "Bora Logis Co., Ltd."}
                  </span>
                  <p>
                    {language === "ko" ? "전남 광양시 항만8로 18-35 (도이동)" : "18-35, Hangman 8-ro, Gwangyang-si, Jeollanam-do, Republic of Korea"}
                  </p>
                  <p>
                    {language === "ko" ? "T: 061-795-9951~3" : "T: +82-61-795-9951~3"}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-20">
              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6 font-sans">
                  {language === "ko" ? "사업 영역" : "Business Areas"}
                </h5>
                <ul className="text-xs font-semibold flex flex-col gap-4 text-neutral-400">
                  <li><Link href="/logistics#intl-service" className="hover:text-[#6A0DAD] transition-colors">{language === "ko" ? "국제물류 서비스" : "International Logistics"}</Link></li>
                  <li><Link href="/logistics#intl-system" className="hover:text-[#6A0DAD] transition-colors">{language === "ko" ? "국제 물류시스템" : "International Logistics System"}</Link></li>
                  <li><Link href="/logistics#equipment" className="hover:text-[#6A0DAD] transition-colors">{language === "ko" ? "물류 장비 개발·제작" : "Logistics Equipment Development & Manufacturing"}</Link></li>
                  <li><Link href="/trade#export-import" className="hover:text-[#6A0DAD] transition-colors">{language === "ko" ? "글로벌 수출입 서비스" : "Global Import/Export"}</Link></li>
                </ul>
              </div>
              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6 font-sans">Family Companies</h5>
                <ul className="text-xs font-semibold flex flex-col gap-4 text-neutral-400">
                  <li><Link href="/company?tab=0" className="hover:text-[#6A0DAD] transition-colors">{language === "ko" ? "보라로지스" : "Bora Logis"}</Link></li>
                  <li><Link href="/company?tab=1" className="hover:text-[#6A0DAD] transition-colors">{language === "ko" ? "보라트랜스" : "Bora Trans"}</Link></li>
                  <li><Link href="/company?tab=2" className="hover:text-[#6A0DAD] transition-colors">{language === "ko" ? "보라로지텍" : "Bora Logitech"}</Link></li>
                  <li><Link href="/company?tab=3" className="hover:text-[#6A0DAD] transition-colors">{language === "ko" ? "어센틱코리아" : "Authentic Korea"}</Link></li>
                  <li><Link href="/company?tab=4" className="hover:text-[#6A0DAD] transition-colors">RE&UP</Link></li>
                </ul>
              </div>
              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6 font-sans">
                  {language === "ko" ? "문의" : "Inquiries"}
                </h5>
                <p className="text-xs font-semibold text-neutral-400 leading-loose">
                  {language === "ko" ? (
                    <>비즈니스 파트너십 또는 <br />서비스 문의를 환영합니다.</>
                  ) : (
                    <>We welcome business partnerships <br />or service inquiries.</>
                  )}
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 mt-4 text-neutral-900 font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all">
                  Contact <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className={`flex flex-col md:flex-row justify-between items-center gap-6 ${!minimal ? "pt-8 border-t border-neutral-100" : ""}`}>
          {minimal && (
            <div className="relative w-24 h-8 opacity-30 grayscale">
              <Image src={`${ASSET}/sys_logo_dark.png`} alt="BORA" fill className="object-contain object-left" />
            </div>
          )}
          <p className="text-[10px] font-medium text-neutral-300 uppercase tracking-widest">© 2026 BORALOGIS Co.,Ltd. All Rights Reserved.</p>
          {minimal && (
             <div className="flex gap-8 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
               <Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link>
               <Link href="#" className="hover:text-black transition-colors">Terms of Service</Link>
             </div>
          )}
        </div>
      </div>
    </footer>
  );
}
