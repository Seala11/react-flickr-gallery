import React from 'react';
import { render, screen } from '@testing-library/react';
import Pagination from '.';
import { Provider } from 'react-redux';
import { setupStore } from 'app/store';
import { setCurrPage, setTotalPages } from 'app/store/homePageSlice';

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

// describe('Wnen page is clicked', () => {
//   const initialSearchState = {
//     cards: [TEST_CARD],
//     currPage: 1,
//     totalPages: 100,
//     searchValue: null,
//     sort: 'relevance',
//     cardsPerPage: '12',
//     loading: false,
//     error: null,
//     scrollPos: null,
//   };

//   it('should call search and display clicked page', async () => {
//     const providerProps = {
//       formPageState: initialFormState,
//       formPageDispatch: jest.fn(),
//       homePageState: initialSearchState,
//       homePageDispatch: () => {},
//     };

//     const search = jest.fn();

//     render(
//       <Provider store={setupStore()}>
//         <Pagination />
//       </Provider>
//     );

//     expect(screen.queryByText('1')).toBeInTheDocument();
//     expect(screen.queryByText('2')).toBeInTheDocument();
//     expect(screen.queryByText('3')).toBeInTheDocument();
//     expect(screen.queryByText('4')).toBeInTheDocument();
//     expect(screen.queryByText('5')).toBeInTheDocument();
//     expect(screen.queryByText('100')).toBeInTheDocument();
//     expect(screen.queryByTestId('prev')).toBeDisabled();
//     expect(screen.queryByTestId('next')).not.toBeDisabled();

//     userEvent.click(screen.getByText('100'));
//     expect(search).toHaveBeenCalledTimes(1);
//     waitFor(() => expect(screen.queryByText('96')).toBeInTheDocument());
//     waitFor(() => expect(screen.queryByText('97')).toBeInTheDocument());
//     waitFor(() => expect(screen.queryByText('98')).toBeInTheDocument());
//     waitFor(() => expect(screen.queryByText('99')).toBeInTheDocument());
//     waitFor(() => expect(screen.queryByTestId('prev')).not.toBeDisabled());
//     waitFor(() => expect(screen.queryByTestId('next')).toBeDisabled());
//   });
// });

// describe('Wnen previous button is clicked', () => {
//   const initialSearchState = {
//     cards: [TEST_CARD],
//     currPage: 20,
//     totalPages: 100,
//     searchValue: null,
//     sort: 'relevance',
//     cardsPerPage: '12',
//     loading: false,
//     error: null,
//     scrollPos: null,
//   };

//   it('should call search and display clicked page', async () => {
//     const providerProps = {
//       formPageState: initialFormState,
//       formPageDispatch: jest.fn(),
//       homePageState: initialSearchState,
//       homePageDispatch: () => {},
//     };

//     const search = jest.fn();

//     render(
//       <Provider store={setupStore()}>
//         <Pagination />
//       </Provider>
//     );

//     expect(screen.queryByText('1')).toBeInTheDocument();
//     expect(screen.queryByText('19')).toBeInTheDocument();
//     expect(screen.queryByText('20')).toBeInTheDocument();
//     expect(screen.queryByText('21')).toBeInTheDocument();
//     expect(screen.queryByText('100')).toBeInTheDocument();
//     expect(screen.queryByTestId('prev')).not.toBeDisabled();
//     expect(screen.queryByTestId('next')).not.toBeDisabled();

//     userEvent.click(screen.getByTestId('prev'));
//     expect(search).toHaveBeenCalledTimes(1);
//     waitFor(() => expect(screen.queryByText('18')).toBeInTheDocument());
//     waitFor(() => expect(screen.queryByText('19')).toBeInTheDocument());
//     waitFor(() => expect(screen.queryByText('20')).toBeInTheDocument());
//   });
// });

// describe('Wnen next button is clicked', () => {
//   const initialSearchState = {
//     cards: [TEST_CARD],
//     currPage: 20,
//     totalPages: 100,
//     searchValue: null,
//     sort: 'relevance',
//     cardsPerPage: '12',
//     loading: false,
//     error: null,
//     scrollPos: null,
//   };

//   it('should call search and display clicked page', async () => {
//     const providerProps = {
//       formPageState: initialFormState,
//       formPageDispatch: jest.fn(),
//       homePageState: initialSearchState,
//       homePageDispatch: () => {},
//     };

//     const search = jest.fn();

//     render(
//       <Provider store={setupStore()}>
//         <Pagination />
//       </Provider>
//     );

//     expect(screen.queryByText('1')).toBeInTheDocument();
//     expect(screen.queryByText('19')).toBeInTheDocument();
//     expect(screen.queryByText('20')).toBeInTheDocument();
//     expect(screen.queryByText('21')).toBeInTheDocument();
//     expect(screen.queryByText('100')).toBeInTheDocument();
//     expect(screen.queryByTestId('prev')).not.toBeDisabled();
//     expect(screen.queryByTestId('next')).not.toBeDisabled();

//     userEvent.click(screen.getByTestId('next'));
//     expect(search).toHaveBeenCalledTimes(1);
//     waitFor(() => expect(screen.queryByText('20')).toBeInTheDocument());
//     waitFor(() => expect(screen.queryByText('21')).toBeInTheDocument());
//     waitFor(() => expect(screen.queryByText('22')).toBeInTheDocument());
//   });
// });
