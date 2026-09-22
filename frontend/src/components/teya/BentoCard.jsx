import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Maximize2, ArrowRight } from "lucide-react";
import { useLang } from "../../context/LanguageContext";
import { Reveal } from "../IntroSection";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";

export function BentoCard({ id, data, children, className = "", delay = 0, badge, wide = false, descBottom = false }) {
  const { t } = useLang();
  const b = t.bento;
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={delay} className={`h-full ${className}`}>
      <article className={`relative h-full min-h-[440px] overflow-hidden rounded-[28px] bg-[#F4F2EA] p-7 md:p-8 ${wide ? "md:grid md:grid-cols-[0.8fr_1.4fr] md:items-start md:gap-10" : "flex flex-col"}`} data-testid={`bento-${id}`}>
        <button type="button" onClick={() => setOpen(true)} aria-label={b.expand} className="absolute right-5 top-5 z-10 inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-white text-[#1C2418] shadow-sm ring-1 ring-black/5 transition-colors hover:bg-[#D9B44A]" data-testid={`bento-expand-${id}`}>
          <Maximize2 size={14} />
        </button>
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[560px] rounded-[24px] border-black/5 p-8" data-testid={`bento-dialog-${id}`}>
          <DialogHeader>
            <span className="section-label">{data.label}</span>
            <DialogTitle className="mt-2 text-[28px] font-normal leading-tight tracking-[-0.02em]">{data.title}</DialogTitle>
            <DialogDescription className="mt-3 text-[15px] leading-relaxed text-[#1C2418]/70">{data.more}</DialogDescription>
          </DialogHeader>
          <Link to="/kontakt" state={{ interest: data.title }} className="btn-lime mt-4 inline-flex h-12 w-full items-center justify-center gap-2 text-[15px]" data-testid={`bento-dialog-cta-${id}`}>{b.cta}<ArrowRight size={16} /></Link>
        </DialogContent>
      </Dialog>
    </Reveal>
  );
}
