import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '.';
import { getSearchValueFromStorage, setSearchValueToStorage } from 'shared/helpers/storage';

describe('Home', () => {
  it('initially component renders with empty search input and default amount of cards', async () => {
    render(<Home />);

    const userList = await waitFor(() => screen.getAllByRole('listitem'));
    expect(userList).toHaveLength(8);
    expect(screen.getByTestId('search-input')).toBeEmptyDOMElement();
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

  it('clear search input value and display all cards', async () => {
    render(<Home />);
    const input = screen.getByRole('searchbox');
    const clearInputButton = screen.getByRole('button');

    userEvent.click(clearInputButton);

    await waitFor(() => screen.getAllByRole('listitem'));
    expect(screen.getAllByRole('heading')).toHaveLength(8);
    expect(input).toHaveDisplayValue('');
  });
});

describe('Local storage for the search component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('display empty input if there are no stored value in storage', () => {
    render(<Home />);
    expect(screen.getByTestId('search-input')).toBeEmptyDOMElement();
    expect(getSearchValueFromStorage()).toBeNull();
  });

  it('stored value should be displayed in the input on component`s mount', () => {
    const TEST_VAL = 'test';
    setSearchValueToStorage(TEST_VAL);

    render(<Home />);
    expect(screen.getByTestId('search-input')).toHaveDisplayValue(TEST_VAL);
  });

  it('input value should be saved to LocalStorage during component`s unmount', () => {
    const TEST_VAL = 'test1';

    const { unmount } = render(<Home />);
    const input = screen.getByRole('searchbox');

    expect(screen.getByTestId('search-input')).toBeEmptyDOMElement();
    userEvent.type(input, TEST_VAL);
    setSearchValueToStorage(TEST_VAL);

    unmount();

    render(<Home />);
    expect(screen.getByTestId('search-input')).toHaveDisplayValue(TEST_VAL);
  });
});
