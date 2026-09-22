import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowDown, Check } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "./IntroSection";
import { WordReveal } from "./motion/WordReveal";
import { useScrollMap } from "../hooks/useScrollMap";

export default function SystemSection() {
  const { t } = useLang();
  const s = t.system;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 65%"] });
  const spine = useScrollMap(scrollYProgress, [0, 1], [0, 1]);
  const [activeCount, setActiveCount] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActiveCount(Math.min(s.modules.length, Math.floor(v * s.modules.length + 0.15))));
  const current = s.modules[Math.max(0, Math.min(activeCount - 1, s.modules.length - 1))];

  return (
    <section id="system" className="bg-[#F4F2EA] py-24 md:py-32" data-testid="system-section">
      <div className="container-x">
        <Reveal className="max-w-[760px]">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#1C2418] px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-[#D9B44A]">{s.label}</span>
          <h2 className="font-display mt-5 text-[44px] leading-[1.02] text-[#232B1E] md:text-[64px]"><WordReveal text={s.title} /></h2>
          <p className="mt-5 text-[17px] text-[#1C2418]/65">{s.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
          {/* Modules */}
          <div ref={ref} className="relative pl-12 md:pl-16">
            <div className="absolute bottom-6 left-[19px] top-6 w-px bg-[#1C2418]/10 md:left-[27px]" />
            <motion.div className="absolute left-[19px] top-6 w-px origin-top bg-[#D9B44A] md:left-[27px]" style={{ bottom: 24, scaleY: spine }} />
            <ul className="space-y-4">
              {s.modules.map((m, i) => {
                const on = i < activeCount;
                return (
                  <li key={m.title} className="relative" data-testid={`system-module-${i}`}>
                    <motion.span animate={{ backgroundColor: on ? "#D9B44A" : "#F4F2EA", borderColor: on ? "#D9B44A" : "rgba(28,36,24,0.2)" }} className="absolute -left-12 top-7 z-10 inline-flex h-[22px] w-[22px] items-center justify-center rounded-full border-[2px] md:-left-16 md:top-8 md:h-[26px] md:w-[26px]">
                      {on && <Check size={13} className="text-[#1C2418]" />}
                    </motion.span>
                    <motion.div animate={{ opacity: on ? 1 : 0.55, x: on ? 0 : -4 }} transition={{ duration: 0.4 }} className={`rounded-[20px] border bg-white p-5 md:p-6 ${on ? "border-[#D9B44A]/50 shadow-[0_20px_50px_-30px_rgba(28,36,24,0.35)]" : "border-black/5"}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] tracking-[0.14em] text-[#1C2418]/45">{s.module} {String(i + 1).padStart(2, "0")}</span>
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] ${on ? "bg-[#F3E9C8] text-[#7A6A2B]" : "bg-[#F4F2EA] text-[#1C2418]/40"}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${on ? "bg-[#D9B44A]" : "bg-[#1C2418]/25"}`} />{s.active}
                        </span>
                      </div>
                      <div className="mt-3 text-[20px] font-semibold tracking-tight text-[#1C2418] md:text-[22px]">{m.title}</div>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-[#1C2418]/65">{m.desc}</p>
                    </motion.div>
                    {i < s.modules.length - 1 && <div className="flex justify-center py-1 text-[#1C2418]/25"><ArrowDown size={14} /></div>}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Sticky system status */}
          <div className="hidden lg:block">
            <div className="sticky top-28 rounded-[24px] bg-[#1C2418] p-6 text-white">
              <div className="flex items-center justify-between text-[11px] tracking-[0.14em] text-white/45">
                <span>SYSTEM STATUS</span><span className="text-[#D9B44A]">{activeCount}/{s.modules.length}</span>
              </div>
              <div className="mt-5 flex items-center gap-1.5">
                {s.modules.map((m, i) => (
                  <React.Fragment key={m.title}>
                    <motion.span animate={{ backgroundColor: i < activeCount ? "#D9B44A" : "rgba(255,255,255,0.12)" }} className="h-2.5 flex-1 rounded-full" />
                  </React.Fragment>
                ))}
              </div>
              <div className="mt-6 min-h-[120px]">
                <div className="font-mono text-[11px] tracking-[0.14em] text-white/40">{s.module} {String(Math.max(1, activeCount)).padStart(2, "0")}</div>
                <motion.div key={current.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <div className="mt-2 text-[24px] font-semibold tracking-tight text-[#D9B44A]">{current.title}</div>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/65">{current.desc}</p>
                </motion.div>
              </div>
              <div className="mt-6 grid grid-cols-7 gap-1">
                {s.modules.map((m, i) => <motion.span key={m.title} animate={{ opacity: i < activeCount ? 1 : 0.25 }} className="truncate text-center text-[8px] tracking-wide text-white/70">{m.title.split(" ")[0]}</motion.span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
