import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FlickrCard } from 'pages/home/models';

export type HomeState = {
  cards: FlickrCard[];
  currPage: number;
  totalPages: number;
  searchValue: string | null;
  sort: string;
  cardsPerPage: string;
  loading: boolean;
  error: string | null;
  scrollPos: number | null;
};

export const initialState: HomeState = {
  cards: [],
  currPage: 1,
  totalPages: 1,
  searchValue: null,
  sort: 'relevance',
  cardsPerPage: '12',
  loading: false,
  error: null,
  scrollPos: null,
};

export const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    removeLoading: (state) => {
      state.loading = false;
    },
    setScrollPos: (state, action: PayloadAction<number | null>) => {
      state.scrollPos = action.payload;
    },
  },
});

export const { setLoading, removeLoading, setScrollPos } = homePageSlice.actions;

export default homePageSlice.reducer;
