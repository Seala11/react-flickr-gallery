import Form from 'features/form';
import React from 'react';
// import styles from './index.module.scss';

type FormPropsType = {
  createCard: () => void;
};

type StateType = {
  cards: [];
};

class FormPage extends React.Component {
  state: StateType = { cards: [] };

  constructor(props: FormPropsType) {
    super(props);
    this.createCard = this.createCard.bind(this);
  }

  createCard() {
    this.setState({
      cards: [],
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Form />
      </div>
    );
  }
}

export default FormPage;
