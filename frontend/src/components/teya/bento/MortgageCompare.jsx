import React from "react";
import { motion } from "framer-motion";
import { Landmark } from "lucide-react";

export default function MortgageCompare({ data }) {
  return (
    <div className="mx-auto mt-2 w-full max-w-[520px] overflow-hidden rounded-[20px] bg-white shadow-[0_20px_50px_-30px_rgba(28,36,24,0.4)] ring-1 ring-black/5" data-testid="mortgage-compare">
      <div className="grid grid-cols-[1.1fr_0.7fr_1fr] gap-2 border-b border-black/5 px-4 py-3 text-[10px] font-semibold tracking-[0.12em] text-[#1C2418]/45 sm:grid-cols-[1.4fr_0.8fr_1fr] sm:px-5">
        {data.head.map((h) => <span key={h}>{h.toUpperCase()}</span>)}
      </div>
      <ul>
        {data.rows.map(([bank, rate, pay], i) => {
          const best = i === 0;
          return (
            <motion.li
              key={bank}
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25 + i * 0.22, ease: [0.22, 1, 0.36, 1] }}
              className={`relative grid grid-cols-[1.1fr_0.7fr_1fr] items-center gap-2 whitespace-nowrap px-4 py-3.5 text-[12px] sm:grid-cols-[1.4fr_0.8fr_1fr] sm:px-5 sm:text-[13px] ${best ? "bg-[#F3E9C8]/70" : ""}`}
            >
              {best && <motion.span initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: 1.3, duration: 0.4 }} className="absolute inset-y-0 left-0 w-1 origin-top bg-[#D9B44A]" />}
              <span className="inline-flex items-center gap-2 font-medium"><span className="hidden h-7 w-7 items-center justify-center rounded-full bg-[#1C2418]/6 sm:inline-flex"><Landmark size={13} /></span>{bank}</span>
              <span className={`font-semibold tabular-nums ${best ? "text-[#7A6A2B]" : ""}`}>{rate}</span>
              <span className="flex items-center justify-between gap-2 tabular-nums">
                {pay}
                {best && <motion.span initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.4, type: "spring", stiffness: 400, damping: 18 }} className="hidden rounded-full bg-[#1C2418] px-2 py-0.5 text-[9.5px] font-semibold text-[#D9B44A] sm:inline-flex" data-testid="mortgage-best">{data.best}</motion.span>}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
