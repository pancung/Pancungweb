import React, { useMemo, useState } from "react";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "./IntroSection";
import { WordReveal } from "./motion/WordReveal";
import { LineChart, CountUp, fmtCzk, growthSeries } from "./finance/charts";
import { useIsMobile } from "../hooks/useIsMobile";

function Slider({ label, hint, value, min, max, step, display, onChange, testId }) {
  const p = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between text-[14px]">
        <span className="text-white/60">{label}{hint && <span className="ml-2 text-[11px] text-white/35">({hint})</span>}</span>
        <span className="font-semibold text-white tabular-nums">{display(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="range-lime range-dark mt-3" style={{ "--p": `${p}%` }} data-testid={testId} aria-label={label} />
    </div>
  );
}

export default function WealthSection() {
  const { t } = useLang();
  const w = t.wealth;
  const cw = useIsMobile() ? 360 : 760;
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(25);
  const [ret, setRet] = useState(6);

  const data = useMemo(() => growthSeries(monthly, years, ret / 100), [monthly, years, ret]);
  const invested = monthly * 12 * years;
  const final = data[data.length - 1];
  const markers = useMemo(() => {
    const m = [{ i: 0, label: w.milestones[0] }];
    [5, 10, 20].forEach((y, k) => { if (y < years) m.push({ i: y, label: w.milestones[k + 1] }); });
    m.push({ i: years, label: w.milestones[4] });
    return m;
  }, [years, w.milestones]);

  return (
    <section id="majetek" className="grain relative overflow-hidden bg-[#1C2418] py-24 text-white md:py-32" data-testid="wealth-section" data-nav="dark">
      <div className="container-x">
        <Reveal className="max-w-[820px]">
          <span className="section-label text-white/45">{w.label}</span>
          <h2 className="font-display mt-4 text-[44px] leading-[1.02] md:text-[72px]"><WordReveal text={w.title} stagger={0.07} /></h2>
          <p className="mt-6 max-w-[620px] text-[17px] leading-relaxed text-white/65">{w.subtitle}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-12">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-[12px] tracking-[0.14em] text-white/45">{w.value.toUpperCase()}</div>
                <div className="mt-1 text-[36px] font-semibold leading-none tracking-tight text-[#D9B44A] md:text-[48px]" data-testid="wealth-final"><CountUp value={final} format={fmtCzk} duration={0.8} /></div>
              </div>
              <div className="flex gap-6 text-right">
                <div><div className="text-[11px] text-white/45">{w.invested}</div><div className="text-[16px] font-medium tabular-nums">{fmtCzk(invested)}</div></div>
                <div><div className="text-[11px] text-white/45">{w.gain}</div><div className="text-[16px] font-medium tabular-nums text-[#D9B44A]">{fmtCzk(Math.max(0, final - invested))}</div></div>
              </div>
            </div>
            <div className="mt-6">
              <LineChart id="wealth" data={data} dark height={300} width={cw} markers={markers} pad={{ top: 24, right: 20, bottom: 34, left: 10 }} tooltip={(i, v) => <span><b>{w.tooltipYear} {i}</b> · {fmtCzk(v)}</span>} />
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="space-y-8">
              <Slider label={w.monthly} value={monthly} min={1000} max={50000} step={500} display={fmtCzk} onChange={setMonthly} testId="wealth-monthly" />
              <Slider label={w.horizon} value={years} min={5} max={40} step={1} display={(v) => `${v} ${w.years}`} onChange={setYears} testId="wealth-years" />
              <Slider label={w.ret} hint={w.retHint} value={ret} min={2} max={10} step={0.5} display={(v) => `${String(v).replace(".", ",")} % p.a.`} onChange={setRet} testId="wealth-return" />
            </div>
            <p className="mt-8 text-[11.5px] leading-snug text-white/40">{w.disclaimer}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
