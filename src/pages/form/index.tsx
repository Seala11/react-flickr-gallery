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
  messageDisplay: boolean;
};

class FormPage extends React.Component {
  state: StateType = { cards: [], messageDisplay: false };

  constructor(props: FormPropsType) {
    super(props);
    this.createCard = this.createCard.bind(this);
  }

  componentDidUpdate(): void {
    if (this.state.messageDisplay) {
      setTimeout(() => {
        this.setState((prevState) => {
          return { ...prevState, messageDisplay: false };
        });
      }, 8500);
    }
  }

  createCard(card: FormCardType) {
    this.setState((prevState) => {
      return { ...prevState, cards: [...this.state.cards, card], messageDisplay: true };
    });
  }

  render() {
    return (
      <main className={styles.wrapper}>
        {this.state.messageDisplay && (
          <div className={styles.sucsess}>Your form has been successfully submitted</div>
        )}
        <Form createCard={this.createCard} messageDisplay={this.state.messageDisplay} />
        <FormCardList cards={this.state.cards} />
      </main>
    );
  }
}

export default FormPage;
