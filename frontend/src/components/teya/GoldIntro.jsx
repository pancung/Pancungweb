import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, TrendingUp, Wallet, Maximize2, Wifi, Plus } from "lucide-react";
import { useLang } from "../../context/LanguageContext";
import { useScrollMap } from "../../hooks/useScrollMap";
import { Reveal } from "../IntroSection";
import { Sparkline, GOLD } from "../finance/charts";

const icons = { ShieldCheck, TrendingUp, Wallet };

export function PhoneMock({ tilt = true }) {
  const { t } = useLang();
  const p = t.gold.phone;
  return (
    <div className="relative mx-auto w-[290px] md:w-[330px]" style={{ perspective: 1200 }}>
      <div className="floaty relative rounded-[44px] bg-[#1C2418] p-[10px] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.5)]" style={tilt ? { transform: "rotate(-16deg) rotateY(12deg)" } : undefined} data-testid="phone-mock">
        <div className="relative overflow-hidden rounded-[36px] bg-[#F4F2EA] p-5 text-[#1C2418]">
          <div className="flex items-center justify-between text-[10px] text-[#1C2418]/50">
            <span className="inline-flex items-center gap-1"><span className="h-3 w-3 rounded-[3px] bg-[#D9B44A]" /> Pan Čung</span>
            <span className="inline-flex items-center gap-1"><Wifi size={10} /> 9:41</span>
          </div>
          <div className="mt-5 text-[11px] font-medium tracking-[0.14em] text-[#1C2418]/55">{p.title.toUpperCase()}</div>
          <div className="mt-3 rounded-[18px] bg-[#1C2418] p-4 text-white">
            <div className="text-[10px] text-white/55">{p.netWorth}</div>
            <div className="mt-1 text-[24px] font-semibold leading-none tracking-tight">{p.value}</div>
            <div className="mt-1 text-[10px] text-[#D9B44A]">{p.delta}</div>
            <div className="mt-3"><Sparkline data={[1.2, 1.5, 1.9, 2.1, 2.8, 3.4, 3.9, 4.82]} w={250} h={44} color={GOLD} /></div>
          </div>
          <ul className="mt-3 space-y-2">
            {p.rows.map(([n, v, pct], i) => (
              <li key={n} className="rounded-[14px] bg-white p-3">
                <div className="flex items-center justify-between text-[11px]"><span className="font-medium">{n}</span><span className="text-[#1C2418]/60">{v}</span></div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#1C2418]/8"><motion.div className="h-full rounded-full bg-[#D9B44A]" initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 + i * 0.15 }} /></div>
              </li>
            ))}
          </ul>
          <div className="btn-lime mt-3 inline-flex h-10 w-full items-center justify-center gap-1.5 text-[12px]"><Plus size={13} />{p.btn}</div>
        </div>
      </div>
    </div>
  );
}

export default function GoldIntro() {
  const { t } = useLang();
  const g = t.gold;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const deviceY = useScrollMap(scrollYProgress, [0, 1], [90, -90]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[linear-gradient(180deg,#D9B44A_0%,#E5CE8A_70%,#F1E6C4_100%)]" data-testid="gold-intro">
      <div className="container-x pb-24 pt-28 md:pb-32 md:pt-36">
        <Reveal className="text-center">
          <h2 className="text-[40px] font-normal leading-[1.02] tracking-[-0.02em] text-[#1C2418] md:text-[64px] lg:text-[76px]">
            {g.title[0]} <span className="font-script text-[1.15em] leading-none">{g.title[1]}</span>
            <br />
            {g.title[2]}
          </h2>
        </Reveal>

        <div className="mt-16 grid items-center gap-12 lg:mt-24 lg:grid-cols-[1fr_1.1fr_1fr] lg:gap-6">
          <Reveal delay={0.1} className="order-2 lg:order-1">
            <h3 className="text-[24px] font-medium text-[#1C2418]">{g.label}</h3>
            <p className="mt-4 text-[16px] leading-relaxed text-[#1C2418]/75">{g.desc}</p>
            <Link to="/jak-pracuji" className="btn-ink mt-7 inline-flex h-11 items-center gap-2 px-5 text-[14px]" data-testid="gold-intro-cta"><Maximize2 size={15} />{g.cta}</Link>
          </Reveal>
          <motion.div style={{ y: deviceY }} className="order-1 lg:order-2"><PhoneMock /></motion.div>
          <Reveal delay={0.2} className="order-3 flex flex-col gap-6">
            {g.bullets.map((b, i) => {
              const Icon = icons[b.icon] || ShieldCheck;
              return (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#1C2418]"><Icon size={20} strokeWidth={1.6} /></span>
                  <p className="text-[16px] leading-snug text-[#1C2418]">{b.text}</p>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
