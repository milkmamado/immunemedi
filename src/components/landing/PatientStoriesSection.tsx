import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import patient1 from "@/assets/patient-1.jpg";
import patient2 from "@/assets/patient-2.jpg";
import patient3 from "@/assets/patient-3.jpg";
import patient4 from "@/assets/patient-4.jpg";
import patient5 from "@/assets/patient-5.jpg";
import patient6 from "@/assets/patient-6.jpg";

const reviews = [
  {
    text: "After my surgery in the U.S., I came to Myeonryeok for recovery. The combination of herbal medicine and hyperthermia therapy brought my strength back faster than I ever expected. The dedicated interpreter made everything seamless.",
    name: "Sarah M.",
    country: "United States",
    condition: "Gastric cancer, post-surgery",
    stay: "3-week inpatient program",
    image: patient1,
  },
  {
    text: "I was going through chemo back home and the side effects were overwhelming. The manual therapy and acupuncture here reduced my pain significantly. I finally felt like a human again, not just a patient.",
    name: "Marcus J.",
    country: "United Kingdom",
    condition: "Lung cancer, during chemotherapy",
    stay: "2-week inpatient program",
    image: patient2,
  },
  {
    text: "The hyperbaric oxygen therapy was a game-changer for my recovery. Within days I could feel my energy returning. The medical team monitored everything closely and adjusted my plan in real time.",
    name: "Daniel R.",
    country: "Australia",
    condition: "Colorectal cancer, post-surgery",
    stay: "4-week inpatient program",
    image: patient3,
  },
  {
    text: "What impressed me most was the holistic approach — it wasn't just about treating the cancer, but restoring my whole body. The food therapy classes and nature outings gave me hope I hadn't felt in months.",
    name: "Catherine L.",
    country: "Canada",
    condition: "Breast cancer, recurrence prevention",
    stay: "3-week inpatient program",
    image: patient4,
  },
  {
    text: "From airport pickup to the VIP room, everything was world-class. My family stayed nearby and the team coordinated everything. The immune therapy combined with traditional Korean medicine was exactly what I needed.",
    name: "Raj P.",
    country: "India",
    condition: "Liver cancer, immune support",
    stay: "2-week inpatient program",
    image: patient5,
  },
  {
    text: "I traveled alone and was nervous, but the 24/7 care team made me feel safe from day one. The personalized herbal prescriptions and daily acupuncture sessions made a visible difference in my blood work.",
    name: "Leila A.",
    country: "UAE",
    condition: "Thyroid cancer, post-surgery",
    stay: "3-week inpatient program",
    image: patient6,
  },
];

const PatientStoriesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const go = (dir: "prev" | "next") => {
    setCurrent((prev) =>
      dir === "prev"
        ? prev === 0 ? reviews.length - 1 : prev - 1
        : prev === reviews.length - 1 ? 0 : prev + 1
    );
  };

  const r = reviews[current];

  return (
    <section id="stories" className="py-24 lg:py-32 bg-secondary" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Slide */}
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-5 gap-8 lg:gap-12 items-center"
        >
          {/* Photo */}
          <div className="md:col-span-2 flex justify-center">
            <div className="relative">
              <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative gold accent */}
              <div className="absolute -bottom-3 -right-3 w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-2xl border-2 border-gold/30 -z-10" />
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            <Quote className="w-10 h-10 text-gold/40 mb-4" />
            <p className="text-foreground/80 text-lg leading-relaxed mb-6">
              "{r.text}"
            </p>
            <div className="mb-2">
              <span className="font-semibold text-foreground text-lg">
                {r.name}
              </span>
              <span className="text-muted-foreground ml-2">— {r.country}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {r.condition} · {r.stay}
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={() => go("prev")}
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-card transition-colors"
            aria-label="Previous story"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === current
                    ? "bg-gold w-8"
                    : "bg-border hover:bg-muted-foreground/40"
                }`}
                aria-label={`Story ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => go("next")}
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-card transition-colors"
            aria-label="Next story"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PatientStoriesSection;
