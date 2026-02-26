import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, ClipboardList, Hospital, BarChart3, Globe, type LucideIcon } from "lucide-react";

const steps: { step: string; title: string; desc: string; icon: LucideIcon }[] = [
  {
    step: "01",
    title: "온라인 상담",
    desc: "카카오톡·LINE으로 증상·수술 이력 전달\n통역사가 함께 진행",
    icon: MessageCircle,
  },
  {
    step: "02",
    title: "입원 전 프로그램 설계",
    desc: "의료진이 자료 검토 후\n맞춤 회복 계획 수립",
    icon: ClipboardList,
  },
  {
    step: "03",
    title: "입원 & 치료 시작",
    desc: "공항 픽업 후 바로 입원\n전담의 배정",
    icon: Hospital,
  },
  {
    step: "04",
    title: "경과 모니터링 & 조정",
    desc: "정기 점검\n처방 최적화",
    icon: BarChart3,
  },
  {
    step: "05",
    title: "퇴원 & 원격 사후관리",
    desc: "귀국 후에도\n원격 상담으로 지속 관리",
    icon: Globe,
  },
];

const HowItWorksSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative text-center"
              >
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-gold text-gold-foreground flex items-center justify-center mx-auto mb-5 shadow-gold">
                  <s.icon className="w-7 h-7" />
                </div>
                <div className="text-xs font-bold text-gold tracking-widest mb-2">
                  STEP {s.step}
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
