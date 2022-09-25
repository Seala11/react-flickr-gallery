import React from 'react';
import styles from './index.module.scss';
import CardsList from 'features/card-list';

class Home extends React.Component {
  render() {
    return (
      <main className={styles.wrapper}>
        <h1 className={styles.heading}>Home</h1>
        <CardsList />
      </main>
    );
  }
}

export default Home;
