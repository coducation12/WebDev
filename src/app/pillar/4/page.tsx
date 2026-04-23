"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Globe, Ship, Truck, Package, Activity, Plane, Zap, Shield, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const ASSET_PATH = "/assets/images";

const menuData = [
  { title: "그룹소개", items: ["보라그룹 개요", "비전 및 가치", "계열사 안내", "CI 가이드"] },
  { title: "물류사업", items: ["보라로지스(국제물류)", "보라트랜스(운송)", "보세창고 운영", "특수화물 운송"] },
  { title: "물류기술", items: ["보라로지텍", "장비 개발 및 제조", "자동화 시스템", "현장 혁신 솔루션"] },
  { title: "미래사업", items: ["RE&UP(재생에너지)", "보라인터내셔널", "글로벌 무역 확장"] },
  { title: "고객지원", items: ["공지사항", "1:1 문의", "견적 요청", "FAQ"] }
];

const businessCards = [
  { 
    id: 0,
    title: "보라로지스", 
    subtitle: "GLOBAL LOGISTICS",
    desc: "광양항 배후단지의 압도적 인프라를 기반으로 한 수출입 전반의 종합 물류 서비스",
    image: `${ASSET_PATH}/extra_5.jpg`,
    color: "rgba(106,13,219,0.95)",
    icon: Ship
  },
  { 
    id: 1,
    title: "보라로지텍", 
    subtitle: "TECH & AUTOMATION",
    desc: "자체 설계 포장 장비 및 생산라인 협력을 통한 물류 현장의 디지털 전환",
    image: `${ASSET_PATH}/extra_22.jpg`,
    color: "rgba(30,58,138,0.95)",
    icon: Zap
  },
  { 
    id: 2,
    title: "보라트랜스", 
    subtitle: "TRANSPORT NETWORK",
    desc: "항만과 창고를 잇는 셔틀부터 전국 내륙 운송까지, 최적의 배차 설계 시스템",
    image: `${ASSET_PATH}/extra_10.jpg`,
    color: "rgba(15,23,42,0.95)",
    icon: Truck
  },
  { 
    id: 3,
    title: "RE&UP", 
    subtitle: "SUSTAINABILITY",
    desc: "태양광·풍력 설비 등 재생에너지 특수 물류 및 재활용 기반의 순환경제 실현",
    image: `${ASSET_PATH}/extra_14.jpg`,
    color: "rgba(16,185,129,0.95)",
    icon: Globe
  },
  { 
    id: 4,
    title: "보라인터내셔널", 
    subtitle: "GLOBAL TRADE",
    desc: "글로벌 네트워크를 기반으로 한 자원 수입 및 K-Culture 중심의 무역 비즈니스",
    image: `${ASSET_PATH}/extra_15.jpg`,
    color: "rgba(245,158,11,0.95)",
    icon: Plane
  },
  { 
    id: 5,
    title: "신선 물류", 
    subtitle: "COLD CHAIN",
    desc: "수량 및 품질 검수부터 온·습도 관리까지, 본질을 보존하는 프리미엄 유통",
    image: `${ASSET_PATH}/extra_6.jpg`,
    color: "rgba(239,68,68,0.95)",
    icon: Heart
  }
];

