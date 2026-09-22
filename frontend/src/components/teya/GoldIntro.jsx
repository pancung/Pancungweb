import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, TrendingUp, Wallet, Maximize2 } from "lucide-react";
import { useLang } from "../../context/LanguageContext";
import { useScrollMap } from "../../hooks/useScrollMap";
import { Reveal } from "../IntroSection";

const icons = { ShieldCheck, TrendingUp, Wallet };

export function PlanSheet() {
  const { t } = useLang();
  const p = t.gold.sheet;
  return (
    <div className="relative mx-auto w-[300px] md:w-[340px]" data-testid="plan-sheet">
      <div className="absolute -inset-x-2 top-3 h-full rotate-[3deg] rounded-[10px] bg-white/60 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]" />
      <div className="floaty relative rotate-[-5deg] rounded-[10px] bg-[#FFFDF7] p-6 text-[#1C2418] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.45)] ring-1 ring-black/5">
        <div className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rotate-[-2deg] rounded-[3px] bg-[#D9B44A]/70 shadow-sm" />
        <div className="flex items-start justify-between border-b border-black/10 pb-3">
          <div>
            <div className="text-[10px] font-semibold tracking-[0.18em] text-[#1C2418]/55">{p.title}</div>
            <div className="mt-1 text-[16px] font-semibold leading-none">{p.client}</div>
          </div>
          <div className="text-right text-[10px] text-[#1C2418]/50">{p.date}<br /><span className="font-semibold text-[#1C2418]/70">Pan Čung</span></div>
        </div>
        <div className="mt-4 text-[9.5px] font-semibold tracking-[0.16em] text-[#1C2418]/50">{p.goalsLabel.toUpperCase()}</div>
        <ul className="mt-2 space-y-2">
          {p.rows.map(([n, v, pct], i) => (
            <li key={n}>
              <div className="flex items-center justify-between text-[12px]"><span className="font-medium">{n}</span><span className="tabular-nums text-[#1C2418]/60">{v}</span></div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[#1C2418]/8"><motion.div className="h-full rounded-full bg-[#D9B44A]" initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 + i * 0.15 }} /></div>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-[9.5px] font-semibold tracking-[0.16em] text-[#1C2418]/50">{p.monthlyLabel.toUpperCase()}</div>
        <ul className="mt-1.5 divide-y divide-dashed divide-black/10">
          {p.monthly.map(([n, v]) => <li key={n} className="flex items-center justify-between py-1.5 text-[12px]"><span>{n}</span><span className="font-semibold tabular-nums">{v}</span></li>)}
        </ul>
        <div className="mt-5 flex items-end justify-between">
          <div>
            <div className="text-[9px] text-[#1C2418]/45">{p.signed}</div>
            <motion.div initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.9, duration: 0.8 }} className="font-script text-[30px] leading-none text-[#1C2418]">Čung</motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 1.4, rotate: -20 }} whileInView={{ opacity: 1, scale: 1, rotate: -12 }} viewport={{ once: true }} transition={{ delay: 1.2, type: "spring", stiffness: 300, damping: 14 }} className="flex h-14 w-14 items-center justify-center rounded-full border-[2.5px] border-[#B3953A] text-center text-[7px] font-bold leading-tight tracking-[0.12em] text-[#B3953A]">PAN<br />ČUNG<br />{p.stamp}</motion.div>
        </div>
      </div>
    </div>
  );
}

export default function GoldIntro() {
  const { t } = useLang();
  const g = t.gold;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const deviceY = useScrollMap(scrollYProgress, [0, 1], [90, -90]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[linear-gradient(180deg,#D9B44A_0%,#E5CE8A_70%,#F1E6C4_100%)]" data-testid="gold-intro">
      <div className="container-x pb-24 pt-28 md:pb-32 md:pt-36">
        <Reveal className="text-center">
          <h2 className="text-[40px] font-normal leading-[1.02] tracking-[-0.02em] text-[#1C2418] md:text-[64px] lg:text-[76px]">
            {g.title[0]} <span className="font-script text-[1.15em] leading-none">{g.title[1]}</span>
            <br />
            {g.title[2]}
          </h2>
        </Reveal>

        <div className="mt-16 grid items-center gap-12 lg:mt-24 lg:grid-cols-[1fr_1.1fr_1fr] lg:gap-6">
          <Reveal delay={0.1} className="order-2 lg:order-1">
            <h3 className="text-[24px] font-medium text-[#1C2418]">{g.label}</h3>
            <p className="mt-4 text-[16px] leading-relaxed text-[#1C2418]/75">{g.desc}</p>
            <Link to="/jak-pracuji" className="btn-ink mt-7 inline-flex h-11 items-center gap-2 px-5 text-[14px]" data-testid="gold-intro-cta"><Maximize2 size={15} />{g.cta}</Link>
          </Reveal>
          <motion.div style={{ y: deviceY }} className="order-1 lg:order-2"><PlanSheet /></motion.div>
          <Reveal delay={0.2} className="order-3 flex flex-col gap-6">
            {g.bullets.map((b, i) => {
              const Icon = icons[b.icon] || ShieldCheck;
              return (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#1C2418]"><Icon size={20} strokeWidth={1.6} /></span>
                  <p className="text-[16px] leading-snug text-[#1C2418]">{b.text}</p>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
