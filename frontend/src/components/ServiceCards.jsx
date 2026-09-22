import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "./IntroSection";
import { TiltCard } from "./motion/TiltCard";
import { WordReveal } from "./motion/WordReveal";
import { GOLD, INK, KHAKI, KHAKI_LIGHT } from "./finance/charts";

const draw = (delay = 0) => ({ initial: { pathLength: 0, opacity: 0 }, whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true }, transition: { duration: 1.2, delay, ease: "easeInOut" } });
const pop = (delay = 0) => ({ initial: { scale: 0, opacity: 0 }, whileInView: { scale: 1, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] } });

/* Abstract financial visualizations (SVG, 200x120) */
function VizNodes() {
  const nodes = [[100, 60], [30, 30], [30, 90], [170, 30], [170, 90], [100, 15]];
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full overflow-visible">
      {nodes.slice(1).map((p, i) => <motion.path key={i} d={`M100,60 L${p[0]},${p[1]}`} stroke={KHAKI_LIGHT} strokeWidth="1.5" strokeDasharray="3 3" fill="none" {...draw(0.1 * i)} />)}
      {nodes.slice(1).map((p, i) => <motion.circle key={i} cx={p[0]} cy={p[1]} r="7" fill="#fff" stroke={KHAKI} strokeWidth="2" {...pop(0.3 + 0.08 * i)} style={{ transformOrigin: `${p[0]}px ${p[1]}px` }} />)}
      <motion.circle cx="100" cy="60" r="14" fill={GOLD} {...pop(0.1)} style={{ transformOrigin: "100px 60px" }} />
      <motion.circle cx="100" cy="60" r="22" fill="none" stroke={GOLD} strokeOpacity="0.35" {...pop(0.5)} style={{ transformOrigin: "100px 60px" }} />
    </svg>
  );
}
function VizGrowth() {
  const d = "M10,105 C40,100 60,95 80,85 S120,60 140,45 S175,20 190,12";
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full overflow-visible">
      {[30, 55, 80, 105].map((y) => <line key={y} x1="10" x2="190" y1={y} y2={y} stroke={INK} strokeOpacity="0.07" />)}
      <motion.path d={`${d} L190,105 L10,105 Z`} fill={GOLD} fillOpacity="0.15" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }} />
      <motion.path d={d} fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" {...draw(0)} />
      <motion.circle cx="190" cy="12" r="5" fill="#fff" stroke={GOLD} strokeWidth="2.5" {...pop(1.1)} style={{ transformOrigin: "190px 12px" }} />
    </svg>
  );
}
function VizMortgage() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full overflow-visible">
      <motion.path d="M40,58 L100,18 L160,58" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...draw(0)} />
      <motion.rect x="52" y="58" width="96" height="48" rx="6" fill="none" stroke={INK} strokeWidth="2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} />
      <motion.rect x="52" y="58" width="96" height="48" rx="6" fill={GOLD} fillOpacity="0.9" initial={{ scaleY: 0 }} whileInView={{ scaleY: 0.62 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.6, ease: "easeOut" }} style={{ transformOrigin: "100px 106px" }} />
      <motion.text x="100" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK} fontFamily="Figtree, sans-serif" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.2 }}>62 %</motion.text>
    </svg>
  );
}
function VizShield() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full overflow-visible">
      <motion.path d="M100,12 L142,26 V58 C142,84 120,102 100,110 C80,102 58,84 58,58 V26 Z" fill={GOLD} fillOpacity="0.12" stroke={GOLD} strokeWidth="2.5" strokeLinejoin="round" {...draw(0)} />
      {[[82, 88, 14], [94, 76, 26], [106, 66, 36], [118, 56, 46]].map(([x, y, h], i) => (
        <motion.rect key={i} x={x - 4} y={y} width="8" height={h} rx="2" fill={i === 3 ? GOLD : KHAKI} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }} style={{ transformOrigin: `${x}px ${y + h}px` }} />
      ))}
    </svg>
  );
}
const VIZ = { nodes: VizNodes, growth: VizGrowth, mortgage: VizMortgage, shield: VizShield };

export default function ServiceCards() {
  const { t } = useLang();
  const s = t.services;
  return (
    <section id="sluzby" className="bg-white pb-8 pt-28 md:pb-12 md:pt-36" data-testid="service-cards">
      <div className="container-x">
        <Reveal className="max-w-[720px]">
          <span className="section-label">{s.label}</span>
          <h2 className="mt-4 text-[40px] font-normal leading-[1.05] tracking-[-0.02em] text-[#1C2418] md:text-[60px]"><WordReveal text={s.title} /></h2>
          <p className="mt-5 text-[17px] text-[#1C2418]/65">{s.subtitle}</p>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {s.items.map((it, i) => {
            const Viz = VIZ[it.viz] || VizNodes;
            const inner = (
              <>
                <span className="absolute right-6 top-6 inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#EBDDB0] text-[#1C2418] transition-colors group-hover:bg-[#D9B44A]"><ArrowUpRight size={14} /></span>
                <div className="h-[130px] w-full max-w-[220px]"><Viz /></div>
                <h3 className="mt-8 text-[24px] font-medium leading-tight text-[#1C2418]">{it.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-[#1C2418]/65">{it.desc}</p>
              </>
            );
            const cls = "paper-card card-hover group relative flex h-full min-h-[380px] flex-col p-7 md:p-8";
            return (
              <Reveal key={it.id} delay={i * 0.08} className="h-full">
                <TiltCard max={6} className="h-full">
                  {it.to.startsWith("/#") ? <a href={it.to} className={cls} data-testid={`service-${it.id}`}>{inner}</a> : <Link to={it.to} className={cls} data-testid={`service-${it.id}`}>{inner}</Link>}
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
