import React from 'react';
import COUNTRIES from 'shared/data/countries';
import styles from './index.module.scss';

type FormPropsType = {
  handleSubmit: () => void;
  enableSubmitButton: () => void;
  disableSubmitButton: () => void;
  validateData: () => void;
  removeInputError: () => void;
};

interface IInputNames {
  lastName?: string;
  firstName?: string;
  birthday?: string;
  country?: string;
  avatar?: string;
  agreement?: string;
}

enum UserInput {
  LAST_NAME = 'lastName',
  FIRST_NAME = 'firstName',
  BIRTHDAY = 'birthday',
  COUNTRY = 'country',
  AVATAR = 'avatar',
  AGREEMENT = 'agreement',
}

type StateType = {
  disabled: boolean;
  errors: IInputNames;
};

class Form extends React.Component {
  state: StateType = { disabled: true, errors: {} };

  constructor(props: FormPropsType) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.disableSubmitButton = this.disableSubmitButton.bind(this);
    this.validateData = this.validateData.bind(this);
    this.removeInputError = this.removeInputError.bind(this);
  }

  handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event?.target);
    const userInputsAreValid = this.validateData(formData);

    console.log(userInputsAreValid);
  }

  enableSubmitButton(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    if (Object.keys(this.state.errors).length > 0) {
      this.removeInputError(event.target.name as keyof IInputNames);
    } else {
      this.setState({ disabled: false });
    }
  }

  disableSubmitButton() {
    if (this.state.disabled) {
      this.setState({
        disabled: true,
      });
    }
  }

  removeInputError(key: keyof IInputNames) {
    const newErrorsState = { ...this.state.errors };
    delete newErrorsState[key];
    // const { [key]: _, ...newErrorsState } = this.state.errors;

    if (Object.keys(newErrorsState).length > 0) {
      this.setState({ disabled: true, errors: newErrorsState });
    } else {
      this.setState({ disabled: false, errors: {} });
    }
  }

  validateData(data: FormData) {
    const errors: IInputNames = {};
    const map = new Map(data.entries());
    let agreement = false;
    console.log('validate', map);

    for (const [key, val] of map) {
      switch (key) {
        case UserInput.FIRST_NAME: {
          if (`${val}`.length < 2) errors[UserInput.FIRST_NAME] = 'Should contain at least 2 chars';
          break;
        }
        case UserInput.LAST_NAME: {
          if (`${val}`.length < 2) errors[UserInput.LAST_NAME] = 'Should contain at least 2 chars';
          break;
        }
        case UserInput.BIRTHDAY: {
          if (!val) errors[UserInput.BIRTHDAY] = 'Pick correct birth date';
          break;
        }
        case UserInput.COUNTRY: {
          if (`${val}` === '---') errors[UserInput.COUNTRY] = 'Pick your country';
          break;
        }
        case UserInput.AVATAR: {
          if (val instanceof File && !val.name) {
            errors[UserInput.AVATAR] = 'You should upload avatar';
          }
          break;
        }
        case UserInput.AGREEMENT: {
          agreement = true;
          break;
        }
      }
    }

    if (!agreement) {
      errors[UserInput.AGREEMENT] = 'Required field';
    }

    if (Object.keys(errors).length) {
      this.setState({
        disabled: true,
        errors,
      });
    }
  }

  render() {
    console.log(this.state, 'RENDER');
    const errors = this.state.errors;
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
            onChange={this.enableSubmitButton}
            autoComplete="off"
          />
          {errors.firstName && <small className={styles.error}>{errors.firstName}</small>}

          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            data-testid="lastName"
            type="text"
            autoComplete="off"
            onChange={this.enableSubmitButton}
          />
          {errors.lastName && <small className={styles.error}>{errors.lastName}</small>}

          <label htmlFor="birthday">Birthday</label>
          <input
            id="birthday"
            type="date"
            name="birthday"
            data-testid="birthday"
            autoComplete="off"
            onChange={this.enableSubmitButton}
          />
          {errors.birthday && <small className={styles.error}>{errors.birthday}</small>}

          <label htmlFor="country">Country</label>
          <select
            id="country"
            data-testid="country"
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
          {errors.country && <small className={styles.error}>{errors.country}</small>}

          <label htmlFor="avatar">
            Avatar
            <input
              type="file"
              id="avatar"
              name="avatar"
              data-testid="avatar"
              onChange={this.enableSubmitButton}
              accept="image/png, image/jpeg, image/webp"
            />
          </label>
          {errors.avatar && <small className={styles.error}>{errors.avatar}</small>}

          <label htmlFor="gender">
            Switch
            <input id="gender" name="gender" type="checkbox" data-testid="gender" />
            <span />
          </label>

          <label htmlFor="agreement">
            <input
              id="agreement"
              name="agreement"
              type="checkbox"
              data-testid="agreement"
              onChange={this.enableSubmitButton}
            />
            I give my consent to processing my personal data
          </label>
          {errors.agreement && <small className={styles.error}>{errors.agreement}</small>}

          <button type="submit" data-testid="submit-button" disabled={this.state.disabled}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
