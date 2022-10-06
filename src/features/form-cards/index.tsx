import { CardType } from 'features/form';
import React from 'react';
import FormCard from './card';

type FormCardListProps = {
  cards: CardType[];
};

class FormCardList extends React.Component<FormCardListProps> {
  constructor(props: FormCardListProps) {
    super(props);
  }

  render() {
    console.log(this.props.cards, this.state);
    return (
      <div>
        {this.props.cards.map((card, index) => {
          return (
            <div key={index}>
              <FormCard card={card} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default FormCardList;
