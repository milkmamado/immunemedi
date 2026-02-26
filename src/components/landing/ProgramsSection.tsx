import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const treatments = [
  {
    icon: "🌿",
    title: "한약 처방",
    subtitle: "Herbal Medicine",
    items: ["면역플러스", "항암플러스", "신종단"],
    desc: "면역 강화 · 종양 억제 · 부작용 완화",
  },
  {
    icon: "🔥",
    title: "고주파 온열 암치료",
    subtitle: "Hyperthermia",
    items: ["13.56MHz 고주파"],
    desc: "종양 조직 선택적 열 전달 — 암세포 괴사 유도",
  },
  {
    icon: "💨",
    title: "고압산소치료 (HBOT)",
    subtitle: "Hyperbaric Oxygen",
    items: ["1.5~3기압 고순도 산소"],
    desc: "조직 재생 · 저산소증 개선 · 면역 활성",
  },
  {
    icon: "🤲",
    title: "도수치료",
    subtitle: "Manual Therapy",
    items: ["전문 치료사 시행"],
    desc: "수술 후 근골격 회복 · 통증 완화 · 재활 지원",
  },
  {
    icon: "💉",
    title: "미슬토·면역 주사",
    subtitle: "Mistletoe & Immune IV",
    items: ["NK세포 활성화"],
    desc: "면역 강화 · 항암 병행 시 상승 효과",
  },
  {
    icon: "📍",
    title: "침·뜸·한방 치료",
    subtitle: "Acupuncture & Moxibustion",
    items: ["전통 한방"],
    desc: "기혈 순환 · 통증 완화 · 수면 개선",
  },
];

const ProgramsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
              className="group bg-card rounded-2xl p-7 border border-border hover:border-gold/40 transition-all duration-300 shadow-soft hover:shadow-card"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl flex-shrink-0">{t.icon}</span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-foreground">{t.title}</h3>
                  <p className="text-xs tracking-wider text-muted-foreground uppercase">{t.subtitle}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {t.items.map((item, j) => (
                  <span key={j} className="text-xs px-2.5 py-1 rounded-full bg-gold-light text-foreground font-medium">
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
