import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 lg:py-32 bg-primary text-primary-foreground" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-gold">
            Contact & CTA
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            지금 바로 회복을 시작하세요
          </h2>
          <p className="text-lg text-primary-foreground/70 mb-10">
            카카오톡 또는 LINE으로 문의주시면 24시간 내 전담 상담사가 연락드립니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl bg-gold text-gold-foreground font-semibold text-lg shadow-gold hover:opacity-90 transition-all"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.5 3 2 6.58 2 11c0 2.83 1.82 5.32 4.56 6.75-.16.98-.55 2.56-1.53 3.56 0 0 2.82-.49 4.9-2.15.69.1 1.39.16 2.07.16 5.5 0 10-3.58 10-8s-4.5-8-10-8z"/>
              </svg>
              카카오톡으로 상담하기
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-lg hover:bg-primary-foreground/10 transition-all"
            >
              LINE으로 문의하기
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-primary-foreground/60 mb-12">
            <span>한국어 · 영어 · 베트남어 상담 가능</span>
            <span className="hidden sm:inline">|</span>
            <span>입원 문의 · 프로그램 · 비용 모두 상담 가능</span>
          </div>

          <div className="p-8 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10">
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-primary-foreground mb-2 flex items-center gap-2"><MapPin className="w-4 h-4 text-gold" /> 위치</h4>
                <p className="text-sm text-primary-foreground/60">
                  서울특별시 (강서 · 광명 · 신촌 · 성동)
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary-foreground mb-2 flex items-center gap-2"><Clock className="w-4 h-4 text-gold" /> 운영시간</h4>
                <p className="text-sm text-primary-foreground/60">
                  평일 09:00–20:00 | 주말·공휴일 09:00–15:00 KST
                </p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-xs text-primary-foreground/40">
            치료 효과는 개인에 따라 다를 수 있습니다. 모든 프로그램은 의료진 진단 후 제공됩니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
