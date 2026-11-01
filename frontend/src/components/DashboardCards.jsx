import React from "react";
import { ArrowRight, Globe, Home, ShieldCheck, Target, TrendingUp, Wallet } from "lucide-react";
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

/* ---- Product-themed cards: insurance, investing, mortgage, loans ---- */

export function CardProtect() {
  const { t } = useLang();
  const p = t.dashF.protect;
  return (
    <div className="dash-card p-5 text-white" data-testid="dash-card-protect">
      <div className="flex items-center justify-between text-[10px] tracking-[0.16em] text-white/50"><span>{p.label}</span><Demo /></div>
      <div className="mt-3 flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#D9B44A]/15 text-[#D9B44A]"><ShieldCheck size={17} /></span>
        <div className="leading-tight">
          <div className="text-[9px] uppercase tracking-[0.12em] text-white/40">{p.coverLabel}</div>
          <div className="text-[18px] font-semibold">{p.cover}</div>
        </div>
      </div>
      <ul className="mt-4 divide-y divide-white/8">
        {p.rows.map(([n, v]) => (
          <li key={n} className="flex items-center justify-between py-1.5 text-[11px]">
            <span className="text-white/65">{n}</span><span className="font-semibold tabular-nums">{v}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-[10px] text-white/45">{p.totalLabel}</span>
        <span className="text-[15px] font-semibold text-[#D9B44A] tabular-nums">{p.total}</span>
      </div>
      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#D9B44A]/12 px-2.5 py-1 text-[9px] font-medium text-[#D9B44A]">
        <ShieldCheck size={10} />{p.badge}
      </div>
    </div>
  );
}

export function CardInvest() {
  const { t } = useLang();
  const v = t.dashF.invest;
  return (
    <div className="dash-card p-5 text-white" data-testid="dash-card-invest">
      <div className="flex items-center justify-between text-[10px] tracking-[0.16em] text-white/50"><span>{v.label}</span><Demo /></div>
      <div className="mt-2 text-[10px] text-white/40">{v.valueLabel}</div>
      <div className="text-[24px] font-semibold leading-none"><RollingNumber value={v.value.replace(" Kč", "")} delay={120} /> <span className="text-base font-medium text-white/70">Kč</span></div>
      <div className="mt-1 text-[10px]"><span className="text-[#D9B44A]">{v.deltaLabel}</span> <span className="text-white/40">· {v.note}</span></div>
      <div className="mt-4"><Sparkline data={[0.3, 0.45, 0.55, 0.7, 0.82, 0.95, 1.1, 1.24]} w={260} h={70} color={GOLD} /></div>
      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
        <span className="inline-flex items-center gap-1.5 text-[10px] text-white/45"><TrendingUp size={11} />{v.monthlyLabel}</span>
        <span className="text-[13px] font-semibold tabular-nums">{v.monthly}</span>
      </div>
    </div>
  );
}

export function CardMortgage() {
  const { t } = useLang();
  const m = t.dashF.mortgage;
  return (
    <div className="dash-card p-5 text-white" data-testid="dash-card-mortgage">
      <div className="flex items-center justify-between text-[10px] tracking-[0.16em] text-white/50"><span>{m.label}</span><Demo /></div>
      <div className="mt-3 grid grid-cols-[1fr_auto_auto] gap-x-3 text-[9px] uppercase tracking-[0.1em] text-white/35">
        {m.head.map((h) => <span key={h} className="last:text-right">{h}</span>)}
      </div>
      <ul className="mt-1.5 space-y-1">
        {m.rows.map(([bank, rate, pay], i) => (
          <li key={bank} className={`grid grid-cols-[1fr_auto_auto] items-center gap-x-3 rounded-[8px] px-2 py-1.5 text-[11px] ${i === 0 ? "bg-[#D9B44A]/15 text-white" : "text-white/60"}`}>
            <span className="flex items-center gap-1.5">{bank}{i === 0 && <span className="rounded-full bg-[#D9B44A] px-1.5 py-[1px] text-[7px] font-bold text-[#1C2418]">{m.best}</span>}</span>
            <span className="tabular-nums">{rate}</span>
            <span className="text-right font-semibold tabular-nums">{pay}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
        <span className="inline-flex items-center gap-1.5 text-[10px] text-white/45"><Home size={11} />{m.ltvLabel}</span>
        <span className="text-[13px] font-semibold tabular-nums">{m.ltv}</span>
      </div>
    </div>
  );
}

export function CardLoans() {
  const { t } = useLang();
  const l = t.dashF.loans;
  return (
    <div className="dash-card p-5 text-white" data-testid="dash-card-loans">
      <div className="flex items-center justify-between text-[10px] tracking-[0.16em] text-white/50"><span>{l.label}</span><Demo /></div>
      <div className="mt-1.5 text-[10px] text-white/40">{l.sub}</div>
      <ul className="mt-3 space-y-1">
        {l.rows.map(([n, rate]) => (
          <li key={n} className="flex items-center justify-between text-[11px]">
            <span className="text-white/60">{n}</span>
            <span className="rounded-full bg-white/8 px-2 py-[2px] text-[10px] font-semibold tabular-nums text-white/70">{rate}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-end gap-2.5 border-t border-white/10 pt-3">
        <div className="flex-1">
          <div className="text-[9px] uppercase tracking-[0.1em] text-white/35">{l.beforeLabel}</div>
          <div className="text-[14px] font-medium text-white/50 line-through tabular-nums">{l.before}</div>
        </div>
        <ArrowRight size={13} className="mb-1 text-[#D9B44A]" />
        <div className="flex-1 text-right">
          <div className="text-[9px] uppercase tracking-[0.1em] text-white/35">{l.afterLabel}</div>
          <div className="text-[17px] font-semibold text-[#D9B44A] tabular-nums">{l.after}</div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-[8px] bg-[#D9B44A]/12 px-2.5 py-1.5">
        <span className="text-[10px] text-[#D9B44A]/80">{l.saveLabel}</span>
        <span className="text-[12px] font-bold text-[#D9B44A] tabular-nums">{l.save}</span>
      </div>
    </div>
  );
}

/* ---- IŽP (investiční životní pojištění) cards ---- */

const IzpTag = () => {
  const { t } = useLang();
  return <span className="rounded-full bg-[#D9B44A] px-1.5 py-[1px] text-[8px] font-bold tracking-[0.08em] text-[#1C2418]">{t.dashF.izp.tag}</span>;
};

export function CardIzpSplit() {
  const { t } = useLang();
  const s = t.dashF.izp.split;
  return (
    <div className="dash-card p-5 text-white" data-testid="dash-card-izp-split">
      <div className="flex items-center justify-between text-[10px] tracking-[0.14em] text-white/50">
        <span className="flex items-center gap-1.5"><IzpTag />{s.label}</span><Demo />
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-[24px] font-semibold leading-none">{s.total}</span>
        <span className="text-[10px] text-white/40">{s.totalLabel}</span>
      </div>
      <div className="mt-3 flex h-2.5 w-full overflow-hidden rounded-full">
        <div className="h-full bg-[#D9B44A]" style={{ width: `${s.parts[0].p}%` }} />
        <div className="h-full bg-[#8A9A5B]" style={{ width: `${s.parts[1].p}%` }} />
      </div>
      <ul className="mt-3 space-y-2">
        {s.parts.map((p, i) => (
          <li key={p.n} className="flex items-center gap-2 text-[11px]">
            <span className="h-2 w-2 rounded-sm" style={{ background: i === 0 ? "#D9B44A" : "#8A9A5B" }} />
            <span className="text-white/65">{p.n}</span>
            <span className="ml-auto font-semibold tabular-nums">{p.v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CardIzpCover() {
  const { t } = useLang();
  const c = t.dashF.izp.cover;
  return (
    <div className="dash-card p-5 text-white" data-testid="dash-card-izp-cover">
      <div className="flex items-center justify-between text-[10px] tracking-[0.14em] text-white/50">
        <span className="flex items-center gap-1.5"><IzpTag />{c.label}</span><Demo />
      </div>
      <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] text-[#D9B44A]"><ShieldCheck size={11} />{c.fromDay}</div>
      <ul className="mt-2.5 divide-y divide-white/8">
        {c.rows.map(([n, v]) => (
          <li key={n} className="flex items-center justify-between py-2 text-[11px]">
            <span className="text-white/65">{n}</span><span className="font-semibold tabular-nums text-white">{v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CardIzpGrowth() {
  const { t } = useLang();
  const g = t.dashF.izp.growth;
  return (
    <div className="dash-card p-5 text-white" data-testid="dash-card-izp-growth">
      <div className="flex items-center justify-between text-[10px] tracking-[0.14em] text-white/50">
        <span className="flex items-center gap-1.5"><IzpTag />{g.label}</span><Demo />
      </div>
      <div className="mt-2 text-[24px] font-semibold leading-none">
        <RollingNumber value={g.value} delay={140} /> <span className="text-base font-medium text-white/70">Kč</span>
      </div>
      <div className="mt-1 text-[10px]"><span className="text-[#D9B44A]">{g.delta}</span> <span className="text-white/40">· {g.note}</span></div>
      <div className="mt-3"><Sparkline data={[0.25, 0.38, 0.5, 0.63, 0.78, 0.92, 1.08, 1.24]} w={260} h={52} color={GOLD} /></div>
      <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-[10px] text-white/45">{g.paidLabel}</span>
        <span className="text-[13px] font-semibold tabular-nums text-white/70">{g.paid}</span>
      </div>
    </div>
  );
}

export function CardIzpRenta() {
  const { t } = useLang();
  const r = t.dashF.izp.renta;
  return (
    <div className="dash-card p-5 text-white" data-testid="dash-card-izp-renta">
      <div className="flex items-center justify-between text-[10px] tracking-[0.14em] text-white/50">
        <span className="flex items-center gap-1.5"><IzpTag />{r.label}</span><Demo />
      </div>
      <div className="mt-1.5 text-[10px] text-white/40">{r.sub}</div>
      <div className="mt-3 rounded-[10px] bg-[#D9B44A]/12 p-3">
        <div className="text-[9px] uppercase tracking-[0.1em] text-[#D9B44A]/70">{r.lumpLabel}</div>
        <div className="text-[22px] font-bold leading-none text-[#D9B44A] tabular-nums">{r.lump}</div>
      </div>
      <div className="mt-2.5 flex items-center justify-between rounded-[10px] border border-white/10 p-3">
        <span className="text-[10px] text-white/45">{r.monthlyLabel}</span>
        <span className="text-[15px] font-semibold tabular-nums">{r.monthly}</span>
      </div>
    </div>
  );
}

export function CardIzpPayout() {
  const { t } = useLang();
  const p = t.dashF.izp.payout;
  return (
    <div className="dash-card p-5 text-white" data-testid="dash-card-izp-payout">
      <div className="flex items-center justify-between text-[10px] tracking-[0.14em] text-white/50">
        <span className="flex items-center gap-1.5"><IzpTag />{p.label}</span><Demo />
      </div>
      <div className="mt-1.5 text-[10px] text-white/40">{p.sub}</div>
      <div className="mt-3 flex items-center gap-2">
        {p.places.map((pl, i) => (
          <React.Fragment key={pl}>
            <span className="flex-1 rounded-[10px] border border-white/10 py-2.5 text-center text-[12px] font-medium">{pl}</span>
            {i === 0 && <ArrowRight size={13} className="shrink-0 text-[#D9B44A]" />}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] text-white/45"><Globe size={11} />{p.note}</div>
    </div>
  );
}

export function CardIzpScenarios() {
  const { t } = useLang();
  const s = t.dashF.izp.scenarios;
  return (
    <div className="dash-card p-5 text-white" data-testid="dash-card-izp-scenarios">
      <div className="flex items-center justify-between text-[10px] tracking-[0.14em] text-white/50">
        <span className="flex items-center gap-1.5"><IzpTag />{s.label}</span><Demo />
      </div>
      <div className="mt-auto grid grid-cols-2 gap-3">
        {[s.a, s.b].map((sc, i) => (
          <div key={sc.n} className={`rounded-[12px] p-3.5 ${i === 1 ? "bg-[#D9B44A]/12" : "border border-white/10"}`}>
            <div className="flex items-center gap-2">
              <span className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${i === 1 ? "bg-[#D9B44A] text-[#1C2418]" : "bg-white/10 text-white/70"}`}>{sc.n}</span>
              <span className="truncate text-[12px] font-medium">{sc.title}</span>
            </div>
            <div className="mt-2.5 text-[9px] text-white/40">{sc.desc}</div>
            <div className={`mt-0.5 text-[17px] font-bold tabular-nums ${i === 1 ? "text-[#D9B44A]" : "text-white"}`}>{sc.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PlanCard({ rotate = -12, className = "" }) {
  const { t } = useLang();
  const d = t.dashF;
  return (
    <div className={`dash-card items-center justify-center p-5 ${className}`} data-testid="dash-card-plan">
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

// Hero columns are all IŽP (investiční životní pojištění) – the product the hero sells.
export function LeftColumn() {
  return (
    <div className="flex flex-col gap-5">
      <PlanCard rotate={-14} />
      <CardIzpSplit />
      <CardIzpCover />
      <CardIzpGrowth />
    </div>
  );
}

// Same card count as LeftColumn – the two columns must stay visually balanced.
export function RightColumn() {
  return (
    <div className="flex flex-col gap-5">
      <CardIzpPayout />
      <PlanCard rotate={10} />
      <CardIzpGrowth />
      <CardIzpSplit />
    </div>
  );
}

// Centre column: fills the gap above and below the shrunken hero video.
export function CentreTop() {
  return <CardIzpScenarios />;
}

export function CentreBottom() {
  return <CardIzpRenta />;
}
