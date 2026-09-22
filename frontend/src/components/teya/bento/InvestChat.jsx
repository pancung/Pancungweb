import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { images } from "../../../mock";

export default function InvestChat({ chat, typing }) {
  const [count, setCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let alive = true;
    const timers = [];
    const run = () => {
      if (!alive) return;
      setCount(0); setIsTyping(false);
      let tAcc = 600;
      chat.forEach((m, i) => {
        if (m[0] === "pc") { timers.push(setTimeout(() => alive && setIsTyping(true), tAcc)); tAcc += 1300; }
        timers.push(setTimeout(() => { if (!alive) return; setIsTyping(false); setCount(i + 1); }, tAcc));
        tAcc += 1500;
      });
      timers.push(setTimeout(run, tAcc + 2500));
    };
    run();
    return () => { alive = false; timers.forEach(clearTimeout); };
  }, [chat]);

  return (
    <div className="mx-auto mt-2 flex w-full max-w-[300px] flex-col gap-2" data-testid="invest-chat">
      <AnimatePresence initial={false}>
        {chat.slice(0, count).map(([who, text], i) => {
          const pc = who === "pc";
          return (
            <motion.div key={i} layout initial={{ opacity: 0, y: 14, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 26 }} className={`flex items-end gap-2 ${pc ? "" : "flex-row-reverse"}`}>
              {pc ? <img src={images.advisorAvatar} alt="" className="h-7 w-7 shrink-0 rounded-full object-cover" /> : <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1C2418]/10 text-[10px] font-bold">HN</span>}
              <span className={`max-w-[82%] rounded-[16px] px-3.5 py-2 text-[12.5px] leading-snug shadow-sm ${pc ? "rounded-bl-[4px] bg-white text-[#1C2418] ring-1 ring-black/5" : "rounded-br-[4px] bg-[#1C2418] text-white"}`}>{text}</span>
            </motion.div>
          );
        })}
        {isTyping && (
          <motion.div key="typing" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-end gap-2">
            <img src={images.advisorAvatar} alt="" className="h-7 w-7 shrink-0 rounded-full object-cover" />
            <span className="inline-flex items-center gap-1 rounded-[16px] rounded-bl-[4px] bg-white px-3.5 py-2.5 ring-1 ring-black/5" aria-label={typing}>
              {[0, 1, 2].map((d) => <motion.span key={d} animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }} className="h-1.5 w-1.5 rounded-full bg-[#1C2418]/60" />)}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
