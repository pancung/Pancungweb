import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import cs from "../data/cs";
import vi from "../data/vi";

const LANG_KEY = "tcat_lang";
const dictionaries = { cs, vi };

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
