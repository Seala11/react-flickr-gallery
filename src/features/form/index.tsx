import React from 'react';
import COUNTRIES from 'shared/data/countries';
import styles from './index.module.scss';
import { UserInput } from './models';

type FormPropsType = {
  handleSubmit: () => void;
  enableSubmitButton: () => void;
  disableSubmitButton: () => void;
  validateData: () => void;
  removeInputError: () => void;
};

type IInputNames = {
  lastName?: string;
  firstName?: string;
  birthday?: string;
  country?: string;
  avatar?: string;
  agreement?: string;
};

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
          if (`${val}`.length < 2)
            errors[UserInput.FIRST_NAME] = 'Should contain at least 2 characters';
          break;
        }
        case UserInput.LAST_NAME: {
          if (`${val}`.length < 2)
            errors[UserInput.LAST_NAME] = 'Should contain at least 2 characters';
          break;
        }
        case UserInput.BIRTHDAY: {
          const today = new Date();
          if (!val) errors[UserInput.BIRTHDAY] = 'Birth date is required';
          if (
            new Date(`${val}`).getTime() >= today.getTime() ||
            new Date(`${val}`).getUTCFullYear() < 1900
          )
            errors[UserInput.BIRTHDAY] = 'Invalid birth date';

          break;
        }
        case UserInput.COUNTRY: {
          if (`${val}` === '---') errors[UserInput.COUNTRY] = 'Country is required';
          break;
        }
        case UserInput.AVATAR: {
          if (val instanceof File && !val.name) {
            errors[UserInput.AVATAR] = 'Avatar is required';
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
          noValidate
        >
          <label htmlFor="firstName" className={styles.label}>
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            data-testid="firstName"
            onChange={this.enableSubmitButton}
            autoComplete="off"
            className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
          />
          {errors.firstName && <small className={styles.error}>{errors.firstName}</small>}

          <label htmlFor="lastName" className={styles.label}>
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            data-testid="lastName"
            type="text"
            autoComplete="off"
            onChange={this.enableSubmitButton}
            className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
          />
          {errors.lastName && <small className={styles.error}>{errors.lastName}</small>}

          <label htmlFor="birthday" className={styles.label}>
            Birthday
          </label>
          <input
            id="birthday"
            type="date"
            name="birthday"
            data-testid="birthday"
            autoComplete="off"
            onChange={this.enableSubmitButton}
            className={`${styles.input} ${errors.birthday ? styles.inputError : ''}`}
          />
          {errors.birthday && <small className={styles.error}>{errors.birthday}</small>}

          <label htmlFor="country" className={styles.label}>
            Country
          </label>
          <select
            id="country"
            data-testid="country"
            onChange={this.enableSubmitButton}
            name="country"
            className={`${styles.input} ${errors.country ? styles.inputError : ''}`}
          >
            <option hidden>---</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && <small className={styles.error}>{errors.country}</small>}

          <label htmlFor="avatar" className={styles.label}>
            Avatar
            <input
              type="file"
              id="avatar"
              name="avatar"
              data-testid="avatar"
              onChange={this.enableSubmitButton}
              accept="image/png, image/jpeg, image/webp"
              className={`${styles.input} ${errors.avatar ? styles.inputError : ''}`}
            />
          </label>
          {errors.avatar && <small className={styles.error}>{errors.avatar}</small>}

          <div className={styles.switcherWrapper}>
            <input
              id="gender"
              name="gender"
              type="checkbox"
              data-testid="gender"
              className={styles.switcher}
            />
            <label htmlFor="gender" className={styles.switcherLabel}>
              <span className={styles.switcherBtn} />
            </label>
            <span>I want to receive notifications</span>
          </div>

          <label htmlFor="agreement" className={`${styles.agreement} ${styles.label}`}>
            <input
              id="agreement"
              name="agreement"
              type="checkbox"
              data-testid="agreement"
              onChange={this.enableSubmitButton}
              className={`${styles.input} ${styles.checkbox} ${
                errors.agreement ? styles.inputError : ''
              }`}
            />
            I give my consent to processing my personal data
          </label>
          {errors.agreement && <small className={styles.error}>{errors.agreement}</small>}

          <button
            type="submit"
            data-testid="submit-button"
            disabled={this.state.disabled}
            className={styles.button}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
