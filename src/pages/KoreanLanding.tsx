import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import WhyUsSection from "@/components/landing/WhyUsSection";
import ProgramsSection from "@/components/landing/ProgramsSection";
import EvidenceSection from "@/components/landing/EvidenceSection";
import VipCareSection from "@/components/landing/VipCareSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import RecoveryLifeSection from "@/components/landing/RecoveryLifeSection";
import DoctorsSection from "@/components/landing/DoctorsSection";
import PatientStoriesSection from "@/components/landing/PatientStoriesSection";
import ContactSection from "@/components/landing/ContactSection";

const KoreanLanding = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WhyUsSection />
      <ProgramsSection />
      <EvidenceSection />
      <VipCareSection />
      <HowItWorksSection />
      <RecoveryLifeSection />
      <DoctorsSection />
      <PatientStoriesSection />
      <ContactSection />

      {/* Footer */}
      <footer className="py-8 bg-foreground text-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-serif text-lg font-bold text-background/80 mb-2">면력한방병원</p>
          <p className="text-sm">Myeongryeok Korean Medicine Hospital</p>
          <p className="text-xs text-background/40 mt-1">Care You Need, Care You Trust</p>
          <p className="text-xs mt-4">© 2026 면력한방병원. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default KoreanLanding;
