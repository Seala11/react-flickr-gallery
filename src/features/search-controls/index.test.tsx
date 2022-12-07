import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchControls from '.';
import { Provider } from 'react-redux';
import { setupStore } from 'app/store';
import userEvent from '@testing-library/user-event';

describe('Wnen Search controls component renders', () => {
  it('should display form', () => {
    render(
      <Provider store={setupStore()}>
        <SearchControls />
      </Provider>
    );

    expect(screen.getByTestId('form')).toBeInTheDocument();
  });
});

describe('Wnen Cards per page has changed', () => {
  const SELECT_OPTION = '6';
  it('should update store', () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <SearchControls />
      </Provider>
    );

    expect(screen.getByTestId('form')).toBeInTheDocument();
    userEvent.selectOptions(screen.getByTestId('cards-per-page'), SELECT_OPTION);

    expect(store.getState().homePage.cardsPerPage).toEqual(SELECT_OPTION);
  });
});

describe('When Sort has changed', () => {
  it('should update store', () => {
    const SELECT_OPTION = 'Date uploaded';
    const store = setupStore();
    render(
      <Provider store={store}>
        <SearchControls />
      </Provider>
    );

    expect(screen.getByTestId('form')).toBeInTheDocument();
    userEvent.selectOptions(screen.getByTestId('sort'), SELECT_OPTION);

    expect(store.getState().homePage.sort).toEqual('date-posted-desc');
  });
});
