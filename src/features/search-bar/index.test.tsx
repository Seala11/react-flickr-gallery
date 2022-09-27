import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar from '.';

describe('Search bar', () => {
  it('renders component', () => {
    render(
      <SearchBar updateInputHandler={() => {}} clearInputHandler={() => {}} searchValue={null} />
    );
    expect(screen.getByTestId('search-input')).toBeEmptyDOMElement();
  });

  it('input has a focus on render', async () => {
    const { getByTestId } = render(
      <SearchBar updateInputHandler={() => {}} clearInputHandler={() => {}} searchValue={null} />
    );

    const input = getByTestId('search-input');
    expect(input).toHaveFocus();
  });
});
