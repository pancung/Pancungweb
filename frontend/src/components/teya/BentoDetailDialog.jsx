import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";
import { X, Check, Plus, Wallet, TrendingUp, ShieldCheck } from "lucide-react";
import { useLang } from "../../context/LanguageContext";
import bentoDetails from "../../data/bentoDetails";
import { links } from "../../mock";
import { Sparkline, Ring, GOLD } from "../finance/charts";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";

const stepIcons = [Wallet, TrendingUp, ShieldCheck];

function StepArt({ step, i }) {
  const Icon = stepIcons[i % 3];
  return (
    <div className="flex aspect-[4/3] w-full items-center justify-center rounded-[28px] bg-[linear-gradient(160deg,#FFFDF7_0%,#F1E6C4_55%,#D9B44A_100%)] p-8">
      <div className="w-[240px] rounded-[18px] bg-white p-5 shadow-[0_30px_60px_-30px_rgba(28,36,24,0.45)] ring-1 ring-black/5">
        <div className="flex items-center justify-between">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1C2418] text-[#D9B44A]"><Icon size={16} /></span>
          <span className="text-[10px] font-semibold tracking-[0.16em] text-[#1C2418]/45">{step.n}</span>
        </div>
        <div className="mt-4 text-[11px] text-[#1C2418]/50">{step.stat[0]}</div>
        <div className="mt-1 text-[22px] font-semibold leading-none tracking-tight">{step.stat[1]}</div>
        <div className="mt-4 flex items-center justify-between">
          {i % 3 === 1 ? <Ring value={0.72} size={44} thickness={6}><span className="text-[9px] font-semibold">72 %</span></Ring> : <Sparkline data={i % 3 === 0 ? [2, 3, 3.5, 4.4, 5, 6.2, 7, 8] : [4, 4.2, 4.1, 4.5, 4.6, 4.8, 5, 5.2]} w={140} h={36} color={GOLD} />}
          <span className="flex -space-x-1.5">{["#D9B44A", "#8A9A5B", "#F1E6C4"].map((c) => <span key={c} className="h-5 w-5 rounded-full border-2 border-white" style={{ background: c }} />)}</span>
        </div>
      </div>
    </div>
  );
}

