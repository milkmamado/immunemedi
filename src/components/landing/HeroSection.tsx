import { motion } from "framer-motion";
import heroImg from "@/assets/hero-hospital.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="면력한방병원 로비"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 mb-8">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-sm font-medium text-gold-light">
              한국 최고의 암 회복 통합 케어
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-6">
            어디서 수술을 받으셨든,
            <br />
            <span className="text-gradient-gold">회복은 면력에서</span>
            <br />
            시작됩니다.
          </h1>

          <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-xl mb-10 leading-relaxed">
            면력한방병원은 한방·양방 복합 암 회복 전문 병원입니다.
            전담의·통역사와 함께 최적의 회복 환경을 제공합니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gold text-gold-foreground font-semibold text-lg shadow-gold hover:opacity-90 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.5 3 2 6.58 2 11c0 2.83 1.82 5.32 4.56 6.75-.16.98-.55 2.56-1.53 3.56 0 0 2.82-.49 4.9-2.15.69.1 1.39.16 2.07.16 5.5 0 10-3.58 10-8s-4.5-8-10-8z"/>
              </svg>
              카카오톡으로 상담 시작
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-lg hover:bg-primary-foreground/10 transition-all"
            >
              LINE으로 문의하기
            </a>
          </div>

          <p className="mt-6 text-sm text-primary-foreground/60">
            한국어 · 영어 · 베트남어 상담 가능 &nbsp;|&nbsp; 24시간 내 답변
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-primary-foreground/50" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
