import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Nfc } from "lucide-react";
import { fmtShort } from "../../finance/charts";

function MiniCard({ name, big = false }) {
  return (
    <div className={`relative aspect-[1.586] w-full overflow-hidden rounded-[14px] p-3 text-[#1C2418] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)] ${big ? "md:p-5" : ""}`} style={{ background: "linear-gradient(135deg,#F1E6C4 0%,#D9B44A 45%,#B3953A 100%)" }}>
      <div className="flex items-start justify-between">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold"><span className="inline-block h-4 w-4 rounded-[4px] bg-[#1C2418]" />Pan Čung</span>
        <Nfc size={14} className="opacity-70" />
      </div>
      <div className={`absolute right-3 top-1/2 h-5 w-7 -translate-y-1/2 rounded-[4px] bg-[linear-gradient(135deg,#E8D9A8,#B3953A)] ${big ? "md:h-7 md:w-9" : ""}`} />
      <div className="absolute inset-x-3 bottom-3 flex items-end justify-between">
        <div><div className={`font-semibold tracking-[0.16em] ${big ? "text-[10px] md:text-[13px]" : "text-[9px]"}`}>{name}</div><div className="text-[7px] tracking-wider text-[#1C2418]/60">PAN ČUNG · PLÁN</div></div>
        <div className={`font-extrabold italic ${big ? "text-[11px] md:text-[14px]" : "text-[9px]"}`}>PLÁN</div>
      </div>
    </div>
  );
}

export default function GoalsCards({ data }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let alive = true;
    let t2;
    const t1 = setInterval(() => { if (!alive) return; setShow(true); t2 = setTimeout(() => alive && setShow(false), 4200); }, 6500);
    const t0 = setTimeout(() => alive && setShow(true), 800);
    const t3 = setTimeout(() => alive && setShow(false), 5000);
    return () => { alive = false; clearInterval(t1); clearTimeout(t0); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="relative mx-auto grid w-full max-w-[860px] grid-cols-1 items-end gap-x-3 gap-y-14 pb-20 pt-4 sm:grid-cols-3 md:gap-x-6" data-testid="goals-cards">
      {data.cards.map((c, i) => {
        const big = i === 1;
        const pct = Math.round((c.v / c.max) * 100);
        return (
          <motion.div key={c.n} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 * i }} className={`relative mx-auto w-full max-w-[250px] sm:max-w-none ${big ? "z-10 sm:-mb-4 sm:scale-[1.12] md:scale-[1.18]" : ""}`}>
            <MiniCard name={c.n} big={big} />
            <div className="absolute inset-x-6 -bottom-9 rounded-[12px] bg-white px-3 py-2 shadow-[0_20px_40px_-20px_rgba(28,36,24,0.4)] ring-1 ring-black/5 sm:inset-x-3 md:inset-x-6">
              <div className="flex items-baseline justify-between gap-1 whitespace-nowrap text-[10px] md:text-[11px]"><span className="font-semibold tabular-nums">{fmtShort(c.v)}</span><span className="text-[#1C2418]/45">/ {fmtShort(c.max)} Kč</span></div>
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-[#1C2418]/8"><motion.div className="h-full rounded-full bg-[#5C6B3C]" initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.4 + i * 0.15 }} /></div>
            </div>
          </motion.div>
        );
      })}

      <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 w-[min(280px,calc(100%-24px))] -translate-x-1/2 sm:bottom-2">
        <AnimatePresence>
          {show && (
            <motion.div key="popup" initial={{ opacity: 0, y: 24, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.95 }} transition={{ type: "spring", stiffness: 300, damping: 24 }} className="relative" data-testid="goals-popup">
              <div className="flex items-center gap-3 rounded-[14px] bg-white px-4 py-3 shadow-[0_30px_60px_-25px_rgba(28,36,24,0.55)] ring-1 ring-black/5">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1C2418] text-[11px] font-bold text-[#D9B44A]">PČ</span>
                <span className="min-w-0 flex-1 leading-tight"><span className="block truncate text-[13px] font-semibold">{data.popup.title}</span><span className="block text-[10.5px] text-[#1C2418]/45">{data.popup.sub}</span></span>
                <span className="text-[13.5px] font-semibold tabular-nums">{data.popup.amount}</span>
              </div>
              <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7, type: "spring", stiffness: 300, damping: 22 }} className="absolute -bottom-7 right-2 rounded-full bg-[#8A9A5B] px-3 py-1 text-[11px] font-semibold text-white shadow">{data.tag}</motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
