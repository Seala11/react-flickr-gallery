import { FormCardType } from 'features/form/models';
import React from 'react';
import styles from './index.module.scss';

type FormCardListProps = {
  card: FormCardType;
};

type State = {
  imagePreview: string | null;
};

class FormCard extends React.Component<FormCardListProps> {
  state: State = { imagePreview: null };

  constructor(props: FormCardListProps) {
    super(props);
  }

  componentDidMount(): void {
    const { avatar } = this.props.card;
    if (avatar && avatar instanceof File && avatar) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState((prevState) => {
          return { ...prevState, imagePreview: reader.result };
        });
      };
      reader.readAsDataURL(avatar);
    }
  }

  render() {
    const card = this.props.card;
    return (
      <>
        {this.state.imagePreview && (
          <img
            src={this.state.imagePreview}
            alt={`${card.firstName} ${card.lastName} avatar`}
            className={styles.img}
          />
        )}
        <p className={styles.title}>
          First Name:{' '}
          <span className={styles.titleInfo}>{`${
            card.firstName.length < 250 ? card.firstName : card.firstName.slice(0, 250) + '...'
          }`}</span>
        </p>
        <p className={styles.title}>
          Last Name:{' '}
          <span className={styles.titleInfo}>{`${
            card.lastName.length < 250 ? card.lastName : card.lastName.slice(0, 250) + '...'
          }`}</span>
        </p>
        <p className={styles.title}>
          Birthday: <span className={styles.titleInfo}>{`${card.birthday}`}</span>
        </p>
        <p className={styles.title}>
          Country: <span className={styles.titleInfo}>{`${card.country}`}</span>
        </p>
        <p className={styles.title}>
          Notifications:{' '}
          <span className={styles.titleInfo}>{`${card.notifications ? 'On' : 'Off'}`}</span>
        </p>
      </>
    );
  }
}

export default FormCard;
