import React from "react";
import { useLang } from "../../context/LanguageContext";

// Shared sizing so the flying card (CardIntro) lands exactly on the slot in RulesPanel.
export const CARD_SIZE = "w-full max-w-[420px] md:w-[clamp(300px,36vw,560px)] md:max-w-none";
const GOLD_BG = "radial-gradient(120% 120% at 15% 10%, #F1DD95 0%, #D9B44A 45%, #C9A43E 100%)";

function Flame({ size = 9 }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="#D9B44A"><path d="M12 3.5c1.8 2.2 2.7 4.5 2.7 7 0 3.6-1.2 6.5-2.7 8.6-1.5-2.1-2.7-5-2.7-8.6 0-2.5.9-4.8 2.7-7Z" /></svg>;
}

function Rule({ r }) {
  const text = r.hl ? r.t.split(r.hl) : null;
  return (
    <li className="flex gap-1.5">
      <span className="w-[1.4em] shrink-0 font-bold">{r.n}</span>
      <span>
        {text ? (<>{text[0]}<span className="rounded-[3px] bg-[#F6EBC6] px-1 font-semibold">{r.hl}</span>{text[1]}</>) : r.t}
        {r.sub && (
          <ol className="mt-0.5 space-y-0.5 pl-3">
            {r.sub.map((s, i) => <li key={i} className="flex gap-1"><span className="shrink-0">{String.fromCharCode(97 + i)})</span><span>{s}</span></li>)}
          </ol>
        )}
      </span>
    </li>
  );
}

// Front: solid gold, only the title (like Teya's card front with logo + name).
export function GoldCardFront({ className = "" }) {
  const { t } = useLang();
  const c = t.cardIntro.card;
  return (
    <div className={`relative h-full w-full overflow-hidden rounded-[16px] p-4 text-[#1C2418] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.45)] ring-1 ring-black/10 md:rounded-[20px] md:p-6 ${className}`} style={{ background: GOLD_BG }} data-testid="gold-card-front">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.28)_50%,transparent_62%)]" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.14em] md:text-[12px]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-[4px] bg-[#1C2418] md:h-6 md:w-6"><Flame size={11} /></span>
            PAN ČUNG
          </span>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#1C2418" strokeWidth="1.6" strokeLinecap="round" className="opacity-70 md:h-6 md:w-6"><path d="M6 8.5a6 6 0 0 1 0 7" /><path d="M9.5 6.5a9.5 9.5 0 0 1 0 11" /><path d="M13 4.5a13 13 0 0 1 0 15" /><path d="M16.5 2.5a16.5 16.5 0 0 1 0 19" /></svg>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="font-display text-[clamp(24px,6.5vw,32px)] leading-[1.05] tracking-[0.06em] md:text-[clamp(24px,2.6vw,42px)]">
            {c.title[0]}<br />{c.title[1]}
          </div>
          <span className="relative h-8 w-10 shrink-0 rounded-[6px] bg-[linear-gradient(135deg,#F6EBC6,#B3953A)] ring-1 ring-black/15 md:h-10 md:w-12">
            <span className="absolute inset-x-0 top-1/2 h-px bg-black/20" /><span className="absolute inset-y-0 left-1/3 w-px bg-black/20" /><span className="absolute inset-y-0 right-1/3 w-px bg-black/20" />
          </span>
        </div>
        <div className="flex items-end justify-between text-[8px] font-semibold tracking-[0.14em] text-[#1C2418]/65 md:text-[10px]">
          <span>{c.footer.toUpperCase()}</span>
          <span className="font-script text-[18px] normal-case tracking-normal text-[#1C2418] md:text-[24px]">Čung</span>
        </div>
      </div>
    </div>
  );
}

// Back: the seven rules by age group.
export function GoldRulesCard({ className = "" }) {
  const { t } = useLang();
  const c = t.cardIntro.card;
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[16px] p-4 text-[#1C2418] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.45)] ring-1 ring-black/10 md:aspect-[1.586] md:rounded-[20px] md:p-6 ${className}`}
      style={{ background: GOLD_BG }}
      data-testid="gold-card"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.28)_50%,transparent_62%)]" />
      <div className="relative flex h-full flex-col">
        <div className="text-center">
          <div className="text-[13px] font-bold tracking-[0.16em] md:text-[17px]">{c.title[0]}</div>
          <div className="mt-1 inline-block rounded-[6px] bg-[#F6EBC6] px-3 py-0.5 text-[13px] font-bold tracking-[0.16em] md:text-[17px]">{c.title[1]}</div>
        </div>
        <div className="mt-3 flex-1 space-y-1.5 text-[9.5px] leading-[1.32] md:mt-4 md:text-[10.5px] lg:text-[11px]">
          {c.groups.map((g, gi) => (
            <div key={g.age} className={`grid grid-cols-[52px_1fr] gap-2 md:grid-cols-[64px_1fr] ${gi > 0 ? "border-t border-black/10 pt-1.5" : ""}`}>
              <div className="pt-px italic font-medium text-[#1C2418]/80">{g.age}</div>
              <ol className="space-y-0.5">{g.rules.map((r) => <Rule key={r.n} r={r} />)}</ol>
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-end gap-1.5 text-[8px] font-semibold tracking-[0.14em] text-[#1C2418]/65 md:text-[9px]">
          <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-[3px] bg-[#1C2418]"><Flame /></span>
          {c.footer.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
