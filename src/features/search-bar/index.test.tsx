import React from 'react';
import { render } from '@testing-library/react';
import SearchBar from '.';
import userEvent from '@testing-library/user-event';

describe('When the search bar is rendered', () => {
  it('search bar should be empty if search value from props is null, search button is displayed', () => {
    const { getByTestId } = render(
      <SearchBar
        updateInputHandler={jest.fn()}
        clearInputHandler={jest.fn()}
        searchValue={null}
        searchHandler={jest.fn()}
      />
    );
    expect(getByTestId('search-input')).toBeEmptyDOMElement();
    expect(getByTestId('search-btn')).toBeInTheDocument();
  });

  it('search bar should contain search value from props, clear button is displayed', () => {
    const propsValue = 'test';
    const { getByTestId } = render(
      <SearchBar
        updateInputHandler={jest.fn()}
        clearInputHandler={jest.fn()}
        searchHandler={jest.fn()}
        searchValue={propsValue}
      />
    );
    expect(getByTestId('search-input')).toHaveDisplayValue(propsValue);
    expect(getByTestId('clear-btn')).toBeInTheDocument();
  });

  it('input should have a focus on it', async () => {
    const { getByTestId } = render(
      <SearchBar
        updateInputHandler={jest.fn()}
        clearInputHandler={jest.fn()}
        searchHandler={jest.fn()}
        searchValue={null}
      />
    );
    expect(getByTestId('search-input')).toHaveFocus();
  });
});

describe('when typing in search bar', () => {
  it('should update its value', () => {
    const update = jest.fn();
    const { getByTestId } = render(
      <SearchBar
        updateInputHandler={update}
        clearInputHandler={jest.fn()}
        searchHandler={jest.fn()}
        searchValue={null}
      />
    );
    userEvent.type(getByTestId('search-input'), 'test');
    expect(update).toHaveBeenCalledTimes(4);
  });
});

describe('when input contains a value', () => {
  it('clear button should clear the value', async () => {
    const propsValue = 'test';
    const clear = jest.fn();
    const { getByTestId } = render(
      <SearchBar
        updateInputHandler={jest.fn()}
        searchHandler={jest.fn()}
        clearInputHandler={clear}
        searchValue={propsValue}
      />
    );
    userEvent.click(getByTestId('clear-btn'));
    expect(clear).toHaveBeenCalledTimes(1);
  });
});
