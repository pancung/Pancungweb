import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function TiltCard({ children, className = "", max = 8, ...rest }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 22 });
  const sry = useSpring(ry, { stiffness: 220, damping: 22 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * max);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * max);
  };
  const reset = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }} onMouseMove={onMove} onMouseLeave={reset} className={className} {...rest}>
      {children}
    </motion.div>
  );
}
