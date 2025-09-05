// components/TranslateProvider.jsx

"use client";

import { useState, useEffect, useContext, createContext } from "react";

// Создаем контекст
const TranslateContext = createContext(null);

// Компонент-провайдер, который управляет состоянием переводов
export function TranslateProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [translations, setTranslations] = useState(null);
  
  // Инициализируем язык как null, чтобы избежать ошибок гидрации.
  // Фактическое значение будет получено в useEffect.
  const [lang, setLang] = useState(null);

  // useEffect для инициализации языка из localStorage только на клиенте.
  // Этот хук выполнится только один раз при монтировании компонента.
  useEffect(() => {
    const storedLang = localStorage.getItem("lang") || "en";
    setLang(storedLang);
  }, []);

  // useEffect для загрузки переводов при изменении языка.
  useEffect(() => {
    // Если lang еще не установлен (например, при первом рендере на сервере),
    // выходим из хука.
    if (!lang) {
      return;
    }

    // Сохраняем выбранный язык в localStorage
    localStorage.setItem("lang", lang);

    const loadLang = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/locales/${lang}.json`);
        if (!response.ok) {
          throw new Error("Failed to load translation");
        }
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error("Error loading translations:", error);
        setTranslations(null);
      } finally {
        setLoading(false);
      }
    };
    loadLang();
  }, [lang]); // Этот хук будет перезапускаться при каждом изменении `lang`

  return (
    <TranslateContext.Provider value={{ translations, loading, lang, setLang }}>
      {children}
    </TranslateContext.Provider>
  );
}

// Хук для использования перевода в дочерних компонентах
export function useTranslate() {
  const context = useContext(TranslateContext);
  if (!context) {
    throw new Error("useTranslate must be used within a TranslateProvider");
  }
  return context;
}