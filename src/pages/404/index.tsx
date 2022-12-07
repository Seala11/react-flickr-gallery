import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styles from './index.module.scss';

const NotFound = () => {
  const [navigate, setNavigate] = useState<boolean>(false);

  const navigateHome = () => {
    setNavigate(true);
  };

  return (
    <main className={styles.wrapper}>
      {navigate && <Navigate to="/" replace={true} />}
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Oops! The page you are looking for cannot be found.</p>
      <button className={styles.button} onClick={navigateHome}>
        Back Home
      </button>
    </main>
  );
};

export default NotFound;
