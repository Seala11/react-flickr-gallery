import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Form from '.';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('when Form component renders', () => {
  it('should have a form', () => {
    render(<Form />);
    expect(screen.getByTestId('react-form')).toBeInTheDocument();
  });

  it('submit button should be disabled', () => {
    render(<Form />);
    expect(screen.getByTestId('submit-button')).toBeDisabled();
  });
});

describe('when typing in Form inputs', () => {
  const TEST_DATA = {
    firstName: 'Hanna',
    lastName: 'Papova',
    zipcode: '222222',
    birthday: '1980-01-01',
    country: 'Italy',
    avatar: new File(['file'], 'file.png', { type: 'image/png' }),
  };

  it('submit button should not be disabled', () => {
    render(<Form />);
    const firstNameInput = screen.getByTestId('firstName');
    userEvent.type(firstNameInput, TEST_DATA.firstName);
    expect(screen.getByTestId('submit-button')).not.toBeDisabled();
  });

  it('should allow user to change first name', () => {
    render(<Form />);
    const firstNameInput = screen.getByTestId('firstName');
    expect(firstNameInput).toBeEmptyDOMElement();
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    userEvent.type(firstNameInput, TEST_DATA.firstName);
    expect(firstNameInput).toHaveDisplayValue(TEST_DATA.firstName);
    expect(screen.getByTestId('submit-button')).not.toBeDisabled();
  });

  it('should allow user to change last name', () => {
    render(<Form />);
    const lastNameInput = screen.getByTestId('lastName');
    expect(lastNameInput).toBeEmptyDOMElement();
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    userEvent.type(lastNameInput, TEST_DATA.lastName);
    expect(lastNameInput).toHaveDisplayValue(TEST_DATA.lastName);
    expect(screen.getByTestId('submit-button')).not.toBeDisabled();
  });

  it('should allow user to change a zipcode', () => {
    render(<Form />);
    const zipcodeInput = screen.getByTestId('zipcode');
    expect(zipcodeInput).toBeEmptyDOMElement();
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    userEvent.type(zipcodeInput, TEST_DATA.zipcode);
    expect(zipcodeInput).toHaveDisplayValue(TEST_DATA.zipcode);
    expect(screen.getByTestId('submit-button')).not.toBeDisabled();
  });

  it('should allow user to change birthday date', () => {
    render(<Form />);
    const birthdayInput = screen.getByTestId('birthday');
    expect(birthdayInput).toBeEmptyDOMElement();
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    userEvent.type(birthdayInput, TEST_DATA.birthday);
    expect(birthdayInput).toHaveDisplayValue(TEST_DATA.birthday);
    expect(screen.getByTestId('submit-button')).not.toBeDisabled();
  });

  it('should allow user to select a country', () => {
    render(<Form />);
    const countrySelect = screen.getByTestId('country');
    expect(countrySelect).toHaveDisplayValue(/---/);
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    userEvent.selectOptions(countrySelect, TEST_DATA.country);
    expect((screen.getByText(TEST_DATA.country) as HTMLOptionElement).selected).toBeTruthy();
    expect(screen.getByTestId('submit-button')).not.toBeDisabled();
  });

  it('should allow user to upload an avatar', async () => {
    render(<Form />);
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

  it('should allow user to select a gender', () => {
    render(<Form />);
    const genderInput: HTMLInputElement = screen.getByTestId('gender');
    expect(genderInput.checked).toEqual(false);
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    userEvent.click(genderInput);
    expect(genderInput.checked).toEqual(true);
    expect(screen.getByTestId('submit-button')).toBeDisabled();
  });

  it('should allow user to agree on data processing', () => {
    render(<Form />);
    const agreementCheckbox: HTMLInputElement = screen.getByTestId('agreement');
    expect(agreementCheckbox.checked).toEqual(false);
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    userEvent.click(agreementCheckbox);
    expect(agreementCheckbox.checked).toEqual(true);
    expect(screen.getByTestId('submit-button')).not.toBeDisabled();
  });
});

// describe('on submitting the Form', () => {
//   const formData = {
//     firstName: 'Hanna',
//     lastName: 'Papova',
//     zipcode: '222222',
//     birthday: '',
//     country: '',
//   };

//   it.todo('should display error if first name is invalid', async () => {
//     render(<Form />);

//     const firstNameInput = screen.getByTestId('firstName');
//     expect(firstNameInput).toBeInTheDocument();

//     await userEvent.type(firstNameInput, 'h');
//     await userEvent.click(screen.getByTestId('submit-button'));

//     expect(firstNameInput).toHaveDisplayValue('h');
//     expect(screen.getByText(/first name error message/i)).toBeInTheDocument();
//   });

//   it.todo('should display error if last name is invalid', async () => {
//     render(<Form />);

//     const lastNameInput = screen.getByTestId('lastName');
//     expect(lastNameInput).toBeInTheDocument();

//     await userEvent.type(lastNameInput, 'h');
//     await userEvent.click(screen.getByTestId('submit-button'));

//     expect(lastNameInput).toHaveDisplayValue('h');
//     expect(screen.getByText(/last name error message/i)).toBeInTheDocument();
//   });

//   it.todo('should display error if zipcode is invalid', async () => {
//     render(<Form />);

//     const zipcodeInput = screen.getByTestId('zipcode');
//     expect(zipcodeInput).toBeInTheDocument();

//     await userEvent.type(zipcodeInput, 'h');
//     await userEvent.click(screen.getByTestId('submit-button'));

//     expect(zipcodeInput).toHaveDisplayValue('h');
//     expect(screen.getByText(/zipcode error message/i)).toBeInTheDocument();
//   });
// });
