import React from 'react';
import styles from './index.module.scss';
import CardList from 'features/card-list';
import SearchBar from 'features/search-bar';
import { getSearchValueFromStorage } from 'shared/helpers/storage';
import { FlickrCard, requestData, SearchFetchType } from './models';
import PopUp from 'features/popup';

interface IHomeProps {
  searchValue: string | null;
}

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
  scrollPosition: number;
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
    scrollPosition: 0,
  };

  constructor(props: IHomeProps) {
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

  componentDidUpdate(prevProps: Readonly<IHomeProps>, prevState: Readonly<HomePageState>): void {
    if (this.state.popUp !== prevState.popUp) {
      window.scrollTo(0, this.state.scrollPosition);
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
    // console.log(card, event);
    event.preventDefault();
    this.setState({
      scrollPosition: window.pageYOffset,
    });
    this.setState({ popUp: card });
    document.body.style.overflowY = 'hidden';
  }

  popUpClose(event: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) {
    // console.log(event);
    event.preventDefault();
    this.setState({ popUp: null });
    document.body.style.overflowY = 'unset';
  }

  render() {
    // console.log(this.state.scrollPosition);
    return (
      <main className={styles.wrapper}>
        {this.state.popUp && (
          <div className={styles.overlay} onClick={this.popUpClose} data-testid="overlay" />
        )}
        {this.state.popUp && <PopUp card={this.state.popUp} popUpClose={this.popUpClose} />}
        <SearchBar
          updateInputHandler={this.updateSearchValue}
          clearInputHandler={this.clearSearchValue}
          searchHandler={this.searchHandler}
          searchValue={this.state.searchValue}
        />
        {this.state.error && <p data-testid="error">Oops! Something went wrong</p>}
        {this.state.loading ? (
          <p data-testid="loader">Loading...</p>
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
