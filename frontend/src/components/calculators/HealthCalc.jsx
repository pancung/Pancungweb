import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { useLang } from "../../context/LanguageContext";
import { Gauge, fmtCzk, GOLD } from "../finance/charts";
import { healthScore } from "./math";
import { Slider, Toggle, Money, CalcShell, CalcFooter } from "./ui";

export default function HealthCalc() {
  const { t } = useLang();
  const c = t.calc.health;
  const g = t.calc.common;
  const [income, setIncome] = useState(60000);
  const [expenses, setExpenses] = useState(30000);
  const [debt, setDebt] = useState(8000);
  const [reserve, setReserve] = useState(120000);
  const [investing, setInvesting] = useState(3000);
  const [insured, setInsured] = useState(false);

  const h = useMemo(() => healthScore({ income, expenses, debt, reserve, investing, insured }), [income, expenses, debt, reserve, investing, insured]);
  const level = c.levels[h.total < 30 ? 0 : h.total < 50 ? 1 : h.total < 70 ? 2 : h.total < 85 ? 3 : 4];
  const fmtPart = {
    savings: (v) => `${Math.round(v * 100)} % ${c.ofIncome}`,
    reserve: (v) => `${v.toFixed(1).replace(".", ",")} ${c.months}`,
    debt: (v) => `${Math.round(v * 100)} % ${c.ofIncome}`,
    invest: (v) => `${Math.round(v * 100)} % ${c.ofIncome}`,
    protect: (v) => (v ? c.yes : c.no),
  };
  const summary = `${c.score}: ${h.total}/100 (${level})`;

  return (
    <CalcShell
      testId="calc-health"
      left={
        <div className="space-y-7">
          <Slider label={c.income} value={income} min={20000} max={300000} step={1000} display={fmtCzk} onChange={setIncome} testId="health-income" />
          <Slider label={c.expenses} value={expenses} min={10000} max={200000} step={1000} display={fmtCzk} onChange={setExpenses} testId="health-expenses" />
          <Slider label={c.debt} value={debt} min={0} max={100000} step={500} display={fmtCzk} onChange={setDebt} testId="health-debt" />
          <Slider label={c.reserve} value={reserve} min={0} max={2000000} step={10000} display={fmtCzk} onChange={setReserve} testId="health-reserve" />
          <Slider label={c.investing} value={investing} min={0} max={100000} step={500} display={fmtCzk} onChange={setInvesting} testId="health-investing" />
          <Toggle label={c.insured} value={insured} onChange={setInsured} yes={c.yes} no={c.no} testId="health-insured" />
        </div>
      }
      right={
        <>
          <div className="text-[11px] tracking-[0.16em] text-white/45">{c.score.toUpperCase()}</div>
          <div className="mt-4 flex flex-col items-center">
            <Gauge value={Math.max(0.01, h.total / 100)} width={240} color={GOLD} track="rgba(255,255,255,0.1)">
              <Money value={h.total} format={(v) => String(Math.round(v))} className="text-[56px] font-semibold leading-none tracking-tight text-[#D9B44A]" data-testid="health-score" />
              <span className="text-[12px] text-white/45">/ 100</span>
            </Gauge>
            <motion.span key={level} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-full border border-[#D9B44A]/40 bg-[#D9B44A]/10 px-4 py-1.5 text-[13px] font-semibold text-[#D9B44A]" data-testid="health-level">{level}</motion.span>
          </div>

          <ul className="mt-7 space-y-4">
            {h.parts.map((p) => {
              const [name, tip] = c.parts[p.id];
              const ratio = p.score / p.max;
              return (
                <li key={p.id} data-testid={`health-part-${p.id}`}>
                  <div className="flex items-baseline justify-between text-[13px]">
                    <span className="font-medium">{name}</span>
                    <span className="tabular-nums text-white/60">{fmtPart[p.id](p.value)} · <b className="text-white">{Math.round(p.score)}</b>/{p.max}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div className="h-full rounded-full" animate={{ width: `${Math.max(2, ratio * 100)}%`, backgroundColor: ratio < 0.5 ? "#C97B5A" : ratio < 0.8 ? "#D9B44A" : "#8A9A5B" }} transition={{ type: "spring", stiffness: 90, damping: 20 }} />
                  </div>
                  {ratio < 0.7 && <p className="mt-1.5 flex items-start gap-1.5 text-[11.5px] leading-snug text-white/55"><Lightbulb size={12} className="mt-0.5 shrink-0 text-[#D9B44A]" />{tip}</p>}
                </li>
              );
            })}
          </ul>
          <CalcFooter cta={g.cta} disclaimer={g.disclaimer} state={{ interest: c.title, message: `${c.title}: ${summary}`, calc: { type: "health", summary } }} />
        </>
      }
    />
  );
}
