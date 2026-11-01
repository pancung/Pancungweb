import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, Download, Lock, Printer } from "lucide-react";
import { fmtCzk } from "../finance/charts";
import { Slider, Toggle, Money, CalcShell } from "../calculators/ui";
import { submitLead } from "../../lib/leads";
import { track } from "../../lib/track";

export const BUDGET_STORAGE = "tcat_budget_plan";

/* Monthly budget → reserve plan. All amounts per month, in Kč. */
export function budget({ income, fixed, living, family, debt, reserve, osvc }) {
  const needs = fixed + living + family + debt;
  const free = income - needs;
  const months = needs > 0 ? reserve / needs : 0;
  const targetMonths = osvc ? 6 : 3; // OSVČ has no mandatory sick pay → longer buffer
  const target = needs * targetMonths;
  const gap = Math.max(0, target - reserve);
  // 20 % of income (50/30/20), but never more than what is actually left over.
  const save = Math.max(0, Math.min(Math.round((income * 0.2) / 100) * 100, free));
  const eta = gap === 0 ? 0 : save > 0 ? Math.ceil(gap / save) : null;
  const level = months < 1 ? 0 : months < 3 ? 1 : months < targetMonths ? 2 : 3;
  return { needs, free, months, targetMonths, target, gap, save, eta, level, split: [income * 0.5, income * 0.3, income * 0.2] };
}

const LEVEL_COLOR = ["#C97B5A", "#D9A04A", "#D9B44A", "#8A9A5B"];

