"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, Zap, BarChart3, Globe2, Layers, Menu, X, Plus, Shield, Cpu, Activity, Anchor, TrendingUp, Package, Truck } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import LogisticsTradeFlow from "@/components/LogisticsTradeFlow";

const ASSET_PATH = "/assets/images";

// Soft brand palette matching the logo butterfly
const BRAND = {
  purple: "#9B72CF",       // 로고 나비 연보라
  purpleDark: "#7B4FAD",   // 나비 진한 쪽
  purpleLight: "#C4A6E3",  // 연보라 하이라이트
  purpleMist: "#EDE4F7",   // 극히 연한 배경용
  navy: "#1A1A2E",         // 다크 섹션용
  text: "#2D2D3A",         // 본문 텍스트
};

// Counting Up Stat Component
function StatItem({ label, value, suffix = "" }: { label: string; value: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex items-baseline justify-center gap-2 mb-3"
      >
        <span className="text-5xl md:text-7xl font-extrabold tracking-tight" style={{ color: BRAND.purpleDark }}>
          {value}
        </span>
        <span className="text-lg md:text-xl font-semibold" style={{ color: BRAND.purpleLight }}>{suffix}</span>
      </motion.div>
      <span className="text-xs uppercase tracking-[0.3em] font-bold text-neutral-400 block">
        {label}
      </span>
    </div>
  );
}

