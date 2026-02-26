import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logoSvg from "@/assets/logo.svg";

const navItems = [
  { label: "소개", href: "#why-us" },
  { label: "치료 프로그램", href: "#programs" },
  { label: "임상 근거", href: "#evidence" },
  { label: "VIP 케어", href: "#vip" },
  { label: "입원 절차", href: "#how-it-works" },
  { label: "힐링 라이프", href: "#recovery-life" },
  { label: "의료진", href: "#doctors" },
  { label: "후기", href: "#stories" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-soft border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex flex-col">
            <span className={`font-serif text-lg font-bold tracking-tight transition-colors ${scrolled ? 'text-primary' : 'text-primary-foreground'}`}>
              면력한방병원
            </span>
            <span className={`text-[10px] tracking-[0.2em] uppercase transition-colors ${scrolled ? 'text-muted-foreground' : 'text-primary-foreground/70'}`}>
              Myeongryeok Hospital
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  scrolled
                    ? "text-foreground/70 hover:text-foreground hover:bg-muted"
                    : "text-primary-foreground/80 hover:text-primary-foreground"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-3 px-5 py-2.5 text-sm font-semibold rounded-lg bg-gold text-gold-foreground hover:opacity-90 transition-opacity shadow-gold"
            >
              상담 신청
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 ${scrolled ? 'text-foreground' : 'text-primary-foreground'}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="lg:hidden bg-card/98 backdrop-blur-md border-b border-border"
        >
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-3 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-md"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="block mt-3 px-5 py-3 text-center text-sm font-semibold rounded-lg bg-gold text-gold-foreground"
            >
              상담 신청
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
