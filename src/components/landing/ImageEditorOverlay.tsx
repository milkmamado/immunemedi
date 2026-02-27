import { useState, useRef, useEffect } from "react";

interface ImageSettings {
  src?: string;
  scale: number;
  posX: number;
  posY: number;
  fit: "cover" | "contain";
}

const STORAGE_KEY = "treatment-image-settings";

export function getImageSettings(key: string): ImageSettings {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return all[key] || { scale: 100, posX: 50, posY: 50, fit: "cover" };
  } catch {
    return { scale: 100, posX: 50, posY: 50, fit: "cover" };
  }
}

function saveImageSettings(key: string, settings: ImageSettings) {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    all[key] = settings;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // ignore
  }
}

interface ImageEditorOverlayProps {
  treatmentKey: string;
  defaultSrc?: string;
  onClose: () => void;
}

const ImageEditorOverlay = ({ treatmentKey, defaultSrc, onClose }: ImageEditorOverlayProps) => {
  const [settings, setSettings] = useState<ImageSettings>(() => {
    const saved = getImageSettings(treatmentKey);
    return { ...saved, src: saved.src || defaultSrc };
  });
  const fileRef = useRef<HTMLInputElement>(null);

  const update = (partial: Partial<ImageSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      saveImageSettings(treatmentKey, next);
      return next;
    });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      update({ src: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-foreground/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-card rounded-2xl shadow-2xl border border-border p-6 w-full max-w-lg mx-4 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-foreground">{treatmentKey}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-xl leading-none">&times;</button>
        </div>

        {/* Preview */}
        <div className="relative w-full aspect-square max-h-80 bg-muted rounded-xl overflow-hidden border border-border">
          {settings.src ? (
            <img
              src={settings.src}
              alt="preview"
              className="w-full h-full"
              style={{
                objectFit: settings.fit,
                objectPosition: `${settings.posX}% ${settings.posY}%`,
                transform: `scale(${settings.scale / 100})`,
                transformOrigin: `${settings.posX}% ${settings.posY}%`,
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">이미지 없음</div>
          )}
        </div>

        {/* Upload */}
        <div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            이미지 업로드
          </button>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* Scale */}
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground mb-1 block">확대/축소 ({settings.scale}%)</span>
            <input
              type="range"
              min={50}
              max={300}
              step={1}
              value={settings.scale}
              onInput={(e) => update({ scale: Number((e.target as HTMLInputElement).value) })}
              className="w-full accent-primary"
            />
          </label>

          {/* Position X */}
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground mb-1 block">가로 위치 ({settings.posX}%) {settings.fit === "contain" && "— 꽉채움 모드에서만 작동"}</span>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={settings.posX}
              onInput={(e) => update({ posX: Number((e.target as HTMLInputElement).value) })}
              className="w-full accent-primary"
              disabled={settings.fit === "contain"}
            />
          </label>

          {/* Position Y */}
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground mb-1 block">세로 위치 ({settings.posY}%) {settings.fit === "contain" && "— 꽉채움 모드에서만 작동"}</span>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={settings.posY}
              onInput={(e) => update({ posY: Number((e.target as HTMLInputElement).value) })}
              className="w-full accent-primary"
              disabled={settings.fit === "contain"}
            />
          </label>

          {/* Fit mode */}
          <div className="flex gap-2">
            <button
              onClick={() => update({ fit: "cover" })}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                settings.fit === "cover"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-gold/40"
              }`}
            >
              꽉 채움
            </button>
            <button
              onClick={() => update({ fit: "contain" })}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                settings.fit === "contain"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-gold/40"
              }`}
            >
              원본 비율
            </button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">설정은 브라우저에 자동 저장됩니다</p>
      </div>
    </div>
  );
};

export default ImageEditorOverlay;
