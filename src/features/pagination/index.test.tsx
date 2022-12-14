import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Pagination from '.';
import { Provider } from 'react-redux';
import { setupStore } from 'app/store';
import { setCurrPage, setTotalPages } from 'app/store/homePageSlice';
import userEvent from '@testing-library/user-event';

describe('Wnen Pagination component renders', () => {
  const mock = setupStore();
  mock.dispatch(setCurrPage(1));
  mock.dispatch(setTotalPages(100));
  const paginationWithProvider = (
    <Provider store={mock}>
      <Pagination />
    </Provider>
  );

  it('should display list of pages', () => {
    render(paginationWithProvider);
    expect(screen.getByTestId('list')).toBeInTheDocument();
  });

  it('there are 100 pages total and current page is first, should display first five pages and the last', async () => {
    render(paginationWithProvider);
    expect(screen.queryByText('1')).toBeInTheDocument();
    expect(screen.queryByText('2')).toBeInTheDocument();
    expect(screen.queryByText('3')).toBeInTheDocument();
    expect(screen.queryByText('4')).toBeInTheDocument();
    expect(screen.queryByText('5')).toBeInTheDocument();
    expect(screen.queryByText('100')).toBeInTheDocument();
    expect(screen.queryByTestId('prev')).toBeDisabled();
    expect(screen.queryByTestId('next')).not.toBeDisabled();
  });

  it('there are 100 pages total and current page is twenty, should display first, last and 19, 20, 21', async () => {
    mock.dispatch(setCurrPage(20));
    render(paginationWithProvider);

    expect(screen.queryByText('1')).toBeInTheDocument();
    expect(screen.queryByText('19')).toBeInTheDocument();
    expect(screen.queryByText('20')).toBeInTheDocument();
    expect(screen.queryByText('21')).toBeInTheDocument();
    expect(screen.queryByText('100')).toBeInTheDocument();
    expect(screen.queryByTestId('prev')).not.toBeDisabled();
    expect(screen.queryByTestId('next')).not.toBeDisabled();
  });

  it('there are 100 pages total and current page is 100, should display first and the last five pags', async () => {
    mock.dispatch(setCurrPage(100));
    render(paginationWithProvider);

    expect(screen.queryByText('1')).toBeInTheDocument();
    expect(screen.queryByText('96')).toBeInTheDocument();
    expect(screen.queryByText('97')).toBeInTheDocument();
    expect(screen.queryByText('98')).toBeInTheDocument();
    expect(screen.queryByText('99')).toBeInTheDocument();
    expect(screen.queryByText('100')).toBeInTheDocument();
    expect(screen.queryByTestId('prev')).not.toBeDisabled();
    expect(screen.queryByTestId('next')).toBeDisabled();
  });
});

describe('Wnen page is clicked', () => {
  const mock = setupStore();
  mock.dispatch(setCurrPage(1));
  mock.dispatch(setTotalPages(100));
  const paginationWithProvider = (
    <Provider store={mock}>
      <Pagination />
    </Provider>
  );

  it('should display the clicked page', async () => {
    render(paginationWithProvider);

    expect(screen.queryByText('1')).toBeInTheDocument();
    expect(screen.queryByText('2')).toBeInTheDocument();
    expect(screen.queryByText('3')).toBeInTheDocument();
    expect(screen.queryByText('4')).toBeInTheDocument();
    expect(screen.queryByText('5')).toBeInTheDocument();
    expect(screen.queryByText('100')).toBeInTheDocument();
    expect(screen.queryByTestId('prev')).toBeDisabled();
    expect(screen.queryByTestId('next')).not.toBeDisabled();

    userEvent.click(screen.getByText('100'));
    waitFor(() => expect(screen.queryByText('96')).toBeInTheDocument());
    waitFor(() => expect(screen.queryByText('97')).toBeInTheDocument());
    waitFor(() => expect(screen.queryByText('98')).toBeInTheDocument());
    waitFor(() => expect(screen.queryByText('99')).toBeInTheDocument());
    waitFor(() => expect(screen.queryByTestId('prev')).not.toBeDisabled());
    waitFor(() => expect(screen.queryByTestId('next')).toBeDisabled());
  });
});

describe('Wnen previous button is clicked', () => {
  const mock = setupStore();
  mock.dispatch(setCurrPage(20));
  mock.dispatch(setTotalPages(100));
  const paginationWithProvider = (
    <Provider store={mock}>
      <Pagination />
    </Provider>
  );

  it('should display previous page', async () => {
    render(paginationWithProvider);

    expect(screen.queryByText('1')).toBeInTheDocument();
    expect(screen.queryByText('19')).toBeInTheDocument();
    expect(screen.queryByText('20')).toBeInTheDocument();
    expect(screen.queryByText('21')).toBeInTheDocument();
    expect(screen.queryByText('100')).toBeInTheDocument();
    expect(screen.queryByTestId('prev')).not.toBeDisabled();
    expect(screen.queryByTestId('next')).not.toBeDisabled();

    userEvent.click(screen.getByTestId('prev'));
    waitFor(() => expect(screen.queryByText('18')).toBeInTheDocument());
    waitFor(() => expect(screen.queryByText('19')).toBeInTheDocument());
    waitFor(() => expect(screen.queryByText('20')).toBeInTheDocument());
  });
});

describe('Wnen next button is clicked', () => {
  const mock = setupStore();
  mock.dispatch(setCurrPage(20));
  mock.dispatch(setTotalPages(100));
  const paginationWithProvider = (
    <Provider store={mock}>
      <Pagination />
    </Provider>
  );

  it('should display next page', async () => {
    render(paginationWithProvider);

    expect(screen.queryByText('1')).toBeInTheDocument();
    expect(screen.queryByText('19')).toBeInTheDocument();
    expect(screen.queryByText('20')).toBeInTheDocument();
    expect(screen.queryByText('21')).toBeInTheDocument();
    expect(screen.queryByText('100')).toBeInTheDocument();
    expect(screen.queryByTestId('prev')).not.toBeDisabled();
    expect(screen.queryByTestId('next')).not.toBeDisabled();

    userEvent.click(screen.getByTestId('next'));
    waitFor(() => expect(screen.queryByText('20')).toBeInTheDocument());
    waitFor(() => expect(screen.queryByText('21')).toBeInTheDocument());
    waitFor(() => expect(screen.queryByText('22')).toBeInTheDocument());
  });
});
