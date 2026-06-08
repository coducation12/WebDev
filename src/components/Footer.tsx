"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const ASSET = "/assets/images/active";

interface FooterProps {
  minimal?: boolean;
}

export default function Footer({ minimal = false }: FooterProps) {
  return (
    <footer className={`bg-white px-6 md:px-10 border-t border-neutral-100 ${minimal ? "py-16" : "pt-32 pb-16"}`}>
      <div className="max-w-[1400px] mx-auto">
        {!minimal && (
          <div className="flex flex-col md:flex-row justify-between items-start gap-20 md:gap-40 mb-24">
            <div className="max-w-sm flex gap-5">
              <div className="w-[6px] bg-[#6A0DAD] rounded-[1px] self-stretch" />
              <div className="flex flex-col py-0.5">
                <h4 className="text-[#6A0DAD] font-black text-[25px] leading-tight tracking-tight mb-4">
                  Every step,<br />
                  One partner
                </h4>
                
                <div className="relative w-[150px] h-[52px] mb-5">
                  <Image src={`${ASSET}/sys_logo_dark.png`} alt="BORA" fill className="object-contain object-left" />
                </div>

                <div className="text-[13px] text-neutral-400 font-medium leading-relaxed space-y-1">
                  <span className="font-bold text-neutral-600 block mb-1">(주)보라로지스</span>
                  <p>전남 광양시 항만8로 18-35 (도이동)</p>
                  <p>T: 061-795-9951~3</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-20">
              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6">사업 영역</h5>
                <ul className="text-xs font-semibold flex flex-col gap-4 text-neutral-400">
                  <li><Link href="/logistics#intl-service" className="hover:text-[#6A0DAD] transition-colors">국제물류 서비스</Link></li>
                  <li><Link href="/logistics#intl-system" className="hover:text-[#6A0DAD] transition-colors">국제 물류시스템</Link></li>
                  <li><Link href="/logistics#equipment" className="hover:text-[#6A0DAD] transition-colors">물류 장비 개발·제작</Link></li>
                  <li><Link href="/trade#export-import" className="hover:text-[#6A0DAD] transition-colors">글로벌 수출입 서비스</Link></li>
                </ul>
              </div>
              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6">Family Companies</h5>
                <ul className="text-xs font-semibold flex flex-col gap-4 text-neutral-400">
                  <li><Link href="/company?tab=0" className="hover:text-[#6A0DAD] transition-colors">보라로지스</Link></li>
                  <li><Link href="/company?tab=1" className="hover:text-[#6A0DAD] transition-colors">보라트랜스</Link></li>
                  <li><Link href="/company?tab=2" className="hover:text-[#6A0DAD] transition-colors">보라로지텍</Link></li>
                  <li><Link href="/company?tab=3" className="hover:text-[#6A0DAD] transition-colors">어센틱코리아</Link></li>
                  <li><Link href="/company?tab=4" className="hover:text-[#6A0DAD] transition-colors">RE&UP</Link></li>
                </ul>
              </div>
              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6">문의</h5>
                <p className="text-xs font-semibold text-neutral-400 leading-loose">
                  비즈니스 파트너십 또는 <br />
                  서비스 문의를 환영합니다.
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
