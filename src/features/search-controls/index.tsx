import AppContext from 'app/store/context';
import { SearchProviderActions } from 'app/store/searchPageReducer';
import { DEFAULT_SEARCH } from 'pages/home/models';
import React, { useContext } from 'react';
import styles from './index.module.scss';

type SearchControlsProps = {
  searchHandler: (
    value: string,
    sort: string,
    cardsPerPage: string,
    currPage: string
  ) => Promise<void>;
};

const SearchControls = ({ searchHandler }: SearchControlsProps) => {
  const { homePageState, homePageDispatch } = useContext(AppContext);
  const { cardsPerPage, sort, searchValue, currPage } = homePageState;

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>, key: SearchProviderActions) => {
    const search = searchValue ? searchValue : DEFAULT_SEARCH;

    switch (key) {
      case SearchProviderActions.CHANGE_CARDS_PER_PAGE:
        homePageDispatch({
          type: SearchProviderActions.CHANGE_CARDS_PER_PAGE,
          cardsPerPage: e.target.value,
        });
        searchHandler(search, sort, e.target.value, `${currPage}`);
        break;

      case SearchProviderActions.CHANGE_SORT:
        homePageDispatch({
          type: SearchProviderActions.CHANGE_SORT,
          sort: e.target.value,
        });
        searchHandler(search, e.target.value, cardsPerPage, `${currPage}`);
        break;
    }
  };

  return (
    <form className={styles.form} data-testid="form">
      <div className={styles.wrapper}>
        <label htmlFor="numberOfCards" className={styles.label}>
          Cards per page
        </label>
        <select
          value={cardsPerPage}
          name="numberOfCards"
          id="numberOfCards"
          onChange={(e) => selectHandler(e, SearchProviderActions.CHANGE_CARDS_PER_PAGE)}
          className={styles.input}
          data-testid="cards-per-page"
        >
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="24">24</option>
        </select>
      </div>

      <div className={styles.wrapper}>
        <label htmlFor="sortCards" className={styles.label}>
          Sort by
        </label>
        <select
          name="sortCards"
          id="sortCards"
          value={sort}
          onChange={(e) => selectHandler(e, SearchProviderActions.CHANGE_SORT)}
          className={styles.input}
          data-testid="sort"
        >
          <option value="relevance">Relevance</option>
          <option value="interestingness-desc">Interestingness</option>
          <option value="date-posted-desc">Date uploaded</option>
          <option value="date-taken-desc">Date taken</option>
        </select>
      </div>
    </form>
  );
};

export default SearchControls;
