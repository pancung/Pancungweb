import React from "react";
import { motion } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "./IntroSection";
import { images } from "../mock";

const tilts = [-1.6, 1.3, -1.1];

function Receipt({ it, i, since }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, rotate: 0 }} whileInView={{ opacity: 1, y: 0, rotate: tilts[i % tilts.length] }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotate: 0, y: -6 }}
      className="receipt-edge relative flex h-full min-h-[360px] flex-col bg-white px-7 pb-12 pt-8 shadow-[0_40px_80px_-40px_rgba(28,36,24,0.45)] md:min-h-[400px]"
      data-testid={`testimonial-${i}`}
    >
      <div className="mb-6 flex items-center justify-between border-b border-dashed border-black/15 pb-3 text-[10px] tracking-[0.16em] text-[#1C2418]/40"><span>PAN ČUNG · RECENZE</span><span>№ 00{i + 1}</span></div>
      <p className="text-[20px] leading-[1.4] text-[#1C2418] md:text-[22px]">{it.experience} {it.outcome}</p>
      <div className="mt-auto flex items-center gap-3 pt-10">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F2EA] text-[11px] font-bold text-[#1C2418]/70 ring-1 ring-black/5">{it.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
        <div className="leading-tight">
          <div className="text-[13px] font-semibold">{it.name}</div>
          <div className="text-[11.5px] text-[#1C2418]/55">{it.role} · {since} {it.since}</div>
        </div>
      </div>
    </motion.article>
  );
}

function Photo({ src, i }) {
  return (
    <Reveal delay={0.05 * i} className="h-full">
      <div className="h-full min-h-[360px] overflow-hidden rounded-[8px] md:min-h-[400px]">
        <motion.img src={src} alt="" className="h-full w-full object-cover" initial={{ scale: 1.08 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} />
      </div>
    </Reveal>
  );
}

export default function Testimonials() {
  const { t } = useLang();
  const s = t.testimonials;
  const r = t.reviews;
  const items = s.items;
  const cells = [
    { type: "photo", i: 0 }, { type: "receipt", i: 0 }, { type: "photo", i: 1 },
    { type: "receipt", i: 1 }, { type: "photo", i: 2 }, { type: "receipt", i: 2 },
  ];

  return (
    <section id="recenze" className="relative overflow-hidden bg-[linear-gradient(180deg,#FAF8F0_0%,#F1E6C4_45%,#D9B44A_100%)] py-24 md:py-32" data-testid="testimonials-section">
      <div className="container-x">
        <Reveal className="text-center">
          <h2 className="font-display mx-auto max-w-[820px] text-[44px] leading-[1.02] text-[#232B1E] md:text-[68px]">{r.title[0]}<br />{r.title[1]}</h2>
          <span className="mt-6 inline-block rounded-full bg-white/70 px-3 py-1.5 text-[11px] font-medium text-[#7A6A2B] ring-1 ring-black/5" data-testid="testimonials-note">{s.note}</span>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-[1120px] gap-5 md:grid-cols-3 md:gap-6">
          {cells.map((c, k) => (
            <div key={k} className={c.type === "photo" ? "hidden md:block" : ""}>
              {c.type === "photo" ? <Photo src={images.testimonials[c.i]} i={c.i} /> : <Receipt it={items[c.i]} i={c.i} since={r.since} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
