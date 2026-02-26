import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import doctorsImg from "@/assets/doctors-team.jpg";

const facilities = [
  "쾌적하고 현대적인 입원 병실",
  "고주파 온열·고압산소 전문 치료실",
  "한약 조제 전문 시설",
  "보호자 대기·휴식 공간",
];

const DoctorsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="doctors" className="py-24 lg:py-32 bg-secondary" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-gold">
            Our Doctors & Hospital
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            당신의 회복을 이끄는 전문가들
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            면력한방병원 의료진은 암 회복 통합 치료 분야 깊은 임상 경험을 보유한 전문가들입니다.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={doctorsImg}
              alt="면력한방병원 의료진"
              className="rounded-2xl shadow-elevated w-full object-cover aspect-[4/3]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-8">
              회복을 위해 설계된 공간
            </h3>
            <div className="space-y-4">
              {facilities.map((f, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(38, 65%, 52%)" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </div>
                  <span className="font-medium text-foreground">{f}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-muted-foreground italic">
              ※ 원장 약력·사진 제공 시 개인 프로필 카드 완성 가능
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
