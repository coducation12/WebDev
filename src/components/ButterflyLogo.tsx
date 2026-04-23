"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ButterflyLogoProps {
  className?: string;
  useImage?: boolean;
}

/**
 * BORA Butterfly Logo Component
 * Easy to switch between the generated image and a clean SVG path.
 */
export default function ButterflyLogo({ className, useImage = true }: ButterflyLogoProps) {
  // If useImage is true, try to use the public/butterfly.png
  // Otherwise, use a simple SVG path representation.
  if (useImage) {
    return (
      <div className={cn("relative", className)}>
        <Image
          src="/butterfly.png"
          alt="BORA Logo"
          fill
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("fill-bora-purple", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simple minimalist butterfly shape */}
      <path d="M50 50 C20 10 10 30 50 50 C90 30 80 10 50 50 Z" />
      <path d="M50 50 C20 90 10 70 50 50 C90 70 80 90 50 50 Z" />
      <circle cx="50" cy="50" r="2" fill="white" />
    </svg>
  );
}
