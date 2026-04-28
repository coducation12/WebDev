"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ChevronRight, ChevronDown, Menu, Package, Ship, Globe, Warehouse, Truck, Users, Building2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const APPLE_EASE = [0.32, 0.72, 0, 1];
const ASSET = "/assets/images";

export default function AppleEsqueHome() {
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Hero Logo Animations — heroRef(250vh) 기준
  const logoScale = useTransform(smoothProgress, [0, 0.3], [1, 0.6]);
  const logoY = useTransform(smoothProgress, [0, 0.3], [0, -80]);
  const logoOpacity = useTransform(smoothProgress, [0.15, 0.35], [1, 0]);
  const contentOpacity = useTransform(smoothProgress, [0.4, 0.55], [0, 1]);
  const contentY = useTransform(smoothProgress, [0.4, 0.55], [40, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white text-black font-sans selection:bg-neutral-800 selection:text-white">
      {/* ─── 1. Header ─── */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? "bg-white/80 backdrop-blur-2xl border-b border-neutral-100 py-3" : "py-6"}`}>
        <div className="max-w-[1400px] mx-auto px-10 flex justify-between items-center">
          <Link href="/" className="relative w-28 h-8">
            <Image src={`${ASSET}/logo.png`} alt="BORA" fill className="object-contain object-left" />
          </Link>
          
          <div className="hidden md:flex items-center gap-10 text-[13px] font-semibold text-neutral-400">
            {["물류 서비스", "글로벌 무역", "회사 소개"].map(item => (
              <Link key={item} href="#" className="hover:text-black transition-colors">{item}</Link>
            ))}
            <Link href="#" className="px-6 py-2 bg-neutral-900 text-white rounded-full text-xs hover:bg-neutral-700 transition-all">
              문의하기
            </Link>
          </div>

          <button className="md:hidden">
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* ─── 2. Hero Reveal Section ─── */}
      <section ref={heroRef} className="relative h-[250vh] bg-white">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
          {/* Animated Hero Mark — 보라 심볼 */}
          <motion.div 
            style={{ scale: logoScale, y: logoY, opacity: logoOpacity }}
            className="relative z-10 flex flex-col items-center"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: APPLE_EASE }}
              className="relative w-32 h-32 md:w-48 md:h-48 mb-12"
            >
              <Image src={`${ASSET}/mark.png`} alt="BORA" fill className="object-contain" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-center"
            >
              물류로 무역을 잇다.
            </motion.h1>
          </motion.div>

          {/* Revealed Sub Content — 화면 정중앙 고정 */}
          <motion.div 
            style={{ opacity: contentOpacity, y: contentY }}
            className="absolute inset-0 z-20 flex items-center justify-center"
          >
            <div className="max-w-5xl text-center px-10">
              <h2 className="mb-8 flex items-baseline justify-center gap-0 flex-wrap">
                <span className="relative inline-block w-52 h-[4.5rem] md:w-[22rem] md:h-[7rem] translate-y-2">
                  <Image src={`${ASSET}/logo.png`} alt="BORA" fill className="object-contain" />
                </span>
                <span className="text-5xl md:text-7xl font-bold tracking-tight -ml-4 md:-ml-8">에서 세계로.</span>
              </h2>
              <p className="text-lg md:text-xl text-neutral-500 font-medium leading-relaxed max-w-2xl mx-auto mb-12">
                광양 자유무역지역 4만 평 물류 인프라 위에 <br />
                물류, 운송, 무역을 하나로 연결합니다.
              </p>
              <div className="relative w-full max-w-3xl mx-auto h-48 md:h-72 rounded-2xl overflow-hidden shadow-lg mb-10">
                <Image src={`${ASSET}/extra_35.png`} alt="글로벌 물류 네트워크" fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
              </div>
              <div className="flex justify-center gap-10 font-semibold text-neutral-900">
                 <span className="flex items-center gap-2 cursor-pointer hover:text-neutral-500 transition-colors text-sm">
                   사업 소개 <ChevronRight size={16} />
                 </span>
                 <span className="flex items-center gap-2 cursor-pointer hover:text-neutral-500 transition-colors text-sm">
                   문의하기 <ArrowRight size={16} />
                 </span>
              </div>
            </div>
          </motion.div>

          <footer className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-neutral-300 z-10">
             <span className="text-[10px] font-bold uppercase tracking-widest">Scroll to explore</span>
             <ChevronDown size={20} className="animate-bounce" />
          </footer>
        </div>
      </section>

      {/* ─── 3. Business Showcase — 교차 레이아웃 ─── */}
      <section className="py-32 md:py-40 bg-neutral-50 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-28"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-neutral-400 mb-4 block">Core Business</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">핵심 사업 영역</h2>
          </motion.div>

          {/* --- Row 1: 물류 인프라 (이미지 왼쪽) --- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mb-32"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-lg" style={{height: '450px'}}>
              <Image src={`${ASSET}/extra_5.jpg`} alt="물류 인프라" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center">
                  <Warehouse size={18} className="text-white" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-neutral-400">Logistics Infrastructure</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                광양 자유무역지역<br />물류단지
              </h3>
              <p className="text-neutral-500 text-base md:text-lg font-medium leading-relaxed mb-8 max-w-md">
                4만 평 규모의 물류단지와 2만 평 보세창고를 자체 운영합니다. 입출고부터 재고관리까지, 원스톱 물류 솔루션을 제공합니다.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 cursor-pointer hover:gap-3 transition-all">
                자세히 보기 <ArrowRight size={16} />
              </span>
            </div>
          </motion.div>

          {/* --- Row 2: 해상 운송 (이미지 오른쪽) --- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mb-32"
          >
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center">
                  <Ship size={18} className="text-white" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-neutral-400">Forwarding & Transport</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                포워딩 &<br />내륙운송
              </h3>
              <p className="text-neutral-500 text-base md:text-lg font-medium leading-relaxed mb-8 max-w-md">
                광양항을 기반으로 해상 포워딩, 검역대행, 내륙운송을 자체 인프라로 수행합니다. 수출입 전 과정을 일괄 관리합니다.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 cursor-pointer hover:gap-3 transition-all">
                자세히 보기 <ArrowRight size={16} />
              </span>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-lg order-1 md:order-2" style={{height: '450px'}}>
              <Image src={`${ASSET}/extra_4.jpg`} alt="해상 운송" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </motion.div>

          {/* --- Row 3: 글로벌 무역 (이미지 왼쪽) --- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-lg" style={{height: '450px'}}>
              <Image src={`${ASSET}/extra_9.jpg`} alt="글로벌 무역" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center">
                  <Globe size={18} className="text-white" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-neutral-400">Global Trade</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                중국·동남아<br />수출입 무역
              </h3>
              <p className="text-neutral-500 text-base md:text-lg font-medium leading-relaxed mb-8 max-w-md">
                K-food, K-culture 수출을 중심으로 중국·동남아 시장을 개척합니다. 물류 위의 무역, 보라 그룹만의 경쟁력입니다.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 cursor-pointer hover:gap-3 transition-all">
                자세히 보기 <ArrowRight size={16} />
              </span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─── 4. Full-Width Image Banner ─── */}
      <section className="relative h-[80vh] overflow-hidden">
        <Image src={`${ASSET}/extra_8.jpg`} alt="24시간 물류 운영" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center text-white max-w-3xl px-6"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-white/50 mb-8 block">Operations</span>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-8">
              24시간, 365일.
            </h2>
            <p className="text-lg md:text-xl text-white/70 font-medium leading-relaxed max-w-xl mx-auto">
              4조 3교대 운영 체제. 자체 설계 물류 장비와 <br />
              스마트 자동화 시스템으로 쉼 없이 가동합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── 5. Statistics ─── */}
      <section className="py-32 md:py-40 bg-white px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">숫자로 보는 보라 그룹</h2>
            <p className="text-neutral-400 text-lg font-medium">광양 자유무역지역 최대 규모의 종합 물류 인프라</p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "40,000", unit: "평", label: "물류 인프라", icon: Package },
              { value: "20,000", unit: "평", label: "보세창고", icon: Warehouse },
              { value: "95", unit: "명", label: "전문 인력", icon: Users },
              { value: "3", unit: "사", label: "그룹 계열사", icon: Building2 },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="text-center p-8 rounded-3xl bg-neutral-50 hover:bg-neutral-100 transition-colors"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <stat.icon size={22} strokeWidth={1.5} className="text-neutral-600" />
                </div>
                <span className="block text-4xl md:text-5xl font-bold tracking-tight mb-1">
                  {stat.value}<span className="text-lg text-neutral-400 ml-0.5">{stat.unit}</span>
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-neutral-400">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. Group Companies ─── */}
      <section className="py-32 md:py-40 bg-neutral-50 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-neutral-400 mb-4 block">Group Affiliates</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">보라 그룹 계열사</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "보라로지스(주)",
                role: "국제물류 · 보세창고 · 운송",
                desc: "광양항 자유무역지역 물류단지를 거점으로 국제물류, 보세창고 운영, 검역대행, 내륙운송 서비스를 제공합니다.",
                tags: ["국제물류", "보세창고", "검역대행", "내륙운송"],
                color: "from-neutral-900 to-neutral-700",
              },
              {
                name: "보라로지텍(주)",
                role: "자동화 설비 · 기술 서비스",
                desc: "물류 현장의 산업 설비 유지보수와 자동화 기술 솔루션을 제공합니다. 스마트 물류 인프라의 핵심 파트너입니다.",
                tags: ["설비관리", "자동화", "유지보수", "기술지원"],
                color: "from-blue-900 to-blue-700",
              },
              {
                name: "RE&UP(주)",
                role: "글로벌 무역 · K-culture 수출",
                desc: "물류 인프라 위에 무역을 연결합니다. K-food, K-culture 수출을 중심으로 중국·동남아 시장을 개척합니다.",
                tags: ["수출입", "K-food", "K-culture", "동남아 무역"],
                color: "from-purple-900 to-purple-700",
              },
            ].map((company, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.7 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500"
              >
                <div className={`h-32 bg-gradient-to-br ${company.color} flex items-end p-8`}>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{company.name}</h3>
                </div>
                <div className="p-8">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4 block">{company.role}</span>
                  <p className="text-neutral-500 text-sm font-medium leading-relaxed mb-6">{company.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {company.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-neutral-100 rounded-full text-[11px] font-semibold text-neutral-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. CTA Banner ─── */}
      <section className="py-32 bg-neutral-900 px-6 md:px-10">
        <div className="max-w-[900px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-8">
              함께 성장할 파트너를 <br /> 찾고 있습니다.
            </h2>
            <p className="text-lg text-neutral-400 font-medium mb-12 max-w-lg mx-auto leading-relaxed">
              보라 그룹의 물류 인프라와 글로벌 무역 네트워크를 <br />
              당신의 비즈니스에 연결하세요.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="#" className="px-10 py-4 bg-white text-black rounded-full font-bold text-sm hover:bg-neutral-200 transition-colors">
                파트너십 문의
              </Link>
              <Link href="#" className="px-10 py-4 border border-neutral-600 text-neutral-300 rounded-full font-bold text-sm hover:border-neutral-400 hover:text-white transition-all">
                회사 소개서 다운로드
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 8. Footer ─── */}
      <footer className="bg-white pt-32 pb-16 px-6 md:px-10 border-t border-neutral-100">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-20 md:gap-40">
          <div className="max-w-sm">
            <div className="relative w-28 h-10 mb-8">
              <Image src={`${ASSET}/logo.png`} alt="BORA" fill className="object-contain object-left" />
            </div>
            <p className="text-neutral-400 font-medium leading-relaxed mb-8 text-sm">
              물류에서 무역까지, 한번에. <br />
              보라 그룹이 만드는 글로벌 비즈니스의 흐름.
            </p>
            <div className="text-sm text-neutral-400 leading-loose">
              <span className="font-bold text-neutral-600 block mb-1">보라로지스(주)</span>
              전남 광양시 항만8로 18-35 (도이동) <br />
              T: 061-795-9951~3
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-20">
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6">사업 영역</h5>
              <ul className="text-xs font-semibold flex flex-col gap-4 text-neutral-400">
                <li><Link href="#" className="hover:text-black transition-colors">국제물류</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">보세창고</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">포워딩</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">글로벌 무역</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6">그룹사</h5>
              <ul className="text-xs font-semibold flex flex-col gap-4 text-neutral-400">
                <li><Link href="#" className="hover:text-black transition-colors">보라로지스</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">보라로지텍</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">RE&UP</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6">문의</h5>
              <p className="text-xs font-semibold text-neutral-400 leading-loose">
                비즈니스 파트너십 또는 <br />
                서비스 문의를 환영합니다.
              </p>
              <Link href="#" className="inline-flex items-center gap-2 mt-4 text-neutral-900 font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all">
                Contact <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1400px] mx-auto mt-24 pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-medium text-neutral-300 uppercase tracking-widest">© 2026 BORALOGIS Co.,Ltd. All Rights Reserved.</p>
          <div className="flex gap-8 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
            <Link href="#" className="hover:text-black transition-colors">개인정보 처리방침</Link>
            <Link href="#" className="hover:text-black transition-colors">이용약관</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
