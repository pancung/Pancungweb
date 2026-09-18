import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Maximize2, Check, CreditCard } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "./IntroSection";

const MiniBrand = () => (
  <span className="inline-flex items-center gap-1">
    <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-[3px] bg-[#D9B44A]">
      <svg viewBox="0 0 24 24" width="9" height="9" fill="#1C2418"><path d="M12 3.5c1.8 2.2 2.7 4.5 2.7 7 0 3.6-1.2 6.5-2.7 8.6-1.5-2.1-2.7-5-2.7-8.6 0-2.5.9-4.8 2.7-7Z" /></svg>
    </span>
    <span className="text-[10px] font-semibold text-[#1C2418]">Pan Čung</span>
  </span>
);

function CardShell({ label, title, desc, to, children, testId }) {
  return (
    <Link to={to} className="paper-card card-hover group relative flex min-h-[560px] flex-col p-7 md:p-8" data-testid={testId}>
      <span className="absolute right-6 top-6 inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#EBDDB0] text-[#1C2418] transition-colors group-hover:bg-[#D9B44A]">
        <Maximize2 size={14} />
      </span>
      <span className="section-label">{label}</span>
      <h3 className="mt-3 max-w-[90%] text-[26px] font-normal leading-[1.15] tracking-tight text-[#1C2418] md:text-[30px]">{title}</h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-[#1C2418]/65">{desc}</p>
      <div className="mt-auto pt-8">{children}</div>
    </Link>
  );
}

function ClaimMock({ m }) {
  return (
    <div className="mx-auto w-full max-w-[300px] rounded-[18px] bg-white p-5 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)]">
      <div className="text-[15px] font-semibold">{m.shop}</div>
      <div className="mt-3 flex items-center justify-between text-[14px]">
        <span className="text-[#1C2418]/70">{m.totalLabel}</span>
        <span className="font-semibold">{m.total}</span>
      </div>
      <div className="mt-4 space-y-2 text-[12px]">
        <div className="flex items-center justify-between rounded-[10px] border border-black/10 px-3 py-2">
          <span className="text-[#1C2418]/60">{m.fields[0]}</span><span className="inline-flex items-center gap-2 font-medium">{m.fields[1]}<CreditCard size={12} className="text-[#1C2418]/50" /></span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-[10px] border border-black/10 px-3 py-2"><span className="block text-[10px] text-[#1C2418]/50">{m.fields[2]}</span><span className="font-medium">{m.fields[3]}</span></div>
          <div className="rounded-[10px] border border-black/10 px-3 py-2"><span className="block text-[10px] text-[#1C2418]/50">{m.fields[4]}</span><span className="inline-flex items-center gap-1 font-medium text-[#5C6B3C]"><Check size={12} />{m.fields[5]}</span></div>
        </div>
      </div>
      <div className="mt-4 rounded-[10px] bg-[#CFAA3D] py-2.5 text-center text-[13px] font-semibold">{m.btn}</div>
      <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-[#1C2418]/50">{m.powered} <MiniBrand /></div>
    </div>
  );
}

function GrowthMock({ m }) {
  const pts = [0, 12, 20, 34, 42, 58, 66, 80, 100].map((v, i) => [i * (280 / 8), 120 - v * 1.05]);
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  const area = `${d} L280,130 L0,130 Z`;
  return (
    <div className="mx-auto w-full max-w-[320px] rounded-[18px] bg-white p-5 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between">
        <span className="text-[10px] tracking-[0.16em] text-[#1C2418]/50">{m.title.toUpperCase()}</span>
        <span className="rounded-full bg-[#D9B44A] px-2 py-0.5 text-[10px] font-semibold">+4 % p.a.</span>
      </div>
      <div className="mt-2 text-[22px] font-semibold leading-none">{m.value}</div>
      <div className="text-[10px] text-[#1C2418]/50">{m.valueLabel}</div>
      <svg viewBox="0 0 280 130" className="mt-3 w-full overflow-visible">
        <defs>
          <linearGradient id="limeFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#D9B44A" stopOpacity="0.5" /><stop offset="1" stopColor="#D9B44A" stopOpacity="0" /></linearGradient>
        </defs>
        <motion.path d={area} fill="url(#limeFill)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.6 }} />
        <motion.path d={d} fill="none" stroke="#1C2418" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: "easeInOut" }} />
        <motion.circle cx="280" cy="15" r="5" fill="#D9B44A" stroke="#1C2418" strokeWidth="2" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.5 }} />
      </svg>
      <div className="mt-1 flex justify-between text-[10px] text-[#1C2418]/45">{m.years.map((y) => <span key={y}>{y}</span>)}</div>
    </div>
  );
}

function OffersMock({ f }) {
  return (
    <div className="space-y-2.5">
      {f.offers.map((o, i) => (
        <motion.div key={o.name} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }} className="rounded-[16px] bg-white p-4 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between"><MiniBrand /><span className="text-[12px] font-medium text-[#1C2418]/70">{o.name}</span></div>
          <div className="mt-2 text-[10px] text-[#1C2418]/50">{o.label}</div>
          <div className="flex items-end justify-between">
            <span className="text-[20px] font-semibold leading-none">{o.value}</span>
            <span className="text-[11px] text-[#1C2418]/60">{o.price}</span>
          </div>
          <div className="mt-3 flex gap-2">
            <span className="rounded-[8px] bg-[#CFAA3D] px-3 py-1.5 text-[11px] font-semibold">{f.offerBtn}</span>
            <span className="rounded-[8px] bg-[#F4F2EA] px-3 py-1.5 text-[11px] font-medium">{f.offerAlt}</span>
          </div>
        </motion.div>
      ))}
      <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2 text-[12px] text-[#1C2418]/60">
        {f.footnote.map((x) => <span key={x} className="inline-flex items-center gap-1"><Check size={12} className="text-[#1C2418]" />{x}</span>)}
      </div>
    </div>
  );
}

export default function FeatureCards() {
  const { t } = useLang();
  const [life, invest, packs] = t.features;
  return (
    <section className="bg-white py-6 md:py-10" data-testid="feature-cards">
      <div className="container-x grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <Reveal><CardShell {...life} testId="feature-life"><ClaimMock m={life.mock} /></CardShell></Reveal>
        <Reveal delay={0.1}><CardShell {...invest} testId="feature-invest"><GrowthMock m={invest.mock} /></CardShell></Reveal>
        <Reveal delay={0.2} className="md:col-span-2 xl:col-span-1"><CardShell {...packs} testId="feature-packages"><OffersMock f={packs} /></CardShell></Reveal>
      </div>
    </section>
  );
}
