import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "./IntroSection";
import { ScribbleWord } from "./CalculatorSection";
import { WordReveal } from "./motion/WordReveal";
import CalculatorHub from "./CalculatorHub";

export default function CalculatorsPreview() {
  const { t } = useLang();
  const c = t.calculators;
  const [tab, setTab] = useState("invest");
  return (
    <section id="kalkulacky" className="bg-[#F4F2EA] py-24 md:py-32" data-testid="calculators-preview">
      <div className="container-x">
        <Reveal className="text-center">
          <span className="section-label">{c.homeLabel}</span>
          <h2 className="font-display mx-auto mt-4 max-w-[900px] text-[44px] leading-[1.02] text-[#232B1E] md:text-[64px]"><WordReveal text={c.homeTitle} /> <ScribbleWord>{c.homeAccent}</ScribbleWord></h2>
          <p className="mx-auto mt-6 max-w-[560px] text-[16px] text-[#1C2418]/65">{c.homeSubtitle}</p>
        </Reveal>
        <div className="mt-12 text-center"><CalculatorHub tab={tab} onTab={setTab} compact /></div>
        <div className="mt-8 text-center">
          <Link to={`/kalkulacky?k=${tab}`} className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#7A6A2B] transition-colors hover:text-[#1C2418]" data-testid="calculators-all-link">{c.all}<ArrowRight size={15} /></Link>
        </div>
      </div>
    </section>
  );
}
