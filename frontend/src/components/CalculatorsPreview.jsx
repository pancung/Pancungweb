import React, { useState } from "react";
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
          <span className="section-label">{c.label}</span>
          <h2 className="font-display mx-auto mt-4 max-w-[900px] text-[44px] leading-[1.02] text-[#232B1E] md:text-[64px]"><WordReveal text={c.title} /> <ScribbleWord>{c.accent}</ScribbleWord></h2>
          <p className="mx-auto mt-6 max-w-[580px] text-[16px] text-[#1C2418]/65">{c.subtitle}</p>
        </Reveal>
        <div className="mt-14"><CalculatorHub tab={tab} onTab={setTab} /></div>
      </div>
    </section>
  );
}
