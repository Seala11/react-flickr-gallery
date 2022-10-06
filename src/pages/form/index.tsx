import Form, { CardType } from 'features/form';
import FormCardList from 'features/form-cards';
import React from 'react';
// import styles from './index.module.scss';

// export interface ICard {
//   lastName: string;
//   firstName: string;
//   birthday: string;
//   country: string;
//   avatar: string;
//   notifications: string;
// }

type FormPropsType = {
  createCard: (card: CardType) => void;
};

type StateType = {
  cards: CardType[];
};

class FormPage extends React.Component {
  state: StateType = { cards: [] };

  constructor(props: FormPropsType) {
    super(props);
    this.createCard = this.createCard.bind(this);
  }

  createCard(card: CardType) {
    this.setState((prevState) => {
      return { ...prevState, cards: [...this.state.cards, card] };
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Form createCard={this.createCard} />
        <FormCardList cards={this.state.cards} />
      </div>
    );
  }
}

export default FormPage;
