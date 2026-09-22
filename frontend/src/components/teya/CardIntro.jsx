import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Nfc } from "lucide-react";
import { useLang } from "../../context/LanguageContext";
import { useScrollMap } from "../../hooks/useScrollMap";

export function GoldCard({ className = "" }) {
  const { t } = useLang();
  const c = t.cardIntro.card;
  return (
    <div className={`relative aspect-[1.586] w-full overflow-hidden rounded-[22px] p-5 text-[#1C2418] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.45)] md:p-7 ${className}`} style={{ background: "linear-gradient(135deg,#F1E6C4 0%,#D9B44A 42%,#B3953A 100%)" }} data-testid="gold-card">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.35)_48%,transparent_62%)]" />
      <div className="flex items-start justify-between">
        <span className="inline-flex items-center gap-2 text-[15px] font-semibold md:text-[18px]">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-[6px] bg-[#1C2418] md:h-7 md:w-7"><svg viewBox="0 0 24 24" width="13" height="13" fill="#D9B44A"><path d="M12 3.5c1.8 2.2 2.7 4.5 2.7 7 0 3.6-1.2 6.5-2.7 8.6-1.5-2.1-2.7-5-2.7-8.6 0-2.5.9-4.8 2.7-7Z" /></svg></span>
          {c.brand}
        </span>
        <Nfc size={22} className="opacity-70" />
      </div>
      <div className="mt-6 h-8 w-11 rounded-[6px] bg-[linear-gradient(135deg,#E8D9A8,#B3953A)] ring-1 ring-black/10 md:mt-8 md:h-9 md:w-12" />
      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between md:inset-x-7 md:bottom-7">
        <div>
          <div className="text-[11px] font-semibold tracking-[0.18em] md:text-[13px]">{c.name}</div>
          <div className="mt-1 text-[8px] tracking-[0.16em] text-[#1C2418]/60 md:text-[9px]">{c.since}</div>
        </div>
        <div className="text-right">
          <div className="text-[13px] font-extrabold italic tracking-tight md:text-[17px]">{c.label}</div>
          <div className="text-[8px] text-[#1C2418]/60 md:text-[9px]">{c.tier}</div>
        </div>
      </div>
    </div>
  );
}

export default function CardIntro() {
  const { t } = useLang();
  const c = t.cardIntro;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const rotateY = useScrollMap(scrollYProgress, [0, 0.55], [-88, 0]);
  const cardScale = useScrollMap(scrollYProgress, [0, 0.55], [0.8, 1]);
  const leftX = useScrollMap(scrollYProgress, [0.25, 0.6], [-120, 0]);
  const rightX = useScrollMap(scrollYProgress, [0.25, 0.6], [120, 0]);
  const textOpacity = useScrollMap(scrollYProgress, [0.25, 0.6], [0, 1]);

  return (
    <section ref={ref} className="relative bg-white" style={{ height: "200vh" }} data-testid="card-intro">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6">
        <div className="flex w-full max-w-[1400px] flex-col items-center justify-center gap-8 lg:flex-row lg:gap-14">
          <motion.span style={{ x: leftX, opacity: textOpacity }} className="font-script order-2 text-center text-[clamp(40px,5vw,84px)] leading-[0.95] text-[#1C2418] lg:order-1 lg:flex-1 lg:text-right" data-testid="card-intro-left">{c.left}</motion.span>
          <motion.div style={{ rotateY, scale: cardScale, transformPerspective: 1400, backfaceVisibility: "hidden" }} className="order-1 w-[280px] shrink-0 md:w-[360px] lg:order-2 lg:w-[400px]">
            <GoldCard />
          </motion.div>
          <motion.span style={{ x: rightX, opacity: textOpacity }} className="font-script order-3 text-center text-[clamp(40px,5vw,84px)] leading-[0.95] text-[#1C2418] lg:flex-1 lg:text-left" data-testid="card-intro-right">{c.right}</motion.span>
        </div>
      </div>
    </section>
  );
}
