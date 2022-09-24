import React from 'react';
import styles from './index.module.scss';

import Header from 'widgets/header';
import Footer from 'widgets/footer';
import Routing from 'pages';

class App extends React.Component {
  render() {
    return (
      <div className={styles.app}>
        <Header />
        <Routing />
        <Footer />
      </div>
    );
  }
}

export default App;
