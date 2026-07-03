import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LangContext = createContext();
const LANG_KEY = 'nexora-lang';

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const stored = localStorage.getItem(LANG_KEY);
      return stored === 'fr' ? 'fr' : 'en';
    } catch {
      return 'en';
    }
  });

  const setLang = (next) => {
    setLangState(next);
    try {
      localStorage.setItem(LANG_KEY, next);
    } catch {
      /* storage unavailable */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
