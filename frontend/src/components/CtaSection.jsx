import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarCheck } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "./IntroSection";
import { WordReveal } from "./motion/WordReveal";
import { links } from "../mock";

export default function CtaSection() {
  const { t } = useLang();
  const c = t.cta;
  const line = "M0,300 C120,296 220,286 320,268 S520,220 640,190 S860,130 980,96 S1160,44 1280,18";
  return (
    <section className="grain relative overflow-hidden bg-[#1C2418] py-32 text-white md:py-44" data-testid="cta-section" data-nav="dark">
      {/* Background trajectory */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] opacity-90" aria-hidden="true">
        <svg viewBox="0 0 1280 320" preserveAspectRatio="none" className="h-full w-full">
          {[80, 160, 240].map((y) => <line key={y} x1="0" x2="1280" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" />)}
          <motion.path d={`${line} L1280,320 L0,320 Z`} fill="url(#ctaFill)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.8 }} />
          <motion.path d={line} fill="none" stroke="#D9B44A" strokeWidth="2.5" strokeOpacity="0.8" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, ease: "easeInOut" }} />
          <defs><linearGradient id="ctaFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#D9B44A" stopOpacity="0.18" /><stop offset="1" stopColor="#D9B44A" stopOpacity="0" /></linearGradient></defs>
        </svg>
      </div>

      <div className="container-x relative text-center">
        <Reveal>
          <h2 className="font-display mx-auto max-w-[900px] text-[48px] leading-[1.02] md:text-[80px]"><WordReveal text={c.title} stagger={0.08} /></h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-[560px] text-[17px] leading-relaxed text-white/65 md:text-[18px]">{c.subtitle}</p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={links.booking} target="_blank" rel="noreferrer" className="btn-lime inline-flex h-12 items-center gap-2 px-7 text-[15px]" data-testid="cta-primary"><CalendarCheck size={17} />{c.primary}</a>
          <Link to="/kalkulacky" className="glass inline-flex h-12 items-center rounded-[12px] px-7 text-[15px] font-medium text-white transition-colors hover:bg-white/10" data-testid="cta-secondary">{c.secondary}</Link>
        </Reveal>
      </div>
    </section>
  );
}
