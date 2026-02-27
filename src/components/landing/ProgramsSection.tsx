import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Shield, Thermometer, RefreshCw, Zap, Apple, ChevronDown } from "lucide-react";

import treatThymosin from "@/assets/treat-thymosin.jpg";
import treatMistletoe from "@/assets/treat-mistletoe-new.jpg";
import treatImmunocyanin from "@/assets/treat-immunocyanin.jpg";
import treatNkCell from "@/assets/treat-nk-cell-new.jpg";
import treatImmuneBoost from "@/assets/treat-immune-boost.jpg";
import treatGlutamine from "@/assets/treat-glutamine-new.jpg";
import treatHerbalImmune from "@/assets/treat-herbal-immune.jpg";
import healTemperature from "@/assets/heal-temperature.jpg";
import healHyperthermiaDevice from "@/assets/heal-hyperthermia-device.jpg";
import healCirculation from "@/assets/heal-circulation.jpg";
import healLymphDevice from "@/assets/heal-lymph-device.jpg";
import treatSelenium from "@/assets/treat-selenium.jpg";
import treatGlutathione from "@/assets/treat-glutathione.jpg";
import treatVitamin from "@/assets/treat-vitamin.jpg";
import treatPlacenta from "@/assets/treat-placenta.jpg";
import healNutrition1 from "@/assets/heal-nutrition-1.jpg";
import healNutrition2 from "@/assets/heal-nutrition-2.jpg";
import healNutrition3 from "@/assets/heal-nutrition-3.jpg";
import healNutrition4 from "@/assets/heal-nutrition-4.jpg";
import healNutrition5 from "@/assets/heal-nutrition-5.jpg";
import healNutrition6 from "@/assets/heal-nutrition-6.jpg";
import healNutrition7 from "@/assets/heal-nutrition-7.jpg";
import healNutrition8 from "@/assets/heal-nutrition-8.jpg";
import healDiagram from "@/assets/heal-diagram.svg";

interface Treatment {
  title: string;
  desc: string;
  image: string;
}

interface SubCategory {
  label: string;
  desc?: string;
  items: Treatment[];
}

interface Category {
  id: string;
  label: string;
  labelEn: string;
  icon: React.ElementType;
  desc: string;
  subCategories: SubCategory[];
}

