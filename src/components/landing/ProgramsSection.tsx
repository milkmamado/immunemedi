import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Flame, Wind, Hand, Syringe, Target } from "lucide-react";
import ImageModal from "./ImageModal";

import treatHerbal from "@/assets/treat-herbal.jpg";
import treatHyperthermia from "@/assets/treat-hyperthermia.jpg";
import treatHbot from "@/assets/treat-hbot.jpg";
import treatManual from "@/assets/treat-manual.jpg";
import treatImmune from "@/assets/treat-immune.jpg";
import treatAcupuncture from "@/assets/treat-acupuncture.jpg";

const treatments = [
  {
    icon: Leaf,
    title: "한약 처방",
    subtitle: "Herbal Medicine",
    items: ["면역플러스", "항암플러스", "신종단"],
    desc: "면역 강화 · 종양 억제 · 부작용 완화",
    image: treatHerbal,
    imageAlt: "한약 처방 시설",
  },
  {
    icon: Flame,
    title: "고주파 온열 암치료",
    subtitle: "Hyperthermia",
    items: ["13.56MHz 고주파"],
    desc: "종양 조직 선택적 열 전달 — 암세포 괴사 유도",
    image: treatHyperthermia,
    imageAlt: "고주파 온열 암치료 장비",
  },
  {
    icon: Wind,
    title: "고압산소치료 (HBOT)",
    subtitle: "Hyperbaric Oxygen",
    items: ["1.5~3기압 고순도 산소"],
    desc: "조직 재생 · 저산소증 개선 · 면역 활성",
    image: treatHbot,
    imageAlt: "고압산소치료 챔버",
  },
  {
    icon: "🤲",
    title: "도수치료",
    subtitle: "Manual Therapy",
    items: ["전문 치료사 시행"],
    desc: "수술 후 근골격 회복 · 통증 완화 · 재활 지원",
    image: treatManual,
    imageAlt: "도수치료 시행",
  },
  {
    icon: "💉",
    title: "미슬토·면역 주사",
    subtitle: "Mistletoe & Immune IV",
    items: ["NK세포 활성화"],
    desc: "면역 강화 · 항암 병행 시 상승 효과",
    image: treatImmune,
    imageAlt: "면역 주사 치료",
  },
  {
    icon: "📍",
    title: "침·뜸·한방 치료",
    subtitle: "Acupuncture & Moxibustion",
    items: ["전통 한방"],
    desc: "기혈 순환 · 통증 완화 · 수면 개선",
    image: treatAcupuncture,
    imageAlt: "침·뜸 한방 치료실",
  },
];

const ProgramsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const modalImages = treatments.map((t) => ({
    src: t.image,
    alt: t.imageAlt,
    caption: `${t.title} — ${t.desc}`,
  }));

  const openModal = (index: number) => {
    setModalIndex(index);
    setModalOpen(true);
  };

  return (
    <section id="programs" className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-gold">
            Recovery Programs
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            당신의 회복을 위한 6가지 치료
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            모든 치료는 암 종류 · 수술 이력 · 현재 상태에 맞춰 개인 설계됩니다.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-gold/40 transition-all duration-300 shadow-soft hover:shadow-card cursor-pointer"
              onClick={() => openModal(i)}
            >
              {/* Treatment image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={t.image}
                  alt={t.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </div>
                <div className="absolute bottom-3 left-3 text-3xl">{t.icon}</div>
              </div>

              <div className="p-5">
                <h3 className="font-serif text-lg font-bold text-foreground">{t.title}</h3>
                <p className="text-xs tracking-wider text-muted-foreground uppercase mb-3">{t.subtitle}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {t.items.map((item, j) => (
                    <span key={j} className="text-xs px-2.5 py-1 rounded-full bg-gold-light text-foreground font-medium">
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            </motion.div>
          ))}
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

export default ProgramsSection;
