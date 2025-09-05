"use client";

import styles from "./Hero.module.css";
import { useTranslate } from "../hooks/useTranslate";

export default function Hero() {
  const { t } = useTranslate();

  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <img src="/hero.png" alt="Fitness girl" className={styles.heroImage} />

        <div className={styles.hashtags}>
          <span>{t("hero_hashtag1")}</span>
          <span>{t("hero_hashtag2")}</span>
          <span>{t("hero_hashtag3")}</span>
          <span>{t("hero_hashtag4")}</span>
        </div>
      </div>

      <div className={styles.right}>
        <h1>
          {t("hero_title_part1")} <em>{t("hero_title_em")}</em>{" "}
          {t("hero_title_part2")}
        </h1>
        <p>{t("hero_subtitle")}</p>
      </div>
    </section>
  );
}
