import React from 'react';
import styles from './index.module.scss';
import Card from './card';
import { FlickrCard } from 'pages/home/models';

type CardListProps = {
  cards: FlickrCard[];
  error: boolean;
  showPopUp: (card: FlickrCard, event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
};

const CardList = ({ cards, error, showPopUp }: CardListProps) => {
  return (
    <ul className={styles.list} data-testid="cardlist">
      {cards.length > 0 ? (
        cards.map((card) => <Card key={card.id} card={card} showPopUp={showPopUp} />)
      ) : (
        <p data-testid="error-message">{error ? '' : `Sorry, no images matched your search.`}</p>
      )}
    </ul>
  );
};

export default CardList;
