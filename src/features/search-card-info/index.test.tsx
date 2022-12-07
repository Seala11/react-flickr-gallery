import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SearchCardInfo from '.';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { setupStore } from 'app/store';
import { Provider } from 'react-redux';

const CARD_VALID = {
  id: '37967185714',
  owner: '97171476@N00',
  secret: 'd6ed880c92',
  server: '4534',
  farm: 5,
  title: 'Robin',
  ispublic: 1,
  isfriend: 0,
  isfamily: 0,
  license: '0',
  description: {
    _content: 'Contrary to popular belief',
  },
  datetaken: '2017-04-30 11:24:39',
  datetakengranularity: 0,
  datetakenunknown: '0',
  ownername: 'coulportste',
  iconserver: '8638',
  iconfarm: 9,
  views: '2877',
  tags: 'bird robin feathers brockholes nature',
};

const CARD_NO_DESCR = {
  id: '37967185714',
  owner: '97171476@N00',
  secret: 'd6ed880c92',
  server: '4534',
  farm: 5,
  title: 'Robin',
  ispublic: 1,
  isfriend: 0,
  isfamily: 0,
  license: '0',
  description: {
    _content: '',
  },
  datetaken: '2017-04-30 11:24:39',
  datetakengranularity: 0,
  datetakenunknown: '0',
  ownername: 'coulportste',
  iconserver: '8638',
  iconfarm: 9,
  views: '2877',
  tags: '',
};

const CARD_LONG_DESCR = {
  id: '37967185714',
  owner: '97171476@N00',
  secret: 'd6ed880c92',
  server: '4534',
  farm: 5,
  title: 'Robin',
  ispublic: 1,
  isfriend: 0,
  isfamily: 0,
  license: '0',
  description: {
    _content:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
  },
  datetaken: '2017-04-30 11:24:39',
  datetakengranularity: 0,
  datetakenunknown: '0',
  ownername: 'coulportste',
  iconserver: '8638',
  iconfarm: 9,
  views: '2877',
  tags: 'bird robin feathers brockholes nature',
};

export const initialSearchState = {
  cards: [CARD_VALID],
  currPage: 1,
  totalPages: 1,
  searchValue: null,
  sort: 'relevance',
  cardsPerPage: '12',
  loading: false,
  error: null,
  scrollPos: null,
};

export const initialSearchState2 = {
  cards: [CARD_LONG_DESCR],
  currPage: 1,
  totalPages: 1,
  searchValue: null,
  sort: 'relevance',
  cardsPerPage: '12',
  loading: false,
  error: null,
  scrollPos: null,
};

export const initialSearchState3 = {
  cards: [CARD_NO_DESCR],
  currPage: 1,
  totalPages: 1,
  searchValue: null,
  sort: 'relevance',
  cardsPerPage: '12',
  loading: false,
  error: null,
  scrollPos: null,
};

describe('Wnen Card Info component renders', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  const cardWithProvider = (
    <BrowserRouter>
      <Provider store={setupStore()}>
        <SearchCardInfo />
      </Provider>
    </BrowserRouter>
  );

  it('should display error message if no id have found', () => {
    render(cardWithProvider);
    expect(screen.getByTestId('error')).toBeInTheDocument();
  });
});

describe('Wnen Card Info component renders', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  const cardWithProvider1 = (
    <MemoryRouter initialEntries={['/search/37967185714']}>
      <Provider store={setupStore({ homePage: initialSearchState })}>
        <Routes>
          <Route path="/search/:id" element={<SearchCardInfo />}></Route>
        </Routes>
      </Provider>
    </MemoryRouter>
  );

  const cardWithProvider2 = (
    <MemoryRouter initialEntries={['/search/37967185714']}>
      <Provider store={setupStore({ homePage: initialSearchState2 })}>
        <Routes>
          <Route path="/search/:id" element={<SearchCardInfo />}></Route>
        </Routes>
      </Provider>
    </MemoryRouter>
  );

  const cardWithProvider3 = (
    <MemoryRouter initialEntries={['/search/37967185714']}>
      <Provider store={setupStore({ homePage: initialSearchState3 })}>
        <Routes>
          <Route path="/search/:id" element={<SearchCardInfo />}></Route>
        </Routes>
      </Provider>
    </MemoryRouter>
  );

  it('should display card information', () => {
    render(cardWithProvider1);

    waitFor(() => expect(screen.queryByText(new RegExp(CARD_VALID.title))).toBeInTheDocument());
    waitFor(() => expect(screen.queryByText(new RegExp(CARD_VALID.ownername))).toBeInTheDocument());
    waitFor(() =>
      expect(screen.queryByText(new RegExp(CARD_VALID.description._content))).toBeInTheDocument()
    );
  });

  it('should display card date', () => {
    render(cardWithProvider1);
    const date = new Date(CARD_VALID.datetaken).toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    waitFor(() => expect(screen.queryByText(new RegExp(date))).toBeInTheDocument());
  });

  it('should display card image and avatar', () => {
    render(cardWithProvider1);

    waitFor(() => expect(screen.queryByAltText(CARD_VALID.ownername)).toBeInTheDocument());
    waitFor(() => expect(screen.queryByAltText(CARD_VALID.title)).toBeInTheDocument());
  });

  it('should cut card description if its too long', () => {
    const descrValue = CARD_LONG_DESCR.description._content.slice(0, 350) + '...';
    render(cardWithProvider2);

    waitFor(() => expect(screen.queryByTestId('descr')).toBeInTheDocument());
    waitFor(() => expect(screen.queryByTestId('descr')).toHaveTextContent(descrValue));
  });

  it('should display description not provided if card has no description', () => {
    render(cardWithProvider3);
    expect(screen.queryByTestId('descr')).not.toBeInTheDocument();
  });

  it('should display tags not provided if card has no tags', () => {
    render(cardWithProvider3);
    expect(screen.queryByTestId('tags')).not.toBeInTheDocument();
  });
});
