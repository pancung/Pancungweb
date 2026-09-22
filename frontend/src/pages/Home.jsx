import React from "react";
import Hero from "../components/Hero";
import CardIntro from "../components/teya/CardIntro";
import GoldIntro from "../components/teya/GoldIntro";
import BentoGrid from "../components/teya/BentoGrid";
import AppSection from "../components/teya/AppSection";
import CalculatorsPreview from "../components/CalculatorsPreview";
import CaseStudy from "../components/CaseStudy";
import Testimonials from "../components/Testimonials";
import CtaSection from "../components/CtaSection";
import FaqSection from "../components/FaqSection";

export default function Home() {
  return (
    <>
      <Hero />
      <CardIntro />
      <GoldIntro />
      <BentoGrid />
      <AppSection />
      <CalculatorsPreview />
      <CaseStudy />
      <Testimonials />
      <CtaSection />
      <FaqSection />
    </>
  );
}
