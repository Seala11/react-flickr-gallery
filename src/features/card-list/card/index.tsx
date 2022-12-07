import { FlickrCard } from 'pages/home/models';
import React from 'react';
import styles from './index.module.scss';

type CardProps = {
  card: FlickrCard;
  showPopUp: (card: FlickrCard, event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
};

const Card = ({ card, showPopUp }: CardProps) => {
  const img = `https://farm${card.farm}.staticflickr.com/${card.server}/${card.id}_${card.secret}.jpg`;
  const title = card.title.length < 35 ? card.title : card.title.slice(0, 35) + '...';
  const name = card.ownername.length < 35 ? card.ownername : card.ownername.slice(0, 35) + '...';

  return (
    <li className={styles.card} onClick={(event) => showPopUp(card, event)}>
      <img src={img} alt={card.title} className={styles.img} data-testid="card-image" />
      <h2 className={styles.title} data-testid="card-title">
        {title}
      </h2>
      <p className={styles.subtitle} data-testid="card-subtitle">
        {name}
      </p>
    </li>
  );
};

export default Card;
