import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Form from '.';
import userEvent from '@testing-library/user-event';
import AppProvider from 'app/store/provider';

const TEST_DATA = {
  firstName: 'Hanna',
  lastName: 'Papova',
  birthday: '1980-01-01',
  country: 'Italy',
  avatar: new File(['file'], 'file.png', { type: 'image/png' }),
};

describe('when Form component renders', () => {
  it('should have a form', () => {
    render(
      <AppProvider>
        <Form createCard={jest.fn()} />
      </AppProvider>
    );
    expect(screen.getByTestId('react-form')).toBeInTheDocument();
  });

  it('submit button should be disabled', () => {
    render(
      <AppProvider>
        <Form createCard={jest.fn()} />
      </AppProvider>
    );
    expect(screen.getByTestId('submit-button')).toBeDisabled();
  });
});

describe('when typing in Form inputs', () => {
  it('submit button should not be disabled', async () => {
    render(
      <AppProvider>
        <Form createCard={jest.fn()} />
      </AppProvider>
    );
    const firstNameInput = screen.getByTestId('firstName');
    userEvent.type(firstNameInput, TEST_DATA.firstName);
    await waitFor(() => {
      expect(screen.getByTestId('submit-button')).not.toBeDisabled();
    });
  });

  it('should allow user to change first name', async () => {
    render(
      <AppProvider>
        <Form createCard={jest.fn()} />
      </AppProvider>
    );
    const firstNameInput = screen.getByTestId('firstName');
    expect(firstNameInput).toBeEmptyDOMElement();
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    userEvent.type(firstNameInput, TEST_DATA.firstName);
    expect(firstNameInput).toHaveDisplayValue(TEST_DATA.firstName);
    await waitFor(() => {
      expect(screen.getByTestId('submit-button')).not.toBeDisabled();
    });
  });

  it('should allow user to change last name', async () => {
    render(
      <AppProvider>
        <Form createCard={jest.fn()} />
      </AppProvider>
    );
    const lastNameInput = screen.getByTestId('lastName');
    expect(lastNameInput).toBeEmptyDOMElement();
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    userEvent.type(lastNameInput, TEST_DATA.lastName);
    expect(lastNameInput).toHaveDisplayValue(TEST_DATA.lastName);
    await waitFor(() => {
      expect(screen.getByTestId('submit-button')).not.toBeDisabled();
    });
  });

  it('should allow user to change birthday date', async () => {
    render(
      <AppProvider>
        <Form createCard={jest.fn()} />
      </AppProvider>
    );
    const birthdayInput = screen.getByTestId('birthday');
    expect(birthdayInput).toBeEmptyDOMElement();
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    userEvent.type(birthdayInput, TEST_DATA.birthday);
    expect(birthdayInput).toHaveDisplayValue(TEST_DATA.birthday);
    await waitFor(() => {
      expect(screen.getByTestId('submit-button')).not.toBeDisabled();
    });
  });

  it('should allow user to select a country', async () => {
    render(
      <AppProvider>
        <Form createCard={jest.fn()} />
      </AppProvider>
    );
    const countrySelect = screen.getByTestId('country');
    expect(countrySelect).toHaveDisplayValue(/---/);
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    userEvent.selectOptions(countrySelect, TEST_DATA.country);
    expect((screen.getByText(TEST_DATA.country) as HTMLOptionElement).selected).toBeTruthy();
    await waitFor(() => {
      expect(screen.getByTestId('submit-button')).not.toBeDisabled();
    });
  });

  it('should allow user to upload an avatar', async () => {
    render(
      <AppProvider>
        <Form createCard={jest.fn()} />
      </AppProvider>
    );
    const avatarInput: HTMLInputElement = screen.getByTestId('avatar');
    expect(avatarInput).toBeEmptyDOMElement();
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    await waitFor(() => userEvent.upload(avatarInput, TEST_DATA.avatar));

    if (!avatarInput.files) {
      throw new Error('No files have been uploaded');
    }

    expect(avatarInput.files[0]).toStrictEqual(TEST_DATA.avatar);
    expect(screen.getByTestId('submit-button')).not.toBeDisabled();
  });

  it('should allow user to select receive notifications', async () => {
    render(
      <AppProvider>
        <Form createCard={jest.fn()} />
      </AppProvider>
    );
    const notificationsInput: HTMLInputElement = screen.getByTestId('notifications');
    expect(notificationsInput.checked).toEqual(false);
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    userEvent.click(notificationsInput);
    expect(notificationsInput.checked).toEqual(true);
  });

  it('should allow user to agree on data processing', async () => {
    render(
      <AppProvider>
        <Form createCard={jest.fn()} />
      </AppProvider>
    );
    const agreementCheckbox: HTMLInputElement = screen.getByTestId('agreement');
    expect(agreementCheckbox.checked).toEqual(false);
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    userEvent.click(agreementCheckbox);
    expect(agreementCheckbox.checked).toEqual(true);
    await waitFor(() => {
      expect(screen.getByTestId('submit-button')).not.toBeDisabled();
    });
  });
});

