import React from "react";
import { useLang } from "../../context/LanguageContext";

function Rule({ r, hl }) {
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

export function GoldRulesCard({ className = "" }) {
  const { t } = useLang();
  const c = t.cardIntro.card;
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[16px] p-4 text-[#1C2418] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.45)] ring-1 ring-black/10 md:aspect-[1.586] md:rounded-[20px] md:p-6 ${className}`}
      style={{ background: "radial-gradient(120% 120% at 15% 10%, #F1DD95 0%, #D9B44A 45%, #C9A43E 100%)" }}
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
          <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-[3px] bg-[#1C2418]"><svg viewBox="0 0 24 24" width="9" height="9" fill="#D9B44A"><path d="M12 3.5c1.8 2.2 2.7 4.5 2.7 7 0 3.6-1.2 6.5-2.7 8.6-1.5-2.1-2.7-5-2.7-8.6 0-2.5.9-4.8 2.7-7Z" /></svg></span>
          {c.footer.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
