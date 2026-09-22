import React, { useMemo, useState } from "react";
import { useLang } from "../../context/LanguageContext";
import { LineChart, Donut, fmtCzk, GOLD } from "../finance/charts";
import { amortization } from "./math";
import { Slider, Money, Stat, CalcShell, CalcFooter, pct } from "./ui";
import { useIsMobile } from "../../hooks/useIsMobile";

export default function MortgageCalc() {
  const { t } = useLang();
  const c = t.calc.mortgage;
  const g = t.calc.common;
  const cw = useIsMobile() ? 340 : 560;
  const [price, setPrice] = useState(6000000);
  const [down, setDown] = useState(20);
  const [rate, setRate] = useState(4.9);
  const [years, setYears] = useState(30);

  const loan = price * (1 - down / 100);
  const a = useMemo(() => amortization(loan, rate, years), [loan, rate, years]);
  const interestShare = a.totalPaid > 0 ? a.totalInterest / a.totalPaid : 0;
  const income = a.payment / 0.45;
  const half = Math.floor(years / 2);
  const markers = [{ i: 0, label: g.now }, { i: half, label: `${half} ${g.years}` }, { i: years, label: `${years} ${g.years}` }];
  const segments = [{ n: c.principal, p: Math.round((1 - interestShare) * 100) }, { n: c.interest, p: Math.round(interestShare * 100) }];
  const summary = `${fmtCzk(loan)} · ${pct(rate)} · ${years} ${g.years} → ${fmtCzk(a.payment)}${g.perMonth}`;

  return (
    <CalcShell
      testId="calc-mortgage"
      left={
        <div className="space-y-8">
          <Slider label={c.price} value={price} min={1000000} max={20000000} step={100000} display={fmtCzk} onChange={setPrice} testId="mortgage-price" />
          <Slider label={c.down} value={down} min={10} max={60} step={5} display={(v) => `${v} % · ${fmtCzk(price * v / 100)}`} onChange={setDown} testId="mortgage-down" />
          <Slider label={c.rate} value={rate} min={2} max={9} step={0.1} display={(v) => `${pct(v.toFixed(1))} p.a.`} onChange={setRate} testId="mortgage-rate" />
          <Slider label={c.years} value={years} min={5} max={30} display={(v) => `${v} ${g.years}`} onChange={setYears} testId="mortgage-years" />
        </div>
      }
      right={
        <>
          <div className="text-[11px] tracking-[0.16em] text-white/45">{c.payment.toUpperCase()}</div>
          <div className="mt-2 flex items-baseline gap-2">
            <Money value={a.payment} className="text-[38px] font-semibold leading-none tracking-tight text-[#D9B44A] md:text-[52px]" data-testid="mortgage-payment" />
            <span className="text-[14px] text-white/50">{g.perMonth}</span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Stat label={c.loan}><Money value={loan} /></Stat>
            <Stat label={c.ltv}>{100 - down} %</Stat>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
            <Donut segments={segments} size={120} thickness={16} dark colors={["rgba(255,255,255,0.55)", GOLD]} center={<span className="text-[12px] font-semibold leading-tight">{segments[1].p} %<br /><span className="text-[9px] font-normal text-white/50">{c.interest}</span></span>} />
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[13px]"><span className="inline-flex items-center gap-2 text-white/60"><span className="h-2 w-2 rounded-sm bg-white/55" />{c.principal}</span><Money value={loan} className="font-semibold" /></div>
              <div className="flex items-center justify-between text-[13px]"><span className="inline-flex items-center gap-2 text-white/60"><span className="h-2 w-2 rounded-sm bg-[#D9B44A]" />{c.totalInterest}</span><Money value={a.totalInterest} className="font-semibold text-[#D9B44A]" data-testid="mortgage-interest" /></div>
              <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[13px]"><span className="text-white/60">{c.totalPaid}</span><Money value={a.totalPaid} className="font-semibold" /></div>
            </div>
          </div>
          <div className="mt-6">
            <div className="text-[11px] tracking-[0.14em] text-white/45">{c.balance.toUpperCase()}</div>
            <LineChart id="calc-mortgage" data={a.balances} dark height={150} width={cw} markers={markers} pad={{ top: 14, right: 14, bottom: 28, left: 8 }} grid={3} tooltip={(i, v) => <span><b>{g.year} {i}</b> · {fmtCzk(v)}</span>} />
          </div>
          <div className="mt-4"><Stat label={c.income} hint={c.incomeHint}><Money value={income} /></Stat></div>
          <CalcFooter cta={g.cta} disclaimer={g.disclaimer} state={{ interest: c.title, message: `${c.title}: ${summary}`, calc: { type: "mortgage", summary } }} />
        </>
      }
    />
  );
}
