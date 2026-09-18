import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "./IntroSection";
import { images } from "../mock";

function Photo({ src, name, role, onClick, delay }) {
  return (
    <Reveal delay={delay}>
      <button onClick={onClick} className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[24px] bg-[#1C2418] text-left" data-testid="testimonial-photo">
        <img src={src} alt={name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(5,8,5,0.7))] opacity-90" />
        <div className="absolute bottom-5 left-5 right-5 translate-y-2 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="text-[16px] font-semibold">{name}</div>
          <div className="text-[12px] text-white/70">{role}</div>
        </div>
      </button>
    </Reveal>
  );
}

export default function Testimonials() {
  const { t } = useLang();
  const s = t.testimonials;
  const [active, setActive] = useState(1);
  const others = [0, 1, 2].filter((i) => i !== active);
  const a = s.items[active];

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#FAF8F0_0%,#F1E9CF_45%,#E2C97E_100%)] py-24 md:py-32" data-testid="testimonials-section">
      <div className="container-x">
        <Reveal className="text-center">
          <h2 className="font-display text-[44px] leading-[1.02] text-[#232B1E] md:text-[64px]">{s.title[0]}<br />{s.title[1]}</h2>
        </Reveal>

        <div className="mt-16 grid items-start gap-6 md:grid-cols-3">
          <Photo src={images.testimonials[others[0]]} name={s.items[others[0]].name} role={s.items[others[0]].role} onClick={() => setActive(others[0])} delay={0} />

          <Reveal delay={0.1} className="md:-mt-2">
            <div className="receipt-edge relative min-h-[420px] rotate-[-2deg] bg-[#FCFAF2] p-7 pb-14 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.35)] md:aspect-[4/5] md:p-8" data-testid="testimonial-receipt">
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }} className="flex h-full flex-col">
                  <p className="text-[17px] leading-relaxed text-[#1C2418] md:text-[18px]">{a.text}</p>
                  <div className="mt-auto flex items-center gap-3 pt-10">
                    <img src={images.testimonials[active]} alt="" className="h-10 w-10 rounded-full object-cover grayscale" />
                    <div>
                      <div className="text-[14px] font-semibold">{a.name}</div>
                      <div className="text-[12px] text-[#1C2418]/60">{s.since} {a.since} · {a.role}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>

          <Photo src={images.testimonials[others[1]]} name={s.items[others[1]].name} role={s.items[others[1]].role} onClick={() => setActive(others[1])} delay={0.2} />
        </div>
      </div>
    </section>
  );
}
