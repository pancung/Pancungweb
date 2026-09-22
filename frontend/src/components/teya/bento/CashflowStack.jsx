import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, TrendingUp } from "lucide-react";

const VISIBLE = 4;
const tone = { in: ["bg-[#D9B44A] text-[#1C2418]", ArrowDownLeft], out: ["bg-[#1C2418]/8 text-[#1C2418]", ArrowUpRight], inv: ["bg-[#5C6B3C] text-white", TrendingUp] };

export default function CashflowStack({ rows }) {
  const [idx, setIdx] = useState(VISIBLE);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => i + 1), 2300);
    return () => clearInterval(id);
  }, []);
  const n = rows.length;
  const visible = Array.from({ length: VISIBLE }, (_, k) => ({ key: idx - k, row: rows[(((idx - k) % n) + n) % n] }));

  return (
    <div className="mx-auto mt-2 flex w-full max-w-[300px] flex-col items-center gap-2.5" data-testid="cashflow-stack">
      <AnimatePresence initial={false}>
        {visible.map(({ key, row }, k) => {
          const [name, amount, time, type] = row;
          const [cls, Icon] = tone[type] || tone.out;
          return (
            <motion.div
              key={key} layout
              initial={{ opacity: 0, y: -28, scale: 0.96 }}
              animate={{ opacity: 1 - k * 0.22, y: 0, scale: 1 - k * 0.035 }}
              exit={{ opacity: 0, scale: 0.9, y: 12 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="flex w-full items-center gap-3 rounded-[14px] bg-white px-4 py-3 shadow-[0_10px_30px_-18px_rgba(28,36,24,0.35)] ring-1 ring-black/5"
            >
              <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${cls}`}><Icon size={14} /></span>
              <span className="min-w-0 flex-1 leading-tight"><span className="block truncate text-[13px] font-medium">{name}</span><span className="block text-[10.5px] text-[#1C2418]/45">{time}</span></span>
              <span className={`text-[13px] font-semibold tabular-nums ${type === "in" ? "text-[#5C6B3C]" : ""}`}>{amount}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
