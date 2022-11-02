import React from 'react';
import styles from './index.module.scss';

import { BrowserRouter } from 'react-router-dom';
import Routing from 'pages';

import Header from 'widgets/header';
import Footer from 'widgets/footer';

import { setupStore } from './store';
import { Provider } from 'react-redux';

const App = () => (
  <Provider store={setupStore()}>
    <BrowserRouter>
      <div className={styles.app}>
        <Header />
        <Routing />
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
