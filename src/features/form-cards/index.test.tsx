import React from 'react';
import { render, screen } from '@testing-library/react';
import FormCardList from '.';
import { FormCardType } from 'features/form/models';

const TEST_CARDS: FormCardType[] = [
  {
    agreement: true,
    avatar: null,
    birthday: '2022-09-25',
    country: 'Latvia',
    firstName: 'Hanna',
    lastName: 'Papova',
    notifications: false,
  },
  {
    agreement: true,
    avatar: null,
    birthday: '2000-09-25',
    country: 'Latvia',
    firstName: 'Anna',
    lastName: 'Pova',
    notifications: false,
  },
];

describe('Wnen Form Cards component renders', () => {
  it('should display cards', () => {
    render(<FormCardList cards={TEST_CARDS} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.findByText(/You have not submitted any form yet/i)).not.toBeInTheDocument;
  });

  it('should display message if no cards have been submitted', () => {
    render(<FormCardList cards={[]} />);

    expect(screen.findByText(/You have not submitted any form yet/i)).toBeInTheDocument;
    expect(screen.findAllByRole('listitem')).not.toBeInTheDocument;
  });
});
