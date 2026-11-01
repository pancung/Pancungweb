import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import cs from "../data/cs";
import vi from "../data/vi";
import finance from "../data/finance";
import teya from "../data/teya";

const LANG_KEY = "tcat_lang";
// Finance + Teya-style content overrides/extends the base dictionaries
const dictionaries = { cs: { ...cs, ...finance.cs, ...teya.cs }, vi: { ...vi, ...finance.vi, ...teya.vi } };

const LanguageContext = createContext({ lang: "cs", setLang: () => {}, t: cs });

export function LanguageProvider({ children }) {
  // Priority: ?lang=vi|cs in the URL (ad links) → saved choice → browser language → cs.
  const [lang, setLangState] = useState(() => {
    const ok = (v) => v === "vi" || v === "cs";
    try {
      const fromUrl = new URLSearchParams(window.location.search).get("lang");
      if (ok(fromUrl)) {
        localStorage.setItem(LANG_KEY, fromUrl);
        return fromUrl;
      }
      const saved = localStorage.getItem(LANG_KEY);
      if (ok(saved)) return saved;
      return (navigator.language || "").toLowerCase().startsWith("vi") ? "vi" : "cs";
    } catch {
      return "cs";
    }
  });

  const setLang = (l) => {
    setLangState(l);
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: dictionaries[lang] }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLang = () => useContext(LanguageContext);
