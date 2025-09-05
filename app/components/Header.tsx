"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { useTranslate } from "../hooks/useTranslate";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const { t } = useTranslate();

  return (
    <header className={styles.header}>
      
      <div className={styles.logo}>
        energy.<span>flow</span>
      </div>

      
      <nav className={styles.nav}>
        <Link href="/" className={`${styles.navItem} ${styles.active}`}>
          {t("home")}
        </Link>
        <Link href="/favorites" className={styles.navItem}>
          {t("favorites")}
        </Link>
      </nav>

     
      <div className={styles.langSwitcher}>
        <LanguageSwitcher />
      </div>

     
      <div className={styles.socials}>
        <a href="https://www.facebook.com/goITclub/"><FaFacebookF /></a>
        <a href="https://www.instagram.com/goitclub/"><FaInstagram /></a>
        <a href="https://www.youtube.com/c/GoIT"><FaYoutube /></a>
      </div>
    </header>
  );
}
