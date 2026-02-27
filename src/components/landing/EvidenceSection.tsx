import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FileBarChart, ChevronLeft, ChevronRight } from "lucide-react";

import evidenceStatsBg from "@/assets/evidence-stats-bg.jpg";
import evidenceResearch from "@/assets/evidence-research.jpg";

function CountUp({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    v >= 1000 ? Math.round(v).toLocaleString() : Math.round(v).toString()
  );
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, {
      duration: 2,
      ease: [0.25, 0.46, 0.45, 0.94],
    });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => { controls.stop(); unsub(); };
  }, [inView, target, count, rounded]);

  return <>{display}{suffix}</>;
}

const stats = [
  { target: 50000, suffix: "+", label: "누적 치료사례", sub: "Cases Treated" },
  { target: 95, suffix: "%+", label: "환자 만족도", sub: "Patient Satisfaction" },
  { target: 20, suffix: "년+", label: "임상 경력", sub: "Years of Clinical Experience" },
];

const stages = [
  { step: "01", time: "수술 전", title: "면역 관리", desc: "체력 강화 · 면역력 증진 · 감염 예방", highlight: false },
  { step: "02", time: "수술 직후", title: "회복 및 재활", desc: "후유증 완화 · 체력 회복 · 신체기능 정상화", highlight: false },
  { step: "03", time: "항암 중", title: "치료 효과 개선", desc: "부작용 감소 · 내성 완화 · 암성 통증 관리", highlight: true },
  { step: "04", time: "항암 종료 후", title: "전이·재발 관리", desc: "면역세포 활성화 · 잔존 암세포 억제", highlight: false },
  { step: "05", time: "장기 관리", title: "면역 안정화", desc: "삶의 질 회복 · 지속 관리", highlight: false },
];

const EvidenceSection = () => {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <div ref={ref}>
      {/* ── Part 1: Stats — background image with dark overlay ── */}
      <section className="relative py-24 lg:py-32 text-primary-foreground overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={evidenceStatsBg}
            alt="병원 시설"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-primary/85" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold tracking-widest uppercase text-gold">
              Clinical Evidence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-4">
              숫자로 증명된 면력의 실력
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center"
              >
                <div className="text-5xl sm:text-6xl font-sans font-bold text-gold mb-3">
                  <CountUp target={s.target} suffix={s.suffix} inView={inView} />
                </div>
                <div className="font-semibold text-primary-foreground text-lg mb-1">{s.label}</div>
                <div className="text-sm text-primary-foreground/40">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Part 2: Treatment Journey — warm cream background ── */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-sm font-semibold tracking-widest uppercase text-gold">
                  Treatment Journey
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mt-3">
                  암 치료의 모든 단계, 함께합니다
                </h3>
              </div>
              <div className="hidden sm:flex gap-2">
                <button
                  onClick={() => scroll("left")}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-background transition-colors"
                  aria-label="이전"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-background transition-colors"
                  aria-label="다음"
                >
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {stages.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className={`flex-shrink-0 w-[280px] snap-start rounded-2xl p-6 transition-all ${
                    s.highlight
                      ? "bg-primary text-primary-foreground shadow-elevated"
                      : "bg-card border border-border shadow-soft hover:shadow-card"
                  }`}
                >
                  <div className={`text-5xl font-sans font-bold mb-4 ${
                    s.highlight ? "text-gold" : "text-muted-foreground/20"
                  }`}>
                    {s.step}
                  </div>
                  <div className="text-xs font-semibold tracking-wider uppercase text-gold mb-1">
                    {s.time}
                  </div>
                  <h4 className={`font-serif text-xl font-bold mb-3 ${
                    s.highlight ? "text-primary-foreground" : "text-foreground"
                  }`}>
                    {s.title}
                  </h4>
                  <p className={`text-sm leading-relaxed ${
                    s.highlight ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}>
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Part 3: Research — image + text side by side ── */}
      <section id="evidence" className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid md:grid-cols-5 gap-8 items-center"
          >
            {/* Image */}
            <div className="md:col-span-2 rounded-2xl overflow-hidden">
              <img
                src={evidenceResearch}
                alt="의료진 협진 장면"
                className="w-full h-64 md:h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Text */}
            <div className="md:col-span-3 p-2 sm:p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <FileBarChart className="w-5 h-5 text-gold" />
                </div>
                <span className="text-xs font-semibold tracking-widest uppercase text-gold">
                  Research
                </span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-primary-foreground mb-3">
                한·양방 협진, 생존율을 높입니다
              </h4>
              <p className="text-primary-foreground/70 leading-relaxed mb-4">
                말기 위암 수술 후 한방 치료를 병행한 환자군에서 생존율이 유의미하게 높아졌다는 임상 연구 결과가 있습니다.
              </p>
              <p className="text-sm text-primary-foreground/40 italic">
                ※ Rao X.Q. et al. (1994). CJITWM, 14(6), 366.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EvidenceSection;
