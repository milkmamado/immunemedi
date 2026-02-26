import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileBarChart } from "lucide-react";

const stats = [
  { value: "50,000+", label: "누적 치료사례", sub: "Cases Treated" },
  { value: "95%+", label: "환자 만족도", sub: "Patient Satisfaction" },
  { value: "20년+", label: "임상 경력", sub: "Years of Clinical Experience" },
];

const stages = [
  { step: "1단계", time: "수술 전", title: "면역 관리", desc: "체력 강화 · 면역력 증진 · 감염 예방", color: "bg-accent" },
  { step: "2단계", time: "수술 직후", title: "회복 및 재활", desc: "후유증 완화 · 체력 회복 · 신체기능 정상화", color: "bg-accent" },
  { step: "3단계", time: "항암 중", title: "치료 효과 개선", desc: "부작용 감소 · 내성 완화 · 암성 통증 관리", color: "bg-gold" },
  { step: "4단계", time: "항암 종료 후", title: "전이·재발 관리", desc: "면역세포 활성화 · 잔존 암세포 억제", color: "bg-accent" },
  { step: "5단계", time: "장기 관리", title: "면역 안정화", desc: "삶의 질 회복 · 지속 관리", color: "bg-accent" },
];

const EvidenceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="evidence" className="py-24 lg:py-32 bg-primary text-primary-foreground" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <p className="mt-6 text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            5만 명이 넘는 환우분들이 선택한 데이터가 증명하는 신뢰입니다.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-8 mb-20">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center p-8 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10"
            >
              <div className="text-4xl sm:text-5xl font-serif font-bold text-gold mb-2">
                {s.value}
              </div>
              <div className="font-semibold text-primary-foreground mb-1">{s.label}</div>
              <div className="text-sm text-primary-foreground/50">{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Treatment Journey Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-center mb-12">
            암 치료의 모든 단계, 함께합니다
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-primary-foreground/10" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {stages.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="relative text-center lg:text-left"
                >
                  <div className={`w-4 h-4 rounded-full ${s.color} mx-auto lg:mx-0 mb-4 ring-4 ring-primary`} />
                  <div className="text-xs font-semibold text-gold uppercase tracking-wider mb-1">{s.step}</div>
                  <div className="text-sm font-medium text-primary-foreground/60 mb-2">{s.time}</div>
                  <div className="font-serif font-bold text-primary-foreground mb-2">{s.title}</div>
                  <div className="text-sm text-primary-foreground/60 leading-relaxed">{s.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Clinical evidence card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 p-8 rounded-2xl bg-primary-foreground/5 border border-gold/20"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h4 className="font-serif text-xl font-bold text-primary-foreground mb-2">
                한·양방 협진, 생존율을 높입니다
              </h4>
              <p className="text-primary-foreground/70 mb-4 leading-relaxed">
                말기 위암 수술 후 한방 치료를 병행한 환자군에서 생존율이 유의미하게 높아졌다는 임상 연구 결과가 있습니다.
              </p>
              <p className="text-sm text-primary-foreground/40 italic">
                ※ Rao X.Q. et al. (1994). CJITWM, 14(6), 366.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EvidenceSection;
