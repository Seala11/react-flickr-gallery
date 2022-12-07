import { FormCardType } from 'features/form/models';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

type Props = {
  card: FormCardType;
};

const FormCard = ({ card }: Props) => {
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    const { avatar } = card;
    if (avatar && avatar instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(avatar);
    }
  }, [card]);

  return (
    <>
      <img
        src={imagePreview}
        alt={`${card.firstName} ${card.lastName} avatar`}
        className={styles.img}
        data-testid="avatar-img"
        height="220"
      />
      <p className={styles.title}>
        First Name:{' '}
        <span data-testid="firstName" className={styles.titleInfo}>{`${
          card.firstName.length < 250 ? card.firstName : card.firstName.slice(0, 250) + '...'
        }`}</span>
      </p>
      <p className={styles.title}>
        Last Name:{' '}
        <span data-testid="lastName" className={styles.titleInfo}>{`${
          card.lastName.length < 250 ? card.lastName : card.lastName.slice(0, 250) + '...'
        }`}</span>
      </p>
      <p className={styles.title}>
        Birthday:{' '}
        <span data-testid="birthday" className={styles.titleInfo}>{`${card.birthday}`}</span>
      </p>
      <p className={styles.title}>
        Country: <span data-testid="country" className={styles.titleInfo}>{`${card.country}`}</span>
      </p>
      <p className={styles.title}>
        Notifications:{' '}
        <span data-testid="notifications" className={styles.titleInfo}>{`${
          card.notifications ? 'On' : 'Off'
        }`}</span>
      </p>
    </>
  );
};

export default FormCard;
