import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartPulse, Activity, Accessibility, Users, ShieldCheck, TrendingUp, PiggyBank, Globe, ArrowRight } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "../components/IntroSection";
import { CardProtection, PolicyCard } from "../components/DashboardCards";
import CtaSection from "../components/CtaSection";
import { images } from "../mock";

const icons = { HeartPulse, Activity, Accessibility, Users, ShieldCheck, TrendingUp, PiggyBank, Globe };

export default function ProductPage({ type }) {
  const { t } = useLang();
  const p = t.products[type];
  const isInvest = type === "invest";
  const img = isInvest ? images.elderly : images.motherChild;

  return (
    <div data-testid={`product-page-${type}`}>
      {/* Hero */}
      <section className="bg-white pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="section-label">{p.label}</span>
            <h1 className="mt-5 text-[44px] font-normal leading-[1.02] tracking-[-0.02em] text-[#1C2418] md:text-[64px]">
              {p.title[0]}<br />
              <span className="font-script text-[1.1em] text-[#7A6A2B]">{p.title[1]}</span>
            </h1>
            <p className="mt-7 max-w-[520px] text-[17px] leading-relaxed text-[#1C2418]/70">{p.subtitle}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/kontakt" className="btn-lime inline-flex h-12 items-center px-6 text-[15px]" data-testid="product-cta">{p.cta}</Link>
              <Link to={isInvest ? "/#kalkulacka" : "/balicky"} className="glass-dark inline-flex h-12 items-center rounded-[12px] px-6 text-[15px] font-medium text-[#1C2418] transition-colors hover:bg-black/10">{p.secondary}</Link>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[32px] bg-[#1C2418]">
              <img src={img} alt={p.imageAlt} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(5,8,5,0.55))]" />
            </div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="absolute -bottom-8 -left-4 w-[280px] md:-left-10 md:w-[320px]">
              {isInvest ? <CardProtection /> : <PolicyCard rotate={-8} className="h-[220px] !p-4" />}
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <Reveal><h2 className="text-[36px] font-normal tracking-tight md:text-[48px]">{p.benefitsTitle}</h2></Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {p.benefits.map((b, i) => {
              const Icon = icons[b.icon] || ShieldCheck;
              return (
                <Reveal key={b.title} delay={i * 0.08}>
                  <div className="paper-card card-hover h-full p-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#D9B44A] text-[#1C2418]"><Icon size={22} strokeWidth={1.6} /></span>
                    <h3 className="mt-6 text-[20px] font-medium">{b.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-[#1C2418]/65">{b.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Steps / scenarios */}
      <section className="bg-[linear-gradient(180deg,#F1E6C4_0%,#E2C97E_100%)] py-24 md:py-32">
        <div className="container-x">
          <Reveal className="text-center"><h2 className="font-display text-[44px] leading-[1.02] text-[#232B1E] md:text-[60px]">{p.stepsTitle}</h2></Reveal>
          <div className={`mt-14 grid gap-5 ${isInvest ? "md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-4"}`}>
            {p.steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className={`card-hover relative h-full overflow-hidden rounded-[28px] p-8 ${isInvest && i === 0 ? "bg-[#1C2418] text-white" : "bg-white text-[#1C2418]"} ${isInvest ? "min-h-[300px]" : ""}`}>
                  <span className={`font-display text-[64px] leading-none ${isInvest && i === 0 ? "text-[#D9B44A]" : "text-[#1C2418]/15"}`}>{s.n}</span>
                  <h3 className="mt-6 text-[24px] font-medium">{s.title}</h3>
                  <p className={`mt-3 text-[15px] leading-relaxed ${isInvest && i === 0 ? "text-white/65" : "text-[#1C2418]/65"}`}>{s.desc}</p>
                  {isInvest && (
                    <div className={`mt-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold ${i === 0 ? "bg-[#D9B44A] text-[#1C2418]" : "bg-[#1C2418] text-white"}`}>
                      {i === 0 ? t.features[2].offers[1].value : "1 850 000 Kč"}<ArrowRight size={14} />
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
