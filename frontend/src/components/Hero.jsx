import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, CalendarCheck, ArrowDownRight } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { images, links } from "../mock";
import { LeftColumn, RightColumn } from "./DashboardCards";
import { useScrollMap } from "../hooks/useScrollMap";
import { Sparkline, CountUp, GOLD } from "./finance/charts";

const floatPos = ["right-[5%] top-[19%]", "right-[6%] bottom-[16%]"];

export default function Hero() {
  const { t } = useLang();
  const h = t.heroF;
  const ref = useRef(null);
  const [isDesktop, setIsDesktop] = useState(typeof window !== "undefined" ? window.innerWidth >= 1024 : true);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const scale = useScrollMap(scrollYProgress, [0.05, 0.55], [1, isDesktop ? 0.44 : 0.9]);
  const radius = useScrollMap(scrollYProgress, [0.05, 0.55], [0, isDesktop ? 90 : 40]);
  const mediaY = useScrollMap(scrollYProgress, [0.55, 1], ["0%", isDesktop ? "-12%" : "0%"]);

  const titleOpacity = useScrollMap(scrollYProgress, [0, 0.22], [1, 0]);
  const titleY = useScrollMap(scrollYProgress, [0, 0.22], [0, -90]);
  const hintOpacity = useScrollMap(scrollYProgress, [0, 0.1], [1, 0]);

  const overlayOpacity = useScrollMap(scrollYProgress, [0.42, 0.6], [0, 1]);
  const overlayY = useScrollMap(scrollYProgress, [0.42, 0.6, 1], [40, 0, isDesktop ? -110 : 0]);

  const sideOpacity = useScrollMap(scrollYProgress, [0.3, 0.5], [0, 1]);
  const leftY = useScrollMap(scrollYProgress, [0.3, 1], ["45vh", "-75vh"]);
  const rightY = useScrollMap(scrollYProgress, [0.3, 1], ["70vh", "-95vh"]);

  return (
    <section ref={ref} className="relative bg-[#1C2418]" style={{ height: "230vh" }} data-testid="hero-section" data-nav="dark">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ y: leftY, opacity: sideOpacity }} className="absolute left-0 top-0 hidden w-[27%] px-6 lg:block xl:px-8"><LeftColumn /></motion.div>
        <motion.div style={{ y: rightY, opacity: sideOpacity }} className="absolute right-0 top-0 hidden w-[27%] px-6 lg:block xl:px-8"><RightColumn /></motion.div>

        {/* Media */}
        <motion.div style={{ scale, borderRadius: radius, y: mediaY }} className="absolute inset-0 overflow-hidden will-change-transform">
          {images.heroVideo ? (
            <video className="h-full w-full object-cover" src={images.heroVideo} poster={images.hero} autoPlay muted loop playsInline />
          ) : (
            <img src={images.hero} alt="Pan Čung" className="kenburns h-full w-full object-cover object-[90%_center] lg:object-right" />
          )}
          <div className="absolute inset-0 bg-[#2A3424]/45 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[#1C2418]/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(28,36,24,0.75)_100%)]" />
        </motion.div>

        {/* Ambient gold glow */}
        <motion.div aria-hidden="true" animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute left-[4%] top-[28%] h-[460px] w-[460px] rounded-full bg-[#D9B44A]/[0.13] blur-[130px]" />

        {/* Floating trust cards around the portrait (desktop) */}
        <motion.div style={{ opacity: titleOpacity }} className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
          {h.cards.map((c, i) => (
            <motion.div
              key={c.l}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9 + i * 0.25 }}
              className={`absolute ${floatPos[i]}`}
            >
              <div className="floaty glass rounded-[18px] px-5 py-4 text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]" style={{ animationDelay: `${i * 1.3}s` }} data-testid={`hero-card-${i}`}>
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-[30px] font-semibold leading-none tabular-nums text-[#D9B44A]"><CountUp value={c.v} suffix={c.suffix} duration={1.8} /></div>
                    <div className="mt-1.5 text-[12px] text-white/70">{c.l}</div>
                  </div>
                  {i === 0 ? (
                    <Sparkline data={[2, 3, 3.4, 4.6, 5.2, 6.5, 7.4, 8]} w={60} h={26} color={GOLD} />
                  ) : (
                    <span className="flex -space-x-2">
                      {["#D9B44A", "#8A9A5B", "#F1E6C4"].map((bg) => <span key={bg} className="h-7 w-7 rounded-full border-2 border-[#1C2418]" style={{ background: bg }} />)}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Overlay text shown once the media shrinks */}
        <motion.div style={{ opacity: overlayOpacity, y: overlayY }} className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
          <h2 className="max-w-[560px] text-center text-[26px] font-medium leading-tight text-white md:text-[34px] lg:text-[38px]">{h.overlay}</h2>
        </motion.div>

        {/* Headline */}
        <motion.div style={{ opacity: titleOpacity, y: titleY }} className="absolute inset-0 flex flex-col items-center justify-center px-6 pt-10 text-center lg:items-start lg:px-[8%] lg:text-left">
          <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-[#D9B44A]">{h.label}</motion.span>
          <h1 className="mt-6 max-w-[900px] leading-[0.95] text-white">
            <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="block text-[clamp(34px,4.8vw,78px)] font-medium tracking-[-0.02em]">{h.title1}</motion.span>
            <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="font-script mt-2 block text-[clamp(52px,7.6vw,124px)] leading-[0.95] text-[#D9B44A] drop-shadow-[0_10px_40px_rgba(0,0,0,0.35)]">{h.title2}</motion.span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="mt-7 max-w-[560px] text-[17px] text-white/85 md:text-[19px]">{h.subtitle}</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65 }} className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a href={links.booking} target="_blank" rel="noreferrer" className="btn-lime inline-flex h-12 items-center gap-2 px-6 text-[15px]" data-testid="hero-cta"><CalendarCheck size={17} />{h.primary}</a>
            <a href="#system" className="glass inline-flex h-12 items-center gap-2 rounded-[12px] px-6 text-[15px] font-medium text-white transition-colors hover:bg-white/10" data-testid="hero-secondary">{h.secondary}<ArrowDownRight size={16} /></a>
          </motion.div>
        </motion.div>

        <motion.div style={{ opacity: hintOpacity }} className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[12px] text-white/70">
          <span className="flex h-9 w-6 items-start justify-center rounded-full border border-white/40 p-1"><span className="scroll-dot block h-1.5 w-1.5 rounded-full bg-[#D9B44A]" /></span>
          <span className="inline-flex items-center gap-1">{t.hero.scrollHint}<ChevronDown size={14} /></span>
        </motion.div>
      </div>
    </section>
  );
}
