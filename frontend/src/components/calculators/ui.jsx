import React, { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { fmtCzk } from "../finance/charts";

export const pct = (v) => `${String(v).replace(".", ",")} %`;

export function Slider({ label, hint, value, min, max, step = 1, display, onChange, testId }) {
  const p = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 text-[14px]">
        <span className="text-[#1C2418]/65">{label}{hint && <span className="ml-2 text-[11px] text-[#1C2418]/40">({hint})</span>}</span>
        <span className="font-semibold tabular-nums text-[#1C2418]">{display(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="range-lime mt-3" style={{ "--p": `${p}%` }} data-testid={testId} aria-label={label} />
    </div>
  );
}

export function Toggle({ label, value, onChange, yes, no, testId }) {
  return (
    <div className="flex items-center justify-between gap-3 text-[14px]">
      <span className="text-[#1C2418]/65">{label}</span>
      <button type="button" onClick={() => onChange(!value)} aria-pressed={value} data-testid={testId}
        className={`relative inline-flex h-8 w-[104px] shrink-0 items-center rounded-full p-1 text-[12px] font-semibold transition-colors duration-300 ${value ? "bg-[#1C2418] text-white" : "bg-[#1C2418]/10 text-[#1C2418]/60"}`}>
        <motion.span animate={{ x: value ? 72 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 32 }} className={`absolute left-1 top-1 h-6 w-6 rounded-full ${value ? "bg-[#D9B44A]" : "bg-white shadow"}`} />
        <span className={`w-full ${value ? "pr-8 text-right" : "pl-8 text-left"}`}>{value ? yes : no}</span>
      </button>
    </div>
  );
}

export function Money({ value, format = fmtCzk, className = "", ...rest }) {
  const spring = useSpring(value, { stiffness: 80, damping: 20 });
  useEffect(() => { spring.set(value); }, [value, spring]);
  const text = useTransform(spring, (v) => format(v));
  return <motion.span className={`tabular-nums ${className}`} {...rest}>{text}</motion.span>;
}

export function Stat({ label, children, accent = false, hint }) {
  return (
    <div className="rounded-[16px] border border-white/10 bg-white/[0.04] p-4">
      <div className="text-[11px] text-white/50">{label}</div>
      <div className={`mt-1 text-[16px] font-semibold tabular-nums md:text-[17px] ${accent ? "text-[#D9B44A]" : "text-white"}`}>{children}</div>
      {hint && <div className="mt-1 text-[10.5px] text-white/35">{hint}</div>}
    </div>
  );
}

export function CalcShell({ left, right, testId }) {
  return (
    <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_40px_100px_-40px_rgba(0,0,0,0.25)] ring-1 ring-black/5" data-testid={testId}>
      <div className="grid lg:grid-cols-[1fr_1.15fr]">
        <div className="p-6 md:p-10">{left}</div>
        <div className="relative flex flex-col bg-[#1C2418] p-6 text-white md:p-10">{right}</div>
      </div>
    </div>
  );
}

export function CalcFooter({ cta, disclaimer, state }) {
  return (
    <div className="mt-auto pt-8">
      <Link to="/kontakt" state={state} className="btn-lime inline-flex h-12 w-full items-center justify-center gap-2 text-[15px]" data-testid="calc-cta">{cta}<ArrowRight size={16} /></Link>
      <p className="mt-3 text-[11px] leading-snug text-white/40">{disclaimer}</p>
    </div>
  );
}
