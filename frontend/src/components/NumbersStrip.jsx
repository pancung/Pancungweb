import React from "react";
import { motion } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "./IntroSection";
import { CountUp } from "./finance/charts";

export default function NumbersStrip() {
  const { t } = useLang();
  const n = t.numbers;
  return (
    <section className="bg-white py-14 md:py-20" data-testid="numbers-strip">
      <div className="container-x">
        <div className="relative grid gap-10 border-y border-black/10 py-12 md:grid-cols-2 md:gap-8 md:py-14">
          <motion.div aria-hidden="true" className="absolute left-0 top-[-1px] h-[2px] w-full origin-left bg-[#D9B44A]" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: "easeInOut" }} />
          {n.items.map((it, i) => (
            <Reveal key={i} delay={i * 0.12} className="md:border-l md:border-black/10 md:pl-12 md:first:border-l-0 md:first:pl-0">
              <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
                <div className="text-[76px] font-medium leading-none tracking-[-0.04em] text-[#1C2418] md:text-[108px]" data-testid={`number-${i}`}>
                  <CountUp value={it.value} suffix={it.suffix} duration={2} />
                </div>
                <div className="pb-2 text-[13px] font-semibold tracking-[0.18em] text-[#1C2418]/60 md:pb-4 md:text-[14px]">{it.label}</div>
              </div>
              <p className="mt-4 max-w-[420px] text-[15px] leading-relaxed text-[#1C2418]/60">{it.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
