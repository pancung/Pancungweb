import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import PackagesPage from "./pages/PackagesPage";
import ContactPage from "./pages/ContactPage";
import CalculatorsPage from "./pages/CalculatorsPage";
import JakPracujiPage from "./pages/JakPracujiPage";
import ServicePage from "./pages/ServicePage";
import FunnelPage, { FunnelLayout, FunnelThanks } from "./pages/FunnelPage";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          {/* Ad landing pages: own minimal layout, no site navigation */}
          <Route element={<FunnelLayout />}>
            <Route path="/tema/:slug" element={<FunnelPage />} />
            <Route path="/tema/:slug/dekujeme" element={<FunnelThanks />} />
          </Route>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/zivotni-pojisteni" element={<ProductPage type="life" />} />
            <Route path="/investicni-pojisteni" element={<ProductPage type="invest" />} />
            <Route path="/balicky" element={<PackagesPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="/kalkulacky" element={<CalculatorsPage />} />
            <Route path="/jak-pracuji" element={<JakPracujiPage />} />
            <Route path="/sluzby/:slug" element={<ServicePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
