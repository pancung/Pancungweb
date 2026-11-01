import React from "react";
import Hero from "../components/Hero";
import TopicPicker from "../components/TopicPicker";
import GoldIntro from "../components/teya/GoldIntro";
import AboutSection from "../components/AboutSection";
import FaqSection from "../components/FaqSection";
import CtaSection from "../components/CtaSection";

// Homepage = router, not a catalogue. One question ("what are you dealing with?"),
// then trust, then one call to action. Each topic lives on its own funnel page.
// (The former Teya-style sections – bento grids, 3D card, app mock, case study,
// placeholder testimonials – are no longer rendered here; the components still exist.)
export default function Home() {
  return (
    <>
      <Hero />
      <TopicPicker />
      <GoldIntro />
      <AboutSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
