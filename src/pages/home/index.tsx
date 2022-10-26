import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import CardList from 'features/card-list';
import SearchBar from 'features/search-bar';
import { getSearchValueFromStorage } from 'shared/helpers/storage';
import { DEFAULT_SEARCH, FlickrCard, requestData, SearchFetchType } from './models';
import PopUp from 'features/popup';
import AppContext from 'app/store/context';
import { SearchProviderActions } from 'app/store/searchPageReducer';

const Home = () => {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [popUp, setPopUp] = useState<FlickrCard | null>(null);

  const { homePageState, homePageDispatch } = useContext(AppContext);
  const { pageState, loading, error, cards } = homePageState;

  const searchHandler = useCallback(
    async (value: string) => {
      homePageDispatch({ type: SearchProviderActions.SET_LOADING });
      try {
        requestData.sort = pageState.sort;
        requestData.text = value;
        requestData.per_page = `${pageState.cardsPerPage}`;
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
    [pageState.cardsPerPage, pageState.sort, homePageDispatch]
  );

  const mountingRef = useRef({ cards, error });

  useEffect(() => {
    const storedValue = getSearchValueFromStorage();
    const { cards, error } = mountingRef.current;
    if (cards.length > 0 || error) {
      setSearchValue(storedValue);
      return;
    }

    if (storedValue) {
      setSearchValue(storedValue);
      searchHandler(storedValue);
    } else {
      searchHandler(DEFAULT_SEARCH);
    }
  }, [searchHandler]);

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

  return (
    <main className={styles.wrapper}>
      {popUp && <PopUp card={popUp} popUpClose={popUpClose} />}
      <SearchBar
        setSearchValue={setSearchValue}
        searchHandler={searchHandler}
        searchValue={searchValue}
      />
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
