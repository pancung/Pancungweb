import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Home, ShieldCheck, Sunset, Wallet } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "./IntroSection";
import funnels from "../data/funnels";

const ICONS = { Wallet, Home, GraduationCap, Sunset, ShieldCheck };

/* Homepage router: the visitor picks their problem and lands on that topic's page. */
export default function TopicPicker() {
  const { lang } = useLang();
  const r = (funnels[lang] || funnels.cs).router;
  return (
    <section id="temata" className="scroll-mt-20 bg-[#FBFAF6] py-20 md:py-28" data-testid="topic-picker">
      <div className="container-x">
        <Reveal className="max-w-[720px]">
          <span className="section-label">{r.label}</span>
          <h2 className="mt-4 text-[36px] font-normal leading-[1.05] tracking-[-0.02em] text-[#1C2418] md:text-[56px]">{r.title}</h2>
          <p className="mt-4 text-[16.5px] text-[#1C2418]/65">{r.sub}</p>
        </Reveal>
        <div className="mt-10 grid gap-3 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {r.items.map((it, i) => {
            const Icon = ICONS[it.icon] || Wallet;
            return (
              <Reveal key={it.id} delay={i * 0.05} className={`h-full ${i === 0 ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""}`}>
                  <Link
                    to={it.live ? `${it.to}?lang=${lang}` : it.to}
                    className={`group flex h-full items-start gap-4 rounded-[22px] p-5 ring-1 transition-[background-color,box-shadow] duration-300 md:p-6 ${i === 0 ? "bg-[#1C2418] text-white ring-[#1C2418] lg:flex-col lg:justify-between lg:p-8" : "bg-white text-[#1C2418] ring-black/5 hover:ring-[#D9B44A]/70"}`}
                    data-testid={`topic-${it.id}`}
                  >
                    <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] ${i === 0 ? "bg-[#D9B44A] text-[#1C2418]" : "bg-[#F4F2EA] text-[#1C2418]"}`}>
                      <Icon size={20} strokeWidth={1.7} />
                    </span>
                    <span className={`min-w-0 flex-1 ${i === 0 ? "lg:flex-none" : ""}`}>
                      <span className={`block font-medium leading-snug ${i === 0 ? "text-[19px] lg:text-[26px]" : "text-[17px]"}`}>{it.problem}</span>
                      <span className={`mt-1.5 block text-[14px] leading-snug ${i === 0 ? "text-white/65" : "text-[#1C2418]/55"}`}>{it.outcome}</span>
                      <span className={`mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold ${i === 0 ? "text-[#D9B44A]" : "text-[#7A6A2B]"}`}>
                        {it.live ? r.free : r.more}
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </span>
                  </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
