import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TreePine, Flower2, Dumbbell, Palette, UtensilsCrossed } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import ImageModal from "./ImageModal";

import recoveryNature from "@/assets/recovery-nature.jpg";
import lifeExercise from "@/assets/life-exercise.jpg";
import lifeOuting from "@/assets/life-outing.jpg";
import lifeFood from "@/assets/life-food.jpg";

const programs: { icon: LucideIcon; title: string; freq: string; desc: string; image: string; imageAlt: string }[] = [
  { icon: TreePine, title: "산책 프로그램", freq: "매일 평일 오전", desc: "병원 인근 야외 산책 버스 운행 — 자연 속 심리적 회복", image: recoveryNature, imageAlt: "산책 프로그램" },
  { icon: Flower2, title: "소풍 프로그램", freq: "매주 1회", desc: "병원 밖 힐링 소풍 — 한국 문화 체험 + 정서적 회복", image: lifeOuting, imageAlt: "소풍 프로그램 — 한국 사찰 방문" },
  { icon: Dumbbell, title: "운동치료", freq: "매주 1회", desc: "전문 치료사와 함께하는 운동 — 체력 회복 + 재활", image: lifeExercise, imageAlt: "운동치료 프로그램" },
  { icon: Palette, title: "원데이클래스", freq: "매주 1회", desc: "주제별 다양한 클래스 — 즐거움 + 정서 치유", image: lifeOuting, imageAlt: "원데이클래스 활동" },
  { icon: UtensilsCrossed, title: "푸드테라피", freq: "2주 1회", desc: "전문 셰프 + 임상 영양사 협업 — 영양 관리 + 미식 경험", image: lifeFood, imageAlt: "푸드테라피 건강식" },
];

const RecoveryLifeSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const modalImages = programs.map((p) => ({
    src: p.image,
    alt: p.imageAlt,
    caption: `${p.title} (${p.freq}) — ${p.desc}`,
  }));

  return (
    <section id="recovery-life" className="py-24 lg:py-32 bg-background overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-gold">
            Recovery Life Program
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            치료를 넘어, 삶의 회복까지
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            면력한방병원의 입원 생활은 단순한 치료가 아닙니다.
            몸과 마음이 함께 회복되는 Medical Wellness Retreat.
          </p>
        </motion.div>

        {/* Featured image grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-14"
        >
          {[
            { src: recoveryNature, alt: "자연 산책", caption: "아침 산책 — 자연 속 힐링" },
            { src: lifeOuting, alt: "한국 문화 체험", caption: "소풍 — 한국 문화 탐방" },
            { src: lifeExercise, alt: "운동치료", caption: "전문 치료사 운동 프로그램" },
            { src: lifeFood, alt: "푸드테라피", caption: "셰프 × 영양사 건강 미식" },
          ].map((img, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl cursor-pointer aspect-[4/3] shadow-soft hover:shadow-card transition-shadow"
              onClick={() => { setModalIndex(i); setModalOpen(true); }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-sm font-medium text-background">{img.caption}</p>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Program cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {programs.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              className="group p-5 rounded-xl bg-card border border-border hover:border-gold/30 transition-colors shadow-soft cursor-pointer"
              onClick={() => { setModalIndex(i); setModalOpen(true); }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{p.icon}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gold-light text-foreground font-medium">
                  {p.freq}
                </span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="font-serif text-lg font-bold text-foreground">
            "치료는 병원에서, 힐링은 면력에서."
          </p>
        </div>
      </div>

      <ImageModal
        images={modalImages}
        initialIndex={modalIndex}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};

export default RecoveryLifeSection;