export default function StandardLogisHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 6000);

    const scrollHandler = () => { setIsScrolled(window.scrollY > 20); };
    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => { 
      clearInterval(slideTimer);
      window.removeEventListener("scroll", scrollHandler); 
    };
  }, []);

  const slides = [
    { image: `${ASSET_PATH}/extra_9.jpg`, title: "물류의 흐름을 설계하고 신뢰를 운송합니다" },
    { image: `${ASSET_PATH}/extra_26.jpg`, title: "데이터와 기술로 물류의 미래를 앞당깁니다" },
    { image: `${ASSET_PATH}/extra_11.jpg`, title: "보라그룹이 비즈니스의 경쟁력을 완성합니다" }, 
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#1a1a1a', fontFamily: 'sans-serif', overflowX: 'hidden' }}>
      
      {/* 1. Mega Header */}
      <nav 
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
        style={{
          position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100,
          backgroundColor: (isScrolled || isHeaderHovered) ? '#ffffff' : 'transparent',
          padding: (isScrolled || isHeaderHovered) ? '15px 0' : '25px 0',
          transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px' }}>
            <Link href="/" style={{ width: '160px', height: '40px', position: 'relative' }}>
              <Image 
                src={(isScrolled || isHeaderHovered) ? `${ASSET_PATH}/logo.png` : `${ASSET_PATH}/logo_white.png`}
                alt="LOGO" 
                fill
                style={{ objectFit: 'contain' }}
                className="transition-all duration-500"
              />
            </Link>
            <div className="hidden lg:flex" style={{ flex: 1, justifyContent: 'center', gap: '40px', fontWeight: 'bold', fontSize: '15px', color: (isScrolled || isHeaderHovered) ? '#334155' : '#ffffff' }}>
              {menuData.map(menu => (<div key={menu.title} style={{ width: '150px', textAlign: 'center' }}>{menu.title}</div>))}
            </div>
            <Link href="#" style={{ padding: '12px 32px', backgroundColor: '#6A0DAD', color: '#ffffff', borderRadius: '50px', fontSize: '13px', fontWeight: '900', textDecoration: 'none' }}>CONTACT US</Link>
          </div>
          <AnimatePresence>
            {isHeaderHovered && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', padding: '40px 0 60px', borderTop: '1px solid #f8fafc' }}>
                  {menuData.map((menu) => (
                    <div key={menu.title} style={{ width: '150px' }}>
                      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '18px', textAlign: 'center' }}>
                        {menu.items.map(item => (<li key={item}><Link href="#" style={{ textDecoration: 'none', color: '#94a3b8', fontSize: '13px', fontWeight: '600' }}>{item}</Link></li>))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <main>
        {/* 2. Hero Section */}
        <section style={{ position: 'relative', height: '100vh', backgroundColor: '#000000', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8 }}
              style={{ position: 'absolute', inset: 0 }}
            >
              <Image 
                src={slides[currentSlide].image} 
                alt="Hero" 
                fill
                priority
                style={{ objectFit: 'cover', opacity: 0.65 }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent, rgba(0,0,0,0.7))' }} />
            </motion.div>
          </AnimatePresence>
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto', padding: '0 40px', height: '100%', display: 'flex', alignItems: 'center' }}>
            <motion.div key={currentSlide} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
              <span style={{ fontSize: '13px', fontWeight: '900', letterSpacing: '10px', color: '#6A0DAD', display: 'block', marginBottom: '24px' }}>BORA LOGIS GROUP</span>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: '900', color: 'white', marginBottom: '32px', lineHeight: 1.2, letterSpacing: '-2px' }}>
                {slides[currentSlide].title.split(' ').slice(0, 3).join(' ')} <br />
                <span style={{ color: '#6A0DAD' }}>{slides[currentSlide].title.split(' ').slice(3).join(' ')}</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* 3. Grid Business Cards */}
        <section style={{ padding: '180px 0', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
            <div style={{ marginBottom: '100px', textAlign: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: '900', color: '#6A0DAD', letterSpacing: '8px', display: 'block', marginBottom: '20px' }}>OUR PORTFOLIO</span>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: '900', color: '#0f172a', letterSpacing: '-2px' }}>종합 물류 그룹 보라의 핵심 사업</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
              {businessCards.map((card, index) => (
                <div key={card.id} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} style={{ position: 'relative', cursor: 'pointer', height: '550px' }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '30px', overflow: 'hidden', position: 'relative', boxShadow: hoveredIndex === index ? '0 40px 80px -20px rgba(0,0,0,0.3)' : '0 10px 30px -10px rgba(0,0,0,0.05)', transform: hoveredIndex === index ? 'scale(1.02) translateY(-15px)' : 'scale(1) translateY(0)', transition: 'all 0.6s' }}>
                    <Image src={card.image} alt="card" fill style={{ objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${card.color} 0%, rgba(0,0,0,0.3) 60%, transparent 100%)`, opacity: hoveredIndex === index ? 1 : 0.85 }} />
                    <div style={{ position: 'absolute', inset: 0, padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'end', color: '#ffffff' }}>
                       <div style={{ width: '50px', height: '50px', borderRadius: '15px', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                         <card.icon size={24} />
                       </div>
                       <span style={{ fontSize: '12px', fontWeight: '800', opacity: 0.6, letterSpacing: '2px', marginBottom: '8px', display: 'block' }}>{card.subtitle}</span>
                       <h3 style={{ fontSize: '2rem', fontWeight: '900', lineHeight: 1 }}>{card.title}</h3>
                       <div style={{ maxHeight: hoveredIndex === index ? '150px' : '0', opacity: hoveredIndex === index ? 1 : 0, overflow: 'hidden', transition: 'all 0.6s' }}>
                         <p style={{ fontSize: '0.95rem', marginTop: '20px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>{card.desc}</p>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. All-in-One Section */}
        <section style={{ padding: '200px 0', backgroundColor: '#ffffff', overflow: 'hidden' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <span style={{ fontSize: '14px', fontWeight: '900', color: '#6A0DAD', letterSpacing: '10px', display: 'block', marginBottom: '30px' }}>INTEGRATED NETWORK</span>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900', color: '#0f172a', letterSpacing: '-2px', marginBottom: '120px' }}>
                항만부터 생산, 무역, 기술까지 <br /> 보라 올인원 솔루션
              </h2>
            </motion.div>

            <div style={{ position: 'relative', height: '600px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div 
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ 
                  position: 'relative', zIndex: 20, width: '220px', height: '220px', 
                  borderRadius: '50%', backgroundColor: '#ffffff',
                  boxShadow: '0 30px 100px -20px rgba(106,13,219,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px'
                }}
              >
                {isMounted && (
                  <Image src={`${ASSET_PATH}/mark.png`} alt="BORA Mark" width={140} height={140} style={{ objectFit: 'contain' }} />
                )}
                <motion.div 
                   animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                   transition={{ duration: 3, repeat: Infinity }}
                   style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(106,13,219,0.3)' }}
                />
              </motion.div>

              {isMounted && [
                { icon: Ship, color: '#1e40af', label: '국제물류/무역', angle: 0, delay: 0 },
                { icon: Plane, color: '#6A0DAD', label: '재생에너지/신사업', angle: 120, delay: 1 },
                { icon: Truck, color: '#10b981', label: '운송/물류기술', angle: 240, delay: 2 }
              ].map((item, i) => {
                const radius = 250;
                const x = Math.round(Math.cos((item.angle * Math.PI) / 180) * radius);
                const y = Math.round(Math.sin((item.angle * Math.PI) / 180) * radius);

                return (
                  <div key={i} style={{ position: 'absolute', transform: `translate(${x}px, ${y}px)`, zIndex: 25 }}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      animate={{ y: [0, -15, 0] }}
                      transition={{ 
                        initial: { duration: 0.8, delay: item.delay },
                        animate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                      }}
                      style={{ textAlign: 'center' }}
                    >
                      <div style={{ 
                        width: '100px', height: '100px', borderRadius: '30px', 
                        backgroundColor: '#ffffff', boxShadow: `0 20px 40px -10px ${item.color}33`,
                        border: `1px solid ${item.color}22`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: item.color, margin: '0 auto 20px'
                      }}>
                        <item.icon size={44} />
                      </div>
                      <span style={{ fontSize: '15px', fontWeight: '900', color: '#0f172a', letterSpacing: '1px' }}>{item.label}</span>
                    </motion.div>
                  </div>
                );
              })}

              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', border: '1px dashed #e2e8f0', zIndex: 5 }}
              />
            </div>

            <div style={{ marginTop: '100px' }}>
               <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>생산 데이터와 물류 인프라의 결합</h3>
               <p style={{ fontSize: '1.2rem', color: '#64748b', fontWeight: '500', maxWidth: '800px', margin: '0 auto', lineHeight: 1.7 }}>
                 4만 평의 인프라에서 수집되는 생산 데이터는 자동화 포장과 최적 운송 경로로 이어집니다. <br />
                 보라로지텍의 기술력과 보라로지스의 네트워크가 당신의 비즈니스를 세계로 연결합니다.
               </p>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ padding: '150px 50px', backgroundColor: '#ffffff', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '80px' }}>
          <div>
            <Image src={`${ASSET_PATH}/logo.png`} alt="LOGO" width={160} height={45} style={{ marginBottom: '40px' }} />
            <div style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.9 }}>
              <p style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '10px' }}>보라로지스(주)</p>
              <p>전남 광양시 항만8로 18-35 (도이동)</p>
              <p>T: 061-795-9951~3 &nbsp; | &nbsp; E: admin@boralogis.com</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '100px' }}>
             <div>
               <h4 style={{ fontSize: '13px', fontWeight: '900', color: '#cbd5e1', marginBottom: '30px', letterSpacing: '2px' }}>CORE BUSINESS</h4>
               <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '15px', color: '#64748b' }}>
                 <li>Bora Logis</li><li>Bora Logitech</li><li>Bora Trans</li><li>RE&UP</li><li>Bora International</li>
               </ul>
             </div>
             <div>
               <h4 style={{ fontSize: '13px', fontWeight: '900', color: '#cbd5e1', marginBottom: '30px', letterSpacing: '2px' }}>QUICK LINK</h4>
               <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '15px', color: '#64748b' }}>
                 <li>Contact Us</li><li>Privacy Policy</li><li>RFQ System</li>
               </ul>
             </div>
          </div>
        </div>
        <div style={{ maxWidth: '1400px', margin: '50px auto 0', paddingTop: '50px', borderTop: '1px solid #f8fafc', color: '#94a3b8', fontSize: '12px' }}>
           <p>Copyrightⓒ BORALOGIS Co.,Ltd. All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}
