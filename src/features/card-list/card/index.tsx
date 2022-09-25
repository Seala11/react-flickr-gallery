import React from 'react';
import styles from './index.module.scss';

interface ICardProps {
  card: CardType;
}

type CardType = {
  id: number;
  img: string;
  name: string;
  species: string;
  status: string;
  gender: string;
  location: string;
};

class Card extends React.Component<ICardProps> {
  constructor(props: ICardProps) {
    super(props);
  }

  render() {
    const card = this.props.card;
    return (
      <li className={styles.card}>
        <img src={card.img} alt={card.name} className={styles.img} />
        <h2 className={styles.title}>{card.name}</h2>
        <p className={styles.subtitle}>
          {card.species} / {card.gender}
        </p>
        <p className={styles.info}>
          Location: <span className={styles.info__span}>{card.location}</span>
        </p>
        <p className={styles.info}>
          Status: <span className={styles.info__span}>{card.status}</span>
        </p>
      </li>
    );
  }
}

export default Card;
