"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MediaPlaceholderProps {
  label: string;
  src?: string;
  className?: string;
  aspectRatio?: "video" | "square" | "portrait" | "wide";
  mood?: "minimal" | "dynamic" | "glass" | "dark" | "eco" | "cinematic" | "standard";
}

export default function MediaPlaceholder({
  label,
  src,
  className,
  aspectRatio = "video",
  mood = "minimal",
}: MediaPlaceholderProps) {
  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    wide: "aspect-[21/9]",
  };

  const moodClasses = {
    minimal: "bg-neutral-100 text-neutral-400 border-neutral-200",
    dynamic: "bg-bora-purple/10 text-bora-purple border-bora-purple/20",
    glass: "glass text-white/40 border-white/10",
    dark: "bg-bora-navy text-white/20 border-white/5",
    eco: "bg-emerald-100 text-emerald-600 border-emerald-200",
    cinematic: "bg-white/5 text-white/20 border-white/10",
    standard: "bg-neutral-50 text-neutral-500 border-neutral-100",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={cn(
        "relative w-full rounded-2xl border flex items-center justify-center overflow-hidden transition-all duration-700 group",
        aspectClasses[aspectRatio],
        moodClasses[mood],
        className
      )}
    >
      {src ? (
        <>
          <Image
            src={src}
            alt={label}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
          <div className="absolute bottom-4 right-6 text-white/60 text-[10px] font-bold uppercase tracking-widest z-10">
            {label}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <span className="font-serif italic text-lg tracking-wider opacity-60">
            [ {label} ]
          </span>
          <div className="w-8 h-px bg-current opacity-20" />
        </div>
      )}
      
      {/* Subtle overlay reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
    </motion.div>
  );
}
