import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import FormPage from '.';
import userEvent from '@testing-library/user-event';

const TEST_DATA = {
  agreement: true,
  avatar: new File(['file'], 'file.png', { type: 'image/png' }),
  birthday: '2022-09-25',
  country: 'Latvia',
  firstName: 'Hanna',
  lastName: 'Papova',
  notifications: false,
};

describe('on submitting complete Form', () => {
  it('should reset all inputs, disable the submit button and add new card', async () => {
    jest.setTimeout(10000);
    render(<FormPage />);
    expect(screen.getByText(/You have not submitted any form yet/i)).toBeInTheDocument;

    userEvent.type(screen.getByTestId('firstName'), TEST_DATA.firstName);
    userEvent.type(screen.getByTestId('lastName'), TEST_DATA.lastName);
    userEvent.type(screen.getByTestId('birthday'), TEST_DATA.birthday);
    userEvent.selectOptions(screen.getByTestId('country'), TEST_DATA.country);
    userEvent.upload(screen.getByTestId('avatar'), TEST_DATA.avatar);
    userEvent.click(screen.getByTestId('agreement'));

    userEvent.click(screen.getByTestId('submit-button'));

    expect(screen.findByRole('listitem')).toBeInTheDocument;
    const card = await screen.findByRole('listitem');
    expect(screen.findByText(/Your form has been successfully submitted/i)).toBeInTheDocument;
    expect(screen.getByTestId('submit-button')).toBeDisabled();

    expect(card).toHaveTextContent(
      /First Name: Hanna\s*Last Name: Papova\s*Birthday: 2022-09-25\s*Country: Latvia\s*Notifications: Off/i
    );

    waitFor(
      () =>
        expect(screen.findByText(/Your form has been successfully submitted/i)).not
          .toBeInTheDocument
    );
  }, 10000);
});
