import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Form from '.';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const TEST_DATA = {
  firstName: 'Hanna',
  lastName: 'Papova',
  birthday: '1980-01-01',
  country: 'Italy',
  avatar: new File(['file'], 'file.png', { type: 'image/png' }),
};

describe('when Form component renders', () => {
  it('should have a form', () => {
    render(<Form createCard={jest.fn()} />);
    expect(screen.getByTestId('react-form')).toBeInTheDocument();
  });

  it('submit button should be disabled', () => {
    render(<Form createCard={jest.fn()} />);
    expect(screen.getByTestId('submit-button')).toBeDisabled();
  });
});

describe('when typing in Form inputs', () => {
  it('submit button should not be disabled', () => {
    render(<Form createCard={jest.fn()} />);
    const firstNameInput = screen.getByTestId('firstName');
    userEvent.type(firstNameInput, TEST_DATA.firstName);
    expect(screen.getByTestId('submit-button')).not.toBeDisabled();
  });

  it('should allow user to change first name', () => {
    render(<Form createCard={jest.fn()} />);
    const firstNameInput = screen.getByTestId('firstName');
    expect(firstNameInput).toBeEmptyDOMElement();
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    userEvent.type(firstNameInput, TEST_DATA.firstName);
    expect(firstNameInput).toHaveDisplayValue(TEST_DATA.firstName);
    expect(screen.getByTestId('submit-button')).not.toBeDisabled();
  });

  it('should allow user to change last name', () => {
    render(<Form createCard={jest.fn()} />);
    const lastNameInput = screen.getByTestId('lastName');
    expect(lastNameInput).toBeEmptyDOMElement();
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    userEvent.type(lastNameInput, TEST_DATA.lastName);
    expect(lastNameInput).toHaveDisplayValue(TEST_DATA.lastName);
    expect(screen.getByTestId('submit-button')).not.toBeDisabled();
  });

  it('should allow user to change birthday date', () => {
    render(<Form createCard={jest.fn()} />);
    const birthdayInput = screen.getByTestId('birthday');
    expect(birthdayInput).toBeEmptyDOMElement();
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    userEvent.type(birthdayInput, TEST_DATA.birthday);
    expect(birthdayInput).toHaveDisplayValue(TEST_DATA.birthday);
    expect(screen.getByTestId('submit-button')).not.toBeDisabled();
  });

  it('should allow user to select a country', () => {
    render(<Form createCard={jest.fn()} />);
    const countrySelect = screen.getByTestId('country');
    expect(countrySelect).toHaveDisplayValue(/---/);
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    userEvent.selectOptions(countrySelect, TEST_DATA.country);
    expect((screen.getByText(TEST_DATA.country) as HTMLOptionElement).selected).toBeTruthy();
    expect(screen.getByTestId('submit-button')).not.toBeDisabled();
  });

  it('should allow user to upload an avatar', async () => {
    render(<Form createCard={jest.fn()} />);
    const avatarInput: HTMLInputElement = screen.getByTestId('avatar');
    expect(avatarInput).toBeEmptyDOMElement();
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    await act(async () => {
      await waitFor(() => {
        userEvent.upload(avatarInput, TEST_DATA.avatar);
      });
    });

    if (!avatarInput.files) {
      throw new Error('No files have been uploaded');
    }

    expect(avatarInput.files[0]).toStrictEqual(TEST_DATA.avatar);
    expect(screen.getByTestId('submit-button')).not.toBeDisabled();
  });

  it('should allow user to select receive notifications', () => {
    render(<Form createCard={jest.fn()} />);
    const notificationsInput: HTMLInputElement = screen.getByTestId('notifications');
    expect(notificationsInput.checked).toEqual(false);
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    userEvent.click(notificationsInput);
    expect(notificationsInput.checked).toEqual(true);
    expect(screen.getByTestId('submit-button')).toBeDisabled();
  });

  it('should allow user to agree on data processing', () => {
    render(<Form createCard={jest.fn()} />);
    const agreementCheckbox: HTMLInputElement = screen.getByTestId('agreement');
    expect(agreementCheckbox.checked).toEqual(false);
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    userEvent.click(agreementCheckbox);
    expect(agreementCheckbox.checked).toEqual(true);
    expect(screen.getByTestId('submit-button')).not.toBeDisabled();

    userEvent.click(screen.getByTestId('submit-button'));
  });
});

