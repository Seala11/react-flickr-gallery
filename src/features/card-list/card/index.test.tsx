import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '.';
import CARDS from 'shared/data/cards';

describe('when the card is rendered', () => {
  const testCard = CARDS[0];

  it('should contain an expected image', () => {
    render(<Card card={testCard} />);
    expect(screen.getByAltText(/Rick Sanchez/i)).toBeInTheDocument();
  });

  it('should contain an expected title', () => {
    render(<Card card={testCard} />);
    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
  });

  it('should contain an expected subtitle', () => {
    render(<Card card={testCard} />);
    expect(screen.getByText(/Human/i)).toBeInTheDocument();
    expect(screen.getByText(/Male/i)).toBeInTheDocument();
  });

  it('should contain an expected info', () => {
    render(<Card card={testCard} />);
    expect(screen.getByText(/location/i)).toBeInTheDocument();
    expect(screen.getByText(/Citadel of Ricks/i)).toBeInTheDocument();
    expect(screen.getByText(/status/i)).toBeInTheDocument();
    expect(screen.getByText(/Alive/i)).toBeInTheDocument();
  });
});