export function downloadBudgetCsv(p, inputs) {
  const r = budget(inputs);
  const values = [null, inputs.income, inputs.fixed, inputs.living, inputs.family, inputs.debt, r.save, "", "", "", inputs.income - r.needs - r.save];
  const rows = p.csvRows.map((row, i) => (i === 0 ? row : [row[0], values[i] === "" ? "" : Math.round(values[i])]));
  // BOM + semicolons: opens correctly (incl. Vietnamese diacritics) in Czech Excel.
  const csv = "﻿" + rows.map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: p.csvName });
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* The unlocked plan – rendered on the thank-you page. */
export function BudgetPlan({ topic, inputs, onBook }) {
  const p = topic.plan;
  const r = budget(inputs);
  const months = (n) => `${n} ${topic.calc.months}`;
  return (
    <div className="overflow-hidden rounded-[28px] bg-white ring-1 ring-black/5 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.25)]" data-testid="budget-plan">
      <div className="bg-[#1C2418] p-6 text-white md:p-8">
        <div className="text-[11px] font-semibold tracking-[0.16em] text-[#D9B44A]">{p.title.toUpperCase()}</div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <PlanStat label={p.target} value={fmtCzk(r.target)} hint={p.targetHint.replace("{n}", r.targetMonths)} />
          <PlanStat label={r.gap > 0 ? p.gap : p.done} value={r.gap > 0 ? fmtCzk(r.gap) : "✓"} accent />
          <PlanStat label={p.save} value={`${fmtCzk(r.save)} ${p.perMonth}`} />
        </div>
        <p className="mt-5 text-[15px] text-white/80" data-testid="plan-eta">
          {r.gap === 0 ? p.done : r.eta ? <>{p.eta} <b className="text-[#D9B44A]">{months(r.eta)}</b></> : p.etaNever}
        </p>
      </div>
      <div className="p-6 md:p-8">
        <div className="text-[13px] font-semibold text-[#1C2418]">{p.split}</div>
        <ul className="mt-3 divide-y divide-black/5">
          {p.splitRows.map((label, i) => (
            <li key={label} className="flex items-center justify-between py-2.5 text-[14px]">
              <span className="text-[#1C2418]/70">{label}</span>
              <span className="font-semibold tabular-nums">{fmtCzk(r.split[i])}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3 print:hidden">
          <button type="button" onClick={() => downloadBudgetCsv(p, inputs)} className="btn-ink inline-flex h-11 items-center gap-2 px-5 text-[14px]" data-testid="plan-download"><Download size={16} />{p.download}</button>
          <button type="button" onClick={() => window.print()} className="inline-flex h-11 items-center gap-2 rounded-[12px] border border-black/15 px-5 text-[14px] font-medium hover:bg-black/5" data-testid="plan-print"><Printer size={16} />{p.print}</button>
        </div>
        {onBook && (
          <div className="mt-7 flex flex-col gap-3 rounded-[18px] bg-[#F4F2EA] p-5 sm:flex-row sm:items-center sm:justify-between print:hidden">
            <p className="text-[14.5px] font-medium text-[#1C2418]">{p.next}</p>
            <button type="button" onClick={onBook} className="btn-lime inline-flex h-11 shrink-0 items-center justify-center px-5 text-[14px]" data-testid="plan-book">{p.nextCta}</button>
          </div>
        )}
      </div>
    </div>
  );
}

function PlanStat({ label, value, hint, accent }) {
  return (
    <div className="rounded-[16px] border border-white/10 bg-white/[0.04] p-4">
      <div className="text-[11px] text-white/50">{label}</div>
      <div className={`mt-1 text-[18px] font-semibold tabular-nums ${accent ? "text-[#D9B44A]" : "text-white"}`}>{value}</div>
      {hint && <div className="mt-1 text-[11px] text-white/40">{hint}</div>}
    </div>
  );
}

export default function BudgetCalc({ slug, topic, lang }) {
  const c = topic.calc;
  const g = topic.gate;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ income: 60000, fixed: 18000, living: 15000, family: 5000, debt: 3000, reserve: 50000, osvc: true });
  const started = useRef(false);
  const r = useMemo(() => budget(inputs), [inputs]);

  const set = (key) => (v) => {
    if (!started.current) {
      started.current = true;
      track("CalculatorStart", { topic: slug });
    }
    setInputs((s) => ({ ...s, [key]: v }));
  };

  const [form, setForm] = useState({ name: "", phone: "", channel: g.channels[0], email: "", consent: false, bot: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const valid = form.name.trim().length >= 2 && form.phone.replace(/\D/g, "").length >= 6 && form.consent;

  const submit = async (e) => {
    e.preventDefault();
    if (!valid || status === "sending") return;
    if (form.bot) return; // honeypot
    setStatus("sending");
    const summary = `Příjem ${inputs.income}, výdaje ${r.needs}, zbývá ${r.free}, rezerva ${inputs.reserve} (${r.months.toFixed(1)} měs.), OSVČ ${inputs.osvc ? "ano" : "ne"}`;
    try {
      await submitLead({ name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim(), channel: form.channel, topic: slug, lang, summary, consent: "ano" });
      track("Lead", { topic: slug, content_name: slug });
      try { sessionStorage.setItem(BUDGET_STORAGE, JSON.stringify(inputs)); } catch { /* ignore */ }
      navigate(`/tema/${slug}/dekujeme`, { state: { inputs } });
    } catch {
      setStatus("error");
    }
  };

  const field = "h-12 w-full rounded-[12px] border border-black/10 bg-[#F4F2EA] px-4 text-[15px] outline-none focus:ring-2 focus:ring-[#D9B44A]";

  return (
    <div className="space-y-5">
      <CalcShell
        testId="calc-budget"
        left={
          <div className="space-y-6">
            <Slider label={c.income} value={inputs.income} min={15000} max={300000} step={1000} display={fmtCzk} onChange={set("income")} testId="budget-income" />
            <Slider label={c.fixed} value={inputs.fixed} min={0} max={80000} step={500} display={fmtCzk} onChange={set("fixed")} testId="budget-fixed" />
            <Slider label={c.living} value={inputs.living} min={0} max={80000} step={500} display={fmtCzk} onChange={set("living")} testId="budget-living" />
            <Slider label={c.family} value={inputs.family} min={0} max={50000} step={500} display={fmtCzk} onChange={set("family")} testId="budget-family" />
            <Slider label={c.debt} value={inputs.debt} min={0} max={60000} step={500} display={fmtCzk} onChange={set("debt")} testId="budget-debt" />
            <Slider label={c.reserve} value={inputs.reserve} min={0} max={1000000} step={5000} display={fmtCzk} onChange={set("reserve")} testId="budget-reserve" />
            <Toggle label={c.osvc} value={inputs.osvc} onChange={set("osvc")} yes={c.yes} no={c.no} testId="budget-osvc" />
          </div>
        }
        right={
          <div className="flex h-full flex-col">
            <div className="text-[11px] tracking-[0.16em] text-white/45">{(r.free >= 0 ? c.freeLabel : c.freeNegative).toUpperCase()}</div>
            <Money value={Math.abs(r.free)} className={`mt-2 block text-[40px] font-semibold leading-none md:text-[52px] ${r.free >= 0 ? "text-[#D9B44A]" : "text-[#E08A6A]"}`} data-testid="budget-free" />
            <div className="mt-8 text-[11px] tracking-[0.16em] text-white/45">{c.coversLabel.toUpperCase()}</div>
            <div className="mt-2 flex items-baseline gap-3">
              <Money value={r.months} format={(v) => v.toFixed(1).replace(".", ",")} className="text-[40px] font-semibold leading-none text-white" data-testid="budget-months" />
              <span className="text-[15px] text-white/60">{c.months}</span>
              <span className="ml-auto rounded-full px-3 py-1 text-[12px] font-semibold text-[#1C2418]" style={{ background: LEVEL_COLOR[r.level] }} data-testid="budget-level">{c.levels[r.level]}</span>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full rounded-full" animate={{ width: `${Math.min(100, Math.max(3, (r.months / r.targetMonths) * 100))}%`, backgroundColor: LEVEL_COLOR[r.level] }} transition={{ type: "spring", stiffness: 90, damping: 20 }} />
            </div>
            <p className="mt-3 text-[13px] leading-snug text-white/60">{c.levelTips[r.level]}</p>

            {/* Locked preview of the full plan */}
            <div className="relative mt-auto pt-7">
              <div className="rounded-[18px] border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center gap-2 text-[13px] font-semibold text-[#D9B44A]"><Lock size={14} />{c.lockedTitle}</div>
                <ul className="mt-3 space-y-2">
                  {c.lockedItems.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-[13px] text-white/70"><Check size={14} className="mt-0.5 shrink-0 text-[#D9B44A]" />{it}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        }
      />

      {/* Gate: minimal fields – name + phone/Zalo; e-mail optional */}
      <form name="lead" onSubmit={submit} className="rounded-[28px] bg-white p-6 ring-1 ring-black/5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)] md:p-8" data-testid="lead-gate" noValidate>
        <div className="grid gap-6 md:grid-cols-[1fr_1.3fr] md:items-start">
          <div>
            <h3 className="text-[24px] font-medium leading-tight text-[#1C2418] md:text-[28px]">{g.title}</h3>
            <p className="mt-2 text-[14.5px] text-[#1C2418]/65">{g.sub}</p>
            <p className="mt-4 text-[12.5px] text-[#1C2418]/45">{g.safe}</p>
          </div>
          <div className="space-y-3">
            <input type="text" name="bot-field" value={form.bot} onChange={(e) => setForm({ ...form, bot: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="grid gap-3 sm:grid-cols-2">
              <input className={field} placeholder={g.name} autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-label={g.name} data-testid="gate-name" />
              <input className={field} placeholder={g.phone} type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} aria-label={g.phone} data-testid="gate-phone" />
            </div>
            <div>
              <div className="mb-2 text-[13px] text-[#1C2418]/60">{g.channel}</div>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={g.channel}>
                {g.channels.map((ch) => (
                  <button key={ch} type="button" role="radio" aria-checked={form.channel === ch} onClick={() => setForm({ ...form, channel: ch })} className={`h-10 rounded-full px-4 text-[13.5px] font-medium transition-colors ${form.channel === ch ? "bg-[#1C2418] text-white" : "bg-[#F4F2EA] text-[#1C2418]/75 hover:bg-[#EBE6D6]"}`} data-testid={`gate-channel-${ch}`}>{ch}</button>
                ))}
              </div>
            </div>
            <AnimatePresence initial={false}>
              {form.channel === g.channels[3] && (
                <motion.input initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 48 }} exit={{ opacity: 0, height: 0 }} className={field} placeholder={g.email} type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} aria-label={g.email} data-testid="gate-email" />
              )}
            </AnimatePresence>
            <label className="flex cursor-pointer items-start gap-3 text-[12.5px] leading-snug text-[#1C2418]/65">
              <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-0.5 h-4 w-4 shrink-0 accent-[#1C2418]" data-testid="gate-consent" />
              {g.consent}
            </label>
            <button type="submit" disabled={!valid || status === "sending"} className="btn-lime inline-flex h-13 w-full items-center justify-center gap-2 py-3.5 text-[15.5px] disabled:cursor-not-allowed disabled:opacity-50" data-testid="gate-submit">
              <Lock size={16} />{status === "sending" ? g.sending : g.submit}
            </button>
            {status === "error" && <p className="text-[13px] font-medium text-[#B4583A]" role="alert">{g.error}</p>}
          </div>
        </div>
      </form>
    </div>
  );
}
