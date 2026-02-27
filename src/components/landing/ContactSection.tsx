import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { toast } from "sonner";

const messengerOptions = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "telegram", label: "Telegram" },
  { value: "wechat", label: "WeChat" },
  { value: "line", label: "LINE" },
] as const;

const programOptions = [
  "암 집중 치료",
  "면역력 강화",
  "만성질환 관리",
  "수술 후 회복",
  "기타",
] as const;

const formSchema = z.object({
  name: z.string().trim().min(1, "이름을 입력해주세요").max(100),
  email: z.string().trim().email("올바른 이메일을 입력해주세요").max(255),
  messenger_type: z.string().min(1, "메신저를 선택해주세요"),
  messenger_id: z.string().trim().min(1, "메신저 ID를 입력해주세요").max(200),
  interested_programs: z.array(z.string()).optional(),
  preferred_timing: z.string().max(200).optional(),
  message: z.string().trim().max(2000).optional(),
});

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    messenger_type: "",
    messenger_id: "",
    interested_programs: [] as string[],
    preferred_timing: "",
    message: "",
  });

  const toggleProgram = (program: string) => {
    setForm((prev) => ({
      ...prev,
      interested_programs: prev.interested_programs.includes(program)
        ? prev.interested_programs.filter((p) => p !== program)
        : [...prev.interested_programs, program],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = formSchema.safeParse(form);
    if (!result.success) {
      const firstError = result.error.errors[0]?.message;
      toast.error(firstError || "입력 내용을 확인해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("consultation_inquiries")
        .insert({
          name: result.data.name,
          email: result.data.email,
          messenger_type: result.data.messenger_type,
          messenger_id: result.data.messenger_id,
          interested_programs: result.data.interested_programs?.length
            ? result.data.interested_programs
            : null,
          preferred_timing: result.data.preferred_timing || null,
          message: result.data.message || null,
        });

      if (error) throw error;
      setIsSubmitted(true);
    } catch {
      toast.error("접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all";

  return (
    <section id="contact" className="py-24 lg:py-32 bg-primary text-primary-foreground" ref={ref}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <span className="text-sm font-semibold tracking-widest uppercase text-gold">
              Consultation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-4">
              지금 바로 회복을 시작하세요
            </h2>
            <p className="text-lg text-primary-foreground/70">
              아래 양식을 작성해주시면 24시간 내 전담 상담사가 연락드립니다.
            </p>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" />
              <h3 className="font-serif text-2xl font-bold mb-3">
                상담 접수가 완료되었습니다
              </h3>
              <p className="text-primary-foreground/70">
                24시간 내에 선택하신 메신저로 연락드리겠습니다.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-foreground/80 mb-2">
                    이름 <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className={inputClasses}
                    required
                    maxLength={100}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-foreground/80 mb-2">
                    이메일 <span className="text-gold">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className={inputClasses}
                    required
                    maxLength={255}
                  />
                </div>
              </div>

              {/* Messenger */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-foreground/80 mb-2">
                    메신저 선택 <span className="text-gold">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {messengerOptions.map((m) => (
                      <button
                        key={m.value}
                        type="button"
                        onClick={() => setForm({ ...form, messenger_type: m.value })}
                        className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          form.messenger_type === m.value
                            ? "bg-gold text-gold-foreground border-gold"
                            : "bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground/70 hover:border-gold/50"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-foreground/80 mb-2">
                    메신저 ID <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.messenger_id}
                    onChange={(e) => setForm({ ...form, messenger_id: e.target.value })}
                    placeholder="Messenger ID or phone number"
                    className={inputClasses}
                    required
                    maxLength={200}
                  />
                </div>
              </div>

              {/* Programs */}
              <div>
                <label className="block text-sm font-medium text-primary-foreground/80 mb-2">
                  관심 프로그램 (복수 선택 가능)
                </label>
                <div className="flex flex-wrap gap-2">
                  {programOptions.map((program) => (
                    <button
                      key={program}
                      type="button"
                      onClick={() => toggleProgram(program)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                        form.interested_programs.includes(program)
                          ? "bg-gold text-gold-foreground border-gold"
                          : "bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground/70 hover:border-gold/50"
                      }`}
                    >
                      {program}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timing */}
              <div>
                <label className="block text-sm font-medium text-primary-foreground/80 mb-2">
                  희망 입원 시기
                </label>
                <input
                  type="text"
                  value={form.preferred_timing}
                  onChange={(e) => setForm({ ...form, preferred_timing: e.target.value })}
                  placeholder="예: 2026년 4월, 가능한 빨리, 미정 등"
                  className={inputClasses}
                  maxLength={200}
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-primary-foreground/80 mb-2">
                  상담 내용
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="증상, 진단명, 궁금한 점 등 자유롭게 작성해주세요"
                  rows={4}
                  className={inputClasses + " resize-none"}
                  maxLength={2000}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 px-10 py-4 rounded-xl bg-gold text-gold-foreground font-semibold text-lg shadow-gold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? "접수 중..." : "상담 접수하기"}
              </button>

            </form>
          )}

          {/* Google Maps */}
          <div className="mt-16 rounded-2xl overflow-hidden border border-primary-foreground/10">
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=16+Cheolsan-ro,+Gwangmyeong-si,+Gyeonggi-do,+South+Korea&language=en&zoom=15"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hospital Location"
              className="w-full"
            />
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
