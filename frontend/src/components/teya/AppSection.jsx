import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Mic, CalendarCheck, MessageCircle, MousePointer2, MapPin, Video } from "lucide-react";
import { useLang } from "../../context/LanguageContext";
import { Reveal } from "../IntroSection";
import { images, links } from "../../mock";

function LanguageCard({ c }) {
  const [i, setI] = useState(0);
  useEffect(() => { const id = setInterval(() => setI((v) => (v + 1) % c.greetings.length), 2000); return () => clearInterval(id); }, [c.greetings.length]);
  return (
    <div className="w-[260px] rounded-[14px] bg-white p-5 shadow-[0_20px_50px_-30px_rgba(28,36,24,0.4)] ring-1 ring-black/5" data-testid="app-language">
      <div className="flex h-[60px] items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span key={i} initial={{ opacity: 0, y: 18, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -18, filter: "blur(6px)" }} transition={{ duration: 0.45 }} className="font-script text-[40px] leading-none text-[#1C2418]">{c.greetings[i][0]}</motion.span>
        </AnimatePresence>
      </div>
      <div className="mt-3 flex justify-center gap-2">
        {c.greetings.map(([, code], k) => (
          <span key={code} className={`relative rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${i === k ? "text-[#1C2418]" : "text-[#1C2418]/40"}`}>
            {i === k && <motion.span layoutId="app-lang-pill" className="absolute inset-0 z-0 rounded-full bg-[#D9B44A]" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
            <span className="relative z-10">{code}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const avatarColors = ["#C97B5A", "#8A5BB3", "#3F6FB5", "#D9B44A"];

function FamilyCard({ c }) {
  return (
    <div className="relative w-[250px] rounded-[14px] bg-white p-4 shadow-[0_20px_50px_-30px_rgba(28,36,24,0.4)] ring-1 ring-black/5" data-testid="app-family">
      <div className="flex items-center justify-between gap-2"><span className="text-[13px] font-semibold">{c.mockTitle}</span><span className="rounded-full bg-[#F3E9C8] px-2 py-0.5 text-[9.5px] font-medium text-[#7A6A2B]">{c.people}</span></div>
      <div className="mt-4 flex -space-x-2.5">
        {c.avatars.map((a, i) => <span key={a} className="inline-flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white text-[11px] font-bold text-white" style={{ background: avatarColors[i] }}>{a}</span>)}
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white bg-[#1C2418] text-[11px] font-bold text-[#D9B44A]">PČ</span>
      </div>
      <motion.div animate={{ x: [90, 22, 22, 90], y: [46, 6, 6, 46], opacity: [0, 1, 1, 0] }} transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.35, 0.75, 1], ease: "easeInOut" }} className="pointer-events-none absolute left-[60px] top-[56px] text-[#D9B44A]">
        <MousePointer2 size={18} fill="#D9B44A" />
        <motion.span animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.8, 0.8, 1, 1, 0.8] }} transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.35, 0.45, 0.75, 1] }} className="absolute left-4 top-3 whitespace-nowrap rounded-[6px] bg-[#3F6FB5] px-2 py-0.5 text-[11px] font-semibold text-white shadow">{c.cursorName}</motion.span>
      </motion.div>
    </div>
  );
}

function ModeToggle({ c }) {
  const [i, setI] = useState(0);
  useEffect(() => { const id = setInterval(() => setI((v) => (v + 1) % 2), 2200); return () => clearInterval(id); }, []);
  const icons = [MapPin, Video];
  return (
    <div className="flex w-[250px] items-center rounded-full bg-white p-1.5 shadow-[0_20px_50px_-30px_rgba(28,36,24,0.4)] ring-1 ring-black/5" data-testid="app-mode-toggle">
      {c.modes.map((m, k) => {
        const Icon = icons[k];
        const on = i === k;
        return (
          <button key={m} type="button" onClick={() => setI(k)} className="relative flex flex-1 flex-col items-center gap-1 rounded-full py-3 text-[12px] font-medium" aria-pressed={on} data-testid={`app-mode-${k}`}>
            {on && <motion.span layoutId="app-mode-pill" className="absolute inset-0 z-0 rounded-full bg-[#D9B44A]" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
            <span className={`relative z-10 ${on ? "text-[#1C2418]" : "text-[#1C2418]/50"}`}><Icon size={18} /></span>
            <span className={`relative z-10 ${on ? "text-[#1C2418]" : "text-[#1C2418]/50"}`}>{m}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function AppSection() {
  const { t } = useLang();
  const a = t.appF;
  const widgets = [LanguageCard, FamilyCard, ModeToggle];
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#D9B44A_0%,#E9D89C_38%,#F4F2EA_38%,#F4F2EA_100%)] pb-12 md:pb-16" data-testid="app-section">
      <div className="container-x">
        {/* Phone hanging from the top */}
        <div className="flex justify-center">
          <motion.div initial={{ y: -60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="relative w-[280px] rounded-b-[40px] bg-[#1C2418] px-[10px] pb-[10px] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.5)]" data-testid="app-phone">
            <div className="rounded-b-[32px] bg-[#F4F2EA] px-3 pb-3 pt-5">
              <div className="flex items-center gap-2.5 px-1">
                <img src={images.advisorAvatar} alt="Pan Čung" className="h-9 w-9 rounded-full object-cover" />
                <div className="leading-tight"><div className="text-[12.5px] font-semibold">{a.phone.name}</div><div className="flex items-center gap-1 text-[10px] text-[#1C2418]/55"><span className="h-1.5 w-1.5 rounded-full bg-[#8A9A5B]" />{a.phone.status}</div></div>
              </div>
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="mt-3 rounded-[14px] rounded-bl-[4px] bg-white px-3.5 py-2.5 text-[11.5px] leading-snug text-[#1C2418] shadow-sm ring-1 ring-black/5">{a.phone.msg}</motion.div>
              <div className="mt-3 flex items-center gap-2 rounded-full bg-white px-3 py-2 ring-1 ring-black/10">
                <span className="flex-1 text-[11px] text-[#1C2418]/45">{a.phone.input}<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="ml-0.5 inline-block h-3 w-px bg-[#1C2418] align-middle" /></span>
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#D9B44A] text-[#1C2418]"><Mic size={11} /></span>
              </div>
            </div>
          </motion.div>
        </div>

        <Reveal className="mt-20 text-center md:mt-24">
          <h2 className="text-[40px] font-normal leading-[1.05] tracking-[-0.02em] text-[#1C2418] md:text-[60px]">{a.title}</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={links.booking} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-[14px] font-medium ring-1 ring-black/10 transition-colors hover:bg-[#1C2418] hover:text-white" data-testid="app-pill-0"><CalendarCheck size={16} />{a.pills[0]}</a>
            <Link to="/kontakt" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-[14px] font-medium ring-1 ring-black/10 transition-colors hover:bg-[#1C2418] hover:text-white" data-testid="app-pill-1"><MessageCircle size={16} />{a.pills[1]}</Link>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {a.cards.map((c, i) => {
            const Widget = widgets[i];
            return (
              <Reveal key={c.title} delay={i * 0.1}>
                <div className="flex h-[240px] items-center justify-center rounded-[28px] bg-[#ECEAE1]" data-testid={`app-card-${i}`}><Widget c={c} /></div>
                <h3 className="mt-6 text-[20px] font-medium leading-snug text-[#1C2418]">{c.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-[#1C2418]/60">{c.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
