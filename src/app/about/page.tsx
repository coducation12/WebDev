"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  BarChart3, Globe, Users, Database, ClipboardCheck, Award, 
  UserCircle, Clock, PiggyBank, Ship, Warehouse, Truck, ChevronRight 
} from "lucide-react";
import { cn } from "@/lib/utils";

const APPLE_EASE = [0.32, 0.72, 0, 1];
const ASSET = "/assets/images";

export default function AboutPage() {
  return (
    <div className="bg-white text-black font-sans min-h-screen flex flex-col selection:bg-[#6A0DAD] selection:text-white">
      <Header />
      <main className="flex-1 pt-32 pb-32">
        
        {/* ─── 1. 소개의 글 (Introduction) ─── */}
        <section id="overview" className="px-6 md:px-10 mb-32 max-w-[1200px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: APPLE_EASE }}
          >
            <h2 className="text-3xl md:text-4xl font-black mb-10 text-neutral-900 border-b-2 border-neutral-900 pb-4 inline-block">
              소개의 글
            </h2>
            <div className="text-lg md:text-xl text-neutral-700 leading-loose space-y-6 font-medium">
              <p>
                보라로지스의 2012년 설립 이후, 유수의 파트너사들과의 긴밀한 신뢰를 바탕으로 성장해 왔습니다.<br />
                물류 전문 역량을 집약한 보라로지스, 보라로지텍, 보라트랜스의 유기적인 연계를 통해 차별화된 국제 물류 인프라를 완성하였습니다.
              </p>
              <p>
                이제 우리는 안정적인 물류 제어 능력과 탄탄한 국내외 네트워크를 발판 삼아, 국경을 넘어 세상의 가치 있는 것들을 연결하는 글로벌 수출입 무역 비즈니스로의 도약을 완성해 나가고 있습니다.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ─── 2. VISION ─── */}
        <section className="px-6 md:px-10 mb-40 max-w-[1400px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: APPLE_EASE }}
          >
            <h2 className="text-3xl md:text-4xl font-black mb-12 text-neutral-900 border-b-2 border-neutral-900 pb-4 inline-block uppercase">
              VISION
            </h2>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-4 items-stretch justify-center relative">
              
              {/* Card 1: Proven Experience */}
              <div className="flex-1 bg-white border-2 border-[#EADDF0] rounded-3xl p-8 flex flex-col items-center text-center relative z-10 hover:shadow-xl hover:border-[#6A0DAD] transition-all duration-500">
                <div className="w-20 h-20 bg-[#6A0DAD] rounded-full flex items-center justify-center text-white mb-6 shadow-lg">
                  <BarChart3 size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-black text-[#6A0DAD] mb-3">Proven Experience</h3>
                <p className="text-neutral-600 font-bold mb-8">
                  수년간 축적된<br />물류 데이터와 현장 경험의 힘.
                </p>
                <div className="w-full space-y-3 mt-auto">
                  {[
                    { icon: Database, text: "수년간 데이터 축적" },
                    { icon: ClipboardCheck, text: "현장 경험 기반 노하우" },
                    { icon: Award, text: "검증된 전문성" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-[#F8F3FA] rounded-full px-5 py-3 text-[#6A0DAD]">
                      <item.icon size={20} strokeWidth={2} />
                      <span className="font-bold text-[15px]">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="hidden lg:flex items-center justify-center w-12 flex-shrink-0 z-0">
                <ChevronRight size={40} className="text-[#EADDF0]" />
              </div>

              {/* Card 2: Seamless Service */}
              <div className="flex-[1.2] bg-white border-2 border-[#EADDF0] rounded-3xl p-8 flex flex-col items-center text-center relative z-10 hover:shadow-xl hover:border-[#6A0DAD] transition-all duration-500">
                <div className="w-20 h-20 bg-[#6A0DAD] rounded-full flex items-center justify-center text-white mb-6 shadow-lg">
                  <Globe size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-black text-[#6A0DAD] mb-3">Seamless Service</h3>
                <p className="text-neutral-600 font-bold mb-10">
                  수출입 대행부터 물류까지,<br />중단 없는 비즈니스 설계.
                </p>
                
                {/* Flow Diagram */}
                <div className="flex items-center justify-between w-full max-w-sm mx-auto mb-10">
                  {[
                    { icon: Globe, label: "수출입 대행" },
                    { icon: Ship, label: "국제 운송" },
                    { icon: Warehouse, label: "물류 관리" },
                    { icon: Truck, label: "배송" }
                  ].map((step, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 relative">
                      <div className="w-12 h-12 bg-[#F8F3FA] rounded-full flex items-center justify-center text-[#6A0DAD] z-10 relative">
                        <step.icon size={20} strokeWidth={1.5} />
                      </div>
                      <span className="text-[12px] font-bold text-neutral-600 whitespace-nowrap">{step.label}</span>
                      {i < 3 && (
                        <div className="absolute top-6 left-12 w-full h-[2px] bg-neutral-100 flex items-center justify-end -translate-y-1/2 -z-0" style={{ width: 'calc(100% + 10px)' }}>
                          <ChevronRight size={12} className="text-neutral-300 absolute -right-2" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-auto w-full">
                  <div className="bg-[#BC90C1] text-white rounded-full py-3 px-6 font-bold text-[15px] shadow-md">
                    원스톱 · 끊김 없는 · 효율적 프로세스
                  </div>
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="hidden lg:flex items-center justify-center w-12 flex-shrink-0 z-0">
                <ChevronRight size={40} className="text-[#EADDF0]" />
              </div>

              {/* Card 3: Total Support */}
              <div className="flex-1 bg-white border-2 border-[#EADDF0] rounded-3xl p-8 flex flex-col items-center text-center relative z-10 hover:shadow-xl hover:border-[#6A0DAD] transition-all duration-500">
                <div className="w-20 h-20 bg-[#6A0DAD] rounded-full flex items-center justify-center text-white mb-6 shadow-lg">
                  <Users size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-black text-[#6A0DAD] mb-3">Total Support</h3>
                <p className="text-neutral-600 font-bold mb-8">
                  고객사는 <span className="text-[#6A0DAD]">유통</span>에만 집중하세요.<br />
                  효율적인 <span className="text-[#6A0DAD]">비용</span>과 <span className="text-[#6A0DAD]">시간 관리</span>는<br />우리의 몫입니다.
                </p>
                <div className="w-full space-y-3 mt-auto">
                  {[
                    { icon: UserCircle, text: "고객은 유통에 집중" },
                    { icon: Clock, text: "시간 절약" },
                    { icon: PiggyBank, text: "비용 최적화" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-[#F8F3FA] rounded-full px-5 py-3 text-[#6A0DAD]">
                      <item.icon size={20} strokeWidth={2} />
                      <span className="font-bold text-[15px]">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </section>

        {/* ─── 3. LOGO (CI) ─── */}
        <section id="ci" className="px-6 md:px-10 max-w-[1400px] mx-auto scroll-mt-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: APPLE_EASE }}
          >
            <h2 className="text-3xl md:text-4xl font-black mb-12 text-neutral-900 border-b-2 border-neutral-900 pb-4 inline-block uppercase">
              LOGO
            </h2>

            <div className="flex justify-start mb-16">
              <div className="relative w-full max-w-[320px] h-[120px]">
                <Image src={`${ASSET}/logo.png`} alt="BORA Logo" fill className="object-contain object-left" />
              </div>
            </div>

            {/* Brand Concept Text */}
            <div className="text-base md:text-lg text-neutral-700 leading-loose font-medium max-w-4xl border-t border-neutral-100 pt-10 mb-16">
              <p className="mb-4">
                두 개의 기하학적 도형이 연결되어 날개처럼 펼쳐진 형태로, 서로 다른 세계가 조화롭게 이어지는 모습을 형상화 했습니다.<br/>
                이는 무역과 물류가 유기적으로 연결되어 지속적으로 발전하는 과정을 표현합니다.
              </p>
              <p>
                역동성과 창조적 혁신을 담은 브랜드는 세계를 연결하고 미래를 만들어가는 BORA의 기업 철학을 상징합니다.
              </p>
            </div>

            {/* Vertical Color System (Flexbox layout to guarantee mathematically identical widths) */}
            <div className="flex flex-col lg:flex-row lg:gap-16 gap-10 w-full max-w-[1100px] mx-auto pt-12 border-t border-neutral-100">
              
              {/* Main Color Column (1/6 width on desktop) */}
              <div className="w-full lg:w-1/6 space-y-4">
                <div className="text-neutral-900 font-black text-lg sm:text-xl tracking-tight mb-5 flex items-center gap-2.5">
                  <span className="w-1.5 h-4.5 bg-[#662483] rounded-full inline-block" />
                  메인컬러
                </div>
                <div className="bg-[#662483] rounded-3xl overflow-hidden shadow-md flex flex-col justify-end p-6 h-[360px] w-full text-white">
                  <div>
                    <h5 className="text-sm sm:text-base lg:text-lg font-black tracking-tight mb-1">BORA PURPLE</h5>
                    <span className="text-xs font-bold text-white/70 block mb-5">PANTONE 2098C</span>
                    <div className="space-y-1 text-xs text-white/85 font-semibold leading-normal">
                      <p><span className="text-white/60 font-bold mr-1">CMYK:</span> C75 M100</p>
                      <p><span className="text-white/60 font-bold mr-1">RGB:</span> 102, 36, 131</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub Color Column (5/6 width on desktop, containing 5 contiguous panels) */}
              <div className="w-full lg:w-5/6 space-y-4">
                <div className="text-neutral-900 font-black text-lg sm:text-xl tracking-tight mb-5 flex items-center gap-2.5">
                  <span className="w-1.5 h-4.5 bg-[#BC90C1] rounded-full inline-block" />
                  서브컬러
                </div>
                <div className="rounded-3xl overflow-hidden shadow-md grid grid-cols-1 sm:grid-cols-5 h-auto sm:h-[360px] w-full">
                  
                  {/* Panel 1: Light Purple */}
                  <div className="bg-[#BC90C1] p-6 flex flex-col justify-end min-h-[240px] sm:min-h-0 text-white">
                    <div>
                      <h5 className="text-sm sm:text-base font-black tracking-tight mb-1">LIGHT PURPLE</h5>
                      <span className="text-xs font-bold text-white/70 block mb-5">PANTONE 2572C</span>
                      <div className="space-y-1 text-xs text-white/85 font-semibold leading-normal">
                        <p><span className="text-white/60 font-bold mr-1">CMYK:</span> C30 M50</p>
                        <p><span className="text-white/60 font-bold mr-1">RGB:</span> 188, 144, 193</p>
                      </div>
                    </div>
                  </div>

                  {/* Panel 2: Gradient Step 1 */}
                  <div className="bg-[#CBA9D1] p-6 flex flex-col justify-end min-h-[240px] sm:min-h-0 text-white">
                    <div>
                      <h5 className="text-sm sm:text-base font-black tracking-tight mb-1">GRADIENT L1</h5>
                      <span className="text-xs font-bold text-white/70 block mb-5">Light Lavender</span>
                      <div className="space-y-1 text-xs text-white/85 font-semibold leading-normal">
                        <p><span className="text-white/60 font-bold mr-1">CMYK:</span> C23 M39</p>
                        <p><span className="text-white/60 font-bold mr-1">RGB:</span> 203, 169, 209</p>
                      </div>
                    </div>
                  </div>

                  {/* Panel 3: Gradient Step 2 */}
                  <div className="bg-[#B692C3] p-6 flex flex-col justify-end min-h-[240px] sm:min-h-0 text-white">
                    <div>
                      <h5 className="text-sm sm:text-base font-black tracking-tight mb-1">GRADIENT L2</h5>
                      <span className="text-xs font-bold text-white/70 block mb-5">Medium Violet</span>
                      <div className="space-y-1 text-xs text-white/85 font-semibold leading-normal">
                        <p><span className="text-white/60 font-bold mr-1">CMYK:</span> C33 M48</p>
                        <p><span className="text-white/60 font-bold mr-1">RGB:</span> 182, 146, 195</p>
                      </div>
                    </div>
                  </div>

                  {/* Panel 4: Gradient Step 3 */}
                  <div className="bg-[#511966] p-6 flex flex-col justify-end min-h-[240px] sm:min-h-0 text-white">
                    <div>
                      <h5 className="text-sm sm:text-base font-black tracking-tight mb-1">GRADIENT L3</h5>
                      <span className="text-xs font-bold text-white/70 block mb-5">Deep Purple</span>
                      <div className="space-y-1 text-xs text-white/85 font-semibold leading-normal">
                        <p><span className="text-white/60 font-bold mr-1">CMYK:</span> C75 M100 K30</p>
                        <p><span className="text-white/60 font-bold mr-1">RGB:</span> 81, 25, 102</p>
                      </div>
                    </div>
                  </div>

                  {/* Panel 5: Point Color */}
                  <div className="bg-[#EC6608] p-6 flex flex-col justify-end min-h-[240px] sm:min-h-0 text-white">
                    <div>
                      <h5 className="text-sm sm:text-base font-black tracking-tight mb-1">BORA POINT</h5>
                      <span className="text-xs font-bold text-white/70 block mb-5">PANTONE 1655C</span>
                      <div className="space-y-1 text-xs text-white/85 font-semibold leading-normal">
                        <p><span className="text-white/60 font-bold mr-1">CMYK:</span> M70 Y100</p>
                        <p><span className="text-white/60 font-bold mr-1">RGB:</span> 236, 102, 8</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </motion.div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
