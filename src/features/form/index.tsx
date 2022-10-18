import React, { useEffect } from 'react';
import COUNTRIES from 'shared/data/countries';
import styles from './index.module.scss';
import { FormCardType, UserInput } from './models';
import { useForm, SubmitHandler } from 'react-hook-form';

type Props = {
  createCard: (card: FormCardType) => void;
};

const Form = ({ createCard }: Props) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    getFieldState,
    formState: { errors, isDirty, isSubmitSuccessful },
    reset,
  } = useForm<FormCardType>();

  // TODO: shouldComponentUpdate hook
  // shouldComponentUpdate(
  //   nextProps: Readonly<FormPropsType>,
  //   nextState: Readonly<StateType>
  // ): boolean {
  //   if (this.state.disabled !== nextState.disabled || Object.keys(this.state.errors).length > 0) {
  //     return true;
  //   }
  //   return false;
  // }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: '',
        lastName: '',
        birthday: '',
        country: '',
        agreement: false,
        notifications: false,
        avatar: null,
      });
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<FormCardType> = (data) => {
    console.log(data);

    const dataIsValid: boolean = validateData(data);

    if (dataIsValid) {
      createCard(data);
    }
  };

  const validateData = (data: FormCardType): boolean => {
    for (const [key, value] of Object.entries(data)) {
      switch (key) {
        case UserInput.FIRST_NAME: {
          if (!value)
            setError(UserInput.FIRST_NAME, {
              message: 'First Name is required',
            });
          if (value && typeof value === 'string' && value.trim().length < 2)
            setError(UserInput.FIRST_NAME, {
              message: 'Should contain at least 2 characters',
            });
          break;
        }

        case UserInput.LAST_NAME: {
          if (!value)
            setError(UserInput.LAST_NAME, {
              message: 'Last Name is required',
            });
          if (value && typeof value === 'string' && value.trim().length < 2)
            setError(UserInput.LAST_NAME, {
              message: 'Should contain at least 2 characters',
            });
          break;
        }

        case UserInput.BIRTHDAY: {
          const today = new Date();
          if (!value)
            setError(UserInput.BIRTHDAY, {
              message: 'Birth date is required',
            });
          if (
            new Date(`${value}`).getTime() >= today.getTime() ||
            new Date(`${value}`).getUTCFullYear() < 1900
          )
            setError(UserInput.BIRTHDAY, {
              message: 'Invalid birth date',
            });
          break;
        }

        case UserInput.COUNTRY: {
          if (!value || `${value}` === '---')
            setError(UserInput.COUNTRY, {
              message: 'Country is required',
            });
          break;
        }

        case UserInput.AVATAR: {
          if (!value || (value && value instanceof FileList && !value[0])) {
            setError(UserInput.AVATAR, {
              message: 'Avatar is required',
            });
          }
          if (value && value instanceof FileList && value[0] && !/^image\//.test(value[0].type)) {
            setError(UserInput.AVATAR, {
              type: 'filetype',
              message: 'Avatar file should be an image',
            });
          }
          break;
        }

        case UserInput.AGREEMENT: {
          if (!value) {
            setError(UserInput.AGREEMENT, {
              message: 'Required field',
            });
          }
          break;
        }
      }
    }

    const formIsInvalid = Object.keys(data).some(
      (input) => getFieldState(input as keyof FormCardType).error
    );

    return !formIsInvalid;
  };

  console.log('update');
  return (
    <section className={styles.section}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        data-testid="react-form"
        autoComplete="off"
        noValidate
      >
        <label htmlFor="firstName" className={styles.label}>
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          data-testid="firstName"
          autoComplete="off"
          className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
          {...register('firstName', { onChange: () => clearErrors('firstName') })}
        />
        {errors.firstName && <small className={styles.error}>{errors.firstName.message}</small>}

        <label htmlFor="lastName" className={styles.label}>
          Last Name
        </label>
        <input
          id="lastName"
          data-testid="lastName"
          type="text"
          autoComplete="off"
          className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
          {...register('lastName', { onChange: () => clearErrors('lastName') })}
        />
        {errors.lastName && <small className={styles.error}>{errors.lastName.message}</small>}

        <label htmlFor="birthday" className={styles.label}>
          Birthday
        </label>
        <input
          id="birthday"
          type="date"
          data-testid="birthday"
          autoComplete="off"
          className={`${styles.input} ${styles.birthday} ${
            errors.birthday ? styles.inputError : ''
          }`}
          {...register('birthday', { onChange: () => clearErrors('birthday') })}
        />
        {errors.birthday && <small className={styles.error}>{errors.birthday.message}</small>}

        <label htmlFor="country" className={styles.label}>
          Country
        </label>
        <select
          id="country"
          data-testid="country"
          className={`${styles.input} ${styles.select} ${errors.country ? styles.inputError : ''}`}
          {...register('country', { onChange: () => clearErrors('country') })}
        >
          <option hidden>---</option>
          {COUNTRIES.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && <small className={styles.error}>{errors.country.message}</small>}

        <label htmlFor="avatar" className={`${styles.label} ${styles.avatarLabel}`}>
          Avatar
          <input
            type="file"
            id="avatar"
            data-testid="avatar"
            accept="image/*"
            className={`${styles.input} ${styles.avatarInput} ${
              errors.avatar ? styles.inputError : ''
            }`}
            {...register('avatar', { onChange: () => clearErrors('avatar') })}
          />
        </label>
        {errors.avatar && <small className={styles.error}>{`${errors.avatar.message}`}</small>}

        <div className={styles.switcherWrapper}>
          <input
            id="notifications"
            type="checkbox"
            data-testid="notifications"
            className={styles.switcher}
            {...register('notifications')}
          />
          <label htmlFor="notifications" className={styles.switcherLabel}>
            <span className={styles.switcherBtn} />
          </label>
          <span>I want to receive notifications</span>
        </div>

        <label
          htmlFor="agreement"
          className={`${styles.agreement} ${styles.label} ${
            errors.agreement ? styles.agreementError : ''
          }`}
        >
          <input
            id="agreement"
            type="checkbox"
            data-testid="agreement"
            className={`${styles.input} ${styles.checkbox} ${
              errors.agreement ? styles.inputError : ''
            }`}
            {...register('agreement', { onChange: () => clearErrors('agreement') })}
          />
          <span
            className={`${styles.checkmark} ${errors.agreement ? styles.checkmarkError : ''}`}
          />
          I give my consent to processing my personal data
        </label>
        {errors.agreement && <small className={styles.error}>{errors.agreement.message}</small>}

        <button
          type="submit"
          data-testid="submit-button"
          disabled={Object.keys(errors).length > 0 || !isDirty}
          className={styles.button}
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default Form;
