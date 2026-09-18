import React, { useState } from "react";
import { Play, X } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "./IntroSection";
import { ScribbleWord } from "./CalculatorSection";
import { videoIds, videoThumbs } from "../mock";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

export default function VideoSection() {
  const { t } = useLang();
  const v = t.videos;
  const [active, setActive] = useState(null);

  return (
    <section id="videa" className="bg-white py-24 md:py-32" data-testid="video-section">
      <div className="container-x">
        <Reveal className="text-center">
          <span className="section-label">{v.label}</span>
          <h2 className="font-display mx-auto mt-4 text-[44px] leading-[1.02] text-[#232B1E] md:text-[64px]">
            {v.title} <ScribbleWord>{v.accent}</ScribbleWord>
          </h2>
          <p className="mx-auto mt-6 max-w-[520px] text-[16px] text-[#1C2418]/65">{v.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {v.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <button onClick={() => setActive(i)} className="group block w-full text-left" data-testid={`video-card-${i}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[#1C2418]">
                  <img src={videoThumbs[i]} alt="" className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,5,0.05),rgba(5,8,5,0.6))]" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[#1C2418]">{item.lang}</span>
                  <span className="absolute right-4 top-4 rounded-full bg-[#1C2418]/70 px-2.5 py-1 text-[11px] font-medium text-white">{item.duration}</span>
                  <span className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#D9B44A] text-[#1C2418] shadow-[0_20px_40px_-10px_rgba(217,180,74,0.6)] transition-transform duration-300 group-hover:scale-110">
                    <Play size={24} fill="currentColor" className="ml-1" />
                  </span>
                  <span className="absolute bottom-4 left-4 text-[13px] font-medium text-white/85">{v.watch}</span>
                </div>
                <h3 className="mt-4 text-[19px] font-medium text-[#1C2418]">{item.title}</h3>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-[960px] overflow-hidden rounded-[24px] border-0 bg-[#1C2418] p-2 text-white [&>button]:hidden" data-testid="video-dialog">
          <DialogTitle className="sr-only">{active !== null ? v.items[active].title : ""}</DialogTitle>
          <button onClick={() => setActive(null)} className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="close"><X size={18} /></button>
          {active !== null && (
            <iframe
              className="yt-frame"
              src={`https://www.youtube.com/embed/${videoIds[active]}?autoplay=1&rel=0`}
              title={v.items[active].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
          {active !== null && <div className="px-4 pb-3 pt-2 text-[15px] font-medium">{v.items[active].title}</div>}
        </DialogContent>
      </Dialog>
    </section>
  );
}
