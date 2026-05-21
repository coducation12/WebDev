"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { Ship, Truck, Package, Factory, ShieldCheck, Cog, Shield, Network } from "lucide-react";

const APPLE_EASE = [0.32, 0.72, 0, 1];
const ASSET = "/assets/images";

export default function LogisticsPage() {
  return (
    <div className="bg-white text-black font-sans min-h-screen flex flex-col selection:bg-[#6A0DAD] selection:text-white">
      <Header />
      <main className="flex-1 pt-32 pb-32">
        
        {/* ─── Hero Banner ─── */}
        <section className="px-6 md:px-10 mb-20 max-w-[1400px] mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: APPLE_EASE }}
          >
            <h4 className="text-[#6A0DAD] font-bold tracking-widest text-sm mb-4 uppercase">Logistics Service</h4>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter text-neutral-900 mb-6">
              글로벌 물류 인프라의<br />새로운 기준
            </h1>
            <p className="text-lg md:text-xl text-neutral-500 font-medium max-w-2xl mx-auto">
              자유무역지역 보세창고 운영부터 전문 포장, 특수 운송까지 완벽한 물류 솔루션을 제공합니다.
            </p>
          </motion.div>
        </section>

        {/* ─── 1. 국제 물류 서비스 (#intl-service) ─── */}
        <section id="intl-service" className="py-24 px-6 md:px-10 bg-neutral-50 scroll-mt-20">
          <div className="max-w-[1400px] mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#6A0DAD]/10 rounded-full flex items-center justify-center text-[#6A0DAD]">
                  <Ship size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter">국제 물류 서비스 (수·출입 종합물류)</h2>
              </div>
              <p className="text-lg text-neutral-600 font-medium">국제물류 주선업(포워딩), 검역대행업, 창고업 등 종합물류 서비스를 직접 운영합니다.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[32px] p-10 shadow-sm border border-neutral-100 flex flex-col"
              >
                <h3 className="text-2xl font-black mb-6 text-[#6A0DAD]">자유무역지역 보세창고 운영</h3>
                <p className="text-neutral-500 font-medium mb-8 leading-relaxed">
                  (주)보라로지스는 광양컨테이너부두 동측배후단지에서 부지 4만평(132,000㎡), 창고 2만평(66,000㎡) 규모의 국제물류센터를 직접 운영하고 있습니다. 정규직원 35명과 리치스태커, 지게차 등 다양한 자체 물류기기를 보유하고 있습니다.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <div className="p-4 bg-neutral-50 rounded-2xl">
                    <span className="font-bold text-neutral-900 block mb-1">보관 / 재고관리</span>
                    <span className="text-sm text-neutral-500">24시간 CCTV 및 온·습도 유지</span>
                  </div>
                  <div className="p-4 bg-neutral-50 rounded-2xl">
                    <span className="font-bold text-neutral-900 block mb-1">상·하차 / 입·출고</span>
                    <span className="text-sm text-neutral-500">컨테이너라이싱 등 적재 하역</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-[32px] p-10 shadow-sm border border-neutral-100 flex flex-col"
              >
                <h3 className="text-2xl font-black mb-6 text-[#6A0DAD]">운송, 특수운송 서비스</h3>
                <p className="text-neutral-500 font-medium mb-8 leading-relaxed">
                  (주)보라트랜스는 셔틀 및 내륙 운송 시스템을 구축하여 비용과 시간을 획기적으로 절감합니다. 수입 통관 전 세관 규정을 준수한 보세 운송부터 위험물/특수화물 물류까지 책임집니다.
                </p>
                <ul className="space-y-3 mt-auto font-medium text-neutral-700">
                  <li className="flex items-center gap-3"><Truck size={18} className="text-[#6A0DAD]"/> 셔틀/보세 운송 (항만 ↔ 보세창고 전용)</li>
                  <li className="flex items-center gap-3"><Truck size={18} className="text-[#6A0DAD]"/> 최적 배차 및 경로 설계 컨테이너 운송</li>
                  <li className="flex items-center gap-3"><Truck size={18} className="text-[#6A0DAD]"/> 팔레트·벌크 화물 전용 카고 운송</li>
                  <li className="flex items-center gap-3"><Truck size={18} className="text-[#6A0DAD]"/> 태양광소재, 풍력장비 등 특수화물 전담운송</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── 2. 국제 물류 시스템 (#intl-system) ─── */}
        <section id="intl-system" className="py-24 px-6 md:px-10 bg-white border-y border-neutral-100 scroll-mt-20">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] lg:h-[600px] rounded-[40px] overflow-hidden bg-neutral-900 shadow-xl"
            >
              <Image src={`${ASSET}/extra_29.png`} alt="Logistics System" fill className="object-cover opacity-80" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-[#6A0DAD]/10 rounded-full flex items-center justify-center text-[#6A0DAD] mb-6">
                <Network size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-6">국제 물류 시스템 운영</h2>
              <p className="text-lg text-neutral-600 font-medium mb-10 leading-relaxed">
                자동화 창고 운영 및 로보틱스 시스템을 통해 정확한 재고관리와 스마트 물류 환경을 구축합니다. 수량과 품질을 정밀 점검하여 불량 및 오배송을 원천 차단합니다.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "자동화 창고 운영", desc: "로보틱스 기반의 자동화 관리 시스템 운영" },
                  { title: "데이터 연동 입출고", desc: "자체개발 프로그램으로 생산 및 재고 데이터 관리" },
                  { title: "스마트 검수 / 검역", desc: "입출고 시 철저한 수량 파악 및 품질 점검 체계화" },
                  { title: "제조 / 반가공", desc: "조립, 반가공, 소포장, 라벨링 작업의 체계적 처리" }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1 w-2 h-2 rounded-full bg-[#6A0DAD] flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-neutral-900">{item.title}</h4>
                      <p className="text-neutral-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── 3. 물류 장비 개발 및 제작 (#equipment) ─── */}
        <section id="equipment" className="py-24 px-6 md:px-10 bg-neutral-900 text-white scroll-mt-20">
          <div className="max-w-[1400px] mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-6">물류 장비 개발 및 제작</h2>
              <p className="text-lg text-white/70 font-medium">
                전문적인 창고 운영 노하우를 바탕으로 최고의 효율을 자랑하는 고객 맞춤형 물류기기를 직접 설계하고 생산합니다.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/10 border border-white/20 p-8 rounded-3xl backdrop-blur-sm">
                <Cog size={32} className="text-[#BC90C1] mb-6" />
                <h3 className="text-xl font-bold mb-4">보라로지텍 자체생산</h3>
                <p className="text-white/60">율촌산단 전남테크노파크 내 자체공장을 운영하며 철박스, 포장기계, 각종 물류기기를 기획 설계·제작합니다.</p>
              </div>
              <div className="bg-white/10 border border-white/20 p-8 rounded-3xl backdrop-blur-sm">
                <Factory size={32} className="text-[#BC90C1] mb-6" />
                <h3 className="text-xl font-bold mb-4">글로벌 협력 생산</h3>
                <p className="text-white/60">중국 청도 협력업체에서 기본 작업을 진행하고 국내 율촌공장에서 조립, 용접 등 후작업을 거쳐 고품질을 완성합니다.</p>
              </div>
              <div className="bg-white/10 border border-white/20 p-8 rounded-3xl backdrop-blur-sm">
                <Package size={32} className="text-[#BC90C1] mb-6" />
                <h3 className="text-xl font-bold mb-4">맞춤형 렉(Rack) 제작</h3>
                <p className="text-white/60">이동식 렉(Mobile Racking System), 파렛트 렉 등 창고 공간을 최적화하고 보관 용량을 극대화하는 솔루션을 제공합니다.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. 물류 전문 포장 (#packaging) ─── */}
        <section id="packaging" className="py-24 px-6 md:px-10 bg-white scroll-mt-20">
          <div className="max-w-[1400px] mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16"
            >
              <div className="max-w-2xl">
                <div className="w-12 h-12 bg-[#6A0DAD]/10 rounded-full flex items-center justify-center text-[#6A0DAD] mb-6">
                  <Shield size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">제품생산라인 협력파트너</h2>
                <p className="text-lg text-neutral-600 font-medium">포장, 출고, 시설정비를 총망라하며 최고의 안전과 노무 관리 체계를 갖췄습니다.</p>
              </div>
              <div className="px-6 py-3 bg-[#6A0DAD] text-white rounded-full font-bold text-sm">
                (주)보라로지텍 (여수산단 포장협력)
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 flex flex-col justify-center">
                <h3 className="text-2xl font-black mb-4">치밀한 안전관리</h3>
                <p className="text-neutral-600 font-medium leading-relaxed mb-6">
                  전담 안전관리담당자를 배치하고 상시 직원 안전교육을 실시합니다. 선제적인 위험요소 제거와 자동화 설비 도입으로 안전관리 극대화 혁신을 이룹니다.
                </p>
                <ul className="space-y-2 text-sm text-neutral-500">
                  <li>• 전직원 안전 상해보험 가입</li>
                  <li>• 일상적인 작업동선 개선 및 화물동선 합리화</li>
                  <li>• 노사간 신뢰구축 및 지속적인 혁신팀 운영</li>
                </ul>
              </div>
              
              <div className="relative h-[300px] md:h-auto rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-100">
                <Image src={`${ASSET}/extra_10.jpg`} alt="Factory Operations" fill className="object-cover opacity-80" />
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
