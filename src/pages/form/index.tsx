import Form from 'features/form';
import FormCardList from 'features/form-cards';
import { FormCardType } from 'features/form/models';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

const FormPage = () => {
  const [cards, setCards] = useState<FormCardType[]>([]);
  const [messageDisplay, setMessageDisplay] = useState<boolean>(false);

  useEffect(() => {
    if (messageDisplay) {
      setTimeout(() => {
        setMessageDisplay(false);
      }, 8500);
    }
  }, [messageDisplay]);

  const createCard = (card: FormCardType) => {
    setCards([...cards, card]);
    setMessageDisplay(true);
  };

  return (
    <main className={styles.wrapper}>
      {messageDisplay && (
        <div className={styles.message}>Your form has been successfully submitted</div>
      )}
      <Form createCard={createCard} />
      <FormCardList cards={cards} />
    </main>
  );
};

export default FormPage;
