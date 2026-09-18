import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// Odometer-style rolling digits (like Teya's dashboard numbers)
export default function RollingNumber({ value, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [inView, delay]);

  const chars = String(value).split("");

  return (
    <span ref={ref} className={`inline-flex items-baseline tabular-nums ${className}`} aria-label={String(value)}>
      {chars.map((ch, i) => {
        if (!/\d/.test(ch)) {
          return (
            <span key={i} className="inline-block" style={{ height: "1em", lineHeight: "1em" }}>
              {ch === " " ? "\u00a0" : ch}
            </span>
          );
        }
        const d = parseInt(ch, 10);
        return (
          <span key={i} className="digit-col">
            <span style={{ transform: `translateY(-${active ? d : 0}em)`, transitionDelay: `${i * 40}ms` }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <span key={n}>{n}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
