"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { FaFacebookF, FaInstagram, FaYoutube, FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useTranslate } from "../hooks/useTranslate";
import LanguageSwitcher from "./LanguageSwitcher";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { t } = useTranslate();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setActiveTab(pathname);
  }, [pathname]);

  const navItems = [
    { path: "/", label: t("home") },
    { path: "/favorites", label: t("favorites") },
    { path: "/about", label: t("About") },
    { path: "/calendar", label: t("Calendar") },
    { path: "/contact", label: t("Contact") },
    { path: "/statistic", label: t("Statistic") },
    { path: "/ai", label: t("Ai") },
  ];

  const renderLinks = (isMobile = false) =>
    navItems.map((item) => (
      <Link
        key={item.path}
        href={item.path}
        className={`${isMobile ? styles.mobileNavItem : styles.navItem} ${
          activeTab === item.path ? styles.active : ""
        }`}
        onClick={() => {
          setActiveTab(item.path);
          if (isMobile) setMenuOpen(false);
        }}
      >
        {item.label}
      </Link>
    ));

  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <div className={styles.logo}>
            energy.<span>flow</span>
          </div>
        </Link>

        <nav className={styles.nav}>{renderLinks()}</nav>

        <div className={styles.langSwitcher}>
          <div className={styles.langWrapper}>
            <LanguageSwitcher />
          </div>
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
              {t("login")}
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

          <nav>{renderLinks(true)}</nav>

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
              <Link href="/login" className={styles.loginBtn}>
                {t("login")}
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
