import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronRight, ClipboardCheck, TestTube, Stethoscope, Microscope } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import ImageModal from "./ImageModal";
import ImageEditorOverlay, { getImageSettings } from "./ImageEditorOverlay";
import { useIsMobile } from "@/hooks/use-mobile";

import treatHyperthermia from "@/assets/treat-hyperthermia.jpg";
import treatHbot from "@/assets/treat-hbot.jpg";
import treatManual from "@/assets/treat-manual.jpg";
import treatImmune from "@/assets/treat-immune.jpg";
import treatMistletoe from "@/assets/treat-mistletoe.jpg";
import treatMesima from "@/assets/treat-mesima.jpg";
import treatGlutamine from "@/assets/treat-glutamine.jpg";

/* ── Treatment data ── */

interface Treatment {
  title: string;
  desc: string;
  image?: string;
  icon?: LucideIcon;
}

const westernTreatments: Treatment[] = [
  { title: "고주파 온열 암치료", desc: "42˚C 이상의 고열을 발생시켜 암 종괴 부위와 암세포를 선택적으로 직접 괴사시키는 고주파 항암 치료법", image: treatHyperthermia },
  { title: "고압 산소치료", desc: "암 조직에 고밀도 산소를 흡입하여 저산소 상태를 개선. 널리 활용되는 치료로써 에너지의 효율성을 높임", image: treatHbot },
  { title: "림프순환 / 재활치료", desc: "림프계 손상으로 인한 증상을 치료. 림프액의 유동성을 증가시켜 면역력을 강화시키고 부종을 감소", image: treatManual },
  { title: "싸이모신알파1 요법", desc: "면역방어 기능을 높인 항암효과. 면역조절작용을 통해 T세포 및 NK세포를 활성화시켜 암세포를 파괴", image: treatImmune },
  { title: "미슬토 요법", desc: "암세포의 증식을 억제시켜 사멸에 도움, 항암물질 및 면역기능을 증가시키는 물질 함유", image: treatMistletoe },
  { title: "항암면역증강제", desc: "면역세포 활성화를 통해 항암 효과를 보조하고 재발 위험을 감소", image: treatMesima },
  { title: "글루타민 요법", desc: "면역세포의 기능 향상 및 단백질 합성을 통해 근손실을 예방하며 항암치료 부작용에 효과", image: treatGlutamine },
  { title: "NK세포치료제", desc: "몸속 면역세포를 배양시킨 살해 세포로써 암세포만을 선택적으로 공격. 환자 본인에게만 투여할 수 있는 항암제로, 수술 이후의 미세암 제거에도 도움", image: "/placeholder.svg" },
  { title: "고농도 비타민 요법 (비타민 C)", desc: "단백질 대사에 필요한 수용성 비타민. 메스꺼움을 줄여주고 항노화 핵산의 합성을 촉진하며 근육경련, 말초신경 염증을 완화", image: "/placeholder.svg" },
  { title: "글루타치온", desc: "영양제가 몸속에서 효과적으로 작용 촉진, 항암제로 인한 신경성 통증 감소에 효과, 중금속·방사선 등의 해독작용", image: "/placeholder.svg" },
  { title: "셀레늄 요법", desc: "체내의 활성산소를 제거하고 항산화 작용을 활성화. 비타민E의 2,000배에 달하는 효과로 암세포의 자연사멸을 유도", image: "/placeholder.svg" },
  { title: "비타민 B6", desc: "단백질 대사에 필요한 수용성 비타민. 메스꺼움을 줄여주고 항노화 핵산의 합성을 촉진하며 근육 경련, 말초신경 염증을 완화", image: "/placeholder.svg" },
  { title: "비타민 B12", desc: "엽산과 함께 우리 몸에서 DNA를 합성할 때 사용. 아미노산 대사의 부산물인 호모시스테인을 파괴하여 심혈관질환 및 치매 예방에 효과적", image: "/placeholder.svg" },
  { title: "영양관리 요법", desc: "경구 혹은 위장관 영양공급이 불가능·불충분한 경우 필수 에너지 및 지방산, 오메가-3 등의 영양소 공급 (TPN, 아미노산 등)", image: "/placeholder.svg" },
];

