import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CalendarDays, MapPin, Video, MessageCircle } from "lucide-react";
import { images } from "../../../mock";

const modeIcons = [MapPin, Video, MessageCircle];

export default function ConsultMock({ data }) {
  const [booked, setBooked] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setBooked((b) => !b), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="mt-2 flex flex-1 flex-col" data-testid="consult-mock">
      <div className="mx-auto w-full max-w-[300px] rounded-[20px] bg-white p-5 shadow-[0_20px_50px_-30px_rgba(28,36,24,0.4)] ring-1 ring-black/5">
        <div className="flex items-center gap-3">
          <img src={images.advisorAvatar} alt="Pan Čung" className="h-11 w-11 rounded-full object-cover" />
          <div className="leading-tight"><div className="text-[13px] font-semibold">Pan Čung</div><div className="text-[10.5px] text-[#1C2418]/50">Finanční poradce</div></div>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-[12px] bg-[#F4F2EA] px-3 py-2.5">
          <span className="inline-flex items-center gap-2 text-[12px] font-medium"><CalendarDays size={14} className="text-[#7A6A2B]" />{data.slot}</span>
          <AnimatePresence mode="wait" initial={false}>
            {booked ? (
              <motion.span key="booked" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} className="inline-flex items-center gap-1 rounded-full bg-[#1C2418] px-2 py-0.5 text-[10px] font-semibold text-[#D9B44A]" data-testid="consult-booked"><Check size={10} />{data.booked}</motion.span>
            ) : (
              <motion.span key="free" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} className="rounded-full bg-[#8A9A5B]/20 px-2 py-0.5 text-[10px] font-semibold text-[#5C6B3C]">{data.free}</motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="mt-auto flex flex-wrap justify-center gap-2 pt-8">
        {data.modes.map((m, i) => {
          const Icon = modeIcons[i];
          return <span key={m} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11.5px] font-medium ring-1 ring-black/5"><Icon size={12} className="text-[#7A6A2B]" />{m}</span>;
        })}
      </div>
    </div>
  );
}
