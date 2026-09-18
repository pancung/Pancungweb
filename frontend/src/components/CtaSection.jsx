import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "./IntroSection";

export default function CtaSection() {
  const { t } = useLang();
  const c = t.cta;
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % c.cities.length), 2200);
    return () => clearInterval(id);
  }, [c.cities.length]);

  return (
    <section className="grain relative overflow-hidden bg-[#1C2418] py-28 text-white md:py-36" data-testid="cta-section" data-nav="dark">
      <div className="container-x text-center">
        <Reveal>
          <h2 className="font-display text-[44px] leading-[1.05] md:text-[68px]">
            {c.title}{" "}
            <span className="relative inline-block px-2">
              <span className="font-script relative z-10 text-[#D9B44A]">{c.accent}</span>
              <svg className="pointer-events-none absolute -inset-x-3 -inset-y-2 h-[calc(100%+16px)] w-[calc(100%+24px)]" viewBox="0 0 300 120" preserveAspectRatio="none" fill="none">
                <motion.path d="M150 12 C 230 6, 292 34, 288 64 C 284 96, 205 112, 140 110 C 70 108, 8 92, 10 60 C 12 28, 80 10, 160 14 C 215 17, 270 36, 272 60" stroke="#D9B44A" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.9 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.3, ease: "easeInOut" }} />
              </svg>
            </span>
            <br className="hidden md:block" />
            <span className="inline-flex items-baseline gap-3">
              {c.suffix}
              <span className="relative inline-block h-[1.15em] overflow-hidden align-baseline">
                <span className="invisible inline-grid" aria-hidden="true">
                  {c.cities.map((city) => <span key={city} className="col-start-1 row-start-1 whitespace-nowrap italic">{city}</span>)}
                </span>
                <AnimatePresence mode="wait">
                  <motion.span key={idx} initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 whitespace-nowrap text-center italic" data-testid="cta-city">
                    {c.cities[idx]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-[600px] text-[16px] leading-relaxed text-white/65 md:text-[17px]">{c.desc}</p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/kontakt" className="btn-lime inline-flex h-12 items-center px-7 text-[15px]" data-testid="cta-primary">{c.primary}</Link>
          <Link to="/balicky" className="glass inline-flex h-12 items-center rounded-[12px] px-7 text-[15px] font-medium text-white transition-colors hover:bg-white/10" data-testid="cta-secondary">{c.secondary}</Link>
        </Reveal>
      </div>
    </section>
  );
}