export default function VisualDynamicHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.97]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.85]);

  // 스크롤 감지: 흰색 섹션 진입 시 헤더 스타일 전환
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="bg-white text-neutral-900 font-sans overflow-x-hidden" style={{ fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif" }}>

      {/* ── HEADER (스크롤 감지 전환) ── */}
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500",
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-neutral-100"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex justify-between items-center">
          {/* 로고: 다크배경→흰 로고, 스크롤 후→검정 로고 */}
          <Link href="/" className="relative block w-36 h-10">
            <Image
              src={`${ASSET_PATH}/${scrolled ? "logo.png" : "logo_white.png"}`}
              alt="BORA"
              fill
              className="object-contain transition-opacity duration-300"
            />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {["물류 서비스", "기술 혁신", "글로벌 네트워크", "회사 소개"].map((item) => (
              <Link
                key={item}
                href="#"
                className={cn(
                  "px-5 py-2.5 text-sm font-semibold rounded-full transition-colors",
                  scrolled
                    ? "text-neutral-700 hover:text-[#7B4FAD] hover:bg-purple-50"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {item}
              </Link>
            ))}
            <Link
              href="#"
              className="ml-3 px-6 py-2.5 rounded-full text-sm font-bold transition-all"
              style={{
                backgroundColor: scrolled ? BRAND.purple : "rgba(255,255,255,0.15)",
                color: "white",
                backdropFilter: scrolled ? "none" : "blur(20px)",
              }}
            >
              문의하기
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{ backgroundColor: scrolled ? BRAND.purpleMist : "rgba(255,255,255,0.1)", color: scrolled ? BRAND.purpleDark : "white" }}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ── HERO: 물류→무역 플로우 애니메이션 ── */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-24 pb-16 overflow-hidden" style={{ backgroundColor: BRAND.navy }}>
        {/* 배경 글로우 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[60%] h-[40%] rounded-full blur-[180px] opacity-10" style={{ backgroundColor: BRAND.purple }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center mb-8"
        >
          <span className="inline-block px-6 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-xs font-semibold tracking-widest text-white/50 mb-6">
            BORA GROUP — 종합 물류 플랫폼
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
            물류로 <span style={{ color: BRAND.purpleLight }}>무역</span>을 잇다
          </h1>
        </motion.div>

        {/* 핵심: 플로우 애니메이션 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 w-full max-w-7xl"
        >
          <LogisticsTradeFlow accentColor={BRAND.purple} accentLight={BRAND.purpleLight} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative z-10 text-center mt-8"
        >
          <p className="text-base md:text-lg text-white/40 max-w-lg mx-auto mb-8">
            광양 자유무역지역 4만 평 인프라 기반<br />국제물류부터 무역까지, 원스톱 솔루션
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 rounded-full text-sm font-bold text-white transition-shadow"
              style={{ backgroundColor: BRAND.purple, boxShadow: `0 6px 30px ${BRAND.purple}30` }}
            >
              서비스 알아보기
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-3.5 rounded-full text-sm font-bold text-white/60 border border-white/15 hover:bg-white/5 transition-all"
            >
              회사 소개 →
            </motion.button>
          </div>
        </motion.div>

        {/* 스크롤 유도 */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-5 h-8 border-2 border-white/15 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2.5 rounded-full bg-white/30" />
          </div>
        </motion.div>
      </section>

      {/* ── 핵심 가치 섹션: 물류 → 무역 연결 시각화 ── */}
      <section className="py-40 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-xs font-bold uppercase tracking-[0.4em] mb-5 block" style={{ color: BRAND.purple }}>
              Core Value
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6" style={{ color: BRAND.text }}>
              물류의 흐름을 설계하고,<br />신뢰를 운송합니다
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              보라 그룹은 물류 서비스를 기반으로 무역 업무를 병행하며,<br />
              고객사에게 원스톱 토탈 솔루션을 제공합니다.
            </p>
          </div>

          {/* 물류→무역 플로우 바 (상단) */}
          <div className="hidden md:flex justify-center items-center gap-3 mb-14">
            <div className="flex items-center gap-2 px-6 py-3 rounded-full border-2" style={{ borderColor: BRAND.purple, color: BRAND.purple }}>
              <Package size={18} />
              <span className="text-sm font-extrabold tracking-wide">물류</span>
            </div>
            <div className="flex items-center gap-1.5">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.15, 0.8, 0.15], scale: [0.8, 1.2, 0.8] }}
                  transition={{ delay: i * 0.15, repeat: Infinity, duration: 1.8 }}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: BRAND.purple }}
                />
              ))}
              <ArrowRight size={24} strokeWidth={3} style={{ color: BRAND.purple }} />
            </div>
            <div className="flex items-center gap-2 px-6 py-3 rounded-full border-2" style={{ borderColor: BRAND.purpleDark, color: BRAND.purpleDark }}>
              <Globe2 size={18} />
              <span className="text-sm font-extrabold tracking-wide">무역</span>
            </div>
          </div>

          {/* 물류→무역 플로우 카드 (확대) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {[
              {
                icon: Package,
                step: "STEP 01",
                tag: "물류",
                title: "종합 물류 인프라",
                desc: "광양 자유무역지역 4만 평, 보세창고 2만 평. 포워딩, 검역대행, 내륙운송까지 물류 전 과정을 자체 인프라와 장비로 직접 수행합니다.",
                img: "extra_1.jpg",
              },
              {
                icon: Cpu,
                step: "STEP 02",
                tag: "기술",
                title: "스마트 기술 · 생산",
                desc: "물류 장비 자체 설계·제조, 스마트 팩토리 운영. 4조 3교대 95명 전문 인력이 24시간 쉬지 않고 가동합니다.",
                img: "AI.jpg",
              },
              {
                icon: Globe2,
                step: "STEP 03",
                tag: "무역",
                title: "무역 · 글로벌 확장",
                desc: "국제물류 네트워크를 기반으로 중국·동남아 자원 수입부터 K-culture·K-food 수출까지. 물류에서 무역으로 영역을 확장합니다.",
                img: "extra_13.jpg",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.7 }}
                whileHover={{ y: -10 }}
                className="group relative rounded-3xl overflow-hidden border border-neutral-100 bg-white shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                {/* 카드 이미지 (확대) */}
                <div className="relative h-72 overflow-hidden">
                  <Image src={`${ASSET_PATH}/${item.img}`} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                  {/* 스텝 뱃지 */}
                  <div className="absolute top-5 left-5 px-4 py-2 rounded-full text-white text-[10px] font-extrabold tracking-widest" style={{ backgroundColor: BRAND.purple }}>
                    {item.step}
                  </div>
                  {/* 태그 뱃지 */}
                  <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider bg-white/80 backdrop-blur-sm" style={{ color: BRAND.purpleDark }}>
                    {item.tag}
                  </div>
                  {/* 큰 스텝 번호 (배경) */}
                  <div className="absolute bottom-4 right-6 text-8xl font-black opacity-[0.07]" style={{ color: BRAND.navy }}>
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* 카드 사이 화살표 커넥터 (데스크탑, 1,2번 카드에만) */}
                {idx < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 z-20 -translate-y-1/2">
                    <motion.div
                      animate={{ x: [0, 6, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="w-7 h-7 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: BRAND.purple }}
                    >
                      <ArrowRight size={14} className="text-white" strokeWidth={3} />
                    </motion.div>
                  </div>
                )}

                {/* 카드 내용 */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: BRAND.purpleMist, color: BRAND.purpleDark }}>
                      <item.icon size={22} />
                    </div>
                    <h3 className="text-2xl font-extrabold" style={{ color: BRAND.text }}>{item.title}</h3>
                  </div>
                  <p className="text-neutral-500 leading-relaxed text-[15px] flex-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 계열사 소개 ── */}
      <section className="py-32 px-6 md:px-20" style={{ backgroundColor: BRAND.purpleMist }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.4em] mb-4 block" style={{ color: BRAND.purple }}>
              BORA Group
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight" style={{ color: BRAND.text }}>
              보라 그룹 계열사
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "보라로지스", role: "국제물류", desc: "보세창고·포워딩·운송", icon: Anchor },
              { name: "보라로지텍", role: "물류기술", desc: "자동화·장비설계·제조", icon: Cpu },
              { name: "RE&UP", role: "재생에너지", desc: "태양광·풍력 특수물류", icon: Zap },
              { name: "BORA INT'L", role: "국제무역", desc: "수출입·K-culture", icon: Globe2 },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-8 border border-purple-100/50 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: BRAND.purpleMist, color: BRAND.purpleDark }}>
                  <item.icon size={22} />
                </div>
                <h3 className="text-lg font-extrabold mb-1" style={{ color: BRAND.text }}>{item.name}</h3>
                <span className="text-xs font-bold uppercase tracking-widest block mb-3" style={{ color: BRAND.purple }}>{item.role}</span>
                <p className="text-sm text-neutral-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 수치 섹션 ── */}
      <section className="py-32 px-6 md:px-20 overflow-hidden" style={{ backgroundColor: BRAND.navy }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs font-bold uppercase tracking-[0.4em] mb-4 block" style={{ color: BRAND.purpleLight }}>
              Infrastructure
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              압도적 규모의 물류 인프라
            </h2>
            <p className="text-lg text-white/40 max-w-xl mx-auto">
              광양컨테이너부두 동측 배후단지, 자유무역지역 기반
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <StatItem label="총 부지 면적" value="4만" suffix="평" />
            <StatItem label="창고 규모" value="2만" suffix="평" />
            <StatItem label="전문 인력" value="95" suffix="명" />
            <StatItem label="보안 운영" value="24/7" suffix="" />
          </div>

          {/* 인증 뱃지 */}
          <div className="flex flex-wrap justify-center gap-4 mt-16">
            {["ISO 9001", "ISO 14001", "ISO 45001", "신용등급 BB+"].map((cert) => (
              <span key={cert} className="px-5 py-2.5 rounded-full border border-white/10 text-xs font-bold text-white/50 bg-white/5">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="text-white py-24 px-6 md:px-20" style={{ backgroundColor: BRAND.navy }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-8">
                물류의 흐름을 설계하고,<br />
                <span style={{ color: BRAND.purpleLight }}>경쟁력을 제공합니다.</span>
              </h2>
              <p className="text-lg text-white/40 leading-relaxed max-w-md mb-10">
                보라 그룹은 고객사의 글로벌 비즈니스를 위한<br />
                최적의 물류·무역 파트너입니다.
              </p>
              <div className="flex gap-4">
                {[Globe2, Zap, Layers, Shield].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all cursor-pointer border border-white/10 hover:border-purple-300/30"
                    style={{ backgroundColor: "rgba(155,114,207,0.1)" }}
                  >
                    <Icon size={18} className="text-white/60" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest opacity-30 mb-6">사업 영역</span>
                  <ul className="space-y-3 font-semibold text-sm text-white/60">
                    <li><Link href="#" className="hover:text-white transition-colors">국제물류</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">물류기술</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">재생에너지</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">국제무역</Link></li>
                  </ul>
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest opacity-30 mb-6">회사 정보</span>
                  <ul className="space-y-3 text-sm text-white/60">
                    <li>전남 광양시 항만8로 18-35</li>
                    <li>T. 061-795-9951~3</li>
                    <li>admin@boralogis.com</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <Image src={`${ASSET_PATH}/logo_white.png`} alt="BORA" width={100} height={30} />
              <span className="text-xs text-white/30">© 2026 BORALOGIS Co.,Ltd. All Rights Reserved.</span>
            </div>
            <Link href="/" className="text-xs font-semibold text-white/30 hover:text-white/60 transition-colors">
              ← 디자인 허브로 돌아가기
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
