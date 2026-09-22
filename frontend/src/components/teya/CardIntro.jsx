import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { useLang } from "../../context/LanguageContext";
import { useScrollMap } from "../../hooks/useScrollMap";
import { GoldRulesCard } from "./GoldRulesCard";
import { useIsMobile } from "../../hooks/useIsMobile";

// Mirrors teya.com: non-sticky section. Texts start pushed out (±150px, +40px) and slide in as the
// section reaches the top; the card stays front-facing, then turns 90° on its edge and drops
// towards the panel below, where it flips back in (see RulesPanel).
export default function CardIntro() {
  const { t } = useLang();
  const c = t.cardIntro;
  const ref = useRef(null);
  const mobile = useIsMobile(768);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const leftX = useScrollMap(scrollYProgress, [0.46, 0.64], [-150, 0]);
  const rightX = useScrollMap(scrollYProgress, [0.46, 0.64], [150, 0]);
  const textY = useScrollMap(scrollYProgress, [0.47, 1], [40, -40]);
  const rotateY = useScrollMap(scrollYProgress, [0.5, 0.66], [0, 90]);
  const cardY = useScrollMap(scrollYProgress, [0.5, 0.66], [0, 120]);
  const cardOpacity = useScrollMap(scrollYProgress, [0.64, 0.67], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[70vh] flex-col justify-center overflow-x-clip bg-white pb-16 md:pb-28" data-testid="card-intro">
      <div className="mx-auto w-full px-6 sm:px-10">
        <div className="flex flex-col items-center justify-center gap-6 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-0">
          <motion.p style={{ x: mobile ? 0 : leftX, y: textY }} className="font-script order-2 text-center text-[clamp(40px,5.2vw,62px)] leading-[0.95] text-[#1C2418] md:order-1 md:text-[clamp(30px,4.4vw,62px)] md:text-right md:pr-10" data-testid="card-intro-left">{c.left}</motion.p>
          <motion.div style={{ rotateY, y: cardY, opacity: cardOpacity, transformPerspective: 1400, backfaceVisibility: "hidden" }} className="relative z-30 order-1 w-full max-w-[420px] shrink-0 md:order-2 md:w-[clamp(300px,36vw,560px)] md:max-w-none">
            <GoldRulesCard />
          </motion.div>
          <motion.p style={{ x: mobile ? 0 : rightX, y: textY }} className="font-script order-3 text-center text-[clamp(40px,5.2vw,62px)] leading-[0.95] text-[#1C2418] md:text-[clamp(30px,4.4vw,62px)] md:text-left md:pl-10" data-testid="card-intro-right">{c.right}</motion.p>
        </div>
      </div>
    </section>
  );
}
