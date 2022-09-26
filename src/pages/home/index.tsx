import React from 'react';
import styles from './index.module.scss';
import CardList from 'features/card-list';
import SearchBar from 'features/search-bar';
import { getSearchValueFromStorage } from 'shared/helpers/storage';
import CARDS from 'shared/data/cards';
import { filterByName } from 'shared/helpers/filters';

interface IHomeProps {
  searchValue: string | null;
}

class Home extends React.Component {
  state = { searchValue: null, cards: [] };

  constructor(props: IHomeProps) {
    super(props);
    this.updateSearchValue = this.updateSearchValue.bind(this);
    this.clearSearchValue = this.clearSearchValue.bind(this);
  }

  componentDidMount() {
    const storedValue = getSearchValueFromStorage();
    if (storedValue) {
      this.setState({ searchValue: storedValue });
      this.filterCards(storedValue);
    } else {
      this.setState({ cards: CARDS });
    }
  }

  filterCards(value: string) {
    const data = CARDS.filter((card) => filterByName(card.name, value));
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
