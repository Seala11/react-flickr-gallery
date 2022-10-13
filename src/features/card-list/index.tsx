import React from 'react';
import styles from './index.module.scss';
import Card from './card';
import { FlickrCard } from 'pages/home/models';

interface ICardListProps {
  cards: FlickrCard[];
  error: boolean;
}

class CardList extends React.Component<ICardListProps> {
  constructor(props: ICardListProps) {
    super(props);
  }

  render() {
    return (
      <ul className={styles.list} data-testid="cardlist">
        {this.props.cards.length > 0 ? (
          this.props.cards.map((card) => <Card key={card.id} card={card} />)
        ) : (
          <p data-testid="error-message">
            {this.props.error ? '' : `Sorry, no images matched your search.`}
          </p>
        )}
      </ul>
    );
  }
}

export default CardList;
