import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ImageModal from "./ImageModal";
import vipRoomImg from "@/assets/vip-room.jpg";
import facilityLobby from "@/assets/facility-lobby.jpg";
import heroHospital from "@/assets/hero-hospital.jpg";

const services = [
  { icon: "👨‍⚕️", title: "전담 담당의", desc: "입원부터 퇴원까지 1:1 전담 한의사 배정" },
  { icon: "🗣️", title: "전담 통역사", desc: "영어 · 베트남어 등 다국어 — 진료·일상 전담" },
  { icon: "🚘", title: "공항 픽업", desc: "인천·김포공항 → 병원 전용 차량 운행" },
  { icon: "🏨", title: "보호자 숙박 연계", desc: "병원 인근 숙소 직접 예약 연결" },
];

const galleryImages = [
  { src: vipRoomImg, alt: "VIP 병실", caption: "호텔급 VIP 입원 병실 — 쾌적한 회복 환경" },
  { src: facilityLobby, alt: "병원 로비", caption: "모던하고 넓은 병원 로비" },
  { src: heroHospital, alt: "병원 라운지", caption: "자연을 바라보며 쉴 수 있는 휴게 공간" },
];

const VipCareSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  return (
    <section id="vip" className="py-24 lg:py-32 bg-secondary" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold tracking-widest uppercase text-gold">
              VIP Care Services
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
              당신만을 위한
              <br />
              원스톱 VIP 케어
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              언어도, 이동도, 숙소도 — 모든 것을 우리가 준비합니다.
              환자분은 오직 회복에만 집중하세요.
            </p>

            <div className="space-y-6">
              {services.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold-light flex items-center justify-center flex-shrink-0 text-2xl">
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image gallery grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-3">
              {/* Main large image */}
              <div
                className="col-span-2 group relative overflow-hidden rounded-2xl cursor-pointer shadow-elevated"
                onClick={() => { setModalIndex(0); setModalOpen(true); }}
              >
                <img
                  src={vipRoomImg}
                  alt="VIP 병실"
                  className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium text-foreground">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                    크게 보기
                  </span>
                </div>
              </div>
              {/* Two smaller images */}
              {galleryImages.slice(1).map((img, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-xl cursor-pointer shadow-card"
                  onClick={() => { setModalIndex(i + 1); setModalOpen(true); }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-card/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute -bottom-5 -left-5 bg-card rounded-xl p-5 shadow-card border border-border">
              <div className="text-sm font-medium text-muted-foreground mb-1">해외 환자 전담</div>
              <div className="font-serif text-xl font-bold text-foreground">원스톱 케어 시스템</div>
            </div>
          </motion.div>
        </div>
      </div>

      <ImageModal
        images={galleryImages}
        initialIndex={modalIndex}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};

export default VipCareSection;
