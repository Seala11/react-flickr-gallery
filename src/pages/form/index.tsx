import React from 'react';
import COUNTRIES from 'shared/data/countries';
import styles from './index.module.scss';

type FormPropsType = {
  handleSubmit: () => void;
  enableSubmitButton: () => void;
};

class Form extends React.Component {
  firstNameInput: React.RefObject<HTMLInputElement>;
  lastNameInput: React.RefObject<HTMLInputElement>;
  zipcodeInput: React.RefObject<HTMLInputElement>;
  birthdayInput: React.RefObject<HTMLInputElement>;
  countrySelectOption: React.RefObject<HTMLSelectElement>;
  avatarInput: React.RefObject<HTMLInputElement>;
  genderInput: React.RefObject<HTMLInputElement>;
  agreementInput: React.RefObject<HTMLInputElement>;

  state = { disabled: true };

  constructor(props: FormPropsType) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);

    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.zipcodeInput = React.createRef();
    this.birthdayInput = React.createRef();
    this.countrySelectOption = React.createRef();
    this.avatarInput = React.createRef();
    this.genderInput = React.createRef();
    this.agreementInput = React.createRef();
  }

  handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event?.target);
    console.log(Object.fromEntries(data.entries()));
  }

  enableSubmitButton() {
    this.setState({
      disabled: false,
    });
  }

  render() {
    return (
      <div>
        <form
          className={styles.form}
          onSubmit={this.handleSubmit}
          data-testid="react-form"
          autoComplete="off"
        >
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            data-testid="firstName"
            ref={this.firstNameInput}
            onChange={this.enableSubmitButton}
            autoComplete="off"
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            data-testid="lastName"
            type="text"
            ref={this.lastNameInput}
            autoComplete="off"
            onChange={this.enableSubmitButton}
          />

          <label htmlFor="zipcode">Zipcode</label>
          <input
            id="zipcode"
            type="text"
            name="zipcode"
            data-testid="zipcode"
            ref={this.zipcodeInput}
            autoComplete="off"
            onChange={this.enableSubmitButton}
          />

          <label htmlFor="birthday">Birthday</label>
          <input
            id="birthday"
            type="date"
            name="birthday"
            data-testid="birthday"
            ref={this.birthdayInput}
            autoComplete="off"
            onChange={this.enableSubmitButton}
          />

          <label htmlFor="country">Country</label>
          <select
            id="country"
            data-testid="country"
            ref={this.countrySelectOption}
            onChange={this.enableSubmitButton}
            name="country"
          >
            <option hidden>---</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          <label htmlFor="avatar">
            Avatar
            <input
              type="file"
              id="avatar"
              name="avatar"
              ref={this.avatarInput}
              data-testid="avatar"
              onChange={this.enableSubmitButton}
              accept="image/png, image/jpeg, image/webp"
            />
          </label>

          <label htmlFor="gender">
            Switch
            <input
              id="gender"
              name="gender"
              type="checkbox"
              data-testid="gender"
              ref={this.genderInput}
            />
            <span />
          </label>

          <label htmlFor="agreement">
            <input
              id="agreement"
              name="agreement"
              type="checkbox"
              ref={this.agreementInput}
              data-testid="agreement"
              onChange={this.enableSubmitButton}
            />
            I give my consent to processing my personal data
          </label>

          <button type="submit" data-testid="submit-button" disabled={this.state.disabled}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
