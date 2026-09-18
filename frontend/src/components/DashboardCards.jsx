import React from "react";
import { ArrowUpRight, ArrowRight, CreditCard, TrendingUp, Gift, User } from "lucide-react";
import RollingNumber from "./RollingNumber";
import { useLang } from "../context/LanguageContext";
import { dashNumbers } from "../mock";

const MiniLogo = ({ light = false }) => (
  <span className="inline-flex items-center gap-1.5">
    <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] bg-[#D9B44A]">
      <svg viewBox="0 0 24 24" width="10" height="10" fill="#1C2418"><path d="M12 3.5c1.8 2.2 2.7 4.5 2.7 7 0 3.6-1.2 6.5-2.7 8.6-1.5-2.1-2.7-5-2.7-8.6 0-2.5.9-4.8 2.7-7Z" /></svg>
    </span>
    <span className={`text-[11px] font-semibold ${light ? "text-white" : "text-[#1C2418]"}`}>Pan Čung</span>
  </span>
);

export function CardProtection() {
  const { t } = useLang();
  const d = t.dash;
  return (
    <div className="dash-card p-5 text-white" data-testid="dash-card-protection">
      <div className="flex items-center justify-between text-[10px] tracking-[0.16em] text-white/50">
        <span>{d.protection}</span>
        <span className="text-[#D9B44A] normal-case tracking-normal">{d.protectionDelta} <span className="text-white/40">{d.vsLast}</span></span>
      </div>
      <div className="mt-2 text-[26px] font-semibold leading-none">
        <RollingNumber value={dashNumbers.protectionLabel} /> <span className="text-base font-medium text-white/70">Kč</span>
      </div>
      <div className="mt-1 text-[10px] text-white/40">{d.since}</div>
      <div className="mt-4 flex h-[110px] items-end gap-[6px]">
        {dashNumbers.bars.map((h, i) => (
          <div key={i} className="flex h-full flex-1 items-end gap-[3px]">
            <div className="w-1/2 rounded-sm bg-white/10" style={{ height: `${Math.max(8, h - 18)}%` }} />
            <div className="w-1/2 rounded-sm bg-[#D9B44A]" style={{ height: `${h}%` }} />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[9px] text-white/35">
        {["2019", "2020", "2021", "2022", "2023", "2024", "2025"].map((y) => <span key={y}>{y}</span>)}
      </div>
      <div className="mt-3 flex items-center gap-4 text-[10px] text-white/50">
        <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-white/20" />{d.prev}</span>
        <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-[#D9B44A]" />{d.curr}</span>
      </div>
    </div>
  );
}

export function CardBalance({ compact = false }) {
  const { t } = useLang();
  const d = t.dash;
  return (
    <div className="dash-card p-5 text-white" data-testid="dash-card-balance">
      <div className="text-[11px] text-white/50">{d.balance}</div>
      <div className="mt-1 text-[30px] font-semibold leading-none">
        <RollingNumber value="1 236 000" delay={200} /> <span className="text-base font-medium text-white/70">Kč</span>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="inline-flex items-center gap-1.5 rounded-lg bg-[#D9B44A] px-3 py-1.5 text-[11px] font-semibold text-[#1C2418]"><ArrowUpRight size={12} />{d.payout}</button>
        <button className="glass inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-medium text-white/80"><ArrowRight size={12} />{d.increase}</button>
      </div>
      {!compact && (
        <ul className="mt-5 space-y-3">
          {d.txs.map((tx, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/70">
                {i === 0 ? <CreditCard size={12} /> : i === 1 ? <TrendingUp size={12} /> : <Gift size={12} />}
              </span>
              <span className="flex-1 leading-tight">
                <span className="block text-[11px] font-medium">{tx.name}</span>
                <span className="block text-[9px] text-white/40">{tx.time}</span>
              </span>
              <span className={`text-[11px] font-semibold ${tx.plus ? "text-[#D9B44A]" : "text-white/80"}`}>{tx.amount}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function CardSavings() {
  const { t } = useLang();
  const d = t.dash;
  return (
    <div className="dash-card p-5 text-white" data-testid="dash-card-savings">
      <div className="flex items-center justify-between text-[10px] tracking-[0.16em] text-white/50">
        <span>{d.savings}</span>
        <span className="text-[#D9B44A] tracking-normal">{d.savingsDelta} <span className="text-white/40">{d.savingsVs}</span></span>
      </div>
      <div className="mt-2 text-[26px] font-semibold leading-none">
        <RollingNumber value="230 000" delay={300} /> <span className="text-base font-medium text-white/70">Kč</span>
      </div>
      <div className="mt-1 text-[10px] text-white/40">{d.savedIn}</div>
      <div className="mt-4 flex h-[70px] items-end gap-2">
        {dashNumbers.weekBars.map((h, i) => (
          <div key={i} className={`flex-1 rounded-md ${i === 5 ? "bg-[#D9B44A]" : "bg-white/15"}`} style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[9px] text-white/40">
        {d.days.map((x) => <span key={x} className="flex-1 text-center">{x}</span>)}
      </div>
    </div>
  );
}

export function CardFamily() {
  const { t } = useLang();
  const d = t.dash;
  return (
    <div className="dash-card p-5 text-white" data-testid="dash-card-family">
      <div className="text-[11px] text-white/50">{d.family}</div>
      <ul className="mt-3 space-y-3">
        {d.members.map((m, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#D9B44A]/15 text-[#D9B44A]"><User size={14} /></span>
            <span className="flex-1 leading-tight">
              <span className="block text-[12px] font-medium">{m.name}</span>
              <span className="block text-[10px] text-white/40">{m.role}</span>
            </span>
            <span className="text-[12px] font-semibold">{m.sum}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PolicyCard({ rotate = -12, className = "" }) {
  const { t } = useLang();
  const p = t.dash.policyCard;
  return (
    <div className={`dash-card flex items-center justify-center p-8 overflow-hidden ${className}`} data-testid="dash-card-policy">
      <div
        className="relative w-[220px] rounded-[18px] bg-[#D9B44A] p-4 text-[#1C2418] shadow-[0_30px_60px_-20px_rgba(217,180,74,0.35)] floaty"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <div className="flex items-center justify-between gap-2">
          <MiniLogo />
          <span className="whitespace-nowrap text-[8px] font-medium uppercase tracking-wider text-[#1C2418]/60">{p.label}</span>
        </div>
        <div className="mt-6 text-[11px] font-medium text-[#1C2418]/70">{p.pkg}</div>
        <div className="text-[22px] font-bold leading-none">{p.sum}</div>
        <div className="mt-4 flex items-center justify-between text-[9px] text-[#1C2418]/60">
          <span>{p.valid}</span>
          <span className="font-mono">TC 8275 1947</span>
        </div>
      </div>
    </div>
  );
}

export function LeftColumn() {
  return (
    <div className="flex flex-col gap-5">
      <PolicyCard rotate={-14} className="h-[260px]" />
      <CardProtection />
      <CardBalance />
      <CardSavings />
    </div>
  );
}

export function RightColumn() {
  return (
    <div className="flex flex-col gap-5">
      <CardBalance compact={false} />
      <PolicyCard rotate={10} className="h-[280px]" />
      <CardSavings />
      <CardFamily />
      <CardProtection />
    </div>
  );
}
