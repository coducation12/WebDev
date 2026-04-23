"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Globe, Ship, Truck, Package, Activity, Plane } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const ASSET_PATH = "/assets/pillar/4";

const menuData = [
  { title: "그룹소개", items: ["보라그룹 개요", "비전 및 가치", "경영진 소개", "CI 가이드"] },
  { title: "물류사업", items: ["통합 물류 시스템", "물류 거점 안내", "스마트 운송", "실시간 트래킹"] },
  { title: "무역사업", items: ["글로벌 소싱", "통관 및 관세", "무역 컨설팅", "수출입 서비스"] },
  { title: "네트워크", items: ["국내 네트워크", "글로벌 거점", "글로벌 파트너"] },
  { title: "고객지원", items: ["공지사항", "1:1 문의", "견적 요청", "FAQ"] }
];

const businessCards = [
  { 
    id: 0,
    title: "보라그룹 소개", 
    subtitle: "ABOUT BORA GROUP",
    desc: "신뢰와 효율의 가치를 실현하는 글로벌 비즈니스 파트너",
    image: `${ASSET_PATH}/about_company.jpg`,
    color: "rgba(106,13,219,0.95)"
  },
  { 
    id: 1,
    title: "물류 사업부", 
    subtitle: "LOGISTICS SOLUTION",
    desc: "독보적인 자체 인프라를 통한 스마트 물류 솔루션",
    image: `${ASSET_PATH}/service_logistics.jpg`,
    color: "rgba(30,58,138,0.95)"
  },
  { 
    id: 2,
    title: "무역 사업부", 
    subtitle: "TRADE PARTNER",
    desc: "글로벌 소싱부터 통관까지 무역의 모든 과정을 지원",
    image: `${ASSET_PATH}/service_trade.jpg`,
    color: "rgba(15,23,42,0.95)"
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
      setCurrentSlide((prev) => (prev + 1) % 2);
    }, 6000);

    const scrollHandler = () => { setIsScrolled(window.scrollY > 20); };
    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => { 
      clearInterval(slideTimer);
      window.removeEventListener("scroll", scrollHandler); 
    };
  }, []);

  const slides = [
    { image: `${ASSET_PATH}/hero_1.jpg`, title: "물류로 무역을 잇다" },
    { image: `${ASSET_PATH}/hero_2.jpg`, title: "글로벌 비즈니스의 동반자" }, 
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
                src={`${ASSET_PATH}/logo.png`}
                alt="LOGO" 
                fill
                style={{ objectFit: 'contain' }}
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
              <h1 style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', fontWeight: '900', color: 'white', marginBottom: '32px', lineHeight: 0.9, letterSpacing: '-5px' }}>
                {slides[currentSlide].title.split(' ')[0]} <br />
                <span style={{ color: '#6A0DAD' }}>{slides[currentSlide].title.split(' ').slice(1).join(' ')}</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* 3. Floating Scale Business Cards */}
        <section style={{ padding: '180px 0', backgroundColor: '#ffffff' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 50px' }}>
            <div style={{ marginBottom: '100px', textAlign: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: '900', color: '#6A0DAD', letterSpacing: '8px', display: 'block', marginBottom: '20px' }}>OUR SERVICES</span>
              <h2 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: '900', color: '#0f172a', letterSpacing: '-3px' }}>주요 사업 영역</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', height: '600px' }}>
              {businessCards.map((card, index) => (
                <div key={card.id} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} style={{ position: 'relative', cursor: 'pointer', zIndex: hoveredIndex === index ? 50 : 1 }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '40px', overflow: 'hidden', position: 'relative', boxShadow: hoveredIndex === index ? '0 60px 100px -20px rgba(0,0,0,0.4)' : '0 10px 30px -10px rgba(0,0,0,0.05)', transform: hoveredIndex === index ? 'scale(1.08) translateY(-20px)' : 'scale(1) translateY(0)', transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }}>
                    <Image src={card.image} alt="card" fill style={{ objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${card.color} 0%, rgba(0,0,0,0.2) 60%, transparent 100%)`, opacity: hoveredIndex === index ? 1 : 0.8 }} />
                    <div style={{ position: 'absolute', inset: 0, padding: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'end', color: '#ffffff' }}>
                       <h3 style={{ fontSize: '2.8rem', fontWeight: '900', lineHeight: 1 }}>{card.title.split(' ')[0]} <br /> {card.title.split(' ')[1]}</h3>
                       <div style={{ maxHeight: hoveredIndex === index ? '100px' : '0', opacity: hoveredIndex === index ? 1 : 0, overflow: 'hidden', transition: 'all 0.6s' }}>
                         <p style={{ fontSize: '1.1rem', marginTop: '20px', color: 'rgba(255,255,255,0.8)' }}>{card.desc}</p>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. All-in-One White Dynamic Section */}
        <section style={{ padding: '200px 0', backgroundColor: '#ffffff', overflow: 'hidden', position: 'relative' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <span style={{ fontSize: '14px', fontWeight: '900', color: '#6A0DAD', letterSpacing: '10px', display: 'block', marginBottom: '30px' }}>INTEGRATED NETWORK</span>
              <h2 style={{ fontSize: 'clamp(3rem, 5.5vw, 5rem)', fontWeight: '900', color: '#0f172a', letterSpacing: '-4px', marginBottom: '120px' }}>
                BORA ALL-IN-ONE SOLUTION
              </h2>
            </motion.div>

            {/* Orbiting Animation Container */}
            <div style={{ position: 'relative', height: '600px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              
              {/* Central BORA Mark */}
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

              {/* Orbital Icons */}
              {isMounted && [
                { icon: Ship, color: '#1e40af', label: '무역 사업', angle: 0, delay: 0 },
                { icon: Plane, color: '#6A0DAD', label: '물류 사업', angle: 120, delay: 1 },
                { icon: Truck, color: '#10b981', label: '고객 서비스', angle: 240, delay: 2 }
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

                    <svg style={{ position: 'absolute', top: '50px', left: '50px', width: '300px', height: '300px', transform: `translate(-50%, -50%) rotate(${item.angle + 180}deg)`, pointerEvents: 'none', zIndex: 10 }}>
                      <motion.line 
                        x1="50" y1="150" x2="180" y2="150"
                        stroke={item.color}
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.3 }}
                      />
                    </svg>
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
               <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>단 하나의 접점, 모든 비즈니스의 완성</h3>
               <p style={{ fontSize: '1.2rem', color: '#64748b', fontWeight: '500', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
                 복잡한 글로벌 무역부터 실시간 물류 추적, 고객 서비스까지. <br />
                 보라로지스의 통합 시스템이 귀하의 비즈니스를 스마트하게 연결합니다.
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
               <h4 style={{ fontSize: '13px', fontWeight: '900', color: '#cbd5e1', marginBottom: '30px', letterSpacing: '2px' }}>BUSINESS</h4>
               <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '15px', color: '#64748b' }}>
                 <li>Logistics</li><li>Trade</li><li>Network</li>
               </ul>
             </div>
             <div>
               <h4 style={{ fontSize: '13px', fontWeight: '900', color: '#cbd5e1', marginBottom: '30px', letterSpacing: '2px' }}>QUICK LINK</h4>
               <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '15px', color: '#64748b' }}>
                 <li>Contact Us</li><li>Privacy Policy</li><li>RFQ</li>
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
