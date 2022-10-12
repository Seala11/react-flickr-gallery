import React from 'react';
import styles from './index.module.scss';
import CardList from 'features/card-list';
import SearchBar from 'features/search-bar';
import { getSearchValueFromStorage } from 'shared/helpers/storage';
import { FlickrCard, requestData, SearchFetchType } from './models';

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
  };

  constructor(props: IHomeProps) {
    super(props);
    this.updateSearchValue = this.updateSearchValue.bind(this);
    this.clearSearchValue = this.clearSearchValue.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
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
      this.setState({ cards: data.photos.photo });
      console.log(data);
    } catch (err) {
      console.log(err);
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

  render() {
    console.log(this.state);
    return (
      <main className={styles.wrapper}>
        <SearchBar
          updateInputHandler={this.updateSearchValue}
          clearInputHandler={this.clearSearchValue}
          searchHandler={this.searchHandler}
          searchValue={this.state.searchValue}
        />
        {this.state.loading ? <p>Loading...</p> : <CardList cards={this.state.cards} />}
      </main>
    );
  }
}

export default Home;
