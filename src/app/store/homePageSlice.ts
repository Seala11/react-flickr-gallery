import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FlickrCard, requestData, SearchFetchType } from 'pages/home/models';

type FetchParamsType = {
  value: string;
  sort: string;
  cardsPerPage: string;
  currPage: string;
};

export const fetchPhotos = createAsyncThunk(
  'fetch/photos',
  async (searchParams: FetchParamsType) => {
    const { value, sort, cardsPerPage, currPage } = searchParams;
    try {
      requestData.sort = sort;
      requestData.text = value;
      requestData.per_page = cardsPerPage;
      requestData.page = currPage;
      const parameters = new URLSearchParams(requestData);
      const response = await fetch(`https://api.flickr.com/services/rest/?${parameters}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data: SearchFetchType = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    } finally {
    }
  }
);

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
    setScrollPos: (state, action: PayloadAction<number | null>) => {
      state.scrollPos = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string | null>) => {
      state.searchValue = action.payload;
    },
    setCurrPage: (state, action: PayloadAction<number>) => {
      state.currPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setCardsPerPage: (state, action: PayloadAction<string>) => {
      state.cardsPerPage = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPhotos.fulfilled, (state, action) => {
      const totalPages = action.payload?.photos.pages;
      const cards = action.payload?.photos.photo;

      // due to the bug in flickr api
      if (totalPages && +state.currPage > totalPages && totalPages > 0) {
        state.currPage = totalPages;
        state.totalPages = totalPages;
        state.loading = false;
        return;
      }

      if (cards && totalPages) {
        if (cards.length === 0) {
          state.error = 'Sorry, no images matched your search.';
          state.currPage = 1;
          state.totalPages = 1;
        }
        state.cards = cards;
        state.totalPages = totalPages;
      }

      state.loading = false;
    });
    builder.addCase(fetchPhotos.rejected, (state) => {
      state.cards = [];
      state.error = 'Oops! Something went wrong';
      state.currPage = 1;
      state.totalPages = 1;
      state.loading = false;
    });
  },
});

export const {
  setScrollPos,
  setSearchValue,
  setCurrPage,
  setTotalPages,
  setCardsPerPage,
  setSort,
} = homePageSlice.actions;

export default homePageSlice.reducer;
