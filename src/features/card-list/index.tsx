import React from 'react';
import styles from './index.module.scss';
import Card from './card';
import { FlickrCard } from 'app/store/types';

type CardListProps = {
  cards: FlickrCard[];
};

const CardList = ({ cards }: CardListProps) => {
  return (
    <ul className={styles.list} data-testid="cardlist">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </ul>
  );
};

export default CardList;
