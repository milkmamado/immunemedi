import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Shield, Thermometer, RefreshCw, Zap, Apple } from "lucide-react";

import healImmunity1 from "@/assets/heal-immunity-1.png";
import healImmunity2 from "@/assets/heal-immunity-2.png";
import healImmunity3 from "@/assets/heal-immunity-3.png";
import healImmunity4 from "@/assets/heal-immunity-4.png";
import healImmunity5 from "@/assets/heal-immunity-5.png";
import healImmunity6 from "@/assets/heal-immunity-6.png";
import healImmunity7 from "@/assets/heal-immunity-7.png";
import healTemperature from "@/assets/heal-temperature.jpg";
import healCirculation from "@/assets/heal-circulation.jpg";
import healResist1 from "@/assets/heal-resist-1.png";
import healResist2 from "@/assets/heal-resist-2.png";
import healResist3 from "@/assets/heal-resist-3.png";
import healResist4 from "@/assets/heal-resist-4.png";
import healNutrition1 from "@/assets/heal-nutrition-1.jpg";
import healNutrition2 from "@/assets/heal-nutrition-2.jpg";
import healNutrition3 from "@/assets/heal-nutrition-3.jpg";
import healNutrition4 from "@/assets/heal-nutrition-4.jpg";
import healNutrition5 from "@/assets/heal-nutrition-5.jpg";
import healNutrition6 from "@/assets/heal-nutrition-6.jpg";
import healNutrition7 from "@/assets/heal-nutrition-7.jpg";
import healNutrition8 from "@/assets/heal-nutrition-8.jpg";

/* ── Treatment item ── */
interface Treatment {
  title: string;
  desc: string;
  image: string;
}

interface SubCategory {
  label: string;
  items: Treatment[];
}

interface Category {
  id: string;
  label: string;
  labelEn: string;
  icon: React.ElementType;
  color: string;
  heroImage?: string;
  subCategories: SubCategory[];
}

const categories: Category[] = [
  {
    id: "immunity",
    label: "면역",
    labelEn: "Immunity",
    icon: Shield,
    color: "text-blue-600",
    subCategories: [
      {
        label: "세포면역",
        items: [
          { title: "싸이모신알파1 요법", desc: "면역방어 기능을 높여 T세포 및 NK세포를 활성화시켜 암세포를 파괴", image: healImmunity1 },
          { title: "미슬토 요법", desc: "암세포 증식을 억제하고 면역기능을 증가시키는 항암 보조 요법", image: healImmunity2 },
          { title: "이뮤노시아닌", desc: "NK세포 활성과 면역 반응을 조절하여 항암 치료를 보조", image: healImmunity3 },
          { title: "NK세포치료제", desc: "배양된 면역세포로 암세포만 선택 공격, 수술 후 미세암 제거", image: healImmunity4 },
          { title: "항암면역증강제", desc: "면역세포 활성화를 통해 항암 효과를 보조하고 재발 위험 감소", image: healImmunity5 },
        ],
      },
      {
        label: "체액면역",
        items: [
          { title: "글루타민 주사", desc: "간세포 재생을 촉진하고 항암 치료로 인한 간 손상을 완화", image: healImmunity6 },
          { title: "면역플러스", desc: "황기 부정단 처방으로 면역기능 증강, 골수기능 개선 및 종양 억제", image: healImmunity7 },
        ],
      },
    ],
  },
  {
    id: "temperature",
    label: "체온",
    labelEn: "Temperature",
    icon: Thermometer,
    color: "text-red-500",
    heroImage: healTemperature,
    subCategories: [
      {
        label: "중심체온상승",
        items: [
          { title: "고주파온열암치료", desc: "고온 환경에서 암 조직을 민감하게 만들고 면역세포를 활성화하여 항암 면역 반응 강화", image: healTemperature },
        ],
      },
      {
        label: "온열요법",
        items: [
          { title: "적외선온열요법", desc: "적외선 에너지로 심부 체온을 올려 혈액순환과 면역 활성을 촉진", image: healTemperature },
        ],
      },
    ],
  },
  {
    id: "circulation",
    label: "순환",
    labelEn: "Circulation",
    icon: RefreshCw,
    color: "text-emerald-500",
    heroImage: healCirculation,
    subCategories: [
      {
        label: "림프순환",
        items: [
          { title: "림프도수", desc: "림프액 유동성을 증가시켜 면역력을 강화하고 부종을 감소", image: healCirculation },
          { title: "침전기물리치료", desc: "경혈 자극과 물리치료를 병행하여 림프 순환 촉진", image: healCirculation },
        ],
      },
      {
        label: "혈액순환",
        items: [
          { title: "침전기물리치료", desc: "혈액순환을 개선하여 영양 공급과 노폐물 배출을 원활하게", image: healCirculation },
        ],
      },
    ],
  },
  {
    id: "resistance",
    label: "저항성",
    labelEn: "Resistibility",
    icon: Zap,
    color: "text-amber-500",
    subCategories: [
      {
        label: "항산화 항노화",
        items: [
          { title: "셀레늄 요법", desc: "활성산소를 제거하고 항산화 작용으로 암세포 자연사멸 유도", image: healResist1 },
          { title: "글루타치온", desc: "영양제 효과를 촉진하고 항암제로 인한 신경성 통증 감소", image: healResist2 },
          { title: "고농도 비타민 요법", desc: "항노화 핵산 합성을 촉진하고 메스꺼움·말초신경 염증 완화", image: healResist3 },
          { title: "태반추출물", desc: "간 기능 개선을 돕고 피로 회복과 면역 활성에 효과적", image: healResist4 },
        ],
      },
    ],
  },
  {
    id: "nutrition",
    label: "영양",
    labelEn: "Nutrition",
    icon: Apple,
    color: "text-green-600",
    subCategories: [
      {
        label: "치료식이",
        items: [
          { title: "표준 항암식", desc: "부작용을 줄이고 항암 치료로 손상된 조직을 회복하는 치료식사", image: healNutrition1 },
          { title: "영양 관리", desc: "적절한 영양 제공으로 영양 상태와 적정 체중 유지", image: healNutrition2 },
        ],
      },
      {
        label: "맞춤식이",
        items: [
          { title: "셰프 라이브 코너", desc: "환우분들의 기호에 맞춘 면역 회복 선택식", image: healNutrition3 },
          { title: "항암 맞춤 코너", desc: "암종별 맞춤 식단 제공", image: healNutrition4 },
          { title: "항암 쌈채소 코너", desc: "신선한 유기농 쌈채소 제공", image: healNutrition5 },
          { title: "제철 과일 코너", desc: "계절별 신선한 과일 제공", image: healNutrition6 },
          { title: "수제 건강음료 코너", desc: "면역 증진을 위한 수제 음료", image: healNutrition7 },
          { title: "비빔밥 코너", desc: "영양 균형 맞춤 비빔밥", image: healNutrition8 },
        ],
      },
    ],
  },
];

const ProgramsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeId, setActiveId] = useState("immunity");

  const active = categories.find((c) => c.id === activeId)!;

  return (
    <section id="programs" className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-gold">
            Treatment Programs
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            그렇다면 어떤 치료가 필요할까요?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            면역 · 체온 · 순환 · 저항성 · 영양, 5가지 핵심 축으로 구성된 통합 면역암치료
          </p>
        </motion.div>

        {/* 5-pillar tab buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-2 sm:gap-4 mb-14 flex-wrap"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveId(cat.id)}
                className={`group flex flex-col items-center gap-2 px-5 py-4 rounded-2xl text-sm font-medium transition-all duration-300 border min-w-[80px] ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-gold scale-105"
                    : "bg-card text-foreground border-border hover:border-gold/40 hover:shadow-soft"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "text-primary-foreground" : cat.color}`} />
                <span className="font-bold">{cat.label}</span>
                <span className="text-[10px] opacity-60 uppercase tracking-wider">{cat.labelEn}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Active category content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {/* Hero image for temperature / circulation */}
            {active.heroImage && (
              <div className="relative rounded-2xl overflow-hidden mb-10 max-w-4xl mx-auto aspect-[21/9]">
                <img
                  src={active.heroImage}
                  alt={active.label}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-background">
                    {active.label}
                  </h3>
                  <p className="text-background/70 text-sm mt-1">{active.labelEn}</p>
                </div>
              </div>
            )}

            {/* Sub-categories */}
            {active.subCategories.map((sub, si) => (
              <div key={sub.label} className={si > 0 ? "mt-10" : ""}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 rounded-full bg-gold" />
                  <h3 className="font-serif text-xl font-bold text-foreground">{sub.label}</h3>
                </div>

                <div className={`grid gap-4 ${
                  sub.items.length <= 2
                    ? "sm:grid-cols-2 max-w-3xl"
                    : sub.items.length <= 3
                      ? "sm:grid-cols-3 max-w-5xl"
                      : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                }`}>
                  {sub.items.map((item, i) => (
                    <motion.div
                      key={item.title + i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-gold/40 transition-all duration-300 shadow-soft hover:shadow-card"
                    >
                      <div className="aspect-square overflow-hidden bg-muted">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="px-4 py-3">
                        <h4 className="font-serif text-sm font-bold text-foreground leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-snug mt-1 line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProgramsSection;
