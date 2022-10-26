import React from 'react';
import styles from './index.module.scss';
import Card from './card';
import { FlickrCard } from 'pages/home/models';

type CardListProps = {
  cards: FlickrCard[];
  showPopUp: (card: FlickrCard, event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
};

const CardList = ({ cards, showPopUp }: CardListProps) => {
  return (
    <ul className={styles.list} data-testid="cardlist">
      {cards.map((card) => (
        <Card key={card.id} card={card} showPopUp={showPopUp} />
      ))}
    </ul>
  );
};

export default CardList;
