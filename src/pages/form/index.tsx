import React from 'react';
import COUNTRIES from 'shared/data/countries';
import styles from './index.module.scss';

type FormPropsType = {
  handleSubmit: () => void;
  enableSubmitButton: () => void;
  validateData: () => void;
  disableSubmitButton: () => void;
};

interface IErrors {
  lastName?: string;
  firstName?: string;
  zipcode?: string;
  birthday?: string;
  country?: string;
  avatar?: string;
  agreement?: string;
}

enum UserInput {
  LAST_NAME = 'lastName',
  FIRST_NAME = 'firstName',
  ZIP = 'zipcode',
  BIRTHDAY = 'birthday',
  COUNTRY = 'country',
  AVATAR = 'avatar',
  AGREEMENT = 'agreement',
}

type StateType = {
  disabled: boolean;
  errors: IErrors;
};

class Form extends React.Component {
  state: StateType = { disabled: true, errors: {} };
  // firstNameInput: React.RefObject<HTMLInputElement>;
  // firstNameInput: () => void;

  constructor(props: FormPropsType) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.validateData = this.validateData.bind(this);
    this.disableSubmitButton = this.disableSubmitButton.bind(this);
  }

  handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event?.target);
    const userInputsAreValid = this.validateData(formData);

    console.log(userInputsAreValid);
  }

  enableSubmitButton(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const reset = () => {
      this.setState({
        disabled: false,
        errors: {},
      });
    };
    if (Object.keys(this.state.errors).length > 0) {
      const newErrorsState = { ...this.state.errors };
      delete newErrorsState[event.target.name as keyof IErrors];

      if (Object.keys(newErrorsState).length > 0) {
        this.setState({
          disabled: true,
          errors: newErrorsState,
        });
      } else {
        reset();
      }
    } else {
      reset();
    }
  }

  disableSubmitButton() {
    if (this.state.disabled) {
      this.setState({
        disabled: true,
      });
    }
  }

  validateData(data: FormData) {
    const errors: IErrors = {};
    const map = new Map(data.entries());
    let agreement = false;
    console.log('validate', map);

    for (const [key, val] of map) {
      switch (key) {
        case UserInput.FIRST_NAME: {
          if (`${val}`.length < 1) errors[UserInput.FIRST_NAME] = 'Should contain at least 2 chars';
          break;
        }
        case UserInput.LAST_NAME: {
          if (`${val}`.length < 1) errors[UserInput.LAST_NAME] = 'Should contain at least 2 chars';
          break;
        }
        case UserInput.ZIP: {
          if (`${val}`.length < 1) errors[UserInput.ZIP] = 'Invalid zipcode';
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

          <label htmlFor="zipcode">Zipcode</label>
          <input
            id="zipcode"
            type="text"
            name="zipcode"
            data-testid="zipcode"
            autoComplete="off"
            onChange={this.enableSubmitButton}
          />
          {errors.zipcode && <small className={styles.error}>{errors.zipcode}</small>}

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