export function BentoDetailDialog({ id, data, open, onOpenChange, visual }) {
  const { lang } = useLang();
  const dict = bentoDetails[lang] || bentoDetails.cs;
  const d = dict[id];
  const c = dict.common;
  if (!d) return null;
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[80] overflow-y-auto bg-[#1C2418]/40 backdrop-blur-[6px] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0">
          <div className="flex min-h-full items-start justify-center px-3 py-6 md:py-14">
            <DialogPrimitive.Content className="relative w-full max-w-[1100px] rounded-2xl bg-white shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" data-testid={`bento-dialog-${id}`}>
              <DialogPrimitive.Title className="sr-only">{data.title}</DialogPrimitive.Title>
              <DialogPrimitive.Description className="sr-only">{d.intro}</DialogPrimitive.Description>

              <div className="pointer-events-none sticky top-0 z-20 h-0">
                <div className="flex justify-end p-4 md:p-6">
                  <DialogPrimitive.Close className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white text-[#1C2418] shadow-sm transition-colors hover:bg-[#F4F2EA]" aria-label={c.close} data-testid={`bento-dialog-close-${id}`}><X size={18} /></DialogPrimitive.Close>
                </div>
              </div>

              <div className="relative p-6 md:p-12 lg:p-16">
                {/* Header */}
                <section className="-mx-6 -mt-6 rounded-t-2xl bg-[#F7F5F0] px-6 pb-16 pt-16 md:-mx-12 md:-mt-12 md:px-12 md:pb-24 md:pt-20 lg:-mx-16 lg:-mt-16 lg:px-16">
                  <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                    <div>
                      <span className="inline-flex items-center gap-2 text-[12px] font-medium text-[#1C2418]/70"><span className="h-1.5 w-1.5 rounded-full bg-[#D9B44A]" />{data.label.charAt(0) + data.label.slice(1).toLowerCase()}</span>
                      <h2 className="font-display mt-5 max-w-[520px] text-[44px] leading-[1.02] text-[#1C2418] md:text-[64px]">{data.title}</h2>
                      <p className="mt-6 max-w-[520px] text-[16px] leading-relaxed text-[#1C2418]/70 md:text-[17px]">{d.intro}</p>
                      <div className="mt-8 flex flex-wrap gap-3">
                        <a href={links.booking} target="_blank" rel="noreferrer" className="btn-lime inline-flex h-12 items-center px-6 text-[15px]" data-testid={`bento-dialog-cta-${id}`}>{c.primary}</a>
                        <Link to="/jak-pracuji" className="inline-flex h-12 items-center rounded-[12px] bg-white px-6 text-[15px] font-semibold text-[#1C2418] ring-1 ring-black/10 transition-colors hover:bg-[#F4F2EA]">{c.secondary}</Link>
                      </div>
                      <ul className="mt-8 space-y-2.5">
                        {d.bullets.map((b) => <li key={b} className="flex items-start gap-2.5 text-[14px] text-[#1C2418]/80"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1C2418]" />{b}</li>)}
                      </ul>
                    </div>
                    <div className="flex justify-center lg:justify-end"><div className="w-full max-w-[420px]">{visual}</div></div>
                  </div>
                </section>

                {/* Steps */}
                {d.steps.map((s, i) => (
                  <section key={s.n} className="py-16 md:py-24" data-testid={`bento-dialog-step-${id}-${i}`}>
                    <div className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                      <div>
                        <div className="text-[13px] font-semibold tracking-[0.14em] text-[#1C2418]/50">{s.n}</div>
                        <h3 className="font-display mt-3 text-[34px] leading-[1.05] text-[#1C2418] md:text-[44px]">{s.title}</h3>
                        <p className="mt-4 max-w-[480px] text-[16px] leading-relaxed text-[#1C2418]/70">{s.desc}</p>
                        <ul className="mt-6 space-y-2.5">
                          {s.checks.map((ch) => <li key={ch} className="flex items-start gap-2.5 text-[14.5px] text-[#1C2418]/80"><Check size={15} className="mt-1 shrink-0 text-[#7A6A2B]" />{ch}</li>)}
                        </ul>
                      </div>
                      <StepArt step={s} i={i} />
                    </div>
                  </section>
                ))}

                {/* FAQ */}
                <section className="border-t border-black/5 py-16 md:py-24">
                  <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                    <div>
                      <h3 className="font-display text-[34px] leading-[1.05] text-[#1C2418] md:text-[40px]">{c.faqTitle}</h3>
                      <p className="mt-3 text-[15px] text-[#1C2418]/60">{c.faqSub}</p>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                      {d.faq.map((f, i) => (
                        <AccordionItem key={i} value={`f-${i}`} className="border-black/10">
                          <AccordionTrigger className="py-4 text-left text-[15px] font-medium hover:no-underline [&>svg]:hidden" data-testid={`bento-dialog-faq-${id}-${i}`}><span className="flex-1">{f.q}</span><Plus size={16} className="ml-4 shrink-0 text-[#1C2418]/60" /></AccordionTrigger>
                          <AccordionContent className="text-[14.5px] leading-relaxed text-[#1C2418]/70">{f.a}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </section>

                {/* CTA */}
                <section className="pb-4 pt-8 md:pt-12">
                  <div className="rounded-[28px] bg-[#D9B44A] px-8 py-14 text-center md:px-16 md:py-16">
                    <h3 className="font-display text-[34px] leading-[1.05] text-[#1C2418] md:text-[44px]">{d.cta.title}</h3>
                    <p className="mt-4 text-[16px] text-[#1C2418]/75">{d.cta.sub}</p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                      <a href={links.booking} target="_blank" rel="noreferrer" className="btn-ink inline-flex h-12 items-center px-6 text-[15px]">{c.ctaPrimary}</a>
                      <Link to="/kontakt" state={{ interest: data.title }} className="inline-flex h-12 items-center rounded-[12px] px-6 text-[15px] font-semibold text-[#1C2418] ring-1 ring-[#1C2418]/40 transition-colors hover:bg-[#1C2418]/10" data-testid={`bento-dialog-message-${id}`}>{c.ctaSecondary}</Link>
                    </div>
                  </div>
                </section>
              </div>
            </DialogPrimitive.Content>
          </div>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
