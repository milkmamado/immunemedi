import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getImageSettings } from "./ImageEditorOverlay";

interface ImageModalProps {
  images: { src: string; alt: string; caption?: string }[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal = ({ images, initialIndex = 0, isOpen, onClose }: ImageModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrentIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setCurrentIndex((i) => (i - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, images.length, onClose]);

  if (!images.length) return null;

  const current = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-foreground/90 backdrop-blur-sm" />

          {/* Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 max-w-5xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-card/20 hover:bg-card/40 text-background flex items-center justify-center transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative overflow-hidden rounded-2xl bg-foreground/50">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={current.src}
                  alt={current.alt}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.25 }}
                  className="w-full max-h-[75vh] object-contain"
                />
              </AnimatePresence>
            </div>

            {/* Caption + Navigation */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex-1">
                {current.caption && (
                  <p className="text-background/90 text-sm sm:text-base font-medium">
                    {current.caption}
                  </p>
                )}
                {images.length > 1 && (
                  <p className="text-background/50 text-xs mt-1">
                    {currentIndex + 1} / {images.length}
                  </p>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentIndex((i) => (i - 1 + images.length) % images.length)}
                    className="w-10 h-10 rounded-full bg-card/20 hover:bg-card/40 text-background flex items-center justify-center transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentIndex((i) => (i + 1) % images.length)}
                    className="w-10 h-10 rounded-full bg-card/20 hover:bg-card/40 text-background flex items-center justify-center transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;
