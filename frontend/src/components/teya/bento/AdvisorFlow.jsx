import React from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, ShieldCheck } from "lucide-react";

const icons = [Wallet, TrendingUp, ShieldCheck];
const xs = [40, 140, 240];

export default function AdvisorFlow({ data }) {
  return (
    <div className="relative mx-auto mt-2 w-full max-w-[280px] flex-1" data-testid="advisor-flow">
      <div className="relative mx-auto h-[250px]">
        <svg viewBox="0 0 280 250" className="absolute inset-0 h-full w-full overflow-visible">
          <path d="M140 40 V 110" fill="none" stroke="#1C2418" strokeOpacity="0.15" strokeWidth="2" />
          {xs.map((x) => <path key={x} d={`M140 110 C140 150, ${x} 140, ${x} 185`} fill="none" stroke="#1C2418" strokeOpacity="0.15" strokeWidth="2" />)}
          <path d="M140 40 V 110" fill="none" stroke="#D9B44A" strokeWidth="2" strokeDasharray="6 8" className="flow-dash" />
          {xs.map((x) => <path key={x} d={`M140 110 C140 150, ${x} 140, ${x} 185`} fill="none" stroke="#D9B44A" strokeWidth="2" strokeDasharray="6 8" className="flow-dash" />)}
        </svg>

        <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-[#1C2418] px-4 py-2 text-center text-white shadow-lg">
          <div className="text-[9px] tracking-[0.14em] text-white/55">{data.top.toUpperCase()}</div>
          <div className="text-[14px] font-semibold leading-none tabular-nums">{data.topValue}</div>
        </div>

        <motion.span
          animate={{ top: [44, 104, 104], opacity: [0, 1, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", times: [0, 0.75, 1] }}
          className="absolute left-1/2 -translate-x-1/2 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold tabular-nums text-[#1C2418] shadow-[0_10px_25px_-10px_rgba(28,36,24,0.5)] ring-1 ring-black/5"
        >{data.chip}</motion.span>

        {data.nodes.map((n, i) => {
          const Icon = icons[i];
          return (
            <motion.div key={n} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.15 }} className="absolute top-[185px] flex -translate-x-1/2 flex-col items-center" style={{ left: xs[i] }}>
              <motion.span animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.4, repeat: Infinity, delay: 1.6 + i * 0.15 }} className={`inline-flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-black/5 ${i === 1 ? "bg-[#D9B44A] text-[#1C2418]" : "bg-white text-[#1C2418]"}`}><Icon size={18} /></motion.span>
              <span className="mt-2 text-[11px] font-medium">{n}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
