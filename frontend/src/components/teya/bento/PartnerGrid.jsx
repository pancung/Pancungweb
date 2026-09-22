import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { partnerLogos } from "../../../mock";

const short = (name) => (name.length <= 4 ? name : name.replace(/[^A-ZČŠ]/g, "").slice(0, 3) || name.slice(0, 3));

export default function PartnerGrid() {
  const [active, setActive] = useState([2, 9, 15]);
  useEffect(() => {
    const id = setInterval(() => {
      setActive(() => {
        const s = new Set();
        while (s.size < 3) s.add(Math.floor(Math.random() * partnerLogos.length));
        return [...s];
      });
    }, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mt-2 flex-1" data-testid="partner-grid">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-[#F4F2EA] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-[#F4F2EA] to-transparent" />
      <div className="grid grid-cols-6 gap-x-2 gap-y-3 py-3">
        {partnerLogos.map((name, i) => {
          const on = active.includes(i);
          return (
            <motion.span
              key={name} title={name}
              animate={{ scale: on ? 1.35 : 1, opacity: on ? 1 : 0.42, backgroundColor: on ? "#1C2418" : "#ffffff", color: on ? "#D9B44A" : "#1C2418", boxShadow: on ? "0 18px 30px -12px rgba(28,36,24,0.45)" : "0 0 0 0 rgba(0,0,0,0)" }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full text-[9.5px] font-bold tracking-tight ring-1 ring-black/5 md:h-11 md:w-11"
              style={{ zIndex: on ? 2 : 1 }}
            >
              {short(name)}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}
