import React, { useState } from "react";
import { Maximize2 } from "lucide-react";
import { useLang } from "../../context/LanguageContext";
import { Reveal } from "../IntroSection";
import { BentoDetailDialog } from "./BentoDetailDialog";

export function BentoCard({ id, data, children, visual, className = "", delay = 0, badge, wide = false, descBottom = false }) {
  const { t } = useLang();
  const b = t.bento;
  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  return (
    <Reveal delay={delay} className={`h-full ${className}`}>
      <article
        role="button"
        tabIndex={0}
        onClick={openDialog}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openDialog(); } }}
        className={`bento-card relative h-full min-h-[440px] cursor-pointer overflow-hidden rounded-[28px] bg-[#F4F2EA] p-7 text-left outline-none transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-40px_rgba(28,36,24,0.35)] focus-visible:ring-2 focus-visible:ring-[#D9B44A] md:p-8 ${wide ? "md:grid md:grid-cols-[0.8fr_1.4fr] md:items-start md:gap-10" : "flex flex-col"}`}
        data-testid={`bento-${id}`}
      >
        <span aria-label={b.expand} className="absolute right-5 top-5 z-10 inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-white text-[#1C2418] shadow-sm ring-1 ring-black/5 transition-colors hover:bg-[#D9B44A]" data-testid={`bento-expand-${id}`}>
          <Maximize2 size={14} />
        </span>
        <div>
          <div className="flex items-center gap-2">
            <span className="section-label">{data.label}</span>
            {badge && <span className="rounded-full bg-[#D9B44A] px-2 py-0.5 text-[10px] font-semibold text-[#1C2418]">{badge}</span>}
          </div>
          <h3 className="mt-3 max-w-[420px] text-[26px] font-normal leading-[1.12] tracking-[-0.02em] text-[#1C2418] md:text-[30px]">{data.title}</h3>
          {!descBottom && <p className="mt-3 max-w-[460px] text-[14.5px] leading-relaxed text-[#1C2418]/65">{data.desc}</p>}
        </div>
        <div className={`relative flex flex-col ${wide ? "mt-8 md:mt-0" : "mt-6 flex-1"}`}>{children}</div>
        {descBottom && <p className="mt-6 max-w-[460px] text-[14.5px] leading-relaxed text-[#1C2418]/65">{data.desc}</p>}
      </article>

      <BentoDetailDialog id={id} data={data} open={open} onOpenChange={setOpen} visual={visual ?? children} />
    </Reveal>
  );
}
