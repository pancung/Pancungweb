import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, PiggyBank, Maximize2, Wifi } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { useScrollMap } from "../hooks/useScrollMap";

const icons = { ShieldCheck, PiggyBank };

export const Reveal = ({ children, delay = 0, className = "", y = 30 }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

function DeviceMock() {
  const { t } = useLang();
  const m = t.intro.mockPolicy;
  const p = t.dash.policyCard;
  return (
    <div className="relative mx-auto w-[300px] md:w-[340px]" style={{ perspective: 1200 }}>
      <div
        className="floaty relative rounded-[42px] bg-[#B3953A] p-[10px] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.45)]"
        style={{ transform: "rotate(-18deg) rotateY(12deg)" }}
      >
        <div className="relative overflow-hidden rounded-[34px] bg-white p-5 text-[#1C2418]">
          <div className="flex items-center justify-between text-[10px] text-[#1C2418]/50">
            <span className="inline-flex items-center gap-1"><span className="h-3 w-3 rounded-[3px] bg-[#D9B44A]" /> Pan Čung</span>
            <span className="inline-flex items-center gap-1"><Wifi size={10} /> 9:41</span>
          </div>
          <div className="mt-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F4F2EA]"><ShieldCheck size={22} /></div>
            <div className="mt-3 text-[11px] text-[#1C2418]/60">{p.pkg}</div>
            <div className="text-[30px] font-bold leading-none tracking-tight">{p.sum}</div>
            <div className="mt-1 text-[10px] text-[#1C2418]/50">{m.sub}</div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-2">
            <div className="rounded-[14px] bg-[#D9B44A] p-3">
              <div className="text-[16px] font-bold leading-none">+20%</div>
              <div className="mt-1 text-[9px] text-[#1C2418]/70">{t.packages.items[1].features[2]}</div>
            </div>
            <div className="rounded-[14px] bg-[#F4F2EA] p-3">
              <div className="text-[16px] font-bold leading-none">+10%</div>
              <div className="mt-1 text-[9px] text-[#1C2418]/70">{t.packages.items[1].features[3]}</div>
            </div>
            <div className="rounded-[14px] bg-[#F4F2EA] p-3">
              <div className="text-[16px] font-bold leading-none">+15%</div>
              <div className="mt-1 text-[9px] text-[#1C2418]/70">{t.packages.items[1].features[1]}</div>
            </div>
            <div className="rounded-[14px] bg-[#F4F2EA] p-3">
              <div className="text-[14px] font-bold leading-none">{m.amount}</div>
              <div className="mt-1 text-[9px] text-[#1C2418]/70">{t.calculator.monthly}</div>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-center gap-3 opacity-60">
            <span className="h-4 w-7 rounded-sm bg-[#1a1f71]" />
            <span className="h-4 w-7 rounded-sm bg-[#eb001b]" />
            <span className="h-4 w-7 rounded-sm bg-[#1C2418]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IntroSection() {
  const { t } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const deviceY = useScrollMap(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[linear-gradient(180deg,#D9B44A_0%,#E5CE8A_70%,#F1E6C4_100%)]" data-testid="intro-section">
      <div className="container-x pb-24 pt-28 md:pb-32 md:pt-36">
        <Reveal className="text-center">
          <h2 className="text-[40px] font-normal leading-[1.02] tracking-[-0.02em] text-[#1C2418] md:text-[64px] lg:text-[76px]">
            {t.intro.title[0]} <span className="font-script text-[1.15em] leading-none">{t.intro.title[1]}</span>
            <br />
            {t.intro.title[2]}
          </h2>
        </Reveal>

        <div className="mt-16 grid items-center gap-12 lg:mt-24 lg:grid-cols-[1fr_1.1fr_1fr] lg:gap-6">
          <Reveal delay={0.1} className="order-2 lg:order-1">
            <h3 className="text-[24px] font-medium text-[#1C2418]">{t.intro.productLabel}</h3>
            <p className="mt-4 text-[16px] leading-relaxed text-[#1C2418]/75">{t.intro.productDesc}</p>
            <Link to="/balicky" className="btn-ink mt-7 inline-flex h-11 items-center gap-2 px-5 text-[14px]" data-testid="intro-cta">
              <Maximize2 size={15} />{t.intro.productCta}
            </Link>
          </Reveal>

          <motion.div style={{ y: deviceY }} className="order-1 lg:order-2">
            <DeviceMock />
          </motion.div>

          <Reveal delay={0.2} className="order-3 flex flex-col gap-6">
            {t.intro.bullets.map((b, i) => {
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
