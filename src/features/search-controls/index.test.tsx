import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchControls from '.';
// import AppProvider from 'app/store/provider';
// import userEvent from '@testing-library/user-event';
// import { DEFAULT_SEARCH } from 'pages/home/models';
// import AppContext from 'app/store/context';
// import { initialFormState } from 'app/store/formPageReducer';
import { Provider } from 'react-redux';
import { setupStore } from 'app/store';

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

// describe('Wnen Cards per page has changed', () => {
//   const SELECT_OPTION = '6';
//   it('should call search', () => {
//     const search = jest.fn();
//     render(
//       <Provider store={setupStore()}>
//         <SearchControls />
//       </Provider>
//     );

//     expect(screen.getByTestId('form')).toBeInTheDocument();
//     userEvent.selectOptions(screen.getByTestId('cards-per-page'), SELECT_OPTION);

//     expect(search).toBeCalledTimes(1);
//     expect(search).toBeCalledWith(DEFAULT_SEARCH, 'relevance', SELECT_OPTION, '1');
//   });
// });

// describe('Wnen Sort has changed', () => {
//   const TEST = 'test';
//   const SELECT_OPTION = 'Date uploaded';
//   const initialSearchState = {
//     cards: [],
//     currPage: 1,
//     totalPages: 100,
//     searchValue: TEST,
//     sort: 'relevance',
//     cardsPerPage: '12',
//     loading: false,
//     error: null,
//     scrollPos: null,
//   };
//   // it('should call search with default value', () => {
//   //   render(
//   //     <Provider store={setupStore()}>
//   //       <SearchControls />
//   //     </Provider>
//   //   );

//   //   expect(screen.getByTestId('form')).toBeInTheDocument();
//   //   userEvent.selectOptions(screen.getByTestId('sort'), SELECT_OPTION);

//   //   expect(search).toBeCalledTimes(1);
//   //   expect(search).toBeCalledWith(DEFAULT_SEARCH, 'date-posted-desc', '12', '1');
//   // });

//   // it('should call search with search value from state', () => {
//   //   const providerProps = {
//   //     formPageState: initialFormState,
//   //     formPageDispatch: jest.fn(),
//   //     homePageState: initialSearchState,
//   //     homePageDispatch: () => {},
//   //   };

//   //   const search = jest.fn();

//   //   render(
//   //     <Provider store={setupStore()}>
//   //       <SearchControls />
//   //     </Provider>
//   //   );

//   //   expect(screen.getByTestId('form')).toBeInTheDocument();
//   //   userEvent.selectOptions(screen.getByTestId('sort'), SELECT_OPTION);

//   //   expect(search).toBeCalledTimes(1);
//   //   expect(search).toBeCalledWith(TEST, 'date-posted-desc', '12', '1');
//   // });
// });
