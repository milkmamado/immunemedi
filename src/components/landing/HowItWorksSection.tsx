import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, ClipboardList, Hospital, BarChart3, Globe, type LucideIcon } from "lucide-react";

const steps: { step: string; title: string; desc: string; icon: LucideIcon }[] = [
  {
    step: "01",
    title: "온라인 상담",
    desc: "온라인 접수 폼으로 증상·수술 이력 전달. 통역사가 함께 진행합니다.",
    icon: MessageCircle,
  },
  {
    step: "02",
    title: "입원 전 프로그램 설계",
    desc: "의료진이 자료 검토 후 맞춤 회복 계획을 수립합니다.",
    icon: ClipboardList,
  },
  {
    step: "03",
    title: "입원 & 치료 시작",
    desc: "공항 픽업 후 바로 입원. 전담의가 배정됩니다.",
    icon: Hospital,
  },
  {
    step: "04",
    title: "경과 모니터링 & 조정",
    desc: "정기 점검을 통해 처방을 최적화합니다.",
    icon: BarChart3,
  },
  {
    step: "05",
    title: "퇴원 & 원격 사후관리",
    desc: "귀국 후에도 원격 상담으로 지속 관리합니다.",
    icon: Globe,
  },
];

const HowItWorksSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-gold">
            How It Works
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            입원부터 회복 완료까지
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            한 걸음씩, 함께 걸어갑니다.
          </p>
        </motion.div>

        {/* Zigzag Timeline */}
        <div className="relative">
          {/* Center vertical line — desktop only */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <div className="space-y-12 lg:space-y-16">
            {steps.map((s, i) => {
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative"
                >
                  {/* Center dot — desktop */}
                  <div className="hidden lg:flex absolute left-1/2 top-6 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-gold items-center justify-center shadow-gold z-10">
                    <s.icon className="w-5 h-5 text-gold-foreground" />
                  </div>

                  <div className={`lg:grid lg:grid-cols-2 lg:gap-20 items-start ${isLeft ? "" : "direction-rtl"}`}>
                    {/* Content side */}
                    <div className={`${isLeft ? "lg:text-right lg:pr-12" : "lg:col-start-2 lg:pl-12"}`}>
                      {/* Mobile icon */}
                      <div className="lg:hidden w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold mb-4">
                        <s.icon className="w-5 h-5 text-gold-foreground" />
                      </div>

                      <div className="text-xs font-bold text-gold tracking-[0.2em] mb-2">
                        STEP {s.step}
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-3">
                        {s.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {s.desc}
                      </p>
                    </div>

                    {/* Empty side for spacing */}
                    <div className={`hidden lg:block ${isLeft ? "lg:col-start-2" : ""}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
