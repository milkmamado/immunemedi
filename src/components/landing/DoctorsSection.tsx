import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ImageModal from "./ImageModal";

import doctorsTeamImg from "@/assets/doctors-team.jpg";
import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";
import facilityLobby from "@/assets/facility-lobby.jpg";
import facilityPharmacy from "@/assets/facility-pharmacy.jpg";
import vipRoom from "@/assets/vip-room.jpg";
import heroHospital from "@/assets/hero-hospital.jpg";

const doctors = [
  {
    name: "김○○ 원장",
    title: "한방내과 전문의 · 대표원장",
    desc: "암 회복 통합 치료 20년 경력",
    image: doctor1,
  },
  {
    name: "이○○ 원장",
    title: "한방부인과 전문의",
    desc: "유방암·부인암 회복 전문",
    image: doctor2,
  },
  {
    name: "박○○ 원장",
    title: "한방재활의학과 전문의",
    desc: "수술 후 재활 및 통증 관리",
    image: doctor3,
  },
];

const facilityImages = [
  { src: facilityLobby, alt: "병원 로비", caption: "현대적이고 쾌적한 병원 로비" },
  { src: vipRoom, alt: "VIP 입원실", caption: "호텔급 VIP 입원 병실" },
  { src: facilityPharmacy, alt: "한약 조제실", caption: "최신 설비의 한약 조제 전문 시설" },
  { src: heroHospital, alt: "병원 전경", caption: "자연과 함께하는 병원 공간" },
];

const DoctorsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [doctorModal, setDoctorModal] = useState(false);
  const [doctorIndex, setDoctorIndex] = useState(0);
  const [facilityModal, setFacilityModal] = useState(false);
  const [facilityIndex, setFacilityIndex] = useState(0);

  const doctorImages = doctors.map((d) => ({
    src: d.image,
    alt: d.name,
    caption: `${d.name} — ${d.title} | ${d.desc}`,
  }));

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

        {/* Doctors grid */}
        <div className="grid sm:grid-cols-3 gap-8 mb-20">
          {doctors.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group cursor-pointer"
              onClick={() => {
                setDoctorIndex(i);
                setDoctorModal(true);
              }}
            >
              <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[3/4] shadow-card">
                <img
                  src={d.image}
                  alt={d.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium text-foreground">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                    프로필 보기
                  </span>
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-1">{d.name}</h3>
              <p className="text-sm font-medium text-gold mb-1">{d.title}</p>
              <p className="text-sm text-muted-foreground">{d.desc}</p>
            </motion.div>
          ))}
        </div>


        {/* Hospital Facilities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-center mb-10">
            회복을 위해 설계된 공간
          </h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {facilityImages.map((img, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer shadow-soft hover:shadow-card transition-shadow"
                onClick={() => {
                  setFacilityIndex(i);
                  setFacilityModal(true);
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-medium text-background">{img.caption}</p>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <ImageModal
        images={doctorImages}
        initialIndex={doctorIndex}
        isOpen={doctorModal}
        onClose={() => setDoctorModal(false)}
      />
      <ImageModal
        images={facilityImages}
        initialIndex={facilityIndex}
        isOpen={facilityModal}
        onClose={() => setFacilityModal(false)}
      />
    </section>
  );
};

export default DoctorsSection;
