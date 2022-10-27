import AppContext from 'app/store/context';
import { SearchProviderActions } from 'app/store/searchPageReducer';
import { DEFAULT_SEARCH } from 'pages/home/models';
import React, { useContext } from 'react';
import style from './index.module.scss';

type Props = {
  searchHandler: (
    value: string,
    sort: string,
    cardsPerPage: string,
    currPage: string
  ) => Promise<void>;
};

const Pagination = ({ searchHandler }: Props) => {
  const { homePageState, homePageDispatch } = useContext(AppContext);
  const { currPage, totalPages, searchValue, sort, cardsPerPage, loading } = homePageState;

  const UNITS_TOTAL = totalPages;
  let pagination: number[] = [];
  const UNITS = Array(UNITS_TOTAL)
    .fill(null)
    .map((_, i) => i + 1);

  if (UNITS_TOTAL < 7) {
    pagination = [...UNITS];
  } else if (currPage <= 4) {
    pagination = [...UNITS.slice(0, 5), -1, UNITS_TOTAL];
  } else if (currPage >= UNITS_TOTAL - 3) {
    pagination = [1, -1, ...UNITS.slice(UNITS_TOTAL - 5)];
  } else {
    pagination = [1, -1, currPage - 1, currPage, currPage + 1, -2, UNITS_TOTAL];
  }

  const pageHandler = (page: number) => {
    const search = searchValue ? searchValue : DEFAULT_SEARCH;
    homePageDispatch({ type: SearchProviderActions.SET_CURR_PAGE, page: page });
    searchHandler(search, sort, cardsPerPage, `${page}`);
  };

  return (
    <div className={style.pagination}>
      <button
        onClick={() => pageHandler(currPage - 1)}
        type="button"
        className={`${style.button} ${style.page}`}
        disabled={currPage === 1 || loading}
      >
        prev
      </button>
      <ul className={style.list}>
        {pagination.map((page) => {
          if (page > 0) {
            return (
              <li key={page}>
                <button
                  disabled={loading}
                  onClick={() => pageHandler(page)}
                  type="button"
                  className={`${style.button} ${style.page} ${
                    page === currPage ? style.active : ''
                  }`}
                >
                  {page}
                </button>
              </li>
            );
          } else {
            return (
              <li key={page}>
                <button type="button" className={`${style.button} ${style.dots}`}>
                  ...
                </button>
              </li>
            );
          }
        })}
      </ul>
      <button
        onClick={() => pageHandler(currPage + 1)}
        type="button"
        className={`${style.button} ${style.page}`}
        disabled={currPage === totalPages || loading}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
