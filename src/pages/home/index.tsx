import React, { useCallback, useContext, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import CardList from 'features/card-list';
import SearchBar from 'features/search-bar';
import { getSearchValueFromStorage } from 'shared/helpers/storage';
import { DEFAULT_SEARCH, requestData, SearchFetchType } from './models';
import AppContext from 'app/store/context';
import { SearchProviderActions } from 'app/store/searchPageReducer';
import SearchControls from 'features/search-controls';
import Pagination from 'features/pagination';

const Home = () => {
  const { homePageState, homePageDispatch } = useContext(AppContext);
  const { loading, error, cards, cardsPerPage, sort, currPage } = homePageState;

  const searchHandler = useCallback(
    async (value: string, sort: string, cardsPerPage: string, currPage: string) => {
      homePageDispatch({ type: SearchProviderActions.SET_LOADING });
      try {
        requestData.sort = sort;
        requestData.text = value;
        requestData.per_page = cardsPerPage;
        requestData.page = currPage;
        const parameters = new URLSearchParams(requestData);
        const result = await fetch(`https://api.flickr.com/services/rest/?${parameters}`);
        const data: SearchFetchType = await result.json();

        const totalPages = data.photos.pages;
        // due to the bug in flickr api
        if (+currPage > totalPages) {
          homePageDispatch({ type: SearchProviderActions.SET_CURR_PAGE, page: totalPages });
          homePageDispatch({ type: SearchProviderActions.SET_TOTAL_PAGES, total: totalPages });
          return;
        }

        homePageDispatch({ type: SearchProviderActions.ADD_CARDS, cards: data.photos.photo });
        homePageDispatch({ type: SearchProviderActions.SET_TOTAL_PAGES, total: totalPages });
      } catch (err) {
        console.error(err);
        homePageDispatch({ type: SearchProviderActions.REMOVE_CARDS });
      } finally {
        homePageDispatch({ type: SearchProviderActions.REMOVE_LOADING });
      }
    },
    [homePageDispatch]
  );

  const ref = useRef({ sort, cardsPerPage, cards, error, currPage });

  useEffect(() => {
    const storedValue = getSearchValueFromStorage();
    const { sort, cardsPerPage, cards, error, currPage } = ref.current;
    if (cards.length > 0 || error) {
      homePageDispatch({ type: SearchProviderActions.SET_SEARCH_VALUE, searchValue: storedValue });
      return;
    }

    if (storedValue) {
      homePageDispatch({ type: SearchProviderActions.SET_SEARCH_VALUE, searchValue: storedValue });
      searchHandler(storedValue, sort, cardsPerPage, `${currPage}`);
    } else {
      searchHandler(DEFAULT_SEARCH, sort, cardsPerPage, `${currPage}`);
    }
  }, [homePageDispatch, searchHandler]);

  return (
    <main className={styles.wrapper}>
      <div className={styles.searchWrapper}>
        <SearchBar searchHandler={searchHandler} />
        <SearchControls searchHandler={searchHandler} />
      </div>
      {error && <p data-testid="error">{error}</p>}
      {!error && <Pagination searchHandler={searchHandler} />}
      {loading ? (
        <div data-testid="loader" className={styles.loader} />
      ) : (
        <CardList cards={cards} />
      )}
    </main>
  );
};

export default Home;
