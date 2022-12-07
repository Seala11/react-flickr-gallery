import React from 'react';
import styles from './index.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <a
            href="https://github.com/Seala11"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Seala11
          </a>
        </li>
        <li className={styles.item}>
          2022{' '}
          <a
            target="_blank"
            href="https://rs.school/react/"
            rel="noreferrer"
            className={styles.link}
          >
            RSSchool
          </a>
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;
