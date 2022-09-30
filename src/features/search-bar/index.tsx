import React from 'react';
import styles from './index.module.scss';
import { setSearchValueToStorage } from 'shared/helpers/storage';

interface ISearchBarProps {
  updateInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearInputHandler: () => void;
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
      <div className={styles.wrapper}>
        <label htmlFor="search-bar" className={styles.label}>
          Search the character:
        </label>
        <div className={styles.search}>
          <input
            value={this.props.searchValue || ''}
            onChange={this.props.updateInputHandler}
            autoFocus
            type="search"
            id="search-bar"
            name="search"
            placeholder="Rick"
            autoComplete="off"
            className={styles.input}
            data-testid="search-input"
          />
          {this.props.searchValue ? (
            <button
              className={`${styles.icon} ${styles.icon_clear}`}
              onClick={this.props.clearInputHandler}
              data-testid="clear-btn"
            ></button>
          ) : (
            <button
              className={`${styles.icon} ${styles.icon_search}`}
              data-testid="search-btn"
            ></button>
          )}
        </div>
      </div>
    );
  }
}

export default SearchBar;
