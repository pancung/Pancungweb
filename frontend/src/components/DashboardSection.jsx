import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "./IntroSection";
import { WordReveal } from "./motion/WordReveal";
import { CountUp, Donut, fmtCzk, GOLD, KHAKI, KHAKI_LIGHT, CREAM } from "./finance/charts";

const bars = [22, 28, 31, 26, 35, 30, 33, 38, 29, 36, 40, 31];
const colors = [GOLD, KHAKI, KHAKI_LIGHT, CREAM];

export function WealthDashboard({ compact = false }) {
  const { t } = useLang();
  const d = t.dashboard;
  return (
    <div className="rounded-[28px] bg-[#1C2418] p-5 text-white shadow-[0_50px_100px_-50px_rgba(28,36,24,0.7)] ring-1 ring-white/10 md:p-7" data-testid="wealth-dashboard">
      <div className="flex items-center justify-between">
        <span className="text-[11px] tracking-[0.16em] text-white/45">{d.label}</span>
        <span className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] text-white/55">{d.demo}</span>
      </div>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[12px] text-white/55">{d.netWorth}</div>
          <div className="mt-1 text-[36px] font-semibold leading-none tracking-tight md:text-[44px]"><CountUp value={4820000} format={fmtCzk} /></div>
        </div>
        <div className="text-right">
          <div className="text-[12px] text-white/55">{d.cashflow}</div>
          <div className="mt-1 text-[22px] font-semibold text-[#D9B44A]">+31 500 Kč</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {d.rows.map(([k, v], i) => (
          <div key={k} className="rounded-[14px] border border-white/10 bg-white/[0.04] p-3.5">
            <div className="text-[11px] text-white/50">{k}</div>
            <div className="mt-1 text-[16px] font-semibold tabular-nums">{v}</div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10"><motion.div className="h-full rounded-full" initial={{ width: 0 }} whileInView={{ width: `${[100, 24, 20, 7][i]}%` }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }} style={{ background: i === 1 ? KHAKI_LIGHT : GOLD }} /></div>
          </div>
        ))}
      </div>

      {!compact && (
        <div className="mt-6 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="text-[11px] tracking-[0.14em] text-white/45">{d.cashflow.toUpperCase()}</div>
            <div className="mt-3 flex h-[64px] items-end gap-1.5">
              {bars.map((h, i) => <motion.div key={i} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 + i * 0.05, ease: [0.22, 1, 0.36, 1] }} className={`flex-1 origin-bottom rounded-sm ${i === bars.length - 2 ? "bg-[#D9B44A]" : "bg-white/15"}`} style={{ height: `${(h / 40) * 100}%` }} />)}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Donut segments={d.alloc} size={110} thickness={14} dark colors={colors} center={<span className="text-[10px] leading-tight text-white/60">{d.allocation}</span>} />
            <ul className="space-y-1.5">
              {d.alloc.map((a, i) => <li key={a.n} className="flex items-center gap-2 text-[12px]"><span className="h-2 w-2 rounded-sm" style={{ background: colors[i] }} /><span className="text-white/70">{a.n}</span><span className="ml-auto pl-3 font-semibold tabular-nums">{a.p} %</span></li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardSection() {
  const { t } = useLang();
  const d = t.dashboard;
  return (
    <section id="plan" className="bg-white py-24 md:py-32" data-testid="dashboard-section">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <span className="section-label">{d.label}</span>
          <h2 className="mt-4 text-[40px] font-normal leading-[1.05] tracking-[-0.02em] text-[#1C2418] md:text-[56px]"><WordReveal text={d.title} /></h2>
          <p className="mt-6 text-[17px] leading-relaxed text-[#1C2418]/65">{d.subtitle}</p>
          <ul className="mt-8 space-y-3">
            {d.points.map((p) => <li key={p} className="flex items-start gap-3 text-[15.5px]"><span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D9B44A]"><Check size={13} /></span>{p}</li>)}
          </ul>
          <Link to="/kontakt" className="btn-ink mt-9 inline-flex h-12 items-center gap-2 px-6 text-[15px]" data-testid="dashboard-cta">{d.cta}<ArrowRight size={16} /></Link>
        </Reveal>
        <Reveal delay={0.15}><WealthDashboard /></Reveal>
      </div>
    </section>
  );
}
