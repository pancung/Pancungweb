import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "./IntroSection";
import { WordReveal } from "./motion/WordReveal";

export default function JourneySection() {
  const { t } = useLang();
  const j = t.journey;
  const [active, setActive] = useState(null);

  return (
    <section id="cesta" className="bg-white py-24 md:py-32" data-testid="journey-section">
      <div className="container-x">
        <Reveal className="max-w-[720px]">
          <span className="section-label">{j.label}</span>
          <h2 className="mt-4 text-[40px] font-normal leading-[1.05] tracking-[-0.02em] text-[#1C2418] md:text-[60px]"><WordReveal text={j.title} /></h2>
          <p className="mt-5 text-[17px] text-[#1C2418]/65">{j.subtitle}</p>
        </Reveal>

        {/* Desktop: horizontal connected cards */}
        <div className="relative mt-16 hidden lg:block">
          <div className="absolute left-[10%] right-[10%] top-[44px] h-px bg-[#1C2418]/10" />
          <motion.div className="absolute left-[10%] top-[44px] h-px origin-left bg-[#D9B44A]" style={{ right: "10%" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 1.6, ease: "easeInOut" }} />
          <div className="grid grid-cols-5 gap-4">
            {j.stages.map((s, i) => {
              const isActive = active === i;
              return (
                <motion.div
                  key={s.n}
                  onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.6, delay: 0.25 + i * 0.15 }}
                  className="relative"
                  data-testid={`journey-stage-${i}`}
                >
                  <div className="flex justify-center">
                    <motion.span animate={{ scale: isActive ? 1.15 : 1, backgroundColor: isActive ? "#D9B44A" : "#ffffff" }} className="relative z-10 inline-flex h-[22px] w-[22px] items-center justify-center rounded-full border-[3px] border-[#D9B44A] bg-white" />
                  </div>
                  <motion.div animate={{ y: isActive ? -6 : 0, scale: isActive ? 1.03 : 1 }} transition={{ type: "spring", stiffness: 260, damping: 24 }} className={`paper-card mt-6 cursor-default p-6 transition-shadow ${isActive ? "shadow-[0_30px_60px_-30px_rgba(28,36,24,0.35)]" : ""}`}>
                    <div className="font-display text-[40px] leading-none text-[#1C2418]/20">{s.n}</div>
                    <div className="mt-4 text-[13px] font-semibold tracking-[0.14em] text-[#1C2418]">{s.title}</div>
                    <div className="mt-1 text-[14px] text-[#1C2418]/65">{s.sub}</div>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden text-[13px] leading-relaxed text-[#1C2418]/70">
                          <span className="block pt-3">{s.more}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile / tablet: vertical timeline */}
        <div className="relative mt-12 lg:hidden">
          <div className="absolute bottom-4 left-[11px] top-4 w-px bg-[#1C2418]/10" />
          <motion.div className="absolute left-[11px] top-4 w-px origin-top bg-[#D9B44A]" style={{ bottom: 16 }} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 1.6, ease: "easeInOut" }} />
          <ul className="space-y-5">
            {j.stages.map((s, i) => (
              <motion.li key={s.n} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="relative pl-10">
                <span className="absolute left-0 top-6 inline-flex h-[22px] w-[22px] items-center justify-center rounded-full border-[3px] border-[#D9B44A] bg-white" />
                <div className="paper-card p-6">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-[32px] leading-none text-[#1C2418]/20">{s.n}</span>
                    <span className="text-[13px] font-semibold tracking-[0.14em]">{s.title}</span>
                  </div>
                  <div className="mt-1 text-[14px] text-[#1C2418]/65">{s.sub}</div>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-[#1C2418]/70">{s.more}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
