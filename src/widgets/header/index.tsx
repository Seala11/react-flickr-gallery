import React from 'react';
import LinkList from './link-list';
import styles from './index.module.scss';

class Header extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <h1 className={styles.logo}>Logo</h1>
          <LinkList />
        </div>
      </header>
    );
  }
}

export default Header;
