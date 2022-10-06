import { FormCardType } from 'features/form/models';
import React from 'react';
import FormCard from './card';
import styles from './index.module.scss';

type FormCardListProps = {
  cards: FormCardType[];
};

class FormCardList extends React.Component<FormCardListProps> {
  constructor(props: FormCardListProps) {
    super(props);
  }

  render() {
    return (
      <section className={styles.section}>
        <h2 className={styles.title}>Submitted forms</h2>
        {!this.props.cards.length && (
          <p className={styles.title}>You have not submitted any form yet</p>
        )}
        <div className={styles.wrapper}>
          {this.props.cards.map((card, index) => {
            return (
              <div key={index}>
                <FormCard card={card} />
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}

export default FormCardList;