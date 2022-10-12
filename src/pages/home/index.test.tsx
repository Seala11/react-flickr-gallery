import React from 'react';
import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import Home from '.';
// import { HANDLERS } from 'mocks/handlers';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
// import 'whatwg-fetch';

const server = setupServer(
  rest.get('https://www.flickr.com/services/rest/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  })
);

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('Wnen Home component renders', () => {
  it.only('should contain empty search input and default amount of cards if there are no stored value in storage', async () => {
    render(<Home />);

    // await screen.getByRole('');

    // screen.debug();
    // expect(screen.getByRole('listitem')).toHaveLength(8);
    // expect(screen.getByTestId('search-input')).toBeEmptyDOMElement();
  });
});

// it('stored value should be displayed in the search input on component`s mount', () => {
//   const TEST_VAL = 'test';
//   setSearchValueToStorage(TEST_VAL);

//   render(<Home />);
//   expect(screen.getByTestId('search-input')).toHaveDisplayValue(TEST_VAL);
// });

// it('input value should be saved to LocalStorage during component`s unmount', () => {
//   const TEST_VAL = 'test1';

//   const { unmount } = render(<Home />);
//   const input = screen.getByRole('searchbox');

//   expect(screen.getByTestId('search-input')).toBeEmptyDOMElement();
//   userEvent.type(input, TEST_VAL);

//   unmount();

//   render(<Home />);
//   expect(screen.getByTestId('search-input')).toHaveDisplayValue(TEST_VAL);
// });

// describe('When search input is updated', () => {
//   beforeEach(() => {
//     localStorage.clear();
//   });

//   afterAll(() => {
//     jest.restoreAllMocks();
//   });

//   it('should filter cards with valid search input', async () => {
//     const SEARCH_VALUE = 'Rick';

//     render(<Home />);
//     const input = screen.getByRole('searchbox');

//     expect(screen.getAllByRole('heading')).toHaveLength(8);
//     userEvent.type(input, SEARCH_VALUE);

//     await waitFor(() => screen.getAllByRole('listitem'));
//     const cardList = screen.getAllByRole('heading');
//     cardList.forEach((card) => expect(card).toHaveTextContent(new RegExp(SEARCH_VALUE, 'i')));
//   });

//   it('should display error message if no cards much the search input value ', async () => {
//     const INVALID_SEARCH_VALUE = 'jdhjshfjsdfhsdjfhsdjfhsdjfhsdkdj';

//     render(<Home />);
//     const input = screen.getByRole('searchbox');

//     userEvent.type(input, INVALID_SEARCH_VALUE);
//     await waitFor(() => screen.getByTestId('error-message'));
//   });

//   it('after clearing search input value should display all cards and input should be empty', async () => {
//     render(<Home />);

//     const input = screen.getByRole('searchbox');
//     userEvent.type(input, 'new search value');

//     const clearButton = await waitFor(() => screen.getByTestId('clear-btn'));
//     userEvent.click(clearButton);

//     await waitFor(() => screen.getAllByRole('listitem'));
//     expect(screen.getAllByRole('heading')).toHaveLength(8);
//     expect(input).toHaveDisplayValue('');
//     expect(screen.getByTestId('search-btn')).toBeInTheDocument();
//   });
// });

// describe('Local storage for the search component', () => {});
