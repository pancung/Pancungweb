import React from "react";
import Hero from "../components/Hero";
import ServiceCards from "../components/ServiceCards";
import NumbersStrip from "../components/NumbersStrip";
import AboutSection from "../components/AboutSection";
import WealthSection from "../components/WealthSection";
import JourneySection from "../components/JourneySection";
import SystemSection from "../components/SystemSection";
import DashboardSection from "../components/DashboardSection";
import CalculatorsPreview from "../components/CalculatorsPreview";
import CaseStudy from "../components/CaseStudy";
import SocialSection from "../components/SocialSection";
import Testimonials from "../components/Testimonials";
import CtaSection from "../components/CtaSection";
import FaqSection from "../components/FaqSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceCards />
      <NumbersStrip />
      <AboutSection />
      <WealthSection />
      <JourneySection />
      <SystemSection />
      <DashboardSection />
      <CalculatorsPreview />
      <CaseStudy />
      <SocialSection />
      <Testimonials />
      <CtaSection />
      <FaqSection />
    </>
  );
}
