import React from 'react';
import { render, screen } from '@testing-library/react';
import CardList from '.';

const TEST_CARDS = [
  {
    farm: 66,
    id: '36493087974',
    isfamily: 0,
    isfriend: 0,
    ispublic: 1,
    license: '4',
    owner: '96925387@N00',
    ownername: 'Jeanne Menjoulet',
    secret: '4df1b792a8',
    server: '65535',
    title: 'Cannelle au soleil',
  },
  {
    farm: 66,
    id: '36493087977',
    isfamily: 0,
    isfriend: 0,
    ispublic: 1,
    license: '4',
    owner: 'hanna',
    ownername: 'hanna papova',
    secret: '4df1b792a8',
    server: '65535',
    title: 'picture',
  },
];

describe('when the card list is rendered', () => {
  it('initially should contain all cards', () => {
    render(<CardList cards={TEST_CARDS} error={false} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('if no cards were passed show error message', () => {
    render(<CardList cards={[]} error={false} />);
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });
});
