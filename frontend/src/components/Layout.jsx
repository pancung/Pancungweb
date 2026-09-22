import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { CookieBanner, FloatingChat } from "./Overlays";
import { Toaster } from "./ui/sonner";
import { useScrollMap } from "../hooks/useScrollMap";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useScrollMap(scrollYProgress, [0, 1], [0, 1]);
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-[#D9B44A]" aria-hidden="true" data-testid="scroll-progress" />;
}

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, location.hash]);

  return (
    <div className="App">
      <ScrollProgress />
      <Navbar />
      <motion.main id="main-content" key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: "easeOut" }}>
        <Outlet />
      </motion.main>
      <Footer />
      <CookieBanner />
      <FloatingChat />
      <Toaster position="top-center" richColors />
    </div>
  );
}
