"use client"

import Link from "next/link"
import styles from "./Header.module.css"
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa"

export default function Header() {
  return (
    <header className={styles.header}>
      {/* Лого */}
      <div className={styles.logo}>
        energy.<span>flow</span>
      </div>

      {/* Навігація */}
      <nav className={styles.nav}>
        <Link href="/" className={`${styles.navItem} ${styles.active}`}>
          Home
        </Link>
        <Link href="/favorites" className={styles.navItem}>
          Favorites
        </Link>
      </nav>

      {/* Соцмережі */}
      <div className={styles.socials}>
        <a href="#"><FaFacebookF /></a>
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaYoutube /></a>
      </div>
    </header>
  )
}
