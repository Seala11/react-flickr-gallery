import React from 'react';
import styles from './index.module.scss';

import { BrowserRouter } from 'react-router-dom';
import Routing from 'pages';

import Header from 'widgets/header';
import Footer from 'widgets/footer';
import AppProvider from './store/provider';

import { setupStore } from './store';
import { Provider } from 'react-redux';

const App = () => (
  <Provider store={setupStore()}>
    <AppProvider>
      <BrowserRouter>
        <div className={styles.app}>
          <Header />
          <Routing />
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  </Provider>
);

export default App;
