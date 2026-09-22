import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../../context/LanguageContext";
import { LineChart, Ring, fmtCzk, GOLD } from "../finance/charts";
import { fireSim } from "./math";
import { Slider, Money, CalcShell, CalcFooter, pct } from "./ui";
import { useIsMobile } from "../../hooks/useIsMobile";

export default function FireCalc() {
  const { t } = useLang();
  const c = t.calc.fire;
  const g = t.calc.common;
  const cw = useIsMobile() ? 340 : 560;
  const [age, setAge] = useState(30);
  const [portfolio, setPortfolio] = useState(300000);
  const [monthly, setMonthly] = useState(10000);
  const [expenses, setExpenses] = useState(40000);
  const [rate, setRate] = useState(6);
  const [withdrawal, setWithdrawal] = useState(4);

  const r = useMemo(() => fireSim({ age, portfolio, monthly, expenses, rate, withdrawal }), [age, portfolio, monthly, expenses, rate, withdrawal]);
  const yearsTo = r.fireAge !== null ? Math.max(0, Math.ceil(r.fireAge - age)) : null;
  const span = Math.min(r.series.length - 1, yearsTo !== null ? Math.max(yearsTo + 5, 10) : 40);
  const data = r.series.slice(0, span + 1);
  const yMax = Math.max(r.target * 1.15, ...data);
  const markers = [{ i: 0, label: `${age}` }, ...(yearsTo !== null && yearsTo > 0 && yearsTo < span ? [{ i: yearsTo, label: `FIRE · ${age + yearsTo}` }] : []), { i: span, label: `${age + span}` }];
  const fireAgeText = r.fireAge !== null ? Math.round(r.fireAge) : null;
  const summary = `FIRE ${fmtCzk(r.target)} · ${fmtCzk(monthly)}${g.perMonth} · ${fireAgeText !== null ? `${c.fireAge} ${fireAgeText}` : c.neverShort}`;

  return (
    <CalcShell
      testId="calc-fire"
      left={
        <div className="space-y-7">
          <Slider label={c.age} value={age} min={18} max={60} display={(v) => `${v}`} onChange={setAge} testId="fire-age" />
          <Slider label={c.portfolio} value={portfolio} min={0} max={10000000} step={50000} display={fmtCzk} onChange={setPortfolio} testId="fire-portfolio" />
          <Slider label={c.monthly} value={monthly} min={1000} max={100000} step={1000} display={fmtCzk} onChange={setMonthly} testId="fire-monthly" />
          <Slider label={c.expenses} value={expenses} min={15000} max={150000} step={1000} display={fmtCzk} onChange={setExpenses} testId="fire-expenses" />
          <Slider label={c.rate} value={rate} min={2} max={10} step={0.5} display={(v) => `${pct(v)} p.a.`} onChange={setRate} testId="fire-rate" />
          <Slider label={c.withdrawal} hint={c.withdrawalHint} value={withdrawal} min={3} max={5} step={0.25} display={pct} onChange={setWithdrawal} testId="fire-withdrawal" />
        </div>
      }
      right={
        <>
          <div className="text-[11px] tracking-[0.16em] text-white/45">{c.target.toUpperCase()}</div>
          <Money value={r.target} className="mt-2 block text-[38px] font-semibold leading-none tracking-tight text-[#D9B44A] md:text-[52px]" data-testid="fire-target" />
          <div className="mt-1 text-[12px] text-white/45">{c.targetHint}</div>

          <div className="mt-6 flex items-center gap-5 rounded-[20px] border border-white/10 bg-white/[0.04] p-4">
            <Ring value={Math.max(0.01, r.progress)} size={88} thickness={9} color={GOLD} track="rgba(255,255,255,0.1)">
              <span className="text-[16px] font-semibold leading-none">{Math.round(r.progress * 100)} %</span>
              <span className="mt-0.5 text-[8px] tracking-wide text-white/45">{c.progress.toUpperCase()}</span>
            </Ring>
            <AnimatePresence mode="wait" initial={false}>
              {fireAgeText !== null ? (
                <motion.div key={`ok-${fireAgeText}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                  <div className="text-[12px] text-white/55">{c.fireAge}</div>
                  <div className="text-[34px] font-semibold leading-none tracking-tight" data-testid="fire-age-result">{fireAgeText} <span className="text-[16px] font-medium text-white/60">{c.yearsOld}</span></div>
                  <div className="mt-1 text-[13px] text-[#D9B44A]">{c.inYears.replace("{n}", yearsTo)}</div>
                </motion.div>
              ) : (
                <motion.p key="never" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="text-[13.5px] leading-snug text-white/75" data-testid="fire-never">{c.never}</motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-6">
            <LineChart id="calc-fire" data={data} dark height={200} width={cw} yMax={yMax} markers={markers} refLine={{ value: r.target, label: c.fi }} pad={{ top: 18, right: 14, bottom: 30, left: 8 }} tooltip={(i, v) => <span><b>{age + i}</b> · {fmtCzk(v)}</span>} />
          </div>
          <CalcFooter cta={g.cta} disclaimer={g.disclaimer} state={{ interest: c.title, message: `${c.title}: ${summary}`, calc: { type: "fire", summary } }} />
        </>
      }
    />
  );
}
