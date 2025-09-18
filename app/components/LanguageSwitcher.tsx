// "use client";

// import React from "react";
// import { useTranslate } from "../hooks/useTranslate";
// import styles from "./LanguageSwitcher.module.css";

// type Lang = "en" | "pl" | "ua";

// const LanguageSwitcher = () => {
//   const { lang, changeLang } = useTranslate();

//   const languages: { code: Lang; label: string;  }[] = [
//     { code: "en", label: "EN"},
//     { code: "pl", label: "PL" },
//     { code: "ua", label: "UA" },
//   ];

//   return (
//     <div className={styles.switcher}>
//       {languages.map(({ code, label }) => (
//         <button
//           key={code}
//           onClick={() => changeLang(code)}
//           className={`${styles.btn} ${lang === code ? styles.active : ""}`}
//           aria-pressed={lang === code}
//           disabled={lang === code}
//         >
          
//           <span className={styles.label}>{label}</span>
//         </button>
//       ))}
//     </div>
//   );
// };

// export default LanguageSwitcher;

//////////////////////////////////////////////

"use client";

import React from "react";
import { useTranslate } from "../hooks/useTranslate";
import styles from "./LanguageSwitcher.module.css";

type Lang = "en" | "pl" | "ua";

const LanguageSwitcher = () => {
  const { lang, changeLang } = useTranslate();

  const languages: { code: Lang; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "pl", label: "PL" },
    { code: "ua", label: "UA" },
  ];

  return (
    <div className={styles.switcher}>
      <select
        className={styles.select}
        value={lang}
        onChange={(e) => changeLang(e.target.value as Lang)}
      >
        {languages.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;



