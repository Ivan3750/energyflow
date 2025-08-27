

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
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
            <span className={styles.brandName}>energy.flow</span>
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
            Transforming your <span className={styles.highlight}>body</span> shape with us
          </h1>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.subscriptionForm}>
            <p className={styles.formTitle}>Subscribe and learn about new exercises!</p>
            <input 
              type="email" 
              placeholder="Email" 
              className={styles.emailInput} 
            />
            <button className={styles.sendButton}>Send</button>
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.copyright}>&copy; 2024 Energy Flow. All rights reserved.</p>
          <div className={styles.footerLinks}>
            <Link href="#" passHref>
              <span className={styles.footerLink}>Privacy Policy</span>
            </Link>
            <span className={styles.divider}>/</span>
            <Link href="#" passHref>
              <span className={styles.footerLink}>Terms of Service</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;