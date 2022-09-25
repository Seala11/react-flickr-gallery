import React from 'react';
import styles from './index.module.scss';
import CardsList from 'features/card-list';
import SearchBar from 'features/search-bar';

class Home extends React.Component {
  render() {
    return (
      <main className={styles.wrapper}>
        <SearchBar />
        <CardsList />
      </main>
    );
  }
}

export default Home;
