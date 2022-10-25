import { FlickrCard } from 'pages/home/models';

export enum SearchProviderActions {
  ADD = 'add',
}

export type SearchState = FlickrCard[];

export type SearchAction = { type: SearchProviderActions.ADD; card: FlickrCard };

export const searchPageReducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case SearchProviderActions.ADD:
      const newState = [...state, action.card];
      return newState;
    default:
      return [...state];
  }
};
