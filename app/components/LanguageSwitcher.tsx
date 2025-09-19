"use client";

import { useState } from "react";
import { useTranslate } from "../hooks/useTranslate";
import { IoIosArrowRoundDown } from "react-icons/io";
import styles from "./LanguageSwitcher.module.css";

type Lang = "en" | "pl" | "ua";

export default function LanguageSwitcher() {
  const { lang, changeLang } = useTranslate();
  const [open, setOpen] = useState(false);

  const languages: { code: Lang; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "pl", label: "PL" },
    { code: "ua", label: "UA" },
  ];

  const handleSelect = (code: Lang) => {
    changeLang(code);
    setOpen(false);
  };

  return (
    <div className={styles.switcher}>
      <div className={styles.langWrapper} onClick={() => setOpen(!open)}>
        <span className={styles.currentLang}>{lang.toUpperCase()}</span>
        <IoIosArrowRoundDown
          className={`${styles.langArrow} ${open ? styles.open : ""}`}
        />
      </div>

      {open && (
        <div className={styles.langList}>
          {languages.map(({ code, label }) => (
            <div
              key={code}
              className={styles.langOption}
              onClick={() => handleSelect(code)}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
