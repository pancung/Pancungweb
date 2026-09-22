import React from "react";
import { Play, Clapperboard } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "./IntroSection";
import { ScribbleWord } from "./CalculatorSection";

const tones = [
  "from-[#1C2418] to-[#2F3A27]",
  "from-[#232B1E] to-[#3B4530]",
  "from-[#1C2418] to-[#4A4A2E]",
  "from-[#2A3424] to-[#1C2418]",
  "from-[#1C2418] to-[#5C6B3C]",
];

export default function SocialSection() {
  const { t } = useLang();
  const s = t.social;
  return (
    <section id="obsah" className="bg-white py-24 md:py-32" data-testid="social-section">
      <div className="container-x">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[720px]">
            <span className="section-label">{s.label}</span>
            <h2 className="font-display mt-4 text-[44px] leading-[1.02] text-[#232B1E] md:text-[64px]">{s.title} <ScribbleWord>{s.accent}</ScribbleWord></h2>
            <p className="mt-5 text-[17px] text-[#1C2418]/65">{s.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {s.categories.map((c) => <span key={c} className="rounded-full border border-black/10 px-3 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-[#1C2418]/70">{c}</span>)}
          </div>
        </Reveal>

        <div className="-mx-6 mt-12 flex snap-x gap-4 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 xl:grid-cols-5">
          {s.items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.06} className="w-[220px] shrink-0 snap-start md:w-auto">
              <div className={`card-hover relative flex aspect-[9/16] flex-col justify-between overflow-hidden rounded-[24px] bg-gradient-to-b p-5 text-white ${tones[i % tones.length]}`} data-testid={`reel-${i}`}>
                <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:18px_18px]" />
                <span className="relative inline-flex w-fit rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] backdrop-blur">{it.cat}</span>
                <span className="absolute left-1/2 top-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#D9B44A] text-[#1C2418] shadow-[0_20px_40px_-10px_rgba(217,180,74,0.5)]"><Play size={20} fill="currentColor" className="ml-0.5" /></span>
                <div className="relative">
                  <div className="text-[15px] font-medium leading-snug">{it.title}</div>
                  <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-white/55"><Clapperboard size={12} />{s.placeholder}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-[12px] text-[#1C2418]/45">{s.note}</p>
      </div>
    </section>
  );
}
