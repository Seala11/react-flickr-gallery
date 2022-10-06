import React from 'react';
import COUNTRIES from 'shared/data/countries';
import styles from './index.module.scss';
import { FormCardType, FormFields, UserInput } from './models';

type FormPropsType = {
  createCard: (card: FormCardType) => void;
};

type ErrorsType = {
  lastName?: string;
  firstName?: string;
  birthday?: string;
  country?: string;
  avatar?: string;
  agreement?: string;
};

type StateType = {
  disabled: boolean;
  errors: ErrorsType;
};

class Form extends React.Component<FormPropsType> {
  state: StateType = { disabled: true, errors: {} };

  constructor(props: FormPropsType) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.disableSubmitButton = this.disableSubmitButton.bind(this);
    this.validateData = this.validateData.bind(this);
    this.removeInputError = this.removeInputError.bind(this);
  }

  handleSubmit(event: React.ChangeEvent<HTMLFormElement & FormFields>): void {
    event.preventDefault();
    const form = event.currentTarget;
    const { firstName, lastName, birthday, country, avatar, agreement, notifications } = form;

    const formData: FormCardType = {
      firstName: firstName?.value,
      lastName: lastName?.value,
      birthday: birthday?.value,
      country: country?.value,
      avatar: avatar?.files,
      agreement: agreement?.checked,
      notifications: notifications?.checked,
    };

    const dataIsValid: boolean = this.validateData(formData);

    if (dataIsValid) {
      this.props.createCard(formData);
    }
  }

  enableSubmitButton(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
    if (Object.keys(this.state.errors).length > 0) {
      this.removeInputError(event.target.name as keyof ErrorsType);
    } else {
      this.setState((prevState) => {
        return { ...prevState, disabled: false };
      });
    }
  }

  disableSubmitButton(): void {
    if (this.state.disabled) {
      this.setState((prevState) => {
        return { ...prevState, disabled: true };
      });
    }
  }

  removeInputError(key: keyof ErrorsType): void {
    const newErrorsState = { ...this.state.errors };
    delete newErrorsState[key];
    // const { [key]: _, ...newErrorsState } = this.state.errors;

    if (Object.keys(newErrorsState).length > 0) {
      this.setState((prevState) => {
        return { ...prevState, disabled: true, errors: newErrorsState };
      });
    } else {
      this.setState((prevState) => {
        return { ...prevState, disabled: false, errors: {} };
      });
    }
  }

  validateData(data: FormCardType): boolean {
    const errors: ErrorsType = {};

    for (const [key, value] of Object.entries(data)) {
      switch (key) {
        case UserInput.FIRST_NAME: {
          if (!value) errors[UserInput.FIRST_NAME] = 'First Name is required';
          if (value && typeof value === 'string' && value.trim().length < 2)
            errors[UserInput.FIRST_NAME] = 'Should contain at least 2 characters';
          break;
        }

        case UserInput.LAST_NAME: {
          if (!value) errors[UserInput.LAST_NAME] = 'Last Name is required';
          if (value && typeof value === 'string' && value.trim().length < 2)
            errors[UserInput.LAST_NAME] = 'Should contain at least 2 characters';
          break;
        }

        case UserInput.BIRTHDAY: {
          const today = new Date();
          if (!value) errors[UserInput.BIRTHDAY] = 'Birth date is required';
          if (
            new Date(`${value}`).getTime() >= today.getTime() ||
            new Date(`${value}`).getUTCFullYear() < 1900
          )
            errors[UserInput.BIRTHDAY] = 'Invalid birth date';
          break;
        }

        case UserInput.COUNTRY: {
          if (!value || `${value}` === '---') errors[UserInput.COUNTRY] = 'Country is required';
          break;
        }

        case UserInput.AVATAR: {
          if (!value || (value && value instanceof FileList && !value[0])) {
            errors[UserInput.AVATAR] = 'Avatar is required';
          }
          if (value && value instanceof FileList && value[0] && !/^image\//.test(value[0].type)) {
            errors[UserInput.AVATAR] = 'Avatar file should be an image';
          }
          break;
        }

        case UserInput.AGREEMENT: {
          if (!value) {
            errors[UserInput.AGREEMENT] = 'Required field';
          }
          break;
        }
      }
    }

    if (Object.keys(errors).length) {
      this.setState((prevState) => {
        return { ...prevState, disabled: true, errors };
      });
    }

    return !Object.keys(errors).length;
  }

  render() {
    console.log(this.state, 'RENDER');
    const errors = this.state.errors;
    return (
      <section className={styles.section}>
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
              accept="image/*"
              className={`${styles.input} ${errors.avatar ? styles.inputError : ''}`}
            />
          </label>
          {errors.avatar && <small className={styles.error}>{`${errors.avatar}`}</small>}

          <div className={styles.switcherWrapper}>
            <input
              id="notifications"
              name="notifications"
              type="checkbox"
              data-testid="notifications"
              className={styles.switcher}
            />
            <label htmlFor="notifications" className={styles.switcherLabel}>
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
      </section>
    );
  }
}

export default Form;
