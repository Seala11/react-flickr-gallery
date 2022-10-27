import { FlickrCard } from 'pages/home/models';

export enum SearchProviderActions {
  ADD_CARDS = 'add cards',
  REMOVE_CARDS = 'remove all cards',
  SET_LOADING = 'set loading',
  REMOVE_LOADING = 'remove loading',
  CHANGE_SORT = 'change sort',
  CHANGE_CARDS_PER_PAGE = 'change cards per page',
}

export type SearchState = {
  cards: FlickrCard[];
  pageState: {
    currPage: number;
    totalPages: number;
    totalCards: number;
  };
  sort: string;
  cardsPerPage: string;
  loading: boolean;
  error: string | null;
};

export const initialSearchState = {
  cards: [],
  pageState: {
    currPage: 1,
    totalPages: 1,
    totalCards: 0,
  },
  sort: 'relevance',
  cardsPerPage: '12',
  loading: false,
  error: null,
};

export type SearchAction =
  | { type: SearchProviderActions.ADD_CARDS; cards: FlickrCard[] }
  | { type: SearchProviderActions.REMOVE_CARDS }
  | { type: SearchProviderActions.SET_LOADING }
  | { type: SearchProviderActions.REMOVE_LOADING }
  | { type: SearchProviderActions.CHANGE_CARDS_PER_PAGE; cardsPerPage: string }
  | { type: SearchProviderActions.CHANGE_SORT; sort: string };

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

    default:
      return state;
  }
};
