import React, { useEffect, useState } from "react";
import { Navigate, Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CalendarCheck, Check, MessageCircle } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "../components/IntroSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { CALCS } from "../components/CalculatorHub";
import bentoDetails from "../data/bentoDetails";
import { serviceMedia, links } from "../mock";

/* Hero = video only. Native <video> with controls, poster shown before play. */
function VideoHero({ media, title }) {
  return (
    <section className="bg-[#1C2418] pb-10 pt-24 md:pb-14 md:pt-28" data-testid="service-video-hero">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[28px] bg-black shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] md:rounded-[36px]"
        >
          <video
            key={media.video}
            className="aspect-video h-full w-full object-cover"
            src={media.video}
            poster={media.poster}
            controls
            preload="metadata"
            playsInline
            data-testid="service-video"
          >
            {title}
          </video>
        </motion.div>
      </div>
    </section>
  );
}

/* Only the calculators that belong to this service. Single one renders bare; several get a pill switcher. */
function ServiceCalculators({ ids, meta }) {
  const [active, setActive] = useState(ids[0]);
  // Switching service (same route component) must reset the tab, else it points at a stale calculator.
  useEffect(() => setActive(ids[0]), [ids]);

  const Active = CALCS[active] || CALCS[ids[0]];
  const label = (id) => meta.items?.find((i) => i.id === id);

  return (
    <div data-testid="service-calculators">
      {ids.length > 1 && (
        <div className="mx-auto mb-10 flex max-w-full flex-wrap justify-center gap-1.5 rounded-full bg-white p-1.5 ring-1 ring-black/5 sm:inline-flex sm:flex-nowrap" role="tablist">
          {ids.map((id) => {
            const on = active === id;
            const it = label(id);
            const text = it ? it.title.charAt(0) + it.title.slice(1).toLowerCase() : id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(id)}
                data-testid={`service-calc-tab-${id}`}
                className={`relative rounded-full px-4 py-2.5 text-[12.5px] font-semibold tracking-[0.04em] transition-colors md:px-5 ${on ? "text-[#1C2418]" : "text-[#1C2418]/55 hover:text-[#1C2418]"}`}
              >
                {on && <motion.span layoutId="service-calc-pill" className="absolute inset-0 z-0 rounded-full bg-[#D9B44A]" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span className="relative z-10">{text}</span>
              </button>
            );
          })}
        </div>
      )}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Active />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function ServicePage() {
  const { slug } = useParams();
  const { t, lang } = useLang();

  const item = t.services?.items?.find((s) => s.slug === slug);
  // Unknown slug → home, rather than rendering an empty shell.
  if (!item) return <Navigate to="/" replace />;

  const dict = bentoDetails[lang] || bentoDetails.cs;
  const d = dict[item.detail] || {};
  const common = dict.common || {};
  const media = serviceMedia[slug] || Object.values(serviceMedia)[0];
  const back = t.services?.label || "SLUŽBY";
  const calcIds = (item.calcs || []).filter((id) => CALCS[id]);

  return (
    <div data-testid={`service-page-${slug}`}>
      <VideoHero media={media} title={item.title} />

      {/* Intro + bullets */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_380px]">
          <Reveal>
            <Link
              to="/#temata"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold tracking-[0.08em] text-[#1C2418]/45 transition-colors hover:text-[#1C2418]"
              data-testid="service-back"
            >
              <ArrowLeft size={14} /> {back}
            </Link>
            <h1 className="mt-5 text-[44px] font-normal leading-[1.02] tracking-[-0.02em] text-[#1C2418] md:text-[60px]">
              {item.title}
            </h1>
            <p className="mt-7 max-w-[620px] text-[18px] leading-relaxed text-[#1C2418]/70">{d.intro || item.desc}</p>
          </Reveal>

          {d.bullets?.length > 0 && (
            <Reveal delay={0.12}>
              <ul className="paper-card flex h-full flex-col justify-center gap-5 p-8">
                {d.bullets.map((b) => (
                  <li key={b} className="flex gap-3.5">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D9B44A] text-[#1C2418]">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span className="text-[15px] leading-relaxed text-[#1C2418]/80">{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </section>

      {/* Steps */}
      {d.steps?.length > 0 && (
        <section className="bg-[linear-gradient(180deg,#F1E6C4_0%,#E2C97E_100%)] py-24 md:py-32">
          <div className="container-x">
            <div className="grid gap-5 md:grid-cols-3">
              {d.steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.1}>
                  <div className="card-hover flex h-full flex-col rounded-[28px] bg-white p-8">
                    <span className="font-display text-[64px] leading-none text-[#1C2418]/15">{s.n}</span>
                    <h3 className="mt-6 text-[24px] font-medium text-[#1C2418]">{s.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#1C2418]/65">{s.desc}</p>
                    {s.checks?.length > 0 && (
                      <ul className="mt-6 space-y-2.5 border-t border-[#1C2418]/10 pt-6">
                        {s.checks.map((c) => (
                          <li key={c} className="flex gap-2.5 text-[14px] text-[#1C2418]/70">
                            <Check size={15} className="mt-0.5 shrink-0 text-[#7A6A2B]" strokeWidth={2.4} />
                            {c}
                          </li>
                        ))}
                      </ul>
                    )}
                    {s.stat && (
                      <div className="mt-auto pt-7">
                        <div className="text-[11px] font-semibold tracking-[0.1em] text-[#1C2418]/45">{s.stat[0]}</div>
                        <div className="mt-1 text-[22px] font-medium text-[#1C2418]">{s.stat[1]}</div>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Calculators relevant to this service */}
      {calcIds.length > 0 && (
        <section className="bg-[linear-gradient(180deg,#ffffff_0%,#F4F2EA_100%)] py-24 md:py-32" data-testid="service-calc-section">
          <div className="container-x">
            <Reveal className="text-center">
              <span className="section-label">{t.calculators?.label}</span>
              <h2 className="mx-auto mt-4 max-w-[760px] text-[36px] font-normal leading-[1.05] tracking-[-0.02em] text-[#1C2418] md:text-[48px]">
                {t.calculators?.homeTitle} {t.calculators?.homeAccent}
              </h2>
              <p className="mx-auto mt-5 max-w-[560px] text-[16px] text-[#1C2418]/65">{t.calculators?.homeSubtitle}</p>
            </Reveal>
            <div className="mt-12 text-center">
              <ServiceCalculators ids={calcIds} meta={t.calculators || {}} />
            </div>
            <div className="mt-10 text-center">
              <Link
                to="/kalkulacky"
                className="text-[14px] font-semibold text-[#7A6A2B] underline-offset-4 hover:underline"
                data-testid="service-all-calcs"
              >
                {t.calculators?.all} →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {d.faq?.length > 0 && (
        <section className="bg-white py-24 md:py-32">
          <div className="container-x max-w-[820px]">
            <Reveal>
              <h2 className="text-[36px] font-normal tracking-tight text-[#1C2418] md:text-[48px]">{common.faqTitle}</h2>
              <p className="mt-4 text-[17px] text-[#1C2418]/65">{common.faqSub}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <Accordion type="single" collapsible className="mt-10">
                {d.faq.map((f, i) => (
                  <AccordionItem key={f.q} value={`q${i}`} className="border-b border-[#1C2418]/10">
                    <AccordionTrigger className="py-5 text-left text-[17px] font-medium text-[#1C2418] hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-[15.5px] leading-relaxed text-[#1C2418]/70">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>
      )}

      {/* Booking CTA */}
      <section className="bg-[#1C2418] py-24 md:py-32" data-testid="service-cta">
        <div className="container-x max-w-[720px] text-center">
          <Reveal>
            <h2 className="font-display text-[44px] leading-[1.02] text-white md:text-[60px]">
              {d.cta?.title || item.title}
            </h2>
            {d.cta?.sub && <p className="mx-auto mt-6 max-w-[520px] text-[17px] text-white/60">{d.cta.sub}</p>}
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href={links.booking}
                target="_blank"
                rel="noreferrer"
                className="btn-lime inline-flex h-12 items-center gap-2 px-7 text-[15px]"
                data-testid="service-booking"
              >
                <CalendarCheck size={17} />
                {common.ctaPrimary}
              </a>
              <Link
                to="/kontakt"
                className="inline-flex h-12 items-center gap-2 rounded-[12px] bg-white/10 px-7 text-[15px] font-medium text-white transition-colors hover:bg-white/20"
                data-testid="service-contact"
              >
                <MessageCircle size={17} />
                {common.ctaSecondary}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
