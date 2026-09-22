import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Check } from "lucide-react";
import { CountUp } from "../../finance/charts";

export default function ProtectMock({ data }) {
  return (
    <div className="mt-2 flex flex-1 flex-col" data-testid="protect-mock">
      <div className="mx-auto w-full max-w-[300px] rounded-[20px] bg-white p-5 shadow-[0_20px_50px_-30px_rgba(28,36,24,0.4)] ring-1 ring-black/5">
        <div className="flex items-center gap-3">
          <motion.span initial={{ scale: 0.6, rotate: -12 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 300, damping: 16 }} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1C2418] text-[#D9B44A]"><ShieldCheck size={20} /></motion.span>
          <div className="leading-tight"><div className="text-[13px] font-semibold">Rodina Nguyễn</div><div className="text-[10.5px] text-[#1C2418]/50">2 dospělí · 2 děti</div></div>
        </div>
        <ul className="mt-4 space-y-2.5">
          {data.items.map(([name, price], i) => (
            <motion.li key={name} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.35 }} className="flex items-center gap-2.5 text-[12.5px]">
              <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 + i * 0.35, type: "spring", stiffness: 500, damping: 18 }} className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8A9A5B] text-white"><Check size={11} /></motion.span>
              <span className="flex-1">{name}</span>
              <span className="font-semibold tabular-nums">{price}</span>
            </motion.li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-3 text-[13px]">
          <span className="text-[#1C2418]/60">{data.total}</span>
          <span className="text-[18px] font-semibold tabular-nums"><CountUp value={data.totalValue} duration={1.6} /> Kč</span>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1.8, type: "spring", stiffness: 300, damping: 20 }} className="mx-auto mt-auto inline-flex items-center gap-1.5 rounded-full bg-[#1C2418] px-3.5 py-1.5 pt-1.5 text-[11.5px] font-semibold text-[#D9B44A]" data-testid="protect-badge"><Check size={12} />{data.badge}</motion.div>
    </div>
  );
}
