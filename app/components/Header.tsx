"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { FaFacebookF, FaInstagram, FaYoutube, FaUser } from "react-icons/fa";
import { useState } from "react";
import { useTranslate } from "../hooks/useTranslate";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const { t } = useTranslate();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          energy.<span>flow</span>
        </div>

        <nav className={styles.nav}>
          <Link
            href="/"
            className={`${styles.navItem} ${activeTab === "home" ? styles.active : ""}`}
            onClick={() => setActiveTab("home")}
          >
            {t("home")}
          </Link>
          <Link
            href="/favorites"
            className={`${styles.navItem} ${activeTab === "favorites" ? styles.active : ""}`}
            onClick={() => setActiveTab("favorites")}
          >
            {t("favorites")}
          </Link>
          <Link
            href="/about"
            className={`${styles.navItem} ${activeTab === "about" ? styles.active : ""}`}
            onClick={() => setActiveTab("about")}
          >
            {t("About")}
          </Link>
        </nav>

        <div className={styles.langSwitcher}>
          <LanguageSwitcher />
        </div>

        <div className={styles.socials}>
          <a href="https://www.facebook.com/goITclub/"><FaFacebookF /></a>
          <a href="https://www.instagram.com/goitclub/"><FaInstagram /></a>
          <a href="https://www.youtube.com/c/GoIT"><FaYoutube /></a>
          <a href="#"><FaUser /></a>
        </div>

        <div className={styles.burger} onClick={() => setMenuOpen(true)}>
          ☰
        </div>
      </header>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.closeBtn} onClick={() => setMenuOpen(false)}>
            ✕
          </div>

          <nav>
            <Link
              href="/"
              className={`${styles.mobileNavItem} ${activeTab === "home" ? styles.active : ""}`}
              onClick={() => { setMenuOpen(false); setActiveTab("home"); }}
            >
              {t("home")}
            </Link>
            <Link
              href="/favorites"
              className={`${styles.mobileNavItem} ${activeTab === "favorites" ? styles.active : ""}`}
              onClick={() => { setMenuOpen(false); setActiveTab("favorites"); }}
            >
              {t("favorites")}
            </Link>
            <Link
            href="/about"
            className={`${styles.mobilenavItem} ${activeTab === "about" ? styles.active : ""}`}
            onClick={() => setActiveTab("about")}
          >
            {t("About")}
          </Link>
          </nav>

          <div className={styles.mobileSocials}>
            <a href="https://www.facebook.com/goITclub/"><FaFacebookF /></a>
            <a href="https://www.instagram.com/goitclub/"><FaInstagram /></a>
            <a href="https://www.youtube.com/c/GoIT"><FaYoutube /></a>
            <a href="/settings"><FaUser /></a>
          </div>
        </div>
      )}
    </>
  );
}
