"use client"

import Link from "next/link"
import styles from "./Header.module.css"
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa"

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        energy.<span>flow</span>
      </div>
      
      <nav className={styles.nav}>
        <Link href="/" className={`${styles.navItem} ${styles.active}`}>
          Home
        </Link>
        <Link href="/favorites" className={styles.navItem}>
          Favorites
        </Link>
      </nav>

      
      <div className={styles.socials}>
        <a href="https://www.facebook.com/goITclub/"><FaFacebookF /></a>
        <a href="https://www.instagram.com/goitclub/"><FaInstagram /></a>
        <a href="https://www.youtube.com/c/GoIT"><FaYoutube /></a>
      </div>
    </header>
  )
}
