import React from "react";
import { Target, Home, Wallet } from "lucide-react";
import RollingNumber from "./RollingNumber";
import { useLang } from "../context/LanguageContext";
import { Donut, Sparkline, GOLD, KHAKI, KHAKI_LIGHT, CREAM } from "./finance/charts";

const MiniLogo = ({ light = false }) => (
  <span className="inline-flex items-center gap-1.5">
    <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] bg-[#D9B44A]">
      <svg viewBox="0 0 24 24" width="10" height="10" fill="#1C2418"><path d="M12 3.5c1.8 2.2 2.7 4.5 2.7 7 0 3.6-1.2 6.5-2.7 8.6-1.5-2.1-2.7-5-2.7-8.6 0-2.5.9-4.8 2.7-7Z" /></svg>
    </span>
    <span className={`text-[11px] font-semibold ${light ? "text-white" : "text-[#1C2418]"}`}>Pan Čung</span>
  </span>
);

const Demo = () => {
  const { t } = useLang();
  return <span className="rounded-full border border-white/10 px-2 py-0.5 text-[8px] tracking-[0.12em] text-white/40">{t.dashF.demo}</span>;
};

export function CardNetWorth() {
  const { t } = useLang();
  const d = t.dashF;
  return (
    <div className="dash-card p-5 text-white" data-testid="dash-card-networth">
      <div className="flex items-center justify-between text-[10px] tracking-[0.16em] text-white/50">
        <span>{d.netWorth}</span><Demo />
      </div>
      <div className="mt-2 text-[26px] font-semibold leading-none">
        <RollingNumber value="4 820 000" /> <span className="text-base font-medium text-white/70">Kč</span>
      </div>
      <div className="mt-1 text-[10px] text-white/40"><span className="text-[#D9B44A]">{d.netWorthDelta}</span> {d.vsLast} · {d.since}</div>
      <div className="mt-4">
        <svg viewBox="0 0 260 90" className="w-full overflow-visible">
          {[0, 30, 60, 90].map((y) => <line key={y} x1="0" x2="260" y1={y} y2={y} stroke="rgba(255,255,255,0.07)" />)}
        </svg>
        <div className="-mt-[90px]"><Sparkline data={[1.2, 1.5, 1.9, 2.1, 2.8, 3.4, 3.9, 4.82]} w={260} h={90} color={GOLD} /></div>
      </div>
      <div className="mt-2 flex justify-between text-[9px] text-white/35">{["2019", "2021", "2023", "2025"].map((y) => <span key={y}>{y}</span>)}</div>
    </div>
  );
}
// Backwards-compatible alias used by product pages
export const CardProtection = CardNetWorth;

export function CardCashflow() {
  const { t } = useLang();
  const d = t.dashF;
  const bars = [22, 28, 31, 26, 35, 30, 33, 38, 29, 36, 40, 31];
  return (
    <div className="dash-card p-5 text-white" data-testid="dash-card-cashflow">
      <div className="flex items-center justify-between text-[10px] tracking-[0.16em] text-white/50"><span>{d.cashflow}</span><Demo /></div>
      <div className="mt-2 text-[26px] font-semibold leading-none text-[#D9B44A]"><RollingNumber value={d.cashflowValue} delay={200} /> <span className="text-base font-medium text-white/70">Kč</span></div>
      <div className="mt-1 text-[10px] text-white/40">{d.cashflowSub}</div>
      <div className="mt-4 flex h-[70px] items-end gap-1.5">
        {bars.map((h, i) => <div key={i} className={`flex-1 rounded-sm ${i === bars.length - 2 ? "bg-[#D9B44A]" : "bg-white/15"}`} style={{ height: `${(h / 40) * 100}%` }} />)}
      </div>
      <div className="mt-2 flex justify-between text-[8px] text-white/35">{d.months.map((m) => <span key={m} className="flex-1 text-center">{m}</span>)}</div>
    </div>
  );
}

export function CardAllocation() {
  const { t } = useLang();
  const d = t.dashF;
  const colors = [GOLD, KHAKI, KHAKI_LIGHT, CREAM];
  return (
    <div className="dash-card p-5 text-white" data-testid="dash-card-allocation">
      <div className="flex items-center justify-between text-[10px] tracking-[0.16em] text-white/50"><span>{d.allocation.toUpperCase()}</span><Demo /></div>
      <div className="mt-4 flex items-center gap-4">
        <Donut segments={d.alloc} size={104} thickness={13} dark colors={colors} center={<span className="text-[14px] font-semibold">100 %</span>} />
        <ul className="flex-1 space-y-1.5">
          {d.alloc.map((a, i) => <li key={a.n} className="flex items-center gap-2 text-[11px]"><span className="h-2 w-2 rounded-sm" style={{ background: colors[i] }} /><span className="text-white/70">{a.n}</span><span className="ml-auto font-semibold tabular-nums">{a.p} %</span></li>)}
        </ul>
      </div>
    </div>
  );
}

export function CardGoals() {
  const { t } = useLang();
  const d = t.dashF;
  const icons = [Wallet, Home, Target];
  return (
    <div className="dash-card p-5 text-white" data-testid="dash-card-goals">
      <div className="flex items-center justify-between text-[10px] tracking-[0.16em] text-white/50"><span>{d.goals.toUpperCase()}</span><Demo /></div>
      <ul className="mt-4 space-y-3.5">
        {d.goalRows.map((g, i) => {
          const Icon = icons[i];
          return (
            <li key={g.n}>
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#D9B44A]/15 text-[#D9B44A]"><Icon size={13} /></span>
                <span className="flex-1 leading-tight"><span className="block text-[12px] font-medium">{g.n}</span><span className="block text-[9px] text-white/40">{g.sub}</span></span>
                <span className="text-[12px] font-semibold tabular-nums">{g.p} %</span>
              </div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#D9B44A]" style={{ width: `${g.p}%` }} /></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function PlanCard({ rotate = -12, className = "" }) {
  const { t } = useLang();
  const d = t.dashF;
  return (
    <div className={`dash-card flex items-center justify-center overflow-hidden p-8 ${className}`} data-testid="dash-card-plan">
      <div className="floaty relative w-[230px] rounded-[18px] bg-[#D9B44A] p-4 text-[#1C2418] shadow-[0_30px_60px_-20px_rgba(217,180,74,0.35)]" style={{ transform: `rotate(${rotate}deg)` }}>
        <div className="flex items-center justify-between gap-2"><MiniLogo /><span className="whitespace-nowrap text-[8px] font-medium uppercase tracking-wider text-[#1C2418]/60">{d.plan}</span></div>
        <div className="mt-4 text-[11px] font-medium text-[#1C2418]/70">{d.planName}</div>
        <div className="text-[20px] font-bold leading-none">4 820 000 Kč</div>
        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-[9px]">
          {d.planRows.map(([k, v]) => <div key={k} className="flex justify-between border-t border-[#1C2418]/10 pt-1"><span className="text-[#1C2418]/60">{k}</span><span className="font-semibold">{v}</span></div>)}
        </div>
      </div>
    </div>
  );
}
export const PolicyCard = PlanCard;

export function LeftColumn() {
  return (
    <div className="flex flex-col gap-5">
      <PlanCard rotate={-14} className="h-[260px]" />
      <CardNetWorth />
      <CardCashflow />
      <CardGoals />
    </div>
  );
}

export function RightColumn() {
  return (
    <div className="flex flex-col gap-5">
      <CardAllocation />
      <PlanCard rotate={10} className="h-[280px]" />
      <CardNetWorth />
      <CardGoals />
      <CardCashflow />
    </div>
  );
}
