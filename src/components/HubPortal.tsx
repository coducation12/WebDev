"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const pillars = [
  {
    id: 1,
    title: "Modern Minimal",
    concept: "Ref 1: Clarity & Space",
    summary: "극도의 여백과 세련된 타이포그래피. 정제된 미니멀리즘 시안.",
    style: {
      card: "bg-white border-neutral-100",
      text: "text-neutral-900",
      accent: "bg-neutral-900/5",
      pattern: <div className="absolute inset-0 opacity-10 pointer-events-none border-[40px] border-neutral-50 rounded-full scale-150" />
    }
  },
  {
    id: 2,
    title: "Visual Dynamic",
    concept: "Ref 2: Flow & Connection",
    summary: "물류에서 무역으로 이어지는 흐름을 시각화. 연보라 톤의 세련된 플로우 애니메이션.",
    style: {
      card: "bg-[#F3EAFA] border-[#D8C4F0]",
      text: "text-[#4A2D6E]",
      accent: "bg-[#9B72CF]/10",
      pattern: (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] right-[-10%] w-48 h-48 bg-[#C4A6E3]/30 rounded-full blur-3xl" />
          <div className="absolute bottom-[10%] left-[-5%] w-36 h-36 bg-[#D8C4F0]/40 rounded-full blur-3xl" />
        </div>
      )
    }
  },
  {
    id: 3,
    title: "Next-Gen Trend",
    concept: "Ref 3: Tech & Future",
    summary: "Bento Grid와 Glassmorphism의 조화. 현대적인 UI 트렌드 집약체.",
    style: {
      card: "bg-bora-navy border-white/10",
      text: "text-white",
      accent: "bg-white/5",
      pattern: (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-bora-purple/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
        </div>
      )
    }
  },
  {
    id: 4,
    title: "Standard Logis",
    concept: "Ref 4: Trust & Efficiency",
    summary: "신뢰감을 주는 블루 팔레트. 정석적인 물류 플랫폼 레이아웃.",
    style: {
      card: "bg-blue-50 border-blue-100",
      text: "text-blue-900",
      accent: "bg-blue-600/10",
      pattern: (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-0 right-0 w-full h-1/2 bg-blue-600/5 clip-path-slant" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
          <div className="absolute -top-10 -right-10 w-40 h-40 opacity-[0.05]">
            <Image src="/assets/images/mark.png" alt="Bora Mark" fill className="object-contain" />
          </div>
        </div>
      )
    }
  },
  {
    id: 6,
    title: "Cinematic Flow",
    concept: "Ref 5: Storytelling",
    summary: "풀-뷰포트 미디어와 시네마틱 스크롤. 영화 같은 브랜드 경험.",
    style: {
      card: "bg-neutral-900 border-neutral-800",
      text: "text-white",
      accent: "bg-white/10",
      pattern: <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 pointer-events-none" />
    }
  },
  {
    id: 7,
    title: "Apple-esque Reveal",
    concept: "Ref 6: Detail & Motion",
    summary: "정교한 마이크로 인터랙션과 고품격 로고 애니메이션.",
    style: {
      card: "bg-neutral-50 border-neutral-200",
      text: "text-neutral-900",
      accent: "bg-neutral-900/5",
      pattern: <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-1 bg-neutral-900/5 -rotate-45 pointer-events-none" />
    }
  },
];

export default function HubPortal() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pillars.map((pillar, index) => (
          <Link 
            key={pillar.id} 
            href={`/pillar/${pillar.id}`}
            className="group block cursor-pointer relative z-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`
                relative h-[480px] rounded-[2.5rem] overflow-hidden border shadow-sm
                flex flex-col justify-between p-10 transition-all duration-500 
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2
                ${pillar.style.card} ${pillar.style.text}
              `}
            >
              {/* Unique Background Pattern */}
              {pillar.style.pattern}
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-12">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-2 block">
                    {pillar.concept}
                  </span>
                  <div className={`w-10 h-1 md:w-12 bg-current opacity-20 rounded-full`} />
                </div>

                <div className="mt-auto">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4 leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-60 mb-8 font-sans max-w-[90%]">
                    {pillar.summary}
                  </p>
                  
                  <div
                    className={`
                      inline-flex items-center gap-3 px-6 py-3 rounded-full 
                      text-[10px] font-bold uppercase tracking-widest
                      transition-all duration-300
                      ${pillar.style.accent} group-hover:gap-6
                    `}
                  >
                    Explore Proposal <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
        
      </div>
    </div>
  );
}
