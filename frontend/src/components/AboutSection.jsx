import React from "react";
import { motion } from "framer-motion";
import { Check, CalendarCheck, ArrowUpRight, Quote } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "./IntroSection";
import { ScribbleWord } from "./CalculatorSection";
import { images, links } from "../mock";

export default function AboutSection() {
  const { t } = useLang();
  const a = t.about;

  return (
    <section id="o-mne" className="bg-white py-24 md:py-32" data-testid="about-section">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Portrait */}
        <Reveal className="relative">
          <div className="relative mx-auto max-w-[460px]">
            <div className="absolute -inset-3 rounded-[40px] bg-[linear-gradient(160deg,#D9B44A_0%,#F1E6C4_60%,transparent_100%)] opacity-60" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-[#1C2418]">
              <img src={images.advisor} alt="Pan Čung" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(28,36,24,0.55))]" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                <div>
                  <div className="text-[22px] font-semibold leading-none">Pan Čung</div>
                  <div className="mt-1 text-[13px] text-white/75">{a.badge}</div>
                </div>
              </div>
            </div>

            {/* floating stat cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.7 }}
              className="absolute -right-4 top-10 rounded-[18px] bg-white p-4 shadow-[0_30px_60px_-25px_rgba(28,36,24,0.45)] ring-1 ring-black/5 md:-right-10"
            >
              <div className="text-[28px] font-semibold leading-none">{t.stats[0].value}</div>
              <div className="mt-1 max-w-[150px] text-[11px] leading-snug text-[#1C2418]/60">{t.stats[0].label}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.45, duration: 0.7 }}
              className="absolute -left-4 bottom-24 rounded-[18px] bg-[#1C2418] p-4 text-white shadow-[0_30px_60px_-25px_rgba(28,36,24,0.6)] md:-left-10"
            >
              <div className="text-[28px] font-semibold leading-none text-[#D9B44A]">{t.stats[1].value}</div>
              <div className="mt-1 max-w-[150px] text-[11px] leading-snug text-white/65">{t.stats[1].label}</div>
            </motion.div>
          </div>
        </Reveal>

        {/* Text */}
        <Reveal delay={0.1}>
          <span className="section-label">{a.label}</span>
          <h2 className="font-display mt-4 text-[44px] leading-[1.02] text-[#232B1E] md:text-[64px]">
            {a.title} <ScribbleWord>{a.accent}</ScribbleWord>
          </h2>
          <p className="mt-8 text-[17px] leading-relaxed text-[#1C2418]/75">{a.p1}</p>
          <p className="mt-4 text-[17px] leading-relaxed text-[#1C2418]/75">{a.p2}</p>

          <ul className="mt-8 space-y-3">
            {a.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15.5px] text-[#1C2418]">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D9B44A] text-[#1C2418]"><Check size={13} /></span>{p}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href={links.booking} target="_blank" rel="noreferrer" className="btn-lime inline-flex h-12 items-center gap-2 px-6 text-[15px]" data-testid="about-booking">
              <CalendarCheck size={17} />{a.cta}
            </a>
            <a href={links.quiz} target="_blank" rel="noreferrer" className="glass-dark inline-flex h-12 items-center gap-2 rounded-[12px] px-6 text-[15px] font-medium text-[#1C2418] transition-colors hover:bg-black/10" data-testid="about-quiz">
              {a.secondary}<ArrowUpRight size={16} />
            </a>
          </div>

          <div className="mt-10 flex items-center gap-4 rounded-[20px] bg-[#F4F2EA] p-5">
            <Quote size={22} className="shrink-0 text-[#B3953A]" />
            <p className="font-display text-[22px] leading-snug text-[#232B1E]">{a.quote}</p>
            <div className="ml-auto grid shrink-0 text-right">
              <span className="text-[26px] font-semibold leading-none">{t.stats[2].value}</span>
              <span className="mt-1 max-w-[140px] text-[11px] leading-snug text-[#1C2418]/60">{t.stats[2].label}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
