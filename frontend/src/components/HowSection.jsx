import React, { useState } from "react";
import { Apple, Play, MousePointer2, Languages } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "./IntroSection";

const Spark = () => (
  <svg viewBox="0 0 60 16" className="h-4 w-14" fill="none"><path d="M1 12 C 8 12, 10 4, 16 6 S 24 14, 30 9 S 40 2, 46 6 S 54 12, 59 4" stroke="#8A9A5B" strokeWidth="1.6" strokeLinecap="round" /></svg>
);

const avatarColors = ["#e05a4f", "#8e44ad", "#5C6B3C", "#B3953A"];

export default function HowSection() {
  const { t, lang, setLang } = useLang();
  const h = t.how;
  const [langIdx, setLangIdx] = useState(lang === "vi" ? 0 : 1);

  const pickLang = (i) => {
    setLangIdx(i);
    if (i === 0) setLang("vi");
    if (i === 1) setLang("cs");
  };

  return (
    <section className="bg-[#F4F2EA] py-24 md:py-32" data-testid="how-section">
      <div className="container-x">
        <Reveal className="text-center">
          <h2 className="text-[40px] font-normal leading-[1.05] tracking-[-0.02em] text-[#1C2418] md:text-[60px]">{h.title}</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="inline-flex h-11 items-center gap-2 rounded-[12px] border border-black/10 bg-white px-4 text-[14px] font-medium"><Apple size={18} />{h.store1}</span>
            <span className="inline-flex h-11 items-center gap-2 rounded-[12px] border border-black/10 bg-white px-4 text-[14px] font-medium"><Play size={16} fill="currentColor" />{h.store2}</span>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {/* Card 1: family overview */}
          <Reveal>
            <div className="card-hover flex min-h-[260px] items-center justify-center rounded-[28px] bg-[#EAE6D8] p-6">
              <div className="w-full max-w-[300px] rounded-[16px] bg-white p-4 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.3)]">
                <div className="text-[9px] tracking-[0.16em] text-[#1C2418]/50">{h.cards[0].mockLabel}</div>
                <ul className="mt-2 divide-y divide-black/5">
                  {h.cards[0].rows.map((r) => (
                    <li key={r.name} className="flex items-center justify-between py-2">
                      <span><span className="block text-[12px] font-medium">{r.name}</span><span className="block text-[9px] text-[#1C2418]/50">{r.sub}</span></span>
                      <span className="flex items-center gap-2"><Spark /><span className="text-[12px] font-semibold">{r.value}</span></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <h3 className="mt-6 text-[20px] font-medium">{h.cards[0].title}</h3>
            <p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed text-[#1C2418]/60">{h.cards[0].desc}</p>
          </Reveal>

          {/* Card 2: family team */}
          <Reveal delay={0.1}>
            <div className="card-hover relative flex min-h-[260px] items-center justify-center rounded-[28px] bg-[#EAE6D8] p-6">
              <div className="relative w-full max-w-[260px] rounded-[16px] bg-white p-4 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.3)]">
                <span className="absolute -top-5 right-8 inline-flex items-center rounded-full bg-[#5C6B3C] px-3 py-1 text-[11px] font-semibold text-white shadow"><MousePointer2 size={11} className="-ml-1 mr-1 rotate-[-15deg]" />{h.cards[1].tags[0]}</span>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-semibold">{h.cards[1].team}</span>
                  <span className="rounded-full bg-[#F4F2EA] px-2 py-0.5 text-[9px] font-medium">{h.cards[1].teamCount}</span>
                </div>
                <div className="mt-4 flex">
                  {["AN", "H", "MA", "GB"].map((a, i) => (
                    <span key={a} className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-[11px] font-bold text-white first:ml-0" style={{ background: avatarColors[i] }}>{a}</span>
                  ))}
                </div>
                <span className="absolute -bottom-4 right-4 inline-flex items-center rounded-full bg-[#B3953A] px-3 py-1 text-[11px] font-semibold text-white shadow"><MousePointer2 size={11} className="-ml-1 mr-1 rotate-[-15deg]" />{h.cards[1].tags[1]}</span>
              </div>
            </div>
            <h3 className="mt-6 text-[20px] font-medium">{h.cards[1].title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#1C2418]/60">{h.cards[1].desc}</p>
          </Reveal>

          {/* Card 3: language toggle */}
          <Reveal delay={0.2}>
            <div className="card-hover flex min-h-[260px] items-center justify-center rounded-[28px] bg-[#EAE6D8] p-6">
              <div className="flex items-center gap-1 rounded-full bg-white p-1.5 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.3)]" data-testid="lang-pill">
                {h.cards[2].langs.map((l, i) => (
                  <button key={l} onClick={() => pickLang(i)} className={`flex h-[68px] w-[76px] flex-col items-center justify-center gap-1 rounded-full text-[10px] font-medium transition-colors ${langIdx === i ? "bg-[#D9B44A] text-[#1C2418]" : "text-[#1C2418]/50 hover:bg-[#F4F2EA]"}`}>
                    <Languages size={16} />{l}
                  </button>
                ))}
              </div>
            </div>
            <h3 className="mt-6 text-[20px] font-medium">{h.cards[2].title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#1C2418]/60">{h.cards[2].desc}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
