import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "./IntroSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export default function FaqSection() {
  const { t } = useLang();
  const f = t.faq;
  return (
    <section id="faq" className="bg-[#1C2418] pb-28 pt-8 text-white md:pb-36 md:pt-12" data-testid="faq-section" data-nav="dark">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <Reveal>
          <h2 className="font-display text-[44px] leading-[1.05] md:text-[60px]">
            {f.title[0]}<br />
            <span className="font-script text-[#D9B44A]">{f.title[1]}</span>
          </h2>
          <p className="mt-6 max-w-[420px] text-[16px] leading-relaxed text-white/65">{f.subtitle}</p>
          <Link to="/kontakt" className="btn-lime mt-8 inline-flex h-11 items-center px-5 text-[14px]" data-testid="faq-cta">{f.cta}</Link>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
            {f.items.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                <AccordionTrigger className="group py-6 text-left text-[16px] font-medium hover:no-underline md:text-[17px] [&>svg]:hidden" data-testid={`faq-trigger-${i}`}>
                  <span className="pr-6">{item.q}</span>
                  <span className="plus shrink-0 text-[#D9B44A] transition-transform duration-300 group-data-[state=open]:rotate-45"><Plus size={20} /></span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-[15px] leading-relaxed text-white/65">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
