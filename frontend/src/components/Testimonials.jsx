import React from "react";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "./IntroSection";
import { images } from "../mock";

export default function Testimonials() {
  const { t } = useLang();
  const s = t.testimonials;
  const L = s.labels;

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#FAF8F0_0%,#F1E9CF_60%,#E9DCAE_100%)] py-24 md:py-32" data-testid="testimonials-section">
      <div className="container-x">
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display max-w-[760px] text-[44px] leading-[1.02] text-[#232B1E] md:text-[60px]">{s.title[0]}<br />{s.title[1]}</h2>
          <span className="w-fit rounded-full bg-white/70 px-3 py-1.5 text-[11px] font-medium text-[#7A6A2B] ring-1 ring-black/5" data-testid="testimonials-note">{s.note}</span>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {s.items.map((it, i) => (
            <Reveal key={it.name} delay={i * 0.1}>
              <article className="card-hover flex h-full flex-col rounded-[28px] bg-white p-7 shadow-[0_30px_60px_-40px_rgba(28,36,24,0.35)] ring-1 ring-black/5" data-testid={`testimonial-${i}`}>
                <div className="flex items-center gap-3">
                  <img src={images.testimonials[i]} alt="" className="h-12 w-12 rounded-full object-cover grayscale" />
                  <div>
                    <div className="text-[15px] font-semibold">{it.name}</div>
                    <div className="text-[12px] text-[#1C2418]/55">{it.role} · {s.since} {it.since}</div>
                  </div>
                </div>
                <dl className="mt-7 flex flex-1 flex-col gap-5">
                  <div>
                    <dt className="text-[10px] font-semibold tracking-[0.16em] text-[#1C2418]/45">{L.problem.toUpperCase()}</dt>
                    <dd className="mt-1.5 text-[15px] leading-relaxed text-[#1C2418]/75">{it.problem}</dd>
                  </div>
                  <div className="h-px bg-black/5" />
                  <div>
                    <dt className="text-[10px] font-semibold tracking-[0.16em] text-[#1C2418]/45">{L.experience.toUpperCase()}</dt>
                    <dd className="mt-1.5 text-[15px] leading-relaxed text-[#1C2418]/75">{it.experience}</dd>
                  </div>
                  <div className="mt-auto rounded-[16px] bg-[#F3E9C8] p-4">
                    <dt className="text-[10px] font-semibold tracking-[0.16em] text-[#7A6A2B]">{L.outcome.toUpperCase()}</dt>
                    <dd className="mt-1.5 text-[15px] font-medium leading-relaxed text-[#1C2418]">{it.outcome}</dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
