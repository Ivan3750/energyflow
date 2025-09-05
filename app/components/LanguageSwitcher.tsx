"use client";

import React from "react";
import { useTranslate } from "../hooks/useTranslate";
import styles from "./LanguageSwitcher.module.css";

type Lang = "en" | "pl" | "ua";

const LanguageSwitcher = () => {
  const { lang, changeLang } = useTranslate();

  const languages: { code: Lang; label: string; flag: string }[] = [
    { code: "en", label: "EN", flag: "🇬🇧" },
    { code: "pl", label: "PL", flag: "🇵🇱" },
    { code: "ua", label: "UA", flag: "🇺🇦" },
  ];

  return (
    <div className={styles.switcher}>
      {languages.map(({ code, label, flag }) => (
        <button
          key={code}
          onClick={() => changeLang(code)}
          className={`${styles.btn} ${lang === code ? styles.active : ""}`}
          aria-pressed={lang === code}
          disabled={lang === code}
        >
          <span className={styles.flag}>{flag}</span>
          <span className={styles.label}>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
