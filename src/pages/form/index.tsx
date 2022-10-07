import Form from 'features/form';
import FormCardList from 'features/form-cards';
import { FormCardType } from 'features/form/models';
import React from 'react';
import styles from './index.module.scss';

type FormPropsType = {
  createCard: (card: FormCardType) => void;
};

type StateType = {
  cards: FormCardType[];
};

class FormPage extends React.Component {
  state: StateType = { cards: [] };

  constructor(props: FormPropsType) {
    super(props);
    this.createCard = this.createCard.bind(this);
  }

  createCard(card: FormCardType) {
    this.setState((prevState) => {
      return { ...prevState, cards: [...this.state.cards, card] };
    });
  }

  render() {
    return (
      <main className={styles.wrapper}>
        <Form createCard={this.createCard} />
        <FormCardList cards={this.state.cards} />
      </main>
    );
  }
}

export default FormPage;