const orientalTreatments: Treatment[] = [
  { title: "신종단", desc: "공개 특허받은 항암단에서 특정약물을 가감한 처방. 림프 절제술 및 항암부작용으로 림프순환장애 및 부종 치료목적으로 인진호, 택사, 적복령, 백출, 저령, 육계 처방", image: "/placeholder.svg" },
  { title: "항암단", desc: "곡기생, 산자고, 삼칠근 등의 약재들로 구성된 처방으로, 종양세포 대사 산물인 담음 및 어혈을 제거하고 종양 활성 억제 효과. 암환자 100명 대상 임상에서 VEGF, bFGF 등 신생혈관형성 수치가 통계적으로 유의미하게 감소", image: "/placeholder.svg" },
  { title: "면역플러스", desc: "황기 부정단 처방으로 종양 면역 세포의 활성화촉진. 면역기능 증강, 골수기능 개선 및 종양의 증식을 억제", image: "/placeholder.svg" },
  { title: "항암플러스", desc: "옻나무에서 추출한 진액에서 알레르기 성분을 제거, 루시올(Urushiol)을 높인 천연물질로 암 치료 효과 증진", image: "/placeholder.svg" },
  { title: "청간플러스", desc: "간 기능 저하와 LFT 상승 시 간 기능을 개선. 과산화지질 생성량을 감소시켜 간 손상을 보호하고 중성지방 수치를 감소", image: "/placeholder.svg" },
  { title: "면역약침", desc: "멸균된 순수 한약재를 침을 통해 몸에 직접 투여. 약과 침의 동시 효과, 항암 부작용 완화", image: "/placeholder.svg" },
];

const diagnostics: Treatment[] = [
  { title: "종양표지자 검사", icon: ClipboardCheck, desc: "혈액이나 다른 체액에서 측정, 암세포의 존재 유무를 결정 또는 정상조직과 암 조직을 감별하는 데 이용하는 검사. 종양의 임상적 병기를 결정하거나 크기를 추정할 때 활용" },
  { title: "NK 활성도 검사", icon: Microscope, desc: "혈액 내 NK세포(자연살해 세포)를 인위적으로 활성화시켜 활성도를 측정하는 검사. 현 상태를 진단" },
  { title: "항암호중구 수치 검사", icon: Stethoscope, desc: "항암 중, 항암제 치료 전 절대 호중구 수를 파악하여 면역 체계의 이상 유무를 진단하는 혈액 검사" },
  { title: "비타민 검사", icon: TestTube, desc: "일반적인 비타민D 검사를 비롯하여 신경염 회복 및 신경세포 재생에 필수적인 비타민 B1, B6, B12와 면역력에 필수적인 비타민C, 대표적인 항산화제인 셀레늄 검사 진행" },
];

const mealCare: Treatment[] = [
  { title: "표준 항암식", icon: ClipboardCheck, desc: "부작용을 줄이고 항암 치료로 손상된 조직을 회복할 수 있도록 돕는 표준 치료식사" },
  { title: "위암 — 위절제식", icon: ClipboardCheck, desc: "위 절제 수술 후 소화 부담을 최소화한 맞춤 식단" },
  { title: "갑상선암 — 저요오드식", icon: ClipboardCheck, desc: "방사성 요오드 치료 전후 요오드 섭취를 제한한 식단" },
  { title: "대장암 — 저잔사식", icon: ClipboardCheck, desc: "장에 부담을 줄이고 소화 흡수를 돕는 저잔사 식단" },
];

const tabs = [
  { id: "western", label: "양방 면역암치료", sub: "Western Immuno-Oncology", data: westernTreatments },
  { id: "oriental", label: "한방 면역암치료", sub: "Korean Medicine Oncology", data: orientalTreatments },
  { id: "diagnostics", label: "진단검사", sub: "Diagnostic Tests", data: diagnostics },
  { id: "meal", label: "암종별 치료식 제공", sub: "Cancer-Specific Therapeutic Meals", data: mealCare },
] as const;

const ProgramsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<string>("western");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const activeData = tabs.find((t) => t.id === activeTab)!;

  // Build modal slides from active tab data
  const modalImages = activeData.data.map((t) => ({
    src: t.image,
    alt: t.title,
    caption: `${t.title} — ${t.desc}`,
  }));

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (isMobile) {
      setModalIndex(0);
      setModalOpen(true);
    }
  };

  const openCard = (index: number) => {
    setModalIndex(index);
    setModalOpen(true);
  };

  return (
    <section id="programs" className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-gold">
            Treatment Programs
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            통합 면역암치료 프로그램
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            양방·한방·진단·생활관리를 아우르는 근거 중심의 맞춤 치료 체계
          </p>
        </motion.div>

        {/* Tab buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-14"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`group flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground border-primary shadow-gold"
                  : "bg-card text-foreground border-border hover:border-gold/40"
              }`}
            >
              {tab.label}
              {/* Mobile: show arrow hint */}
              <ChevronRight className="w-4 h-4 sm:hidden opacity-50" />
            </button>
          ))}
        </motion.div>

        {/* Desktop: Cards grid with images */}
        <div className="hidden sm:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-center text-xs tracking-widest uppercase text-gold mb-8">
                {activeData.sub}
              </p>

              <div className={`grid gap-5 ${
                activeData.data.length <= 4
                  ? "sm:grid-cols-2 max-w-4xl mx-auto"
                  : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              }`}>
                {activeData.data.map((t, i) => (
                  <motion.div
                    key={t.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-gold/40 transition-all duration-300 shadow-soft hover:shadow-card"
                  >
                    {/* Image or Icon header */}
                    {t.image ? (() => {
                      const saved = getImageSettings(t.title);
                      const imgSrc = saved.src || t.image;
                      return (
                        <div
                          className="relative aspect-square overflow-hidden bg-muted cursor-pointer"
                          onClick={() => setEditingKey(t.title)}
                          title="클릭하여 이미지 편집"
                        >
                          <img
                            src={imgSrc}
                            alt={t.title}
                            className="w-full h-full"
                            style={{
                              objectFit: saved.fit || "cover",
                              objectPosition: `${saved.posX ?? 50}% ${saved.posY ?? 50}%`,
                              transform: `scale(${(saved.scale || 100) / 100})`,
                              transformOrigin: `${saved.posX ?? 50}% ${saved.posY ?? 50}%`,
                            }}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                          {/* Text overlay at bottom */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-card/80 backdrop-blur-sm">
                            <h3 className="font-serif text-sm font-bold text-foreground leading-snug">
                              {t.title}
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed mt-1 line-clamp-2">
                              {t.desc}
                            </p>
                          </div>
                          {/* Edit icon */}
                          <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </div>
                        </div>
                      );
                    })() : null}

                    {/* Text section for non-image items only */}
                    {!t.image && (
                    <div className="p-5">
                      {t.icon && (
                        <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                          <t.icon className="w-5 h-5 text-gold" />
                        </div>
                      )}
                      <h3 className="font-serif text-base font-bold text-foreground mb-2 leading-snug">
                        {t.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t.desc}
                      </p>
                    </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile: Show summary counts per tab */}
        <div className="sm:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              <p className="text-xs tracking-widest uppercase text-gold mb-3">
                {activeData.sub}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                총 <span className="font-sans font-bold text-foreground">{activeData.data.length}</span>가지 치료 항목
              </p>
              <button
                onClick={() => { setModalIndex(0); setModalOpen(true); }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-gold hover:bg-primary/90 transition-colors"
              >
                치료 프로그램 보기
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Modal for both mobile slide-through and desktop image zoom */}
      <ImageModal
        images={modalImages}
        initialIndex={modalIndex}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* Image Editor Overlay */}
      {editingKey && (
        <ImageEditorOverlay
          treatmentKey={editingKey}
          defaultSrc={activeData.data.find((t) => t.title === editingKey)?.image}
          onClose={() => setEditingKey(null)}
        />
      )}
    </section>
  );
};

export default ProgramsSection;
