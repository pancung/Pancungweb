import React from "react";
import Hero from "../components/Hero";
import GoldIntro from "../components/teya/GoldIntro";
import BentoGrid from "../components/teya/BentoGrid";
import NumbersStrip from "../components/NumbersStrip";
import CardIntro from "../components/teya/CardIntro";
import AboutSection from "../components/AboutSection";
import AppSection from "../components/teya/AppSection";
import CalculatorsPreview from "../components/CalculatorsPreview";
import CaseStudy from "../components/CaseStudy";
import Testimonials from "../components/Testimonials";
import CtaSection from "../components/CtaSection";
import FaqSection from "../components/FaqSection";

// Section order mirrors teya.com: hero → product intro → bento row → stats → 3D card → card panel + bento → app → …
export default function Home() {
  return (
    <>
      <Hero />
      <GoldIntro />
      <BentoGrid part="top" />
      <NumbersStrip />
      <CardIntro />
      <BentoGrid part="bottom" />
      <AboutSection />
      <AppSection />
      <CalculatorsPreview />
      <CaseStudy />
      <Testimonials />
      <CtaSection />
      <FaqSection />
    </>
  );
}
