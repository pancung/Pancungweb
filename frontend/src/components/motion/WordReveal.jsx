import React from "react";
import { motion } from "framer-motion";

export function WordReveal({ text, className = "", delay = 0, stagger = 0.05 }) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block will-change-transform"
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
        >
          {w}{i < words.length - 1 ? "\u00a0" : ""}
        </motion.span>
      ))}
    </span>
  );
}
