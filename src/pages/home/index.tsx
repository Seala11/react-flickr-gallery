import React, { useCallback, useContext, useEffect, useState } from 'react';
import styles from './index.module.scss';
import CardList from 'features/card-list';
import SearchBar from 'features/search-bar';
import { getSearchValueFromStorage } from 'shared/helpers/storage';
import { DEFAULT_SEARCH, FlickrCard, requestData, SearchFetchType } from './models';
import PopUp from 'features/popup';
import AppContext from 'app/store/context';
import { SearchProviderActions } from 'app/store/searchPageReducer';

const Home = () => {
  const [popUp, setPopUp] = useState<FlickrCard | null>(null);

  const { homePageState, homePageDispatch } = useContext(AppContext);
  const { loading, error, cards, cardsPerPage, sort, searchValue, mounting } = homePageState;

  const searchHandler = useCallback(
    async (value: string, sort: string, cardsPerPage: string) => {
      homePageDispatch({ type: SearchProviderActions.SET_LOADING });
      try {
        requestData.sort = sort;
        requestData.text = value;
        requestData.per_page = cardsPerPage;
        const parameters = new URLSearchParams(requestData);
        const result = await fetch(`https://api.flickr.com/services/rest/?${parameters}`);
        const data: SearchFetchType = await result.json();
        homePageDispatch({ type: SearchProviderActions.ADD_CARDS, cards: data.photos.photo });
      } catch (err) {
        console.error(err);
        homePageDispatch({ type: SearchProviderActions.REMOVE_CARDS });
      } finally {
        homePageDispatch({ type: SearchProviderActions.REMOVE_LOADING });
      }
    },
    [homePageDispatch]
  );

  useEffect(() => {
    const storedValue = getSearchValueFromStorage();
    if (mounting) {
      homePageDispatch({ type: SearchProviderActions.SET_SEARCH_VALUE, searchValue: storedValue });
      return;
    }

    if (storedValue) {
      homePageDispatch({ type: SearchProviderActions.SET_SEARCH_VALUE, searchValue: storedValue });
      searchHandler(storedValue, sort, cardsPerPage);
    } else {
      searchHandler(DEFAULT_SEARCH, sort, cardsPerPage);
      homePageDispatch({
        type: SearchProviderActions.SET_SEARCH_VALUE,
        searchValue: DEFAULT_SEARCH,
      });
    }

    homePageDispatch({ type: SearchProviderActions.SET_MOUNTING });
  }, [homePageDispatch, searchHandler, mounting, sort, cardsPerPage]);

  const popUpHandler = (card: FlickrCard, event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    event.preventDefault();
    setPopUp(card);
    document.body.style.overflowY = 'hidden';
  };

  const popUpClose = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    setPopUp(null);
    document.body.style.overflowY = 'auto';
  };

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    homePageDispatch({
      type: SearchProviderActions.CHANGE_CARDS_PER_PAGE,
      cardsPerPage: e.target.value,
    });
    const search = searchValue ? searchValue : DEFAULT_SEARCH;
    searchHandler(search, sort, e.target.value);
  };

  return (
    <main className={styles.wrapper}>
      {popUp && <PopUp card={popUp} popUpClose={popUpClose} />}
      <div className={styles.searchWrapper}>
        <SearchBar searchHandler={searchHandler} />
        <form>
          <label htmlFor="numberOfCards">Cards Per Page</label>
          <select
            value={cardsPerPage}
            name="numberOfCards"
            id="numberOfCards"
            onChange={selectHandler}
          >
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="24">24</option>
          </select>
          <label htmlFor="sortCards">Sort</label>
          <select name="sortCards" id="sortCards">
            <option value="relevance">Relevance</option>
            <option value="interestingness-desc">Interestingness</option>
            <option value="date-posted-desc">Date uploaded</option>
            <option value="date-taken-desc">Date taken</option>
          </select>
        </form>
      </div>
      {error && <p data-testid="error">{error}</p>}
      {loading ? (
        <div data-testid="loader" className={styles.loader} />
      ) : (
        <CardList cards={cards} showPopUp={popUpHandler} />
      )}
    </main>
  );
};

export default Home;
