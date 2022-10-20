import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { setSearchValueToStorage } from 'shared/helpers/storage';

type SearchBarProps = {
  updateInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearInputHandler: () => void;
  searchHandler: () => void;
  searchValue: string | null;
};

const SearchBar = ({
  updateInputHandler,
  clearInputHandler,
  searchHandler,
  searchValue,
}: SearchBarProps) => {
  useEffect(() => {
    const updateLocalStorage = () => {
      if (typeof searchValue === 'string') setSearchValueToStorage(searchValue);
    };

    window.addEventListener('beforeunload', updateLocalStorage);

    return () => {
      updateLocalStorage();
      window.removeEventListener('beforeunload', updateLocalStorage);
    };
  }, [searchValue]);

  return (
    <div className={styles.wrapper} data-testid="search-bar">
      <label htmlFor="search-bar" className={styles.label}>
        Search photos:
      </label>
      <div className={styles.search}>
        <input
          value={searchValue || ''}
          onChange={updateInputHandler}
          autoFocus
          type="search"
          id="search-bar"
          name="search"
          placeholder="Cats"
          autoComplete="off"
          className={styles.input}
          data-testid="search-input"
        />
        {searchValue && (
          <button
            className={`${styles.icon} ${styles.icon_clear}`}
            onClick={clearInputHandler}
            data-testid="clear-btn"
          ></button>
        )}
      </div>
      <button
        className={styles.searchBtn}
        data-testid="search-btn"
        onClick={searchHandler}
        disabled={!searchValue}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
