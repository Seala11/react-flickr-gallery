import React from 'react';
import { render, screen } from '@testing-library/react';
import FormCard from '.';
import { FormCardType } from 'features/form/models';

const TEST_CARD: FormCardType = {
  agreement: true,
  avatar: null,
  birthday: '2022-09-25',
  country: 'Latvia',
  firstName: 'Hanna',
  lastName: 'Papova',
  notifications: false,
};

describe('Wnen Form Card component renders', () => {
  it('should display a card', () => {
    render(<FormCard card={TEST_CARD} />);

    const name = screen.getByText(/first name/i, { exact: false });
    expect(name.textContent).toEqual('First Name: Hanna');

    const surname = screen.getByText(/last name/i, { exact: false });
    expect(surname.textContent).toEqual('Last Name: Papova');

    const birth = screen.getByText(/birthday/i, { exact: false });
    expect(birth.textContent).toEqual('Birthday: 2022-09-25');

    const country = screen.getByText(/country/i, { exact: false });
    expect(country.textContent).toEqual('Country: Latvia');

    const notifications = screen.getByText(/notifications/i, { exact: false });
    expect(notifications.textContent).toEqual('Notifications: Off');
  });
});