const categories: Category[] = [
  {
    id: "immunity",
    label: "면역",
    labelEn: "Immunity",
    icon: Shield,
    desc: "면역세포 활성화를 통한 암세포 제거 및 재발 방지",
    subCategories: [
      {
        label: "세포면역",
        items: [
          { title: "싸이모신알파1 요법", desc: "면역방어 기능을 높여 항암효과를 얻도록 합니다. 면역조절작용을 통해 T세포 및 NK세포를 활성화시켜 암세포를 파괴합니다.", image: treatThymosin },
          { title: "미슬토 요법", desc: "암세포의 증식을 억제시켜 사멸에 도움, 항암물질 및 면역기능을 증가시키는 물질이 함유되어 있습니다.", image: treatMistletoe },
          { title: "이뮤노시아닌", desc: "NK세포 활성과 면역 반응을 조절하여 항암 치료를 보조합니다.", image: treatImmunocyanin },
          { title: "NK세포치료제", desc: "몸속 면역세포를 배양시킨 살해 세포로써 암세포만을 선택적으로 공격합니다. 환자 본인에게만 투여할 수 있는 항암제로, 수술 이후의 미세 암 제거에도 도움을 줍니다.", image: treatNkCell },
          { title: "항암면역증강제", desc: "면역세포 활성화를 통해 항암 효과를 보조하고 재발 위험을 낮춥니다.", image: treatImmuneBoost },
        ],
      },
      {
        label: "체액면역",
        items: [
          { title: "글루타민 주사", desc: "간세포 재생을 촉진하고 항암 치료로 인한 간 손상을 완화", image: treatGlutamine },
          { title: "면역플러스", desc: "황기 부정단 처방으로 면역기능 증강, 골수기능 개선 및 종양 억제", image: treatHerbalImmune },
        ],
      },
    ],
  },
  {
    id: "temperature",
    label: "체온",
    labelEn: "Temperature",
    icon: Thermometer,
    desc: "심부 체온 상승을 통한 면역력 강화 및 암세포 사멸 유도",
    subCategories: [
      {
        label: "중심체온상승",
        items: [
          { title: "고주파온열암치료", desc: "고온 환경에서 암 조직은 더 민감해지고, 면역세포가 활성화되어 종양 미세환경에서 항암 면역 반응이 강화됩니다. 항암제 투여와 고주파온열 치료를 병행할 경우, 생존기간이 유의미하게 증가했다는 연구결과가 존재합니다.", image: healTemperature },
        ],
      },
      {
        label: "온열요법",
        items: [
          { title: "적외선온열요법", desc: "적외선 에너지로 심부 체온을 올려 혈액순환과 면역 활성을 촉진합니다.", image: healTemperature },
        ],
      },
    ],
  },
  {
    id: "circulation",
    label: "순환",
    labelEn: "Circulation",
    icon: RefreshCw,
    desc: "림프 및 혈액 순환 촉진으로 면역 기능 최적화",
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
    desc: "항산화·항노화 작용으로 암에 대한 신체 저항력 향상",
    subCategories: [
      {
        label: "항산화 항노화",
        items: [
          { title: "셀레늄 요법", desc: "활성산소를 제거하고 항산화 작용으로 암세포 자연사멸 유도", image: treatSelenium },
          { title: "글루타치온", desc: "영양제 효과를 촉진하고 항암제로 인한 신경성 통증 감소", image: treatGlutathione },
          { title: "고농도 비타민 요법", desc: "항노화 핵산 합성을 촉진하고 메스꺼움·말초신경 염증 완화", image: treatVitamin },
          { title: "태반추출물", desc: "간 기능 개선을 돕고 피로 회복과 면역 활성에 효과적", image: treatPlacenta },
        ],
      },
    ],
  },
  {
    id: "nutrition",
    label: "영양",
    labelEn: "Nutrition",
    icon: Apple,
    desc: "암종별 맞춤 치료식과 영양 관리로 회복력 극대화",
    subCategories: [
      {
        label: "치료식이",
        desc: "적절한 영양을 제공하여 치료 기간 동안 부작용을 줄이고 항암 치료로 손상된 조직을 회복하며, 영양 상태와 적정 체중을 유지할 수 있도록 돕는 식사를 제공합니다.",
        items: [
          { title: "표준 항암식", desc: "", image: healNutrition1 },
          { title: "영양 관리", desc: "", image: healNutrition2 },
        ],
      },
      {
        label: "맞춤식이",
        desc: "환우분들의 기호에 맞춘 30여 종 면역 회복 선택식 제공",
        items: [
          { title: "셰프 라이브 코너", desc: "", image: healNutrition3 },
          { title: "항암 맞춤 코너", desc: "", image: healNutrition4 },
          { title: "항암 쌈채소 코너", desc: "", image: healNutrition5 },
          { title: "제철 과일 코너", desc: "", image: healNutrition6 },
          { title: "수제 건강음료 코너", desc: "", image: healNutrition7 },
          { title: "비빔밥 코너", desc: "", image: healNutrition8 },
        ],
      },
    ],
  },
];

const ProgramsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [openId, setOpenId] = useState<string | null>("immunity");

  const toggle = (id: string) => setOpenId(openId === id ? null : id);

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
            The 5 Principles of Recovery
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            암 회복, 다섯 가지를 함께 봅니다
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            면역 · 체온 · 순환 · 저항성 · 영양 —<br className="hidden sm:inline" />
            각 원칙에 맞는 근거 기반 치료를 설계합니다.
          </p>
        </motion.div>

        {/* Accordion list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-5xl mx-auto space-y-3"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isOpen = openId === cat.id;

            return (
              <div
                key={cat.id}
                className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-gold/40 shadow-card bg-card"
                    : "border-border bg-card/50 hover:border-gold/20"
                }`}
              >
                {/* Accordion header */}
                <button
                  onClick={() => toggle(cat.id)}
                  className="w-full flex items-center gap-4 px-5 sm:px-7 py-5 sm:py-6 text-left transition-colors"
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl transition-colors ${
                      isOpen
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground">
                        {cat.label}
                      </h3>
                      <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
                        {cat.labelEn}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 truncate">
                      {cat.desc}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Accordion body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-7 pb-6 sm:pb-8 pt-2 space-y-8">
                        {/* Temperature hero image */}
                        {cat.id === "temperature" && (
                          <div className="rounded-xl overflow-hidden max-w-[592px]">
                            <img
                              src={healHyperthermiaDevice}
                              alt="고주파온열암치료 장비"
                              className="w-full h-auto"
                              width={592}
                              height={336}
                              loading="lazy"
                            />
                          </div>
                        )}
                        {/* Circulation hero image */}
                        {cat.id === "circulation" && (
                          <div className="rounded-xl overflow-hidden max-w-[592px]">
                            <img
                              src={healLymphDevice}
                              alt="림프순환 치료"
                              className="w-full h-auto"
                              width={592}
                              height={336}
                              loading="lazy"
                            />
                          </div>
                        )}
                        {cat.subCategories.map((sub) => (
                          <div key={sub.label}>
                            {/* Subcategory label */}
                            <div className="flex items-center gap-2.5 mb-2">
                              <div className="w-0.5 h-5 rounded-full bg-gold" />
                              <h4 className="text-sm sm:text-base font-bold text-foreground">
                                {sub.label}
                              </h4>
                            </div>

                            {/* Subcategory description */}
                            {sub.desc && (
                              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 ml-3">
                                {sub.desc}
                              </p>
                            )}

                            {/* Treatment items */}
                            {cat.id === "nutrition" ? (
                              /* Nutrition: image grid only */
                              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                {sub.items.map((item, i) => (
                                  <motion.div
                                    key={item.title + i}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25, delay: i * 0.04 }}
                                    className="group"
                                  >
                                    <div className="rounded-xl overflow-hidden border border-border bg-background">
                                      <div className="aspect-square overflow-hidden bg-muted">
                                        <img
                                          src={item.image}
                                          alt={item.title}
                                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                          loading="lazy"
                                        />
                                      </div>
                                      <div className="px-3 py-2">
                                        <h5 className="text-xs sm:text-sm font-bold text-foreground text-center">
                                          {item.title}
                                        </h5>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            ) : (cat.id === "temperature" || cat.id === "circulation") ? (
                              /* Text-only clean list */
                              <div className="space-y-3">
                                {sub.items.map((item, i) => (
                                  <motion.div
                                    key={item.title + i}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25, delay: i * 0.04 }}
                                    className="rounded-xl border border-border bg-background p-4"
                                  >
                                    <h5 className="text-sm sm:text-base font-bold text-foreground leading-tight">
                                      {item.title}
                                    </h5>
                                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1.5">
                                      {item.desc}
                                    </p>
                                  </motion.div>
                                ))}
                              </div>
                            ) : (
                              /* List layout: text left, small image right */
                              <div className="space-y-3">
                                {sub.items.map((item, i) => (
                                  <motion.div
                                    key={item.title + i}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25, delay: i * 0.04 }}
                                    className="group flex items-center gap-4 rounded-xl border border-border bg-background p-4 hover:border-gold/30 transition-colors"
                                  >
                                    <div className="flex-1 min-w-0">
                                      <h5 className="text-sm sm:text-base font-bold text-foreground leading-tight">
                                        {item.title}
                                      </h5>
                                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1.5">
                                        {item.desc}
                                      </p>
                                    </div>
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-muted">
                                      <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                      />
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramsSection;
