import { FlickrCard } from 'pages/home/models';
import React from 'react';
import styles from './index.module.scss';

interface ICardProps {
  card: FlickrCard;
}

class Card extends React.Component<ICardProps> {
  constructor(props: ICardProps) {
    super(props);
  }

  render() {
    const card = this.props.card;
    const img = `https://farm${card.farm}.staticflickr.com/${card.server}/${card.id}_${card.secret}.jpg`;

    return (
      <li className={styles.card}>
        <img src={img} alt={card.title} className={styles.img} data-testid="card-image" />
        <h2 className={styles.title} data-testid="card-title">
          {card.title}
        </h2>
        <span className={styles.subtitle} data-testid="card-subtitle">
          {card.ownername}
        </span>
      </li>
    );
  }
}

export default Card;
