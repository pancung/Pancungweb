import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export default function InvestForm({ form }) {
  const [typed, setTyped] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let alive = true;
    const timers = [];
    const cycle = () => {
      if (!alive) return;
      setTyped(0); setDone(false);
      for (let i = 1; i <= form.amountValue.length; i++) timers.push(setTimeout(() => alive && setTyped(i), 300 + i * 90));
      timers.push(setTimeout(() => alive && setDone(true), 2400));
      timers.push(setTimeout(cycle, 5200));
    };
    cycle();
    return () => { alive = false; timers.forEach(clearTimeout); };
  }, [form.amountValue]);

  return (
    <div className="mx-auto mt-2 w-full max-w-[300px] rounded-[20px] bg-white p-5 shadow-[0_20px_50px_-30px_rgba(28,36,24,0.4)] ring-1 ring-black/5" data-testid="invest-form">
      <div className="text-[15px] font-semibold">{form.title}</div>
      <div className="mt-4 text-[10.5px] text-[#1C2418]/50">{form.amount}</div>
      <div className="mt-1 flex h-11 items-center rounded-[10px] border border-black/10 px-3 text-[15px] font-semibold tabular-nums">
        {form.amountValue.slice(0, typed)}<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }} className="ml-0.5 inline-block h-4 w-px bg-[#1C2418]" />
      </div>
      <div className="mt-3 grid grid-cols-[1.4fr_1fr] gap-2">
        <div><div className="text-[10.5px] text-[#1C2418]/50">{form.fund}</div><div className="mt-1 flex h-10 items-center rounded-[10px] border border-black/10 px-3 text-[12px]">{form.fundValue}</div></div>
        <div><div className="text-[10.5px] text-[#1C2418]/50">{form.day}</div><div className="mt-1 flex h-10 items-center rounded-[10px] border border-black/10 px-3 text-[12px]">{form.dayValue}</div></div>
      </div>
      <motion.div animate={{ backgroundColor: done ? "#1C2418" : "#CFAA3D", color: done ? "#D9B44A" : "#1C2418" }} transition={{ duration: 0.35 }} className="mt-4 flex h-11 items-center justify-center gap-2 rounded-[12px] text-[13.5px] font-semibold">
        <AnimatePresence mode="wait" initial={false}>
          {done ? (
            <motion.span key="done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="inline-flex items-center gap-2"><motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 20 }} className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#D9B44A] text-[#1C2418]"><Check size={12} /></motion.span>{form.done}</motion.span>
          ) : (
            <motion.span key="btn" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>{form.btn}</motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="mt-3 text-center text-[10px] text-[#1C2418]/45">{form.powered} <span className="font-semibold text-[#1C2418]/70">Pan Čung</span></div>
    </div>
  );
}
