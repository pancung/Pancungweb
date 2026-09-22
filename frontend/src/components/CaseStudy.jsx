import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "./IntroSection";
import { WordReveal } from "./motion/WordReveal";
import { LineChart, fmtCzk, fmtShort } from "./finance/charts";

export default function CaseStudy() {
  const { t } = useLang();
  const c = t.caseStudy;
  const ages = c.after.points.map((p) => p[0]);
  const values = c.after.points.map((p) => p[1]);

  return (
    <section id="pripadova-studie" className="bg-white py-24 md:py-32" data-testid="case-study">
      <div className="container-x">
        <Reveal className="max-w-[760px]">
          <span className="section-label">{c.label}</span>
          <h2 className="mt-4 text-[40px] font-normal leading-[1.05] tracking-[-0.02em] text-[#1C2418] md:text-[56px]"><WordReveal text={c.title} /></h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 overflow-hidden rounded-[32px] bg-[#F4F2EA] ring-1 ring-black/5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 px-6 py-5 md:px-8">
            <span className="text-[13px] font-semibold tracking-[0.16em] text-[#1C2418]">{c.client}</span>
            <span className="rounded-full bg-white px-3 py-1 text-[11px] text-[#1C2418]/60 ring-1 ring-black/5">{c.anonym}</span>
          </div>
          <div className="grid gap-4 border-b border-black/5 px-6 py-6 md:grid-cols-4 md:px-8">
            {c.meta.map(([k, v]) => <div key={k}><div className="text-[11px] tracking-[0.12em] text-[#1C2418]/50">{k.toUpperCase()}</div><div className="mt-1 text-[16px] font-semibold">{v}</div></div>)}
          </div>

          <div className="grid gap-4 p-4 md:p-6 lg:grid-cols-[1fr_auto_1fr_auto_1.3fr] lg:items-stretch">
            {/* BEFORE */}
            <div className="rounded-[22px] bg-white p-6" data-testid="case-before">
              <span className="inline-flex rounded-full bg-[#1C2418]/5 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-[#1C2418]/70">{c.before.tag}</span>
              <h3 className="mt-3 text-[20px] font-medium">{c.before.title}</h3>
              <ul className="mt-5 space-y-4">
                {c.before.items.map(([k, v, p], i) => (
                  <li key={k}>
                    <div className="flex justify-between text-[13px]"><span className="text-[#1C2418]/60">{k}</span><span className="font-medium">{v}</span></div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#1C2418]/8"><motion.div className="h-full rounded-full bg-[#1C2418]/35" initial={{ width: 0 }} whileInView={{ width: `${Math.max(p, 3)}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }} /></div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden items-center text-[#1C2418]/30 lg:flex"><ArrowRight size={22} /></div>
            {/* PLAN */}
            <div className="rounded-[22px] bg-[#1C2418] p-6 text-white" data-testid="case-plan">
              <span className="inline-flex rounded-full bg-[#D9B44A] px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-[#1C2418]">{c.plan.tag}</span>
              <h3 className="mt-3 text-[20px] font-medium">{c.plan.title}</h3>
              <ul className="mt-5 space-y-3">
                {c.plan.items.map((p, i) => <motion.li key={p} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }} className="flex items-start gap-2.5 text-[14px] leading-snug text-white/85"><Check size={15} className="mt-0.5 shrink-0 text-[#D9B44A]" />{p}</motion.li>)}
              </ul>
            </div>
            <div className="hidden items-center text-[#1C2418]/30 lg:flex"><ArrowRight size={22} /></div>
            {/* PROJECTED */}
            <div className="rounded-[22px] bg-white p-6" data-testid="case-after">
              <div className="flex items-center justify-between">
                <span className="inline-flex rounded-full bg-[#F3E9C8] px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-[#7A6A2B]">{c.after.tag}</span>
                <span className="text-[11px] text-[#1C2418]/50">{c.after.ageLabel} {ages[0]} → {ages[ages.length - 1]}</span>
              </div>
              <h3 className="mt-3 text-[20px] font-medium">{c.after.title}</h3>
              <div className="mt-2 text-[28px] font-semibold tracking-tight">{fmtCzk(values[values.length - 1])}</div>
              <LineChart id="case" data={values} height={200} width={420} pad={{ top: 16, right: 12, bottom: 26, left: 6 }} labels={ages.map((a) => String(a))} grid={3} tooltip={(i, v) => <span><b>{c.after.ageLabel} {ages[i]}</b> · {fmtShort(v)} Kč</span>} />
              <p className="mt-3 text-[11px] leading-snug text-[#1C2418]/50">{c.after.note}</p>
            </div>
          </div>
          <p className="border-t border-black/5 px-6 py-4 text-[11.5px] text-[#1C2418]/50 md:px-8">{c.disclaimer}</p>
        </Reveal>
      </div>
    </section>
  );
}
