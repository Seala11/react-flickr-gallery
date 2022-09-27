import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '.';

const TEST_CARD = {
  id: 1,
  img: '/assets/images/rick.jpeg',
  name: 'Rick Sanchez',
  species: 'Human',
  status: 'Alive',
  gender: 'Male',
  location: 'Citadel of Ricks',
};

describe('Card', () => {
  it('renders component', () => {
    render(<Card card={TEST_CARD} />);
    expect(screen.getByRole('listitem')).toBeInTheDocument();
    expect(screen.getByAltText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/Human/i)).toBeInTheDocument();
    expect(screen.getByText(/Alive/i)).toBeInTheDocument();
    expect(screen.getByText(/Male/i)).toBeInTheDocument();
    expect(screen.getByText(/Citadel of Ricks/i)).toBeInTheDocument();
  });
});
