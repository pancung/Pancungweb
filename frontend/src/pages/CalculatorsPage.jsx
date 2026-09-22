import React from "react";
import { useSearchParams } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "../components/IntroSection";
import { ScribbleWord } from "../components/CalculatorSection";
import CalculatorHub, { CALC_TABS } from "../components/CalculatorHub";
import CtaSection from "../components/CtaSection";
import FaqSection from "../components/FaqSection";

export default function CalculatorsPage() {
  const { t } = useLang();
  const c = t.calculators;
  const [params, setParams] = useSearchParams();
  const tab = CALC_TABS.includes(params.get("k")) ? params.get("k") : "invest";

  return (
    <div data-testid="calculators-page">
      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#F4F2EA_100%)] pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="container-x">
          <Reveal className="text-center">
            <span className="section-label">{c.label}</span>
            <h1 className="font-display mx-auto mt-4 max-w-[900px] text-[44px] leading-[1.02] text-[#232B1E] md:text-[68px]">{c.pageTitle} <ScribbleWord>{c.accent}</ScribbleWord></h1>
            <p className="mx-auto mt-6 max-w-[600px] text-[16px] text-[#1C2418]/65">{c.pageSubtitle}</p>
          </Reveal>
          <div className="mt-14"><CalculatorHub tab={tab} onTab={(k) => setParams({ k }, { replace: true })} /></div>
        </div>
      </section>
      <CtaSection />
      <FaqSection />
    </div>
  );
}
