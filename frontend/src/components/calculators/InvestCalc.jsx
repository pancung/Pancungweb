import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "../../context/LanguageContext";
import { LineChart, fmtCzk } from "../finance/charts";
import { investSeries } from "./math";
import { Slider, Money, Stat, CalcShell, CalcFooter, pct } from "./ui";
import { useIsMobile } from "../../hooks/useIsMobile";

export default function InvestCalc() {
  const { t } = useLang();
  const c = t.calc.invest;
  const g = t.calc.common;
  const cw = useIsMobile() ? 340 : 560;
  const [initial, setInitial] = useState(100000);
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(7);

  const data = useMemo(() => investSeries({ initial, monthly, years, rate }), [initial, monthly, years, rate]);
  const final = data[data.length - 1];
  const invested = initial + monthly * 12 * years;
  const gain = Math.max(0, final - invested);
  const gainShare = final > 0 ? gain / final : 0;
  const markers = [{ i: 0, label: g.now }, ...[5, 10, 20].filter((y) => y < years).map((y) => ({ i: y, label: `${y} ${g.years}` })), { i: years, label: `${years} ${g.years}` }];
  const summary = `${fmtCzk(monthly)}${g.perMonth} · ${years} ${g.years} · ${pct(rate)} p.a. → ${fmtCzk(final)}`;

  return (
    <CalcShell
      testId="calc-invest"
      left={
        <div className="space-y-8">
          <Slider label={c.initial} value={initial} min={0} max={2000000} step={10000} display={fmtCzk} onChange={setInitial} testId="invest-initial" />
          <Slider label={c.monthly} value={monthly} min={500} max={50000} step={500} display={fmtCzk} onChange={setMonthly} testId="invest-monthly" />
          <Slider label={c.years} value={years} min={1} max={40} display={(v) => `${v} ${g.years}`} onChange={setYears} testId="invest-years" />
          <Slider label={c.rate} hint={c.rateHint} value={rate} min={2} max={12} step={0.5} display={(v) => `${pct(v)} p.a.`} onChange={setRate} testId="invest-rate" />
        </div>
      }
      right={
        <>
          <div className="text-[11px] tracking-[0.16em] text-white/45">{c.final.replace("{years}", years).toUpperCase()}</div>
          <Money value={final} className="mt-2 block text-[38px] font-semibold leading-none tracking-tight text-[#D9B44A] md:text-[52px]" data-testid="invest-final" />
          <div className="mt-6">
            <LineChart id="calc-invest" data={data} dark height={220} width={cw} markers={markers} pad={{ top: 16, right: 14, bottom: 30, left: 8 }} tooltip={(i, v) => <span><b>{g.year} {i}</b> · {fmtCzk(v)}</span>} />
          </div>
          <div className="mt-5 flex h-2.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div className="h-full bg-white/60" animate={{ width: `${(1 - gainShare) * 100}%` }} transition={{ type: "spring", stiffness: 80, damping: 20 }} />
            <motion.div className="h-full bg-[#D9B44A]" animate={{ width: `${gainShare * 100}%` }} transition={{ type: "spring", stiffness: 80, damping: 20 }} />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <Stat label={g.invested}><Money value={invested} /></Stat>
            <Stat label={g.gain} accent><Money value={gain} /></Stat>
            <Stat label={c.multiplier}><Money value={invested > 0 ? final / invested : 0} format={(v) => `${v.toFixed(1).replace(".", ",")}×`} /></Stat>
          </div>
          <CalcFooter cta={g.cta} disclaimer={g.disclaimer} state={{ interest: c.title, message: `${c.title}: ${summary}`, calc: { type: "invest", summary } }} />
        </>
      }
    />
  );
}
