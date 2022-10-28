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
    <ul className={style.list}>
      <li className={style.item}>
        <button
          onClick={() => pageHandler(currPage - 1)}
          type="button"
          className={`${style.button} ${style.page}`}
          disabled={currPage === 1 || loading}
        >
          <svg className={style.icon} focusable="false" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
      </li>

      {pagination.map((page) => {
        if (page > 0) {
          return (
            <li className={style.item} key={page}>
              <button
                disabled={loading}
                onClick={() => pageHandler(page)}
                type="button"
                className={`${style.button} ${style.page} ${style.number} ${
                  page === currPage ? style.active : ''
                }`}
              >
                {page}
              </button>
            </li>
          );
        } else {
          return (
            <li className={style.item} key={page}>
              <button type="button" className={`${style.button} ${style.dots}`}>
                ...
              </button>
            </li>
          );
        }
      })}
      <li className={style.item}>
        <button
          onClick={() => pageHandler(currPage + 1)}
          type="button"
          className={`${style.button} ${style.page}`}
          disabled={currPage === totalPages || loading}
        >
          <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" className={style.icon}>
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
