import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { setSearchValueToStorage } from 'shared/helpers/storage';

type SearchBarProps = {
  updateInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearInputHandler: () => void;
  searchHandler: (value: string) => Promise<void>;
  searchValue: string | null;
};

const SearchBar = ({ ...props }: SearchBarProps) => {
  const { updateInputHandler, clearInputHandler, searchHandler, searchValue } = props;
  const mount = useRef<boolean>(false);
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mount.current) return;
    const updateLocalStorage = () => {
      if (typeof searchValue === 'string') setSearchValueToStorage(searchValue);
    };

    window.addEventListener('beforeunload', updateLocalStorage);
    mount.current = true;

    return () => {
      updateLocalStorage();
      window.removeEventListener('beforeunload', updateLocalStorage);
      mount.current = false;
    };
  }, [searchValue]);

  const resetInput = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    clearInputHandler();
    searchInput.current?.focus();
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchHandler(searchValue || '');
  };

  console.log(searchValue);
  return (
    <form className={styles.wrapper} data-testid="search-bar" onSubmit={submitForm}>
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
          ref={searchInput}
        />
        {searchValue && (
          <button
            className={`${styles.icon} ${styles.icon_clear}`}
            onClick={resetInput}
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
