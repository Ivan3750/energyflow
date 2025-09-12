"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Translations = Record<string, string>;

interface TranslateContextProps {
  t: (key: string) => string;
  lang: string;
  changeLang: (lang: string) => void;
}

const TranslateContext = createContext<TranslateContextProps | null>(null);

export const TranslateProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState("en");
  const [translations, setTranslations] = useState<Translations>({});

 
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    setLang(savedLang);
  }, []);

  
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const res = await fetch(`/locales/${lang}.json`);
        const data = await res.json();
        setTranslations(data);
        localStorage.setItem("lang", lang);
      } catch (error) {
        console.error("Ошибка загрузки переводов:", error);
      }
    };

    loadTranslations();
  }, [lang]);

  const t = (key: string) => translations[key] || key;

  return (
    <TranslateContext.Provider value={{ t, lang, changeLang: setLang }}>
      {children}
    </TranslateContext.Provider>
  );
};

export const useTranslate = () => {
  const context = useContext(TranslateContext);
  if (!context) throw new Error("useTranslate must be used within TranslateProvider");
  return context;
};
