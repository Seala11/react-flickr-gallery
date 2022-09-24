import React from 'react';
import styles from './index.module.scss';

import Header from 'widgets/header';
import Routing from 'pages';

class App extends React.Component {
  render() {
    return (
      <div className={styles.app}>
        <Header />
        <Routing />
      </div>
    );
  }
}

export default App;
