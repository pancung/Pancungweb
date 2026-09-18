import React from "react";
import Hero from "../components/Hero";
import IntroSection from "../components/IntroSection";
import FeatureCards from "../components/FeatureCards";
import AboutSection from "../components/AboutSection";
import CalculatorSection from "../components/CalculatorSection";
import VideoSection from "../components/VideoSection";
import HowSection from "../components/HowSection";
import Testimonials from "../components/Testimonials";
import CtaSection from "../components/CtaSection";
import FaqSection from "../components/FaqSection";

export default function Home() {
  return (
    <>
      <Hero />
      <IntroSection />
      <FeatureCards />
      <AboutSection />
      <CalculatorSection />
      <VideoSection />
      <HowSection />
      <Testimonials />
      <CtaSection />
      <FaqSection />
    </>
  );
}