describe('on submitting uncomplete Form', () => {
  it('should display error if there are no first name and remove it if user type again', async () => {
    render(
      <AppProvider>
        <Form createCard={jest.fn()} />
      </AppProvider>
    );

    userEvent.type(screen.getByTestId('lastName'), TEST_DATA.lastName);
    userEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.queryByText(/First name is required/i)).toBeInTheDocument();
    });

    userEvent.type(screen.getByTestId('firstName'), 'h');

    await waitFor(() => {
      expect(screen.queryByText(/First name is required/i)).not.toBeInTheDocument();
    });
  });

  it('should display error if first name is invalid and remove it if user type again', async () => {
    render(
      <AppProvider>
        <Form createCard={jest.fn()} />
      </AppProvider>
    );

    userEvent.type(screen.getByTestId('firstName'), 'k');
    userEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.queryByText(/Should contain at least 2 characters/i)).toBeInTheDocument();
    });

    userEvent.type(screen.getByTestId('firstName'), 'h');
    await waitFor(() => {
      expect(screen.queryByText(/Should contain at least 2 characters/i)).not.toBeInTheDocument();
    });
  });

  it('should display error if there are no last name and remove it if user type again', async () => {
    render(
      <AppProvider>
        <Form createCard={jest.fn()} />
      </AppProvider>
    );

    userEvent.type(screen.getByTestId('firstName'), TEST_DATA.firstName);
    userEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.queryByText(/Last name is required/i)).toBeInTheDocument();
    });

    userEvent.type(screen.getByTestId('lastName'), 'h');

    await waitFor(() => {
      expect(screen.queryByText(/Last name is required/i)).not.toBeInTheDocument();
    });
  });

  it('should display error if last name is invalid and remove it if user type again', async () => {
    render(
      <AppProvider>
        <Form createCard={jest.fn()} />
      </AppProvider>
    );

    userEvent.type(screen.getByTestId('lastName'), 'k');
    userEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.queryByText(/Should contain at least 2 characters/i)).toBeInTheDocument();
    });

    userEvent.type(screen.getByTestId('lastName'), 'h');

    await waitFor(() => {
      expect(screen.queryByText(/Should contain at least 2 characters/i)).not.toBeInTheDocument();
    });
  });

  it('should display error if no date was picked and remove it if user pick a date', async () => {
    render(
      <AppProvider>
        <Form createCard={jest.fn()} />
      </AppProvider>
    );

    userEvent.type(screen.getByTestId('lastName'), TEST_DATA.lastName);
    userEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.queryByText(/Birth date is required/i)).toBeInTheDocument();
    });

    userEvent.type(screen.getByTestId('birthday'), TEST_DATA.birthday);

    await waitFor(() => {
      expect(screen.queryByText(/Birth date is required/i)).not.toBeInTheDocument();
    });
  });

  it('should display error if birth date is invalid', async () => {
    render(
      <AppProvider>
        <Form createCard={jest.fn()} />
      </AppProvider>
    );

    const birthdayInput = screen.getByTestId('birthday');

    userEvent.type(birthdayInput, '2200-01-01');
    expect(birthdayInput).toHaveDisplayValue('2200-01-01');

    userEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.queryByText(/Invalid birth date/i)).toBeInTheDocument();
    });
  });

  it('should display error if no country was picked and remove it if user pick a country', async () => {
    render(
      <AppProvider>
        <Form createCard={jest.fn()} />
      </AppProvider>
    );

    userEvent.type(screen.getByTestId('lastName'), TEST_DATA.lastName);
    userEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.queryByText(/Country is required/i)).toBeInTheDocument();
    });

    userEvent.selectOptions(screen.getByTestId('country'), TEST_DATA.country);

    await waitFor(() => {
      expect(screen.queryByText(/Country is required/i)).not.toBeInTheDocument();
    });
  });

  it('should display error if no avatar was uploaded and remove it if user upload a file', async () => {
    render(
      <AppProvider>
        <Form createCard={jest.fn()} />
      </AppProvider>
    );

    const avatarInput: HTMLInputElement = screen.getByTestId('avatar');
    userEvent.type(screen.getByTestId('lastName'), TEST_DATA.lastName);
    userEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.queryByText(/Avatar is required/i)).toBeInTheDocument();
    });

    await waitFor(() => userEvent.upload(avatarInput, TEST_DATA.avatar));

    if (!avatarInput.files) {
      throw new Error('No files have been uploaded');
    }

    await waitFor(() => {
      expect(screen.queryByText(/Avatar is required/i)).not.toBeInTheDocument();
    });
  });

  it('should display error if user did not agree on data processing and remove it after agreement', async () => {
    render(
      <AppProvider>
        <Form createCard={jest.fn()} />
      </AppProvider>
    );

    userEvent.type(screen.getByTestId('lastName'), TEST_DATA.lastName);
    userEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.queryByText(/Required field/i)).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId('agreement'));

    await waitFor(() => {
      expect(screen.queryByText(/Required field/i)).not.toBeInTheDocument();
    });
  });

  it('should set submit button active again after filling all inputs with errors', async () => {
    render(
      <AppProvider>
        <Form createCard={jest.fn()} />
      </AppProvider>
    );

    userEvent.type(screen.getByTestId('lastName'), TEST_DATA.lastName);
    userEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => expect(screen.getByTestId('submit-button')).toBeDisabled());

    userEvent.type(screen.getByTestId('firstName'), TEST_DATA.firstName);
    userEvent.type(screen.getByTestId('birthday'), TEST_DATA.birthday);
    userEvent.selectOptions(screen.getByTestId('country'), TEST_DATA.country);
    userEvent.upload(screen.getByTestId('avatar'), TEST_DATA.avatar);
    userEvent.click(screen.getByTestId('agreement'));

    await waitFor(() => expect(screen.getByTestId('submit-button')).not.toBeDisabled());
  });
});
