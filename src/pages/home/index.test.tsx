import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '.';

describe('Home', () => {
  it('initial component renders with cards', async () => {
    render(<Home />);

    const userList = await waitFor(() => screen.getAllByRole('listitem'));
    expect(userList).toHaveLength(8);
  });

  it('filter cards with valid search input', async () => {
    const SEARCH_VALUE = 'Rick';

    render(<Home />);
    const input = screen.getByRole('searchbox');

    await waitFor(() => screen.getAllByRole('listitem'));
    expect(screen.getAllByRole('heading')).toHaveLength(8);

    userEvent.type(input, SEARCH_VALUE);

    await waitFor(() => screen.getAllByRole('listitem'));
    const result = screen.getAllByRole('heading');
    result.forEach((card) => expect(card).toHaveTextContent(new RegExp(SEARCH_VALUE, 'i')));
  });

  it('filter cards with invalid search input', async () => {
    const INVALID_SEARCH_VALUE = 'jdhjshfjsdfhsdjfhsdjfhsdjfhsdkdj';

    render(<Home />);
    const input = screen.getByRole('searchbox');

    userEvent.type(input, INVALID_SEARCH_VALUE);
    await waitFor(() => screen.getByTestId('error-message'));
  });

  it('clear search value and display default cards', async () => {
    render(<Home />);
    const input = screen.getByRole('searchbox');
    const clearInputButton = screen.getByRole('button');

    userEvent.click(clearInputButton);

    await waitFor(() => screen.getAllByRole('listitem'));
    expect(screen.getAllByRole('heading')).toHaveLength(8);
    expect(input).toHaveDisplayValue('');
  });
});
