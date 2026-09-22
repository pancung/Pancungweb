import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import { TiltCard } from "./motion/TiltCard";
import { Ring, Gauge, Sparkline, GOLD, KHAKI } from "./finance/charts";
import InvestCalc from "./calculators/InvestCalc";
import MortgageCalc from "./calculators/MortgageCalc";
import FireCalc from "./calculators/FireCalc";
import HealthCalc from "./calculators/HealthCalc";

export const CALC_TABS = ["invest", "mortgage", "fire", "health"];
const CALCS = { invest: InvestCalc, mortgage: MortgageCalc, fire: FireCalc, health: HealthCalc };

function Viz({ type, active }) {
  const track = active ? "rgba(255,255,255,0.12)" : undefined;
  if (type === "line") return <Sparkline data={[2, 3, 3.5, 5, 6, 8, 10, 13, 17]} w={110} h={40} color={GOLD} />;
  if (type === "mortgage") return (
    <div className="w-[110px]">
      <div className="flex h-3 w-full overflow-hidden rounded-full"><div className={`h-full ${active ? "bg-white/60" : "bg-[#1C2418]"}`} style={{ width: "62%" }} /><div className="h-full bg-[#D9B44A]" style={{ width: "38%" }} /></div>
      <div className={`mt-1.5 text-[10px] ${active ? "text-white/50" : "text-[#1C2418]/50"}`}>62 % / 38 %</div>
    </div>
  );
  if (type === "ring") return <Ring value={0.68} size={52} thickness={6} track={track}><span className="text-[11px] font-semibold">68 %</span></Ring>;
  return <Gauge value={0.74} width={80} color={active ? GOLD : KHAKI} track={track}><span className="text-[13px] font-semibold leading-none">74</span></Gauge>;
}

function TabCard({ item, active, onClick, openLabel, activeLabel }) {
  return (
    <TiltCard max={5} className="h-full">
      <button
        type="button" onClick={onClick} aria-pressed={active} data-testid={`calc-tab-${item.id}`}
        className={`group relative flex h-full min-h-[210px] w-full flex-col rounded-[24px] p-5 text-left ring-1 transition-[background-color,color,box-shadow] duration-300 md:p-6 ${active ? "bg-[#1C2418] text-white ring-[#1C2418] shadow-[0_30px_60px_-30px_rgba(28,36,24,0.6)]" : "bg-white text-[#1C2418] ring-black/5 hover:ring-[#D9B44A]/70"}`}
      >
        {active && <motion.span layoutId="calc-active-pill" className="absolute right-4 top-4 rounded-full bg-[#D9B44A] px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-[#1C2418]">{activeLabel}</motion.span>}
        <span className={`pr-16 text-[11px] font-semibold tracking-[0.16em] ${active ? "text-[#D9B44A]" : "text-[#1C2418]/55"}`}>{item.title}</span>
        <span className="mt-2 text-[17px] font-medium leading-snug md:text-[18px]">{item.desc}</span>
        <span className="mt-auto flex items-end justify-between gap-3 pt-6">
          <Viz type={item.viz} active={active} />
          {!active && <span className="text-[12.5px] font-semibold text-[#7A6A2B] transition-colors group-hover:text-[#1C2418]">{openLabel} →</span>}
        </span>
      </button>
    </TiltCard>
  );
}

export default function CalculatorHub({ tab, onTab, compact = false }) {
  const { t } = useLang();
  const c = t.calculators;
  const Active = CALCS[tab] || InvestCalc;
  return (
    <div data-testid="calculator-hub">
      {compact ? (
        <div className="mx-auto flex max-w-full flex-wrap justify-center gap-1.5 rounded-full bg-white p-1.5 ring-1 ring-black/5 sm:inline-flex sm:flex-nowrap" role="tablist">
          {c.items.map((it) => {
            const on = tab === it.id;
            return (
              <button key={it.id} type="button" role="tab" aria-selected={on} onClick={() => onTab(it.id)} data-testid={`calc-tab-${it.id}`} className={`relative rounded-full px-4 py-2.5 text-[12.5px] font-semibold tracking-[0.04em] transition-colors md:px-5 ${on ? "text-[#1C2418]" : "text-[#1C2418]/55 hover:text-[#1C2418]"}`}>
                {on && <motion.span layoutId="calc-compact-pill" className="absolute inset-0 z-0 rounded-full bg-[#D9B44A]" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span className="relative z-10">{it.title.charAt(0) + it.title.slice(1).toLowerCase()}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {c.items.map((it) => <TabCard key={it.id} item={it} active={tab === it.id} onClick={() => onTab(it.id)} openLabel={c.open} activeLabel={c.active} />)}
        </div>
      )}
      <div className={compact ? "mt-8 md:mt-10" : "mt-8"}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={tab} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
            <Active />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
