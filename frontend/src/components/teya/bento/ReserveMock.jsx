import React from "react";
import { motion } from "framer-motion";
import { PiggyBank } from "lucide-react";
import { CountUp } from "../../finance/charts";

const bars = [18, 24, 30, 34, 42, 48, 55, 60, 68, 76, 84, 100];

export default function ReserveMock({ data }) {
  return (
    <div className="mx-auto mt-2 w-full max-w-[300px] rounded-[20px] bg-white p-5 shadow-[0_20px_50px_-30px_rgba(28,36,24,0.4)] ring-1 ring-black/5" data-testid="reserve-mock">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-[11px] text-[#1C2418]/55"><PiggyBank size={14} className="text-[#7A6A2B]" />{data.amountLabel}</span>
        <span className="text-[13px] font-semibold tabular-nums">{data.amount}</span>
      </div>
      <div className="mt-4 text-[30px] font-semibold leading-none tracking-tight text-[#5C6B3C]">+<CountUp value={data.value} duration={1.8} /> Kč</div>
      <div className="mt-1 text-[11px] text-[#1C2418]/50">{data.perMonth}</div>
      <div className="mt-5 flex h-[72px] items-end gap-1.5">
        {bars.map((h, i) => (
          <motion.span key={i} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 + i * 0.06, ease: [0.22, 1, 0.36, 1] }} className={`flex-1 origin-bottom rounded-sm ${i === bars.length - 1 ? "bg-[#D9B44A]" : "bg-[#8A9A5B]/40"}`} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}
