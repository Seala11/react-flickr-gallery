import React from 'react';
import styles from './index.module.scss';
import CARDS from 'shared/data/cards';
import Card from './card';

class CardsList extends React.Component {
  render() {
    return (
      <ul className={styles.list}>
        {CARDS.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </ul>
    );
  }
}

export default CardsList;
