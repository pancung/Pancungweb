import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { CookieBanner, FloatingChat } from "./Overlays";
import { Toaster } from "./ui/sonner";

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
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
      <FloatingChat />
      <Toaster position="top-center" richColors />
    </div>
  );
}
