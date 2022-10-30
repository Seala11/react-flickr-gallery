import AppContext from 'app/store/context';
import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from './index.module.scss';

const SearchCardInfo = () => {
  const { homePageState } = useContext(AppContext);
  const { cards, currPage } = homePageState;
  const { id } = useParams();
  const navigate = useNavigate();
  let indexPos;
  const card = cards.find((card, index) => {
    if (card.id === id) {
      indexPos = index;
      return card;
    }
  });

  useEffect(() => {
    if (!card) {
      return navigate('/');
    }
  }, [card, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const navigateHandler = () => {
    navigate('/');
  };

  if (!card) {
    return (
      <div className={styles.errWrapper} data-testid="search-card">
        <button data-testid="back-btn" className={styles.buttonBlack} onClick={navigateHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#424242"
            viewBox="0 0 16 16"
            className={styles.icon}
          >
            <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
          </svg>
          Back to search
        </button>
        <p data-testid="error">No Results Found</p>
      </div>
    );
  }

  const avatarIcon = `https://farm${card.iconfarm}.staticflickr.com/${card.iconserver}//buddyicons/${card.owner}.jpg`;
  const img = `https://farm${card.farm}.staticflickr.com/${card.server}/${card.id}_${card.secret}.jpg`;
  const tags = card.tags
    .split(' ')
    .slice(0, 20)
    .map((tag) => `#${tag}`)
    .join(' ');

  const date = new Date(card.datetaken).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const description =
    card.description._content.length < 350
      ? card.description._content
      : card.description._content.slice(0, 350) + '...';

  return (
    <>
      <section className={styles.sectionImage}>
        <div className={styles.imageWrapper}>
          <div className={styles.headerWrapper}>
            <button data-testid="back-btn" className={styles.button} onClick={navigateHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#fff"
                viewBox="0 0 16 16"
                className={styles.icon}
              >
                <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
              </svg>
              Back to search
            </button>
            <div className={styles.positionWrapper}>
              <p className={styles.position}>
                Page: <span>{currPage}</span>
              </p>
              <p className={styles.position}>
                Position: <span>{indexPos ? indexPos + 1 : 1}</span>
              </p>
              <p className={styles.position}>
                Id: <span>{id}</span>
              </p>
            </div>
          </div>

          <img src={img} alt={card.title} className={styles.img} data-testid="image" />
        </div>
      </section>

      <div>
        <section className={`${styles.section} ${styles.sectionInfo}`}>
          <div className={styles.avatarWrapper}>
            <img
              src={avatarIcon}
              alt={card.ownername}
              className={styles.avatar}
              data-testid="avatar-image"
              width="32"
              height="32"
            />
            <span className={styles.subtitle} data-testid="subtitle">
              {card.ownername}
            </span>
          </div>

          <div className={styles.infoWrapper}>
            <p className={styles.views}>
              <span className={styles.viewsInfo} data-testid="views">
                {card.views}
              </span>
              Views
            </p>

            <p>
              Taken on{' '}
              <span className={styles.date} data-testid="date">
                {date}
              </span>
            </p>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionContent}`}>
          <h2 className={styles.title} data-testid="title">
            {card.title}
          </h2>

          {card.description._content && (
            <p className={styles.descr} data-testid="descr">
              {description}
            </p>
          )}

          {card.tags && (
            <p className={styles.tags} data-testid="tags">
              {tags}
            </p>
          )}
        </section>
      </div>
    </>
  );
};

export default SearchCardInfo;
