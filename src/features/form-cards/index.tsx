import AppContext from 'app/store/context';
import React, { useContext } from 'react';
import FormCard from './card';
import styles from './index.module.scss';

const FormCardList = () => {
  const { formCards } = useContext(AppContext);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Submitted forms</h2>
      {!formCards.length && <p className={styles.title}>You have not submitted any form yet</p>}
      <ul className={styles.wrapper}>
        {formCards.map((card, index) => {
          return (
            <li key={index} className={styles.card}>
              <FormCard card={card} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default FormCardList;
