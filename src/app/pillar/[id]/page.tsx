"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import MediaPlaceholder from "@/components/MediaPlaceholder";

export default function PillarPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  return (
    <main className="min-h-screen bg-white dark:bg-bora-dark p-6 md:p-20">
      <div className="max-w-7xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-bora-purple mb-12 hover:gap-4 transition-all"
        >
          <ArrowLeft size={20} /> Back to Hub
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-7xl font-serif font-bold mb-6">
            Design Proposal <span className="text-bora-purple">#{id}</span>
          </h1>
          <p className="text-xl text-neutral-500 max-w-3xl leading-relaxed">
            해당 시안에 대한 상세 레이아웃과 구성 요소가 정의될 예정입니다. 1단계에서 정의한 미디어 플레이스홀더 규력을 바탕으로 실제 에셋이 배치될 영역입니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <MediaPlaceholder label="Intro Hero Image" mood="dynamic" aspectRatio="video" />
          <MediaPlaceholder label="Functional Section Shot" mood="minimal" aspectRatio="video" />
        </div>
      </div>
    </main>
  );
}
