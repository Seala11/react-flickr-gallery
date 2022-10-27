import AppContext from 'app/store/context';
import { SearchProviderActions } from 'app/store/searchPageReducer';
import React, { useContext, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { useBeforeUnload } from './useBeforeUnload';

type SearchBarProps = {
  searchHandler: (value: string, sort: string, cardsPerPage: string) => Promise<void>;
};

const SearchBar = ({ searchHandler }: SearchBarProps) => {
  const searchInput = useRef<HTMLInputElement>(null);
  const setUpdatedValue = useBeforeUnload();

  const { homePageState, homePageDispatch } = useContext(AppContext);
  const { searchValue, sort, cardsPerPage } = homePageState;

  useEffect(() => {
    setUpdatedValue(searchValue);
  }, [searchValue, setUpdatedValue]);

  const resetSearchValue = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    homePageDispatch({ type: SearchProviderActions.SET_SEARCH_VALUE, searchValue: '' });
    searchInput.current?.focus();
  };

  const changeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    homePageDispatch({
      type: SearchProviderActions.SET_SEARCH_VALUE,
      searchValue: event.target.value,
    });
  };

  const submitSearchForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue) {
      searchHandler(searchValue, sort, cardsPerPage);
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
          autoFocus
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
