import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const reviews = [
  {
    text: "베트남에서 수술 후 면력에 입원했는데, 전담 통역사 덕분에 처음부터 끝까지 불안함이 없었습니다. 한약과 온열치료 병행으로 체력이 빠르게 돌아왔고, 소풍 프로그램에서 한국 자연도 즐길 수 있었어요.",
    name: "N.T.",
    country: "베트남",
    condition: "위암 수술 후",
    stay: "3주 입원",
  },
  {
    text: "미국에서 항암 치료 중 한국에 왔습니다. 도수치료와 침 치료로 부작용 통증이 많이 줄었고, 푸드테라피 클래스가 특히 좋았습니다.",
    name: "J.K.",
    country: "미국 교포",
    condition: "유방암",
    stay: "2주 입원",
  },
  {
    text: "공항 픽업부터 보호자 숙소까지 모두 연결해주셔서 가족이 함께 편하게 있을 수 있었습니다. 고압산소치료 후 회복 속도가 눈에 띄게 달라졌습니다.",
    name: "P.S.",
    country: "태국",
    condition: "대장암 수술 후",
    stay: "4주 입원",
  },
];

const PatientStoriesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stories" className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-gold">
            Patient Stories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            환자들의 이야기
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card rounded-2xl p-8 border border-border shadow-card flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6 text-gold">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed flex-1 mb-6">
                "{r.text}"
              </p>
              <div className="pt-4 border-t border-border">
                <div className="font-semibold text-foreground">— {r.name}, {r.country}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {r.condition} | {r.stay}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PatientStoriesSection;
