import { RootState, useAppDispatch, useAppSelector } from 'app/store';
import { fetchPhotos, setCurrPage, setSearchValue } from 'app/store/homePageSlice';
import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { useBeforeUnload } from './useBeforeUnload';

const SearchBar = () => {
  const searchInput = useRef<HTMLInputElement>(null);
  const setUpdatedValue = useBeforeUnload();

  const { cardsPerPage, sort, searchValue } = useAppSelector((state: RootState) => state.homePage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setUpdatedValue(searchValue);
  }, [searchValue, setUpdatedValue]);

  const resetSearchValue = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    dispatch(setSearchValue(''));
    searchInput.current?.focus();
  };

  const changeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    dispatch(setSearchValue(event.target.value));
  };

  const submitSearchForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue) {
      dispatch(setCurrPage(1));
      dispatch(
        fetchPhotos({
          value: searchValue,
          sort: sort,
          cardsPerPage: cardsPerPage,
          currPage: '1',
        })
      );
    }
  };

  return (
    <form className={styles.wrapper} data-testid="search-bar" onSubmit={submitSearchForm}>
      <label htmlFor="search-bar" className={styles.label}>
        Search photos:
      </label>
      <div className={styles.search}>
        <input
          value={searchValue || ''}
          onChange={changeSearchValue}
          type="search"
          id="search-bar"
          name="search"
          placeholder="Cats"
          autoComplete="off"
          className={styles.input}
          data-testid="search-input"
          ref={searchInput}
        />
        {searchValue && (
          <button
            className={`${styles.icon} ${styles.icon_clear}`}
            onClick={resetSearchValue}
            data-testid="clear-btn"
            type="button"
          ></button>
        )}
      </div>
      <button
        type="submit"
        className={styles.searchBtn}
        data-testid="search-btn"
        disabled={!searchValue}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
