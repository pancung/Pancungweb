import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { useScrollMap } from "../../../hooks/useScrollMap";
import { GoldRulesCard } from "../GoldRulesCard";

// The card "lands" here: enters on its edge (-90°) and flips to the front as the panel scrolls up.
export default function RulesPanel() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.15"] });
  const rotateY = useScrollMap(scrollYProgress, [0.5, 1], [-90, 0]);
  const y = useScrollMap(scrollYProgress, [0.5, 1], [-80, 0]);
  const opacity = useScrollMap(scrollYProgress, [0.5, 0.53], [0, 1]);
  return (
    <div ref={ref} className="flex flex-1 items-center justify-center py-6 md:py-10" data-testid="rules-panel">
      <motion.div style={{ rotateY, y, opacity, transformPerspective: 1400, backfaceVisibility: "hidden" }} className="w-full max-w-[420px] md:w-[clamp(300px,34vw,540px)] md:max-w-none">
        <GoldRulesCard />
      </motion.div>
    </div>
  );
}
