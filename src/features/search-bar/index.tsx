import React from 'react';
import styles from './index.module.scss';

enum StorageItem {
  SEARCH = 'searchValue',
}

interface ISearchBarProps {
  value: string;
}

class SearchBar extends React.Component {
  state = { value: '' };

  constructor(props: ISearchBarProps) {
    super(props);
    this.updateInputHandler = this.updateInputHandler.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.clearInputHandler = this.clearInputHandler.bind(this);
  }

  componentDidMount() {
    const value = localStorage.getItem(StorageItem.SEARCH);
    if (value) {
      this.setState({
        value: value,
      });
    }
    window.addEventListener('beforeunload', this.updateLocalStorage);
  }

  componentWillUnmount() {
    this.updateLocalStorage();
    window.removeEventListener('beforeunload', this.updateLocalStorage);
  }

  updateLocalStorage() {
    localStorage.setItem(StorageItem.SEARCH, this.state.value);
  }

  updateInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      value: event.target.value,
    });
  }

  clearInputHandler() {
    this.setState({
      value: '',
    });
  }

  render() {
    console.log('props', this.state.value, localStorage.getItem(StorageItem.SEARCH));
    return (
      <div className={styles.wrapper}>
        <label htmlFor="search-bar" className={styles.label}>
          Search the character:
        </label>
        <div className={styles.search}>
          <input
            value={this.state.value}
            onChange={this.updateInputHandler}
            autoFocus
            type="search"
            id="search-bar"
            name="search"
            placeholder="Rick"
            autoComplete="off"
            className={styles.input}
          />
          {this.state.value ? (
            <button
              className={`${styles.icon} ${styles.icon_clear}`}
              onClick={this.clearInputHandler}
            ></button>
          ) : (
            <button className={`${styles.icon} ${styles.icon_search}`}></button>
          )}
        </div>
      </div>
    );
  }
}

export default SearchBar;
