import { FormCardType } from 'features/form/models';
import React from 'react';

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
    if (avatar && avatar instanceof FileList && avatar[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState((prevState) => {
          return { ...prevState, imagePreview: reader.result };
        });
      };
      reader.readAsDataURL(avatar[0]);
    }
  }

  render() {
    console.log(this.props.card, this.state);
    const card = this.props.card;
    return (
      <div>
        {this.state.imagePreview && <img src={this.state.imagePreview} alt="preview image" />}
        <p>
          First Name: <span>{`${card.firstName}`}</span>
        </p>
        <p>
          Last Name: <span>{`${card.lastName}`}</span>
        </p>
        <p>
          Birthday: <span>{`${card.birthday}`}</span>
        </p>
        <p>
          Country: <span>{`${card.country}`}</span>
        </p>
        <p>
          Notifications: <span>{`${card.notifications ? 'On' : 'Off'}`}</span>
        </p>
      </div>
    );
  }
}

export default FormCard;
