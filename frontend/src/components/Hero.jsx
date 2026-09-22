import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { images, links } from "../mock";
import { LeftColumn, RightColumn } from "./DashboardCards";
import { useScrollMap } from "../hooks/useScrollMap";
import { Sparkline, CountUp, GOLD } from "./finance/charts";

const floatPos = ["left-[5%] top-[22%]", "right-[5%] top-[22%]"];

export default function Hero() {
  const { t } = useLang();
  const h = t.heroT;
  const cards = t.heroF.cards;
  const ref = useRef(null);
  const [isDesktop, setIsDesktop] = useState(typeof window !== "undefined" ? window.innerWidth >= 1024 : true);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

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
  const titleScale = useScrollMap(scrollYProgress, [0, 0.22], [1, 0.92]);

  const overlayOpacity = useScrollMap(scrollYProgress, [0.42, 0.6], [0, 1]);
  const overlayY = useScrollMap(scrollYProgress, [0.42, 0.6, 1], [40, 0, isDesktop ? -110 : 0]);

  const sideOpacity = useScrollMap(scrollYProgress, [0.3, 0.5], [0, 1]);
  const leftY = useScrollMap(scrollYProgress, [0.3, 1], ["45vh", "-75vh"]);
  const rightY = useScrollMap(scrollYProgress, [0.3, 1], ["70vh", "-95vh"]);

  return (
    <section ref={ref} className="relative bg-[#0E120C]" style={{ height: "230vh" }} data-testid="hero-section" data-nav="dark">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ y: leftY, opacity: sideOpacity }} className="absolute left-0 top-0 hidden w-[27%] px-6 lg:block xl:px-8"><LeftColumn /></motion.div>
        <motion.div style={{ y: rightY, opacity: sideOpacity }} className="absolute right-0 top-0 hidden w-[27%] px-6 lg:block xl:px-8"><RightColumn /></motion.div>

        {/* Media */}
        <motion.div style={{ scale, borderRadius: radius, y: mediaY }} className="absolute inset-0 overflow-hidden will-change-transform">
          <img src={images.hero} alt="Pan Čung" className="kenburns absolute inset-0 h-full w-full object-cover object-[90%_center] lg:object-right" />
          {images.heroVideo && !videoFailed && (
            <video
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000" style={{ opacity: videoReady ? 1 : 0 }}
              src={images.heroVideo} autoPlay muted loop playsInline preload="auto"
              onCanPlay={() => setVideoReady(true)} onError={() => setVideoFailed(true)}
              data-testid="hero-video"
            />
          )}
          <div className="absolute inset-0 bg-[#1C2418]/35 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(14,18,12,0.7)_100%)]" />

          {/* Overlay claim shown once the media shrinks */}
          <motion.div style={{ opacity: overlayOpacity, y: overlayY }} className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
            <h2 className="max-w-[640px] text-center text-[26px] font-medium leading-tight text-white md:text-[34px] lg:text-[44px]">{h.overlay}</h2>
          </motion.div>
        </motion.div>

        {/* Floating trust cards (desktop) */}
        <motion.div style={{ opacity: titleOpacity }} className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
          {cards.map((c, i) => (
            <motion.div key={c.l} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.2 + i * 0.25 }} className={`absolute ${floatPos[i]}`}>
              <div className="floaty glass rounded-[18px] px-5 py-4 text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]" style={{ animationDelay: `${i * 1.3}s` }} data-testid={`hero-card-${i}`}>
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-[30px] font-semibold leading-none tabular-nums text-[#D9B44A]"><CountUp value={c.v} suffix={c.suffix} duration={1.8} /></div>
                    <div className="mt-1.5 text-[12px] text-white/70">{c.l}</div>
                  </div>
                  {i === 0 ? <Sparkline data={[2, 3, 3.4, 4.6, 5.2, 6.5, 7.4, 8]} w={60} h={26} color={GOLD} /> : (
                    <span className="flex -space-x-2">{["#D9B44A", "#8A9A5B", "#F1E6C4"].map((bg) => <span key={bg} className="h-7 w-7 rounded-full border-2 border-[#1C2418]" style={{ background: bg }} />)}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Centered script headline (Teya style) */}
        <motion.div style={{ opacity: titleOpacity, scale: titleScale }} className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
          <h1 className="font-script text-center leading-[0.88] text-[#D9B44A] drop-shadow-[0_16px_50px_rgba(0,0,0,0.45)]" data-testid="hero-title">
            {h.script.map((line, i) => (
              <motion.span key={line} initial={{ opacity: 0, y: 40, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1.1, delay: 0.3 + i * 0.25, ease: [0.22, 1, 0.36, 1] }} className="block text-[clamp(64px,13vw,210px)]">{line}</motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Bottom row: subtitle left, CTA right */}
        <motion.div style={{ opacity: titleOpacity }} className="absolute inset-x-0 bottom-0 px-6 pb-8 md:px-10 md:pb-10 lg:px-[6%]">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }} className="max-w-[440px] text-[15px] leading-relaxed text-white/85 md:text-[16px]" data-testid="hero-subtitle">{h.subtitle}</motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }}>
              <a href={links.booking} target="_blank" rel="noreferrer" className="btn-lime inline-flex h-12 items-center gap-2 px-6 text-[15px]" data-testid="hero-cta"><CalendarCheck size={17} />{h.primary}</a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
