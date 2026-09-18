import React, { useEffect, useMemo, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck, PiggyBank, ArrowRight } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "./IntroSection";
import { calcDefaults, calcLimits, computeQuote, formatCzk } from "../mock";

export function ScribbleWord({ children, className = "" }) {
  return (
    <span className={`relative inline-block px-3 ${className}`}>
      <span className="font-script relative z-10">{children}</span>
      <svg className="pointer-events-none absolute -inset-x-3 -inset-y-3 h-[calc(100%+24px)] w-[calc(100%+24px)]" viewBox="0 0 300 120" preserveAspectRatio="none" fill="none">
        <motion.path
          d="M150 12 C 230 6, 292 34, 288 64 C 284 96, 205 112, 140 110 C 70 108, 8 92, 10 60 C 12 28, 80 10, 160 14 C 215 17, 270 36, 272 60"
          stroke="#D9B44A" strokeWidth="5" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.3, ease: "easeInOut" }}
        />
      </svg>
    </span>
  );
}

function AnimatedCzk({ value, className = "" }) {
  const spring = useSpring(value, { stiffness: 70, damping: 18 });
  useEffect(() => { spring.set(value); }, [value, spring]);
  const text = useTransform(spring, (v) => formatCzk(Math.round(v)));
  return <motion.span className={className}>{text}</motion.span>;
}

function Slider({ label, value, min, max, step = 1, unit, onChange, testId }) {
  const p = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between text-[14px]">
        <span className="text-[#1C2418]/70">{label}</span>
        <span className="font-semibold tabular-nums">{unit(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="range-lime mt-3" style={{ "--p": `${p}%` }} data-testid={testId} />
    </div>
  );
}

export default function CalculatorSection() {
  const { t, lang } = useLang();
  const c = t.calculator;
  const [age, setAge] = useState(calcDefaults.age);
  const [monthly, setMonthly] = useState(calcDefaults.monthly);
  const [years, setYears] = useState(calcDefaults.years);
  const q = useMemo(() => computeQuote({ age, monthly, years }), [age, monthly, years]);

  return (
    <section id="kalkulacka" className="relative bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_40%,#F3E9C8_100%)] py-24 md:py-32" data-testid="calculator-section">
      <div className="container-x">
        <Reveal className="text-center">
          <span className="section-label">{c.label}</span>
          <h2 className="font-display mx-auto mt-4 max-w-[900px] text-[44px] leading-[1.02] text-[#232B1E] md:text-[64px] lg:text-[72px]">
            {c.title} <ScribbleWord>{c.accent}</ScribbleWord>
          </h2>
          <p className="mx-auto mt-6 max-w-[520px] text-[16px] text-[#1C2418]/65">{c.subtitle}</p>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto mt-14 max-w-[1040px]">
          <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_40px_100px_-40px_rgba(0,0,0,0.25)] ring-1 ring-black/5">
            <div className="grid md:grid-cols-[1.1fr_1fr]">
              <div className="p-7 md:p-10">
                <div className="flex items-center gap-2 text-[13px] text-[#1C2418]/50"><span>{new Date().toLocaleTimeString(lang === "vi" ? "vi-VN" : "cs-CZ", { hour: "2-digit", minute: "2-digit" })}</span></div>
                <div className="mt-4 text-[22px] font-medium">{c.greeting}</div>
                <div className="mt-8 space-y-8">
                  <Slider label={c.age} value={age} min={calcLimits.age[0]} max={calcLimits.age[1]} unit={(v) => `${v}`} onChange={setAge} testId="calc-age" />
                  <Slider label={c.monthly} value={monthly} min={calcLimits.monthly[0]} max={calcLimits.monthly[1]} step={100} unit={(v) => formatCzk(v)} onChange={setMonthly} testId="calc-monthly" />
                  <Slider label={c.years} value={years} min={calcLimits.years[0]} max={calcLimits.years[1]} unit={(v) => `${v} ${c.yearsUnit}`} onChange={setYears} testId="calc-years" />
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {c.chips.map((chip) => (
                    <a key={chip} href="#faq" className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-[#F4F2EA] px-3 py-1.5 text-[12.5px] text-[#1C2418]/80 transition-colors hover:border-[#C9A227] hover:bg-[#F3E9C8]">
                      <Sparkles size={12} className="text-[#7A6A2B]" />{chip}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between bg-[#1C2418] p-7 text-white md:p-10">
                <div className="space-y-6">
                  <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-5">
                    <div className="flex items-center gap-2 text-[12px] text-white/60"><ShieldCheck size={14} className="text-[#D9B44A]" />{c.protection}</div>
                    <AnimatedCzk value={q.protection} className="mt-2 block text-[34px] font-semibold leading-none tracking-tight md:text-[40px]" />
                    <div className="mt-2 text-[12px] text-white/45">{c.protectionHint}</div>
                  </div>
                  <div className="rounded-[20px] border border-[#D9B44A]/30 bg-[#D9B44A]/10 p-5">
                    <div className="flex items-center gap-2 text-[12px] text-white/60"><PiggyBank size={14} className="text-[#D9B44A]" />{c.pension}</div>
                    <AnimatedCzk value={q.pension} className="mt-2 block text-[34px] font-semibold leading-none tracking-tight text-[#D9B44A] md:text-[40px]" />
                    <div className="mt-2 text-[12px] text-white/45">{c.pensionHint} · <AnimatedCzk value={q.monthlyPension} className="text-white/80" /> {c.monthlyPension}</div>
                  </div>
                </div>
                <div className="mt-8">
                  <Link to="/kontakt" state={{ age, monthly, years }} className="btn-lime inline-flex h-12 w-full items-center justify-center gap-2 text-[15px]" data-testid="calc-cta">{c.cta}<ArrowRight size={16} /></Link>
                  <p className="mt-3 text-[11px] leading-snug text-white/40">{c.disclaimer}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
