import React, { useEffect, useRef } from "react";
import { motion, useScroll, useMotionValue, useMotionValueEvent, transform } from "framer-motion";
import { useLang } from "../../context/LanguageContext";
import { GoldCardFront, GoldRulesCard, CARD_SIZE } from "./GoldRulesCard";
import { useIsMobile } from "../../hooks/useIsMobile";

// Frame-by-frame copy of teya.com (measured at 1920×800, 50px scroll steps):
// – texts: section top 20vh → section bottom 0 (linear); X ±150→0 in the first 30 %, Y 40→−40 over the whole range
// – card: when its centre passes 53vh it travels 1vh of scroll down into the landing slot (RulesPanel),
//   turning on its edge and flipping to the back (rules). Position/rotation keyframes below are the measured curve.
const T = Array.from({ length: 17 }, (_, i) => i / 16);
const POS = [0, 0.004, 0.0265, 0.07, 0.133, 0.212, 0.301, 0.395, 0.495, 0.594, 0.688, 0.777, 0.855, 0.922, 0.968, 0.995, 1];
const ROT = [0, 0, 4, 11.5, 22.5, 40, 54.5, 72, 90, 106, 123.5, 135, 155, 166.5, 175, 180, 180];
const clamp01 = (v) => Math.min(1, Math.max(0, v));

export default function CardIntro() {
  const { t } = useLang();
  const c = t.cardIntro;
  const ref = useRef(null);
  const boxRef = useRef(null);
  const mobile = useIsMobile(768);
  const { scrollY } = useScroll();

  const y = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const leftX = useMotionValue(-150);
  const rightX = useMotionValue(150);
  const textY = useMotionValue(40);

  const update = () => {
    const sec = ref.current;
    const box = boxRef.current;
    if (!sec || !box) return;
    const vh = window.innerHeight;
    const s = sec.getBoundingClientRect();
    const b = box.getBoundingClientRect();
    const tp = clamp01((0.2 * vh - s.top) / (0.2 * vh + s.height));
    const tx = transform(tp, [0, 0.3], [150, 0]);
    leftX.set(-tx);
    rightX.set(tx);
    textY.set(transform(tp, [0, 1], [40, -40]));

    const center = b.top + b.height / 2;
    const p = clamp01((0.53 * vh - center) / vh);
    const slot = document.getElementById("gold-card-landing")?.getBoundingClientRect();
    const dist = slot ? slot.top + slot.height / 2 - center : 0;
    y.set(transform(p, T, POS) * dist);
    rotateY.set(transform(p, T, ROT));
  };

  useMotionValueEvent(scrollY, "change", update);
  useEffect(() => {
    let timer;
    const settle = () => { clearTimeout(timer); timer = setTimeout(update, 700); };
    update();
    const unsub = scrollY.on("change", settle);
    window.addEventListener("resize", update);
    return () => { unsub(); clearTimeout(timer); window.removeEventListener("resize", update); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section ref={ref} className="relative z-10 flex min-h-[70vh] flex-col justify-center overflow-x-clip bg-white pb-16 md:pb-28" data-testid="card-intro">
      <div className="mx-auto w-full px-6 sm:px-10">
        <div className="flex flex-col items-center justify-center gap-6 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-0">
          <motion.p style={{ x: mobile ? 0 : leftX, y: textY }} className="font-script order-2 text-center text-[clamp(40px,5.2vw,62px)] leading-[0.95] text-[#1C2418] md:order-1 md:pr-10 md:text-right md:text-[clamp(30px,4.4vw,62px)]" data-testid="card-intro-left">{c.left}</motion.p>
          <div ref={boxRef} className={`relative order-1 shrink-0 md:order-2 ${CARD_SIZE}`}>
            <motion.div style={{ rotateY, y, transformPerspective: 1400, transformStyle: "preserve-3d" }} className="pointer-events-none relative z-30 w-full" data-testid="gold-card-flip">
              <div style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}><GoldRulesCard /></div>
              <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}><GoldCardFront /></div>
            </motion.div>
          </div>
          <motion.p style={{ x: mobile ? 0 : rightX, y: textY }} className="font-script order-3 text-center text-[clamp(40px,5.2vw,62px)] leading-[0.95] text-[#1C2418] md:pl-10 md:text-left md:text-[clamp(30px,4.4vw,62px)]" data-testid="card-intro-right">{c.right}</motion.p>
        </div>
      </div>
    </section>
  );
}
