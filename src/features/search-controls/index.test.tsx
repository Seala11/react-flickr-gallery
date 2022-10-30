import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchControls from '.';
import AppProvider from 'app/store/provider';
import userEvent from '@testing-library/user-event';

describe('Wnen Search controls component renders', () => {
  it('should display form', () => {
    render(
      <AppProvider>
        <SearchControls searchHandler={jest.fn()} />
      </AppProvider>
    );

    expect(screen.getByTestId('form')).toBeInTheDocument();
  });
});

describe('Wnen Cards per page has changed', () => {
  const SELECT_OPTION = '6';
  it('should call search', () => {
    const search = jest.fn();
    render(
      <AppProvider>
        <SearchControls searchHandler={search} />
      </AppProvider>
    );

    expect(screen.getByTestId('form')).toBeInTheDocument();
    userEvent.selectOptions(screen.getByTestId('cards-per-page'), SELECT_OPTION);

    expect(search).toBeCalledTimes(1);
  });
});

describe('Wnen Sort has changed', () => {
  const SELECT_OPTION = 'Date uploaded';
  it('should call search', () => {
    const search = jest.fn();
    render(
      <AppProvider>
        <SearchControls searchHandler={search} />
      </AppProvider>
    );

    expect(screen.getByTestId('form')).toBeInTheDocument();
    userEvent.selectOptions(screen.getByTestId('sort'), SELECT_OPTION);

    expect(search).toBeCalledTimes(1);
  });
});
