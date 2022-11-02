import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import CardList from 'features/card-list';
import SearchBar from 'features/search-bar';
import { getSearchValueFromStorage } from 'shared/helpers/storage';
import SearchControls from 'features/search-controls';
import Pagination from 'features/pagination';

import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import {
  DEFAULT_SEARCH,
  fetchPhotos,
  homePageSelector,
  setSearchValue,
} from 'app/store/homePageSlice';

const Home = () => {
  const { loading, error, cards, cardsPerPage, sort, currPage, scrollPos } =
    useAppSelector(homePageSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (scrollPos) {
      window.scrollTo({ top: scrollPos });
    }
  }, [scrollPos]);

  const ref = useRef({ sort, cardsPerPage, cards, error, currPage });

  useEffect(() => {
    const storedValue = getSearchValueFromStorage();
    const { sort, cardsPerPage, cards, error, currPage } = ref.current;
    if (cards.length > 0 || error) {
      dispatch(setSearchValue(storedValue));
      return;
    }

    if (storedValue) {
      dispatch(setSearchValue(storedValue));
      dispatch(
        fetchPhotos({
          value: storedValue,
          sort: sort,
          cardsPerPage: cardsPerPage,
          currPage: `${currPage}`,
        })
      );
    } else {
      dispatch(
        fetchPhotos({
          value: DEFAULT_SEARCH,
          sort: sort,
          cardsPerPage: cardsPerPage,
          currPage: `${currPage}`,
        })
      );
    }
  }, [dispatch]);

  return (
    <main className={styles.wrapper}>
      <div className={styles.searchWrapper}>
        <SearchBar />
        <SearchControls />
      </div>
      {error && <p data-testid="error">{error}</p>}
      {loading ? (
        <div data-testid="loader" className={styles.loader} />
      ) : (
        <CardList cards={cards} />
      )}
      {!error && !loading && <Pagination />}
    </main>
  );
};

export default Home;
