import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

import whyBranches from "@/assets/why-branches.jpg";
import whyIntegrative from "@/assets/why-integrative.jpg";
import whyInternational from "@/assets/why-international.jpg";

const strengths: { image: string; title: React.ReactNode; locations?: string; subtitle?: string; desc: string }[] = [
  {
    image: whyBranches,
    title: <>서울·경기 <span className="font-sans">4</span>개 지점 운영</>,
    locations: "강서 · 광명 · 신촌 · 성동",
    desc: "검증된 네트워크, 탄탄한 임상 인프라",
  },
  {
    image: whyIntegrative,
    title: "한방·양방 통합 케어",
    subtitle: "한 병원에서 모두 가능",
    desc: "한약 · 침 · 온열치료 · 고압산소 · 도수치료",
  },
  {
    image: whyInternational,
    title: "해외 환자 전담 시스템",
    subtitle: "원스톱 서비스",
    desc: "통역 · 전담의 · 픽업 · 숙박 — 모두 원스톱으로",
  },
];

const WhyUsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-us" className="py-24 lg:py-32 bg-secondary" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-gold">
            Why Korea? Why Myeonryeok?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            왜 한국인가? 왜 면력인가?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            한국은 세계가 인정하는 의료 강국.
            면력한방병원은 그 중심에서 암 회복 통합 케어를 이끕니다.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {strengths.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300 border border-border"
            >
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={s.image}
                  alt={typeof s.title === "string" ? s.title : ""}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-8">
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                  {s.title}
                </h3>
                {s.locations && (
                  <p className="text-sm font-medium text-gold mb-3">{s.locations}</p>
                )}
                {s.subtitle && (
                  <p className="text-sm font-medium text-gold mb-3">{s.subtitle}</p>
                )}
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
