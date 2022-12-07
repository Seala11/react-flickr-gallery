import React from 'react';
import { CardType } from '../models';
import styles from './index.module.scss';

interface ICardProps {
  card: CardType;
}

class Card extends React.Component<ICardProps> {
  constructor(props: ICardProps) {
    super(props);
  }

  render() {
    const { img, name, species, gender, location, status } = this.props.card;

    return (
      <li className={styles.card}>
        <img src={img} alt={name} className={styles.img} />
        <h2 className={styles.title}>{name}</h2>
        <p className={styles.subtitle}>
          {species} / {gender}
        </p>
        <p className={styles.info}>
          Location: <span className={styles.info__span}>{location}</span>
        </p>
        <p className={styles.info}>
          Status: <span className={styles.info__span}>{status}</span>
        </p>
      </li>
    );
  }
}

export default Card;
