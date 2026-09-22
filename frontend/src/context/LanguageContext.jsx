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
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      return saved === "vi" || saved === "cs" ? saved : "cs";
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
