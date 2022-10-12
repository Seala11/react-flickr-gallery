import React from 'react';
import styles from './index.module.scss';
import CardList from 'features/card-list';
import SearchBar from 'features/search-bar';
// import { getSearchValueFromStorage } from 'shared/helpers/storage';
import CARDS from 'shared/data/cards';
import { filterByName } from 'shared/helpers/filters';
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
  };

  constructor(props: IHomeProps) {
    super(props);
    this.updateSearchValue = this.updateSearchValue.bind(this);
    this.clearSearchValue = this.clearSearchValue.bind(this);
  }

  async componentDidMount() {
    console.log('MOUNT');
    // const storedValue = getSearchValueFromStorage();
    // if (storedValue) {
    //   this.setState({ searchValue: storedValue });
    //   this.filterCards(storedValue);
    // } else {
    //   this.setState({ cards: CARDS });
    // }
    requestData.sort = this.state.sort;
    requestData.text = this.state.searchValue || 'cats';
    requestData.per_page = `${this.state.cardsPerPage}`;

    const parameters = new URLSearchParams(requestData);

    try {
      const result = await fetch(`https://api.flickr.com/services/rest/?${parameters}`);
      // console.log('here');
      // const result = await fetch(
      //   `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=d1743560a339c2a8d5327c0466b8874b&content_type=1&tags=nature&&per_page=20&page=1&format=json&nojsoncallback=1`
      // );
      // console.log('RESULT', result);
      const data: SearchFetchType = await result.json();
      this.setState({ cards: data.photos.photo });
      console.log(data);
    } catch (err) {
      console.log('FETCH ERR');
      console.log(err);
    }
  }

  filterCards(value: string) {
    const data = this.state.cards.filter((card) => filterByName(card.title, value));
    this.setState({ cards: data });
  }

  updateSearchValue(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ searchValue: event.target.value });
    this.filterCards(event.target.value);
  }

  clearSearchValue() {
    this.setState({ searchValue: '', cards: CARDS });
  }

  render() {
    // console.log(this.state);
    return (
      <main className={styles.wrapper}>
        <SearchBar
          updateInputHandler={this.updateSearchValue}
          clearInputHandler={this.clearSearchValue}
          searchValue={this.state.searchValue}
        />
        <CardList cards={this.state.cards} />
      </main>
    );
  }
}

export default Home;
