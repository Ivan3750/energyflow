"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import styles from "./Footer.module.css";
import { useTranslate } from "../hooks/useTranslate";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { t } = useTranslate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const email = formData.get("email") as string;

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert(t("footer_success"));
        form.reset();
      } else {
        alert(t("footer_error"));
      }
    } catch (error) {
      console.error(error);
      alert(t("footer_network"));
    }
  };

  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerOverlay}></div>
      <Image
        src="/img/hero.png"
        alt="Background image"
        layout="fill"
        objectFit="cover"
        className={styles.footerImage}
      />
      <div className={styles.footerContent}>
        <div className={styles.leftColumn}>
          <div className={styles.brandInfo}>
            <Link href="/" passHref>
              <span className={styles.brandName}>energy.flow</span>
            </Link>
            <div className={styles.socialIcons}>
              <Link href="https://facebook.com" passHref>
                <div className={styles.iconContainer}>
                  <FaFacebookF className={styles.socialIcon} />
                </div>
              </Link>
              <Link href="https://instagram.com" passHref>
                <div className={styles.iconContainer}>
                  <FaInstagram className={styles.socialIcon} />
                </div>
              </Link>
              <Link href="https://youtube.com" passHref>
                <div className={styles.iconContainer}>
                  <FaYoutube className={styles.socialIcon} />
                </div>
              </Link>
            </div>
          </div>
          <h1 className={styles.footerTitle}>
            {t("footer_title1")} <span className={styles.highlight}>{t("footer_title_em")}</span>{" "}
            {t("footer_title2")}
          </h1>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.subscriptionForm}>
            <p className={styles.formTitle}>{t("footer_subscribe_text")}</p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder={t("footer_email_placeholder")}
                className={styles.emailInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                pattern="^\\w+(\\.\\w+)*@[a-zA-Z]+\\.[a-zA-Z]{2,}$"
                required
              />
              <button type="submit" className={styles.sendButton}>
                {t("footer_send")}
              </button>
            </form>
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.copyright}>
            &copy; 2025 Energy Flow. {t("footer_rights")}
          </p>
          <div className={styles.footerLinks}>
            <Link href="#" passHref>
              <span className={styles.footerLink}>{t("footer_privacy")}</span>
            </Link>
            <span className={styles.divider}>/</span>
            <Link href="#" passHref>
              <span className={styles.footerLink}>{t("footer_terms")}</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
