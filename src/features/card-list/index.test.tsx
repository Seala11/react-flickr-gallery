import React from 'react';
import { render, screen } from '@testing-library/react';
import CardList from '.';
import CARDS from 'shared/data/cards';

describe('when the card list is rendered', () => {
  it('initially should contain all cards', () => {
    render(<CardList cards={CARDS} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(8);
  });

  it('if no cards were passed show error message', () => {
    render(<CardList cards={[]} />);
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });
});
