import { FlickrCard } from 'pages/home/models';
import React from 'react';
import styles from './index.module.scss';

interface ICardProps {
  card: FlickrCard;
  showPopUp: (card: FlickrCard, event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

class Card extends React.Component<ICardProps> {
  constructor(props: ICardProps) {
    super(props);
  }

  render() {
    const card = this.props.card;
    const img = `https://farm${card.farm}.staticflickr.com/${card.server}/${card.id}_${card.secret}.jpg`;
    const title = card.title.length < 35 ? card.title : card.title.slice(0, 35) + '...';
    const name = card.ownername.length < 39 ? card.ownername : card.ownername.slice(0, 39) + '...';

    return (
      <li className={styles.card} onClick={(event) => this.props.showPopUp(this.props.card, event)}>
        <img src={img} alt={card.title} className={styles.img} data-testid="card-image" />
        <h2 className={styles.title} data-testid="card-title">
          {title}
        </h2>
        <span className={styles.subtitle} data-testid="card-subtitle">
          {name}
        </span>
      </li>
    );
  }
}

export default Card;
