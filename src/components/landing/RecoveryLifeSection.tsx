import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import recoveryImg from "@/assets/recovery-nature.jpg";

const programs = [
  { icon: "🚶", title: "산책 프로그램", freq: "매일 평일 오전", desc: "병원 인근 야외 산책 버스 운행 — 자연 속 심리적 회복" },
  { icon: "🌸", title: "소풍 프로그램", freq: "매주 1회", desc: "병원 밖 힐링 소풍 — 한국 문화 체험 + 정서적 회복" },
  { icon: "🏃", title: "운동치료", freq: "매주 1회", desc: "전문 치료사와 함께하는 운동 — 체력 회복 + 재활" },
  { icon: "🎨", title: "원데이클래스", freq: "매주 1회", desc: "주제별 다양한 클래스 — 즐거움 + 정서 치유" },
  { icon: "🍱", title: "푸드테라피", freq: "2주 1회", desc: "전문 셰프 + 임상 영양사 협업 — 영양 관리 + 미식 경험" },
];

const RecoveryLifeSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={recoveryImg}
              alt="힐링 산책"
              className="rounded-2xl shadow-elevated w-full object-cover aspect-[16/10]"
            />
            <div className="mt-6 p-6 rounded-xl bg-accent/10 border border-accent/20">
              <p className="font-serif text-lg font-bold text-foreground text-center">
                "치료는 병원에서, 힐링은 면력에서."
              </p>
            </div>
          </motion.div>

          <div className="space-y-4">
            {programs.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="flex gap-4 p-5 rounded-xl bg-card border border-border hover:border-gold/30 transition-colors shadow-soft"
              >
                <span className="text-3xl flex-shrink-0">{p.icon}</span>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-foreground">{p.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gold-light text-foreground font-medium">
                      {p.freq}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecoveryLifeSection;
