import React from "react";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "../components/IntroSection";
import { ScribbleWord } from "../components/CalculatorSection";
import ServiceCards from "../components/ServiceCards";
import WealthSection from "../components/WealthSection";
import JourneySection from "../components/JourneySection";
import SystemSection from "../components/SystemSection";
import DashboardSection from "../components/DashboardSection";
import SocialSection from "../components/SocialSection";
import CtaSection from "../components/CtaSection";

export default function JakPracujiPage() {
  const { t } = useLang();
  const j = t.jakPracuji;
  return (
    <div data-testid="jak-pracuji-page">
      <section className="bg-[linear-gradient(180deg,#F4F2EA_0%,#ffffff_100%)] pt-32 md:pt-40">
        <div className="container-x">
          <Reveal className="text-center">
            <span className="section-label">{j.label}</span>
            <h1 className="font-display mx-auto mt-4 max-w-[900px] text-[48px] leading-[1.02] text-[#232B1E] md:text-[76px]">{j.title} <ScribbleWord>{j.accent}</ScribbleWord></h1>
            <p className="mx-auto mt-6 max-w-[600px] text-[16px] text-[#1C2418]/65">{j.subtitle}</p>
          </Reveal>
        </div>
      </section>
      <ServiceCards />
      <WealthSection />
      <JourneySection />
      <SystemSection />
      <DashboardSection />
      <SocialSection />
      <CtaSection />
    </div>
  );
}
