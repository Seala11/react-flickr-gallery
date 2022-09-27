import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '.';

const testCard = {
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
    render(<Card card={testCard} />);
    expect(screen.getByRole('listitem')).toBeInTheDocument();
    expect(screen.getByAltText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/Human/i)).toBeInTheDocument();
    expect(screen.getByText(/Alive/i)).toBeInTheDocument();
    expect(screen.getByText(/Male/i)).toBeInTheDocument();
    expect(screen.getByText(/Citadel of Ricks/i)).toBeInTheDocument();
  });
});
