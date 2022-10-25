import AppContext from 'app/store/context';
import { FormProviderActions } from 'app/store/provider';
import Form from 'features/form';
import FormCardList from 'features/form-cards';
import { FormCardType } from 'features/form/models';
import React, { useContext, useEffect, useState } from 'react';
import styles from './index.module.scss';

const FormPage = () => {
  const { setFormCards } = useContext(AppContext);
  const [messageDisplay, setMessageDisplay] = useState<boolean>(false);

  useEffect(() => {
    if (messageDisplay) {
      setTimeout(() => {
        setMessageDisplay(false);
      }, 8500);
    }
  }, [messageDisplay]);

  const createCard = (card: FormCardType) => {
    setFormCards({ type: FormProviderActions.ADD, formCard: card });
    setMessageDisplay(true);
  };

  return (
    <main className={styles.wrapper}>
      {messageDisplay && (
        <div className={styles.message}>Your form has been successfully submitted</div>
      )}
      <Form createCard={createCard} />
      <FormCardList />
    </main>
  );
};

export default FormPage;
