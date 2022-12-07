import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { FetchParamsType, HomeState, SearchFetchType } from './types';

const API_KEY = 'd1743560a339c2a8d5327c0466b8874b';
export const DEFAULT_SEARCH = 'cats';

export const requestParams = {
  method: 'flickr.photos.search',
  api_key: API_KEY,
  text: '',
  sort: '',
  per_page: '',
  page: '',
  license: '4',
  extras: 'owner_name, license, description, views, date_taken, tags, icon_server',
  format: 'json',
  nojsoncallback: '1',
  safe_search: '1',
  content_type: '1',
  min_upload_date: '1603846694',
};

export const fetchPhotos = createAsyncThunk(
  'fetch/photos',
  async (searchParams: FetchParamsType, { rejectWithValue }) => {
    const { value, sort, cardsPerPage, currPage } = searchParams;
    try {
      requestParams.sort = sort;
      requestParams.text = value;
      requestParams.per_page = cardsPerPage;
      requestParams.page = currPage;
      const parameters = new URLSearchParams(requestParams);
      const response = await fetch(`https://api.flickr.com/services/rest/?${parameters}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data: SearchFetchType = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    } finally {
    }
  }
);

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

      // due to the bug in flickr api, same search params receive different total pages response
      if (totalPages && +state.currPage > totalPages && totalPages > 0) {
        state.currPage = totalPages;
        state.totalPages = totalPages;
        state.loading = false;
        return;
      }

      if (totalPages === 0) {
        state.error = 'Sorry, no images matched your search.';
        state.currPage = 1;
        state.totalPages = 1;
      } else {
        state.totalPages = totalPages;
      }

      state.cards = cards;
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

export const homePageSelector = (state: RootState) => state.homePage;

export default homePageSlice.reducer;
