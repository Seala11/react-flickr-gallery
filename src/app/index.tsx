import React from 'react';
import styles from './index.module.scss';

import { BrowserRouter } from 'react-router-dom';
import Routing from 'pages';

import Header from 'widgets/header';
import Footer from 'widgets/footer';
import AppProvider from './store/provider';

const App = () => (
  <AppProvider>
    <BrowserRouter>
      <div className={styles.app}>
        <Header />
        <Routing />
        <Footer />
      </div>
    </BrowserRouter>
  </AppProvider>
);

export default App;