describe('on submitting uncomplete Form', () => {
  it('should display error if there are no first name and remove it if user type again', async () => {
    render(<Form createCard={jest.fn()} />);

    userEvent.type(screen.getByTestId('lastName'), TEST_DATA.lastName);
    userEvent.click(screen.getByTestId('submit-button'));

    await screen.findByText(/First name is required/i);

    userEvent.type(screen.getByTestId('firstName'), 'h');
    await expect(screen.findByText(/First name is required/i)).not.toBeInTheDocument;
  });

  it('should display error if first name is invalid and remove it if user type again', async () => {
    render(<Form createCard={jest.fn()} />);

    userEvent.type(screen.getByTestId('firstName'), 'k');
    userEvent.click(screen.getByTestId('submit-button'));

    await screen.findByText(/Should contain at least 2 characters/i);

    userEvent.type(screen.getByTestId('firstName'), 'h');
    await expect(screen.findByText(/Should contain at least 2 characters/i)).not.toBeInTheDocument;
  });

  it('should display error if there are no last name and remove it if user type again', async () => {
    render(<Form createCard={jest.fn()} />);

    userEvent.type(screen.getByTestId('firstName'), TEST_DATA.firstName);
    userEvent.click(screen.getByTestId('submit-button'));

    await screen.findByText(/Last name is required/i);

    userEvent.type(screen.getByTestId('lastName'), 'h');
    await expect(screen.findByText(/Last name is required/i)).not.toBeInTheDocument;
  });

  it('should display error if last name is invalid and remove it if user type again', async () => {
    render(<Form createCard={jest.fn()} />);

    userEvent.type(screen.getByTestId('lastName'), 'k');
    userEvent.click(screen.getByTestId('submit-button'));

    await screen.findByText(/Should contain at least 2 characters/i);

    userEvent.type(screen.getByTestId('lastName'), 'h');
    await expect(screen.findByText(/Should contain at least 2 characters/i)).not.toBeInTheDocument;
  });

  it('should display error if no date was picked and remove it if user pick a date', async () => {
    render(<Form createCard={jest.fn()} />);

    userEvent.type(screen.getByTestId('lastName'), TEST_DATA.lastName);
    userEvent.click(screen.getByTestId('submit-button'));

    await screen.findByText(/Birth date is required/i);

    userEvent.type(screen.getByTestId('birthday'), TEST_DATA.birthday);
    await expect(screen.findByText(/Birth date is required/i)).not.toBeInTheDocument;
  });

  it('should display error if no country was picked and remove it if user pick a country', async () => {
    render(<Form createCard={jest.fn()} />);

    userEvent.type(screen.getByTestId('lastName'), TEST_DATA.lastName);
    userEvent.click(screen.getByTestId('submit-button'));

    await screen.findByText(/Country is required/i);

    userEvent.selectOptions(screen.getByTestId('country'), TEST_DATA.country);
    await expect(screen.findByText(/Country is required/i)).not.toBeInTheDocument;
  });

  it('should display error if no avatar was uploaded and remove it if user upload a file', async () => {
    render(<Form createCard={jest.fn()} />);

    const avatarInput: HTMLInputElement = screen.getByTestId('avatar');
    userEvent.type(screen.getByTestId('lastName'), TEST_DATA.lastName);
    userEvent.click(screen.getByTestId('submit-button'));

    await screen.findByText(/Avatar is required/i);

    await act(async () => {
      await waitFor(() => {
        userEvent.upload(avatarInput, TEST_DATA.avatar);
      });
    });

    if (!avatarInput.files) {
      throw new Error('No files have been uploaded');
    }

    await expect(screen.findByText(/Avatar is required/i)).not.toBeInTheDocument;
  });

  it('should display error if user did not agree on data processing and remove it after agreement', async () => {
    render(<Form createCard={jest.fn()} />);

    userEvent.type(screen.getByTestId('lastName'), TEST_DATA.lastName);
    userEvent.click(screen.getByTestId('submit-button'));

    await screen.findByText(/Required field/i);

    userEvent.click(screen.getByTestId('agreement'));
    await expect(screen.findByText(/Required field/i)).not.toBeInTheDocument;
  });
});
