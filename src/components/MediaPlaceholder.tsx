"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MediaPlaceholderProps {
  label: string;
  className?: string;
  aspectRatio?: "video" | "square" | "portrait" | "wide";
  mood?: "minimal" | "dynamic" | "glass" | "dark";
}

/**
 * Roadmap Step 1: Standard Guide Architecture - Media Placeholder
 * Defines a consistent specification for visual assets across all design references.
 */
export default function MediaPlaceholder({
  label,
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
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={cn(
        "relative w-full rounded-2xl border flex items-center justify-center overflow-hidden transition-all duration-700",
        aspectClasses[aspectRatio],
        moodClasses[mood],
        className
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="font-serif italic text-lg tracking-wider opacity-60">
          [ {label} ]
        </span>
        <div className="w-8 h-px bg-current opacity-20" />
      </div>
      
      {/* Subtle overlay reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
    </motion.div>
  );
}
