import React from "react";
import { motion } from "framer-motion";
import { Clock, ShieldCheck } from "lucide-react";
import { CountUp, fmtCzk } from "../../finance/charts";

const chipIcons = [Clock, ShieldCheck];

export default function FundingMock({ data }) {
  const m = data.mock;
  return (
    <div className="mt-2 flex flex-1 flex-col" data-testid="funding-mock">
      <div className="relative mx-auto w-full max-w-[300px] pt-4">
        <div className="absolute inset-x-6 top-0 h-full rounded-[18px] bg-white/60 ring-1 ring-black/5" />
        <div className="absolute inset-x-3 top-2 h-full rounded-[18px] bg-white/80 ring-1 ring-black/5" />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="relative rounded-[18px] bg-white p-5 shadow-[0_25px_50px_-30px_rgba(28,36,24,0.45)] ring-1 ring-black/5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold"><span className="inline-block h-4 w-4 rounded-[4px] bg-[#D9B44A]" />Pan Čung</span>
            <span className="rounded-full bg-[#F3E9C8] px-2.5 py-1 text-[10px] font-semibold text-[#7A6A2B]">{m.tag}</span>
          </div>
          <div className="mt-4 text-[11px] text-[#1C2418]/50">{m.label}</div>
          <div className="mt-1 text-[28px] font-semibold leading-none tracking-tight"><CountUp value={m.value} format={fmtCzk} duration={1.8} /></div>
          <div className="mt-4 grid grid-cols-[1.2fr_1fr] gap-2">
            <span className="btn-lime inline-flex h-10 items-center justify-center text-[12.5px]">{m.btn}</span>
            <span className="inline-flex h-10 items-center justify-center rounded-[12px] bg-[#F4F2EA] text-[12.5px] font-semibold">{m.alt}</span>
          </div>
        </motion.div>
      </div>
      <div className="mt-auto flex flex-wrap justify-center gap-2 pt-8">
        {data.chips.map((c, i) => {
          const Icon = chipIcons[i] || Clock;
          return <motion.span key={c} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 + i * 0.15 }} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11.5px] font-medium ring-1 ring-black/5"><Icon size={12} className="text-[#7A6A2B]" />{c}</motion.span>;
        })}
      </div>
    </div>
  );
}
