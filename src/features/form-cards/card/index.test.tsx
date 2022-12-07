import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import FormCard from '.';
import { FormCardType } from 'features/form/models';

const TEST_CARD: FormCardType = {
  agreement: true,
  avatar: new File(['file'], 'file.png', { type: 'image/png' }),
  birthday: '2022-09-25',
  country: 'Latvia',
  firstName: 'Hanna',
  lastName: 'Papova',
  notifications: false,
};

const TEST_CARD2: FormCardType = {
  agreement: true,
  avatar: new File(['file'], 'file.png', { type: 'image/png' }),
  birthday: '2022-09-25',
  country: 'Latvia',
  firstName:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
  lastName:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
  notifications: true,
};

describe('Wnen Form Card component renders', () => {
  it('should display a card', async () => {
    render(<FormCard card={TEST_CARD} />);

    expect(screen.getByTestId('firstName')).toHaveTextContent(TEST_CARD.firstName);
    expect(screen.getByTestId('lastName')).toHaveTextContent(TEST_CARD.lastName);
    expect(screen.getByTestId('birthday')).toHaveTextContent(TEST_CARD.birthday);
    expect(screen.getByTestId('country')).toHaveTextContent(TEST_CARD.country);
    expect(screen.getByTestId('notifications')).toHaveTextContent(
      TEST_CARD.notifications ? 'On' : 'Off'
    );

    await waitFor(() => {
      expect(screen.getByTestId('avatar-img')).toBeInTheDocument();
    });
  });

  it('should display notifications ON if notification selected', () => {
    render(<FormCard card={TEST_CARD} />);
    expect(screen.getByTestId('notifications')).toHaveTextContent('Off');
  });

  it('should display notifications OFF if notification not selected', () => {
    render(<FormCard card={TEST_CARD2} />);
    expect(screen.getByTestId('notifications')).toHaveTextContent('On');
  });

  it('should display only first 250 chars of first name if its more than 250 characters', () => {
    render(<FormCard card={TEST_CARD2} />);
    expect(screen.getByTestId('firstName')).toHaveTextContent(
      `${TEST_CARD2.firstName.slice(0, 250)}...`
    );
  });

  it('should display only first 250 chars of last name if its more than 250 characters', () => {
    render(<FormCard card={TEST_CARD2} />);
    expect(screen.getByTestId('lastName')).toHaveTextContent(
      `${TEST_CARD2.lastName.slice(0, 250)}...`
    );
  });

  it('should display image with FileReader', async () => {
    render(<FormCard card={TEST_CARD} />);

    expect((screen.getByTestId('avatar-img') as HTMLImageElement).src).toEqual('http://localhost/');

    await waitFor(() => {
      expect((screen.getByTestId('avatar-img') as HTMLImageElement).src).not.toEqual(
        'http://localhost/'
      );
    });
  });
});
