import Form from 'features/form';
import FormCardList from 'features/form-cards';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

import { FormCardType, addForm } from 'app/store/formPageSlice';
import { useAppDispatch } from 'app/store';

const FormPage = () => {
  const dispatch = useAppDispatch();
  const [messageDisplay, setMessageDisplay] = useState<boolean>(false);

  useEffect(() => {
    if (messageDisplay) {
      setTimeout(() => {
        setMessageDisplay(false);
      }, 8500);
    }
  }, [messageDisplay]);

  const createCard = (card: FormCardType) => {
    dispatch(addForm(card));
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
