import React from 'react';
import { render, screen } from '@testing-library/react';
import CardList from '.';

const testCardList = [
  {
    id: 1,
    img: '/assets/images/rick.jpeg',
    name: 'Rick Sanchez',
    species: 'Human',
    status: 'Alive',
    gender: 'Male',
    location: 'Citadel of Ricks',
  },
  {
    id: 2,
    img: '/assets/images/morty.jpeg',
    name: 'Morty Smith',
    species: 'Human',
    status: 'Alive',
    gender: 'Male',
    location: 'Citadel of Ricks',
  },
];

describe('Card List', () => {
  it('renders cards', () => {
    render(<CardList cards={testCardList} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('if no cards found display message', () => {
    render(<CardList cards={[]} />);
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });
});
