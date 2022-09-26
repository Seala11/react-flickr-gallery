import React from 'react';
import styles from './index.module.scss';
import Card from './card';
import { CardType } from './models';

interface ICardListProps {
  cards: CardType[];
}

class CardList extends React.Component<ICardListProps> {
  constructor(props: ICardListProps) {
    super(props);
  }

  render() {
    return (
      <ul className={styles.list}>
        {this.props.cards.length > 0 ? (
          this.props.cards.map((card) => <Card key={card.id} card={card} />)
        ) : (
          <p>Sorry, no characters matched your search.</p>
        )}
      </ul>
    );
  }
}

export default CardList;
