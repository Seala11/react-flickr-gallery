import { RootState, useAppDispatch, useAppSelector } from 'app/store';
import { fetchPhotos, setCardsPerPage, setSort } from 'app/store/homePageSlice';
import { SearchProviderActions } from 'app/store/searchPageReducer';
import { DEFAULT_SEARCH } from 'pages/home/models';
import React from 'react';
import styles from './index.module.scss';

const SearchControls = () => {
  const { cardsPerPage, sort, searchValue, currPage } = useAppSelector(
    (state: RootState) => state.homePage
  );
  const dispatch = useAppDispatch();

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>, key: SearchProviderActions) => {
    const search = searchValue ? searchValue : DEFAULT_SEARCH;

    switch (key) {
      case SearchProviderActions.CHANGE_CARDS_PER_PAGE: {
        dispatch(setCardsPerPage(e.target.value));
        const params = {
          value: search,
          sort: sort,
          cardsPerPage: e.target.value,
          currPage: `${currPage}`,
        };
        dispatch(fetchPhotos(params));
        break;
      }

      case SearchProviderActions.CHANGE_SORT: {
        dispatch(setSort(e.target.value));
        const params = {
          value: search,
          sort: e.target.value,
          cardsPerPage: cardsPerPage,
          currPage: `${currPage}`,
        };
        dispatch(fetchPhotos(params));
        break;
      }
    }
  };

  return (
    <form className={styles.form} data-testid="form">
      <div className={styles.wrapper}>
        <label htmlFor="numberOfCards" className={styles.label}>
          Cards per page
        </label>
        <select
          value={cardsPerPage}
          name="numberOfCards"
          id="numberOfCards"
          onChange={(e) => selectHandler(e, SearchProviderActions.CHANGE_CARDS_PER_PAGE)}
          className={styles.input}
          data-testid="cards-per-page"
        >
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="24">24</option>
        </select>
      </div>

      <div className={styles.wrapper}>
        <label htmlFor="sortCards" className={styles.label}>
          Sort by
        </label>
        <select
          name="sortCards"
          id="sortCards"
          value={sort}
          onChange={(e) => selectHandler(e, SearchProviderActions.CHANGE_SORT)}
          className={styles.input}
          data-testid="sort"
        >
          <option value="relevance">Relevance</option>
          <option value="interestingness-desc">Interestingness</option>
          <option value="date-posted-desc">Date uploaded</option>
          <option value="date-taken-desc">Date taken</option>
        </select>
      </div>
    </form>
  );
};

export default SearchControls;
