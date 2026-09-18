import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { images } from "../mock";
import { LeftColumn, RightColumn } from "./DashboardCards";
import { useScrollMap } from "../hooks/useScrollMap";

export default function Hero() {
  const { t } = useLang();
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
        {/* Side dashboard columns */}
        <motion.div style={{ y: leftY, opacity: sideOpacity }} className="absolute left-0 top-0 hidden w-[27%] px-6 lg:block xl:px-8">
          <LeftColumn />
        </motion.div>
        <motion.div style={{ y: rightY, opacity: sideOpacity }} className="absolute right-0 top-0 hidden w-[27%] px-6 lg:block xl:px-8">
          <RightColumn />
        </motion.div>

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

        {/* Overlay text shown once the media shrinks */}
        <motion.div style={{ opacity: overlayOpacity, y: overlayY }} className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
          <h2 className="max-w-[520px] text-center text-[28px] font-medium leading-tight text-white md:text-[36px] lg:text-[40px]">{t.hero.overlay}</h2>
        </motion.div>

        {/* Headline */}
        <motion.div style={{ opacity: titleOpacity, y: titleY }} className="absolute inset-0 flex flex-col items-center justify-center px-6 pt-10 text-center">
          <h1 className="font-script leading-[0.82] text-[#D9B44A] text-[clamp(84px,14vw,210px)] drop-shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
            <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="block">{t.hero.title[0]}</motion.span>
            <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="block">{t.hero.title[1]}</motion.span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="mt-8 max-w-[640px] text-[17px] text-white/90 md:text-[19px]">
            {t.hero.subtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65 }} className="mt-8">
            <Link to="/kontakt" className="btn-lime inline-flex h-12 items-center px-7 text-[15px]" data-testid="hero-cta">{t.hero.cta}</Link>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div style={{ opacity: hintOpacity }} className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[12px] text-white/70">
          <span className="flex h-9 w-6 items-start justify-center rounded-full border border-white/40 p-1"><span className="scroll-dot block h-1.5 w-1.5 rounded-full bg-[#D9B44A]" /></span>
          <span className="inline-flex items-center gap-1">{t.hero.scrollHint}<ChevronDown size={14} /></span>
        </motion.div>
      </div>
    </section>
  );
}
