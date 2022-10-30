import React from 'react';
import { render, waitFor } from '@testing-library/react';
import SearchBar from '.';
import userEvent from '@testing-library/user-event';
import AppProvider from 'app/store/provider';

describe('When the search bar is rendered', () => {
  it('search bar should be empty if search value from props is null, search button is displayed', () => {
    const { getByTestId } = render(
      <AppProvider>
        <SearchBar searchHandler={jest.fn()} />
      </AppProvider>
    );
    expect(getByTestId('search-input')).toBeEmptyDOMElement();
    expect(getByTestId('search-btn')).toBeInTheDocument();
  });

  it('input should not have a focus on it', async () => {
    const { getByTestId } = render(
      <AppProvider>
        <SearchBar searchHandler={jest.fn()} />
      </AppProvider>
    );

    expect(getByTestId('search-input')).not.toHaveFocus();
  });
});

describe('when input contains a value', () => {
  it('clear button should clear the value', async () => {
    const { getByTestId } = render(
      <AppProvider>
        <SearchBar searchHandler={jest.fn()} />
      </AppProvider>
    );
    userEvent.type(getByTestId('search-input'), 'test');
    expect(getByTestId('search-input')).toHaveDisplayValue('test');
    userEvent.click(getByTestId('clear-btn'));

    waitFor(() => expect(getByTestId('search-input')).toHaveDisplayValue(''));
  });
});
