import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { useBeforeUnload } from './useBeforeUnload';

type SearchBarProps = {
  setSearchValue: React.Dispatch<React.SetStateAction<string | null>>;
  searchHandler: (value: string) => Promise<void>;
  searchValue: string | null;
};

const SearchBar = ({ setSearchValue, searchHandler, searchValue }: SearchBarProps) => {
  const searchInput = useRef<HTMLInputElement>(null);
  const setUpdatedValue = useBeforeUnload();

  useEffect(() => {
    setUpdatedValue(searchValue);
  }, [searchValue, setUpdatedValue]);

  const resetSearchValue = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setSearchValue('');
    searchInput.current?.focus();
  };

  const changeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  const submitSearchForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue) {
      searchHandler(searchValue);
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
