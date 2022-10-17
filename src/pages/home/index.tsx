import React from 'react';
import styles from './index.module.scss';
import CardList from 'features/card-list';
import SearchBar from 'features/search-bar';
import { getSearchValueFromStorage } from 'shared/helpers/storage';
import { FlickrCard, requestData, SearchFetchType } from './models';
import PopUp from 'features/popup';

type HomeProps = {
  updateSearchValue: () => void;
  clearSearchValue: () => void;
  searchHandler: () => void;
  popUpHandler: () => void;
  popUpClose: () => void;
};

type HomePageState = {
  searchValue: string | null;
  cards: FlickrCard[];
  currPage: number;
  totalPages: number;
  cardsPerPage: number;
  totalCards: number | null;
  sort: string;
  loading: boolean;
  error: boolean;
  popUp: FlickrCard | null;
};

class Home extends React.Component {
  state: HomePageState = {
    searchValue: null,
    cards: [],
    currPage: 1,
    totalPages: 1,
    cardsPerPage: 12,
    totalCards: null,
    sort: 'interestingness-desc',
    loading: false,
    error: false,
    popUp: null,
  };

  constructor(props: HomeProps) {
    super(props);
    this.updateSearchValue = this.updateSearchValue.bind(this);
    this.clearSearchValue = this.clearSearchValue.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.popUpHandler = this.popUpHandler.bind(this);
    this.popUpClose = this.popUpClose.bind(this);
  }

  async componentDidMount() {
    const storedValue = getSearchValueFromStorage();
    if (storedValue) {
      this.setState({ searchValue: storedValue }, () => {
        this.searchHandler();
      });
    } else {
      this.searchHandler();
    }

    window.addEventListener('keypress', this.searchEnterHandler);
  }

  getSnapshotBeforeUpdate(prevProps: Readonly<HomeProps>, prevState: Readonly<HomePageState>) {
    if (this.state.popUp !== prevState.popUp) {
      return window.pageYOffset;
    }
    return null;
  }

  componentDidUpdate(
    prevProps: Readonly<HomeProps>,
    prevState: Readonly<HomePageState>,
    snapshot: number | null
  ): void {
    if (snapshot !== null) {
      window.scrollTo({ top: snapshot });
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener('keypress', this.searchEnterHandler);
  }

  searchEnterHandler = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.searchHandler();
    }
  };

  async searchHandler() {
    this.setState({ loading: true });
    try {
      requestData.sort = this.state.sort;
      requestData.text = this.state.searchValue || 'cats';
      requestData.per_page = `${this.state.cardsPerPage}`;
      const parameters = new URLSearchParams(requestData);
      const result = await fetch(`https://api.flickr.com/services/rest/?${parameters}`);
      const data: SearchFetchType = await result.json();
      this.setState({ cards: data.photos.photo, error: false });
    } catch (err) {
      console.error(err);
      this.setState({ error: true, cards: [] });
    } finally {
      this.setState({ loading: false });
    }
  }

  updateSearchValue(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ searchValue: event.target.value });
  }

  clearSearchValue() {
    this.setState({ searchValue: '' });
  }

  popUpHandler(card: FlickrCard, event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    event.preventDefault();
    this.setState({ popUp: card });
    document.body.style.overflowY = 'hidden';
  }

  popUpClose(event: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    this.setState({ popUp: null });
    document.body.style.overflowY = 'auto';
  }

  render() {
    return (
      <main className={styles.wrapper}>
        {this.state.popUp && <PopUp card={this.state.popUp} popUpClose={this.popUpClose} />}
        <SearchBar
          updateInputHandler={this.updateSearchValue}
          clearInputHandler={this.clearSearchValue}
          searchHandler={this.searchHandler}
          searchValue={this.state.searchValue}
        />
        {this.state.error && <p data-testid="error">Oops! Something went wrong</p>}
        {this.state.loading ? (
          <div data-testid="loader" className={styles.loader} />
        ) : (
          <CardList
            cards={this.state.cards}
            error={this.state.error}
            showPopUp={this.popUpHandler}
          />
        )}
      </main>
    );
  }
}

export default Home;
