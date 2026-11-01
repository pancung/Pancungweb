import React, { useEffect, useRef } from "react";
import { Link, Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { ArrowDown, CalendarCheck, Check, ExternalLink, MapPin } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import Logo from "../components/Logo";
import { Reveal } from "../components/IntroSection";
import { FlagCZ, FlagVN } from "../components/Navbar";
import { CookieBanner } from "../components/Overlays";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import BudgetCalc, { BudgetPlan, BUDGET_STORAGE } from "../components/funnel/BudgetCalc";
import funnels from "../data/funnels";
import { funnelMedia, images, links } from "../mock";
import { track } from "../lib/track";

// Calculators per topic. A topic without an entry here is not live yet.
const CALCS = { "prijmy-a-vydaje": BudgetCalc };

const useFunnel = () => {
  const { lang } = useLang();
  return funnels[lang] || funnels.cs;
};

/* Landing pages get no site navigation: logo + language only, so the only way forward is the funnel. */
export function FunnelLayout() {
  const { lang, setLang } = useLang();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" }); // braces: newer Chrome returns a Promise here
  }, [pathname]);
  const f = useFunnel();
  return (
    <div className="App min-h-screen bg-[#FBFAF6]">
      <header className="absolute inset-x-0 top-0 z-40 print:hidden">
        <div className="container-x flex h-[72px] items-center justify-between">
          <Logo dark />
          <div className="flex rounded-full bg-white/10 p-1 ring-1 ring-white/15 backdrop-blur" role="group" aria-label={f.common.lang}>
            {[["vi", FlagVN, "VI"], ["cs", FlagCZ, "CS"]].map(([code, Flag, label]) => (
              <button key={code} type="button" onClick={() => setLang(code)} aria-pressed={lang === code} className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-semibold ${lang === code ? "bg-white text-[#1C2418]" : "text-white/80"}`} data-testid={`funnel-lang-${code}`}>
                <Flag size={15} />{label}
              </button>
            ))}
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="border-t border-black/5 bg-[#FBFAF6] py-10 print:hidden">
        <div className="container-x space-y-2 text-[12px] leading-relaxed text-[#1C2418]/50">
          <p>© {new Date().getFullYear()} Pan Čung · {f.common.cnb}</p>
          <p>{f.common.footerNote}</p>
        </div>
      </footer>
      <CookieBanner />
    </div>
  );
}

function Booking({ id = "rezervace" }) {
  const f = useFunnel();
  const c = f.common;
  return (
    <section id={id} className="bg-[#1C2418] py-20 text-white md:py-28 print:hidden" data-testid="funnel-booking">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <span className="text-[12px] font-semibold tracking-[0.16em] text-[#D9B44A]">{c.offerLabel}</span>
          <h2 className="mt-4 text-[34px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[44px]">{c.offerTitle}</h2>
          <ul className="mt-7 space-y-3.5">
            {c.offerItems.map((it) => (
              <li key={it} className="flex gap-3 text-[15.5px] leading-snug text-white/85">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D9B44A] text-[#1C2418]"><Check size={13} strokeWidth={3} /></span>{it}
              </li>
            ))}
          </ul>
          <p className="mt-6 inline-flex items-center gap-2 text-[14px] text-white/60"><MapPin size={15} />{c.offerWhere}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-[24px] bg-white">
            <iframe title={c.bookTitle} src={links.booking} className="block h-[640px] w-full md:h-[720px]" loading="lazy" data-testid="booking-iframe" />
          </div>
          <a href={links.booking} target="_blank" rel="noreferrer" onClick={() => track("Schedule", { via: "fallback" })} className="mt-3 inline-flex items-center gap-1.5 text-[13px] text-white/55 underline-offset-4 hover:underline">
            <ExternalLink size={13} />{c.bookFallback}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
const goBook = (via) => {
  track("Schedule", { via });
  scrollToId("rezervace");
};

export default function FunnelPage() {
  const { slug } = useParams();
  const { lang } = useLang();
  const f = useFunnel();
  const topic = f.topics[slug];
  const Calc = CALCS[slug];
  const viewed = useRef(false);

  useEffect(() => {
    if (topic && !viewed.current) {
      viewed.current = true;
      track("ViewContent", { topic: slug, content_name: slug });
    }
  }, [topic, slug]);

  if (!topic || !Calc) return <Navigate to="/" replace />;
  const c = f.common;
  const media = funnelMedia[slug] || funnelMedia.default;

  return (
    <div data-testid={`funnel-${slug}`}>
      {/* 1 · Headline + VSL */}
      <section className="bg-[#1C2418] pb-14 pt-24 text-white md:pb-20 md:pt-28">
        <div className="container-x">
          <div className="mx-auto max-w-[860px] text-center">
            <span className="text-[12px] font-semibold tracking-[0.18em] text-[#D9B44A]">{topic.label}</span>
            <h1 className="mt-4 text-[32px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[52px]">
              {topic.title} <span className="text-[#D9B44A]">{topic.titleAccent}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[640px] text-[16px] leading-relaxed text-white/70 md:text-[18px]">{topic.subtitle}</p>
          </div>
          <div className="mx-auto mt-9 max-w-[960px] overflow-hidden rounded-[22px] bg-black shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] md:rounded-[30px]">
            <video className="aspect-video w-full object-cover" src={media.video} poster={media.poster} controls preload="metadata" playsInline onPlay={() => track("VideoPlay", { topic: slug })} data-testid="funnel-vsl" />
          </div>
          <div className="mt-7 flex flex-col items-center gap-3">
            <button type="button" onClick={() => scrollToId("kalkulacka")} className="btn-lime inline-flex h-13 items-center gap-2 px-8 py-3.5 text-[16px]" data-testid="funnel-hero-cta">
              {c.scrollCta}<ArrowDown size={17} />
            </button>
            <p className="text-[12.5px] text-white/45">{c.videoNote} · {c.trustLine}</p>
          </div>
        </div>
      </section>

      {/* 2 · Calculator + gate */}
      <section id="kalkulacka" className="scroll-mt-4 py-16 md:py-24">
        <div className="container-x">
          <Reveal className="mb-9 max-w-[720px]">
            <span className="section-label">{topic.calc.label}</span>
            <h2 className="mt-3 text-[32px] font-normal leading-[1.08] tracking-[-0.02em] text-[#1C2418] md:text-[44px]">{topic.calc.title}</h2>
            <p className="mt-3 text-[15.5px] text-[#1C2418]/60">{topic.calc.hint}</p>
          </Reveal>
          <Calc slug={slug} topic={topic} lang={lang} />
        </div>
      </section>

      {/* 3 · Three free tips */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-x">
          <Reveal className="max-w-[720px]">
            <span className="section-label">{topic.tipsLabel}</span>
            <h2 className="mt-3 text-[30px] font-normal leading-[1.1] tracking-[-0.02em] text-[#1C2418] md:text-[40px]">{topic.tipsTitle}</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {topic.tips.map((tip, i) => (
              <Reveal key={tip.title} delay={i * 0.08}>
                <div className="h-full rounded-[24px] bg-[#F4F2EA] p-7">
                  <span className="font-display text-[44px] leading-none text-[#D9B44A]">0{i + 1}</span>
                  <h3 className="mt-4 text-[20px] font-medium leading-snug text-[#1C2418]">{tip.title}</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[#1C2418]/65">{tip.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · Trust */}
      <section className="py-16 md:py-24">
        <div className="container-x grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="overflow-hidden rounded-[28px] bg-[#1C2418]">
              <img src={images.advisor} alt={c.trustName} className="aspect-[4/5] w-full object-cover" loading="lazy" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="section-label">{c.trustTitle}</span>
            <h2 className="mt-3 text-[34px] font-normal tracking-[-0.02em] text-[#1C2418] md:text-[44px]">{c.trustName}</h2>
            <p className="mt-1 text-[14px] font-medium text-[#7A6A2B]">{c.trustRole}</p>
            <p className="mt-5 max-w-[560px] text-[16px] leading-relaxed text-[#1C2418]/70">{c.trustText}</p>
            <div className="mt-7 grid grid-cols-3 gap-3">
              {c.trustFacts.map(([v, l]) => (
                <div key={l} className="rounded-[18px] bg-white p-4 ring-1 ring-black/5">
                  <div className="text-[20px] font-semibold text-[#1C2418] md:text-[24px]">{v}</div>
                  <div className="mt-1 text-[12px] leading-snug text-[#1C2418]/55">{l}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[12px] text-[#1C2418]/45">{c.cnb}</p>
          </Reveal>
        </div>
      </section>

      {/* 5 · Offer + booking */}
      <Booking />

      {/* 6 · FAQ */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-x max-w-[820px]">
          <h2 className="text-[30px] font-normal tracking-tight text-[#1C2418] md:text-[40px]">{c.faqTitle}</h2>
          <Accordion type="single" collapsible className="mt-8">
            {topic.faq.map((q, i) => (
              <AccordionItem key={q.q} value={`q${i}`} className="border-b border-[#1C2418]/10">
                <AccordionTrigger className="py-5 text-left text-[16.5px] font-medium text-[#1C2418] hover:no-underline">{q.q}</AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-relaxed text-[#1C2418]/70">{q.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 7 · Final CTA */}
      <section className="py-16 text-center md:py-24">
        <div className="container-x max-w-[720px]">
          <h2 className="text-[32px] font-normal leading-[1.1] tracking-[-0.02em] text-[#1C2418] md:text-[46px]">{topic.finalTitle}</h2>
          <p className="mt-4 text-[16px] text-[#1C2418]/60">{topic.finalSub}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => goBook("final")} className="btn-lime inline-flex h-12 items-center gap-2 px-7 text-[15px]" data-testid="funnel-final-book"><CalendarCheck size={17} />{c.finalCta}</button>
            <button type="button" onClick={() => scrollToId("kalkulacka")} className="inline-flex h-12 items-center rounded-[12px] border border-black/15 px-6 text-[15px] font-medium text-[#1C2418] hover:bg-black/5">{c.scrollCta}</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export function FunnelThanks() {
  const { slug } = useParams();
  const { state } = useLocation();
  const f = useFunnel();
  const topic = f.topics[slug];
  if (!topic) return <Navigate to="/" replace />;
  const th = f.thanks;

  let inputs = state?.inputs;
  if (!inputs) {
    try { inputs = JSON.parse(sessionStorage.getItem(BUDGET_STORAGE) || "null"); } catch { inputs = null; }
  }

  return (
    <div data-testid={`funnel-thanks-${slug}`}>
      <section className="bg-[#1C2418] pb-14 pt-24 text-white md:pt-28 print:bg-white print:pt-6 print:text-[#1C2418]">
        <div className="container-x max-w-[860px] text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#D9B44A] text-[#1C2418] print:hidden"><Check size={24} strokeWidth={3} /></span>
          <div className="mt-5 text-[12px] font-semibold tracking-[0.18em] text-[#D9B44A]">{th.label}</div>
          <h1 className="mt-3 text-[32px] font-normal leading-[1.1] tracking-[-0.02em] md:text-[46px]">{th.title}</h1>
          <p className="mt-4 text-[16px] text-white/70 print:text-[#1C2418]/70">{th.sub}</p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-x max-w-[960px] space-y-12">
          {inputs ? (
            <BudgetPlan topic={topic} inputs={inputs} onBook={() => goBook("thanks-plan")} />
          ) : (
            <Link to={`/tema/${slug}#kalkulacka`} className="text-[15px] font-semibold text-[#7A6A2B] underline underline-offset-4">{th.back}</Link>
          )}

          <div className="print:hidden">
            <h2 className="text-[26px] font-normal tracking-tight text-[#1C2418] md:text-[34px]">{th.stepsTitle}</h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-3">
              {th.steps.map((s, i) => (
                <li key={s.t} className="rounded-[22px] bg-white p-6 ring-1 ring-black/5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1C2418] text-[13px] font-semibold text-white">{i + 1}</span>
                  <h3 className="mt-4 text-[18px] font-medium text-[#1C2418]">{s.t}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#1C2418]/65">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Booking />
    </div>
  );
}
