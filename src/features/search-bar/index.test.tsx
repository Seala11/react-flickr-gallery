import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '.';
import { getSearchValueFromStorage, setSearchValueToStorage } from 'shared/helpers/storage';

describe('Search bar', () => {
  it('renders component', () => {
    render(
      <SearchBar updateInputHandler={() => {}} clearInputHandler={() => {}} searchValue={null} />
    );
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeEmptyDOMElement();
    expect(screen.getByText(/search/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/rick/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });

  it('set search value from props on rerender', async () => {
    const SEARCH_VALUE = 'Rick';
    const onChange = jest.fn();
    const { rerender } = render(
      <SearchBar updateInputHandler={onChange} clearInputHandler={() => {}} searchValue={null} />
    );
    expect(screen.getByTestId('search-input')).toBeEmptyDOMElement();

    const input = screen.getByRole('searchbox');
    userEvent.type(input, SEARCH_VALUE);
    expect(onChange).toHaveBeenCalledTimes(4);

    rerender(
      <SearchBar
        updateInputHandler={onChange}
        clearInputHandler={() => {}}
        searchValue={SEARCH_VALUE}
      />
    );
    expect(screen.getByTestId('search-input')).toHaveDisplayValue(SEARCH_VALUE);
  });

  it('input has a focus on render', async () => {
    const { getByTestId } = render(
      <SearchBar updateInputHandler={() => {}} clearInputHandler={() => {}} searchValue={null} />
    );

    const input = getByTestId('search-input');
    expect(input).toHaveFocus();
  });
});

describe('Local Storage for search bar', () => {
  beforeAll(() => {
    localStorage.clear();
  });

  it('On mounting input serch value should be get from the storage', () => {
    const storedValue = getSearchValueFromStorage();

    render(
      <SearchBar
        updateInputHandler={() => {}}
        clearInputHandler={() => {}}
        searchValue={storedValue}
      />
    );

    expect(screen.getByTestId('search-input')).toBeEmptyDOMElement();
  });

  it('Input value should be saved to LocalStorage during component`s unmount', () => {
    const TEST_VAL = 'test';
    const storedValue = getSearchValueFromStorage();

    const { unmount } = render(
      <SearchBar
        updateInputHandler={() => {}}
        clearInputHandler={() => {}}
        searchValue={storedValue}
      />
    );
    expect(screen.getByTestId('search-input')).toBeEmptyDOMElement();
    setSearchValueToStorage(TEST_VAL);

    unmount();

    const newStoredValue = getSearchValueFromStorage();
    render(
      <SearchBar
        updateInputHandler={() => {}}
        clearInputHandler={() => {}}
        searchValue={newStoredValue}
      />
    );

    expect(screen.getByTestId('search-input')).toHaveDisplayValue(TEST_VAL);
  });
});
