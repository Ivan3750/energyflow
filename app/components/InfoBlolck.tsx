"use client";

import styles from "./InfoBlock.module.css";
import { useTranslate } from "../hooks/useTranslate";

export default function InfoBlock() {
  const { t } = useTranslate();

  return (
    <section className={styles.infoBlock}>
      <div className={styles.left}>
        <img src="./InfoBlock.png" alt="Sports girl" className={styles.image} />
      </div>

      <div className={styles.right}>
        <h2>
          <span className={styles.icon}>
            <img src="./iconInfoBlock.png" alt="" />
          </span>{" "}
          {t("info_time")}
        </h2>
        <p className={styles.subtitle}>{t("info_subtitle")}</p>
        <p className={styles.text}>{t("info_text")}</p>
      </div>
    </section>
  );
}
