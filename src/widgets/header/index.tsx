import React from 'react';
import LinkList from './link-list';
import styles from './index.module.scss';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.wrapper}>
      <h1 className={styles.logo}>React. Custom App State</h1>
      <LinkList />
    </div>
  </header>
);

export default Header;
