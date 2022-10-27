import { FlickrCard } from 'pages/home/models';

export enum SearchProviderActions {
  ADD_CARDS = 'add cards',
  REMOVE_CARDS = 'remove all cards',
  SET_LOADING = 'set loading',
  SET_SEARCH_VALUE = 'set search value',
  REMOVE_LOADING = 'remove loading',
  CHANGE_SORT = 'change sort',
  CHANGE_CARDS_PER_PAGE = 'change cards per page',
  SET_MOUNTING = 'set mounting on componentDidMount',
}

export type SearchState = {
  cards: FlickrCard[];
  pageState: {
    currPage: number;
    totalPages: number;
    totalCards: number;
  };
  searchValue: string | null;
  sort: string;
  cardsPerPage: string;
  loading: boolean;
  error: string | null;
  mounting: boolean;
};

export const initialSearchState = {
  cards: [],
  pageState: {
    currPage: 1,
    totalPages: 1,
    totalCards: 0,
  },
  searchValue: null,
  sort: 'relevance',
  cardsPerPage: '12',
  loading: false,
  error: null,
  mounting: false,
};

export type SearchAction =
  | { type: SearchProviderActions.ADD_CARDS; cards: FlickrCard[] }
  | { type: SearchProviderActions.REMOVE_CARDS }
  | { type: SearchProviderActions.SET_LOADING }
  | { type: SearchProviderActions.REMOVE_LOADING }
  | { type: SearchProviderActions.CHANGE_CARDS_PER_PAGE; cardsPerPage: string }
  | { type: SearchProviderActions.CHANGE_SORT; sort: string }
  | { type: SearchProviderActions.SET_SEARCH_VALUE; searchValue: string | null }
  | { type: SearchProviderActions.SET_MOUNTING };

export const searchPageReducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case SearchProviderActions.ADD_CARDS:
      if (action.cards.length > 0) {
        return { ...state, cards: action.cards, error: null };
      }
      return { ...state, cards: action.cards, error: 'Sorry, no images matched your search.' };

    case SearchProviderActions.REMOVE_CARDS:
      return { ...state, cards: [], error: 'Oops! Something went wrong' };

    case SearchProviderActions.SET_LOADING:
      return { ...state, loading: true };

    case SearchProviderActions.REMOVE_LOADING:
      return { ...state, loading: false };

    case SearchProviderActions.CHANGE_CARDS_PER_PAGE:
      return { ...state, cardsPerPage: action.cardsPerPage };

    case SearchProviderActions.CHANGE_SORT:
      return { ...state, sort: action.sort };

    case SearchProviderActions.SET_SEARCH_VALUE:
      return { ...state, searchValue: action.searchValue };

    case SearchProviderActions.SET_MOUNTING:
      return { ...state, mounting: true };

    default:
      return state;
  }
};
