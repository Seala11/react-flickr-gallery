import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '.';

describe('when the card is rendered', () => {
  const testCard = {
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
  };

  it('should contain an expected image', () => {
    render(<Card card={testCard} />);
    expect(screen.getByTestId('card-image')).toBeInTheDocument();
  });

  it('should contain an expected title', () => {
    render(<Card card={testCard} />);
    expect(screen.getByTestId('card-title')).toBeInTheDocument();
  });

  it('should contain an expected subtitle', () => {
    render(<Card card={testCard} />);
    expect(screen.getByTestId('card-subtitle')).toBeInTheDocument();
  });
});
