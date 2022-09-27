import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar from '.';

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
    const { rerender } = render(
      <SearchBar updateInputHandler={() => {}} clearInputHandler={() => {}} searchValue={null} />
    );
    expect(screen.getByTestId('search-input')).toBeEmptyDOMElement();

    rerender(
      <SearchBar updateInputHandler={() => {}} clearInputHandler={() => {}} searchValue={'rick'} />
    );
    expect(screen.getByTestId('search-input')).toHaveDisplayValue('rick');
  });

  it('input has a focus on render', async () => {
    const { getByTestId } = render(
      <SearchBar updateInputHandler={() => {}} clearInputHandler={() => {}} searchValue={null} />
    );

    screen.debug();
    const input = getByTestId('search-input');
    expect(input).toHaveFocus();
    screen.debug();
  });
});
