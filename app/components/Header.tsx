"use client";
import Link from "next/link";
import styles from "./Header.module.css";
import { FaFacebookF, FaInstagram, FaYoutube, FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useTranslate } from "../hooks/useTranslate";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { t } = useTranslate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <header className={styles.header}>
        <Link href="/">
        <div className={styles.logo}>
          energy.<span>flow</span>
        </div>
        </Link>

        <nav className={styles.nav}>
          <Link
            href="/"
            className={`${styles.navItem} ${
              activeTab === "home" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("home")}
          >
            {t("home")}
          </Link>
          <Link
            href="/favorites"
            className={`${styles.navItem} ${
              activeTab === "favorites" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("favorites")}
          >
            {t("favorites")}
          </Link>
          <Link
            href="/about"
            className={`${styles.navItem} ${
              activeTab === "about" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("about")}
          >
            {t("About")}
          </Link>
          <Link
            href="/calendar"
            className={`${styles.navItem} ${
              activeTab === "calendar" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("calendar")}
          >
            {t("Calendar")}
          </Link>
          <Link
            href="/statistic"
            className={`${styles.navItem} ${
              activeTab === "statistic" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("statistic")}
          >
            {t("Statistic")}
          </Link>
        </nav>

        <div className={styles.langSwitcher}>
          <LanguageSwitcher />
        </div>

        <div className={styles.socials}>
          <a href="https://www.facebook.com/goITclub/">
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com/goitclub/">
            <FaInstagram />
          </a>
          <a href="https://www.youtube.com/c/GoIT">
            <FaYoutube />
          </a>
          {isLoggedIn ? (
            <Link href="/settings">
              <FaUser />
            </Link>
          ) : (
            <Link href="/login" className={styles.loginBtn}>
              {t("Login")}
            </Link>
          )}
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
              className={`${styles.mobileNavItem} ${
                activeTab === "home" ? styles.active : ""
              }`}
              onClick={() => {
                setMenuOpen(false);
                setActiveTab("home");
              }}
            >
              {t("home")}
            </Link>
            <Link
              href="/favorites"
              className={`${styles.mobileNavItem} ${
                activeTab === "favorites" ? styles.active : ""
              }`}
              onClick={() => {
                setMenuOpen(false);
                setActiveTab("favorites");
              }}
            >
              {t("favorites")}
            </Link>
            <Link
              href="/about"
              className={`${styles.mobileNavItem} ${
                activeTab === "about" ? styles.active : ""
              }`}
              onClick={() => {
                setMenuOpen(false);
                setActiveTab("about");
              }}
            >
              {t("About")}
            </Link>
            <Link
              href="/calendar"
              className={`${styles.mobileNavItem} ${
                activeTab === "calendar" ? styles.active : ""
              }`}
              onClick={() => {
                setMenuOpen(false);
                setActiveTab("calendar");
              }}
            >
              {t("Calendar")}
            </Link>
            <Link
              href="/statistic"
              className={`${styles.mobileNavItem} ${
                activeTab === "statistic" ? styles.active : ""
              }`}
              onClick={() => {
                setMenuOpen(false);
                setActiveTab("statistic");
              }}
            >
              {t("Statistic")}
            </Link>
          </nav>

          <div className={styles.mobileSocials} style={{ gap: "10px" }}>
            <a href="https://www.facebook.com/goITclub/">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/goitclub/">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/c/GoIT">
              <FaYoutube />
            </a>
            {isLoggedIn ? (
              <Link href="/settings">
                <FaUser />
              </Link>
            ) : (
              <>
                <Link href="/login" className={styles.loginBtn}>
                  {t("Login")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
