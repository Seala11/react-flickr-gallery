import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.module.scss';
import CardList from 'features/card-list';
import SearchBar from 'features/search-bar';
import { getSearchValueFromStorage } from 'shared/helpers/storage';
import { DEFAULT_SEARCH, FlickrCard, requestData, SearchFetchType } from './models';
import PopUp from 'features/popup';

type SearchPageType = {
  currPage: number;
  totalPages: number;
  cardsPerPage: number;
  totalCards: number | null;
  sort: string;
};

const Home = () => {
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const [cards, setCards] = useState<FlickrCard[]>([]);
  const [popUp, setPopUp] = useState<FlickrCard | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchPage, setSearchPage] = useState<SearchPageType>({
    currPage: 1,
    totalPages: 1,
    cardsPerPage: 12,
    totalCards: null,
    sort: 'interestingness-desc',
  });

  const searchHandler = useCallback(
    async (value: string) => {
      setLoading(true);
      try {
        requestData.sort = searchPage.sort;
        requestData.text = value;
        requestData.per_page = `${searchPage.cardsPerPage}`;
        const parameters = new URLSearchParams(requestData);
        const result = await fetch(`https://api.flickr.com/services/rest/?${parameters}`);
        const data: SearchFetchType = await result.json();
        setCards(data.photos.photo);
        setError(false);
      } catch (err) {
        console.error(err);
        setCards([]);
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [searchPage.cardsPerPage, searchPage.sort]
  );

  useEffect(() => {
    const storedValue = getSearchValueFromStorage();
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
      {error && <p data-testid="error">Oops! Something went wrong</p>}
      {loading ? (
        <div data-testid="loader" className={styles.loader} />
      ) : (
        <CardList cards={cards} error={error} showPopUp={popUpHandler} />
      )}
    </main>
  );
};

export default Home;
