import React from 'react';
import styles from './index.module.scss';
import { setSearchValueToStorage } from 'shared/helpers/storage';

interface ISearchBarProps {
  updateInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearInputHandler: () => void;
  searchHandler: () => void;
  searchValue: string | null;
}

class SearchBar extends React.Component<ISearchBarProps> {
  constructor(props: ISearchBarProps) {
    super(props);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);

    this.state = {
      searchValue: this.props.searchValue,
    };
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.updateLocalStorage);
  }

  componentWillUnmount() {
    this.updateLocalStorage();
    window.removeEventListener('beforeunload', this.updateLocalStorage);
  }

  updateLocalStorage() {
    if (typeof this.props.searchValue === 'string') setSearchValueToStorage(this.props.searchValue);
  }

  render() {
    return (
      <div className={styles.wrapper} data-testid="search-bar">
        <label htmlFor="search-bar" className={styles.label}>
          Search photos:
        </label>
        <div className={styles.search}>
          <input
            value={this.props.searchValue || ''}
            onChange={this.props.updateInputHandler}
            autoFocus
            type="search"
            id="search-bar"
            name="search"
            placeholder="Cats"
            autoComplete="off"
            className={styles.input}
            data-testid="search-input"
          />
          {this.props.searchValue && (
            <button
              className={`${styles.icon} ${styles.icon_clear}`}
              onClick={this.props.clearInputHandler}
              data-testid="clear-btn"
            ></button>
          )}
        </div>
        <button
          className={styles.searchBtn}
          data-testid="search-btn"
          onClick={this.props.searchHandler}
          disabled={!this.props.searchValue}
        >
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
