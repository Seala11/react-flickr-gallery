import AppContext from 'app/store/context';
import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from './index.module.scss';

const SearchCardInfo = () => {
  const { homePageState } = useContext(AppContext);
  const { cards } = homePageState;
  const { id } = useParams();
  const navigate = useNavigate();
  const card = cards.find((card) => card.id === id);

  if (!card) {
    return <p data-testid="error">No card has found.</p>;
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

  const navigateHandler = () => {
    navigate('/');
  };

  return (
    <>
      <button data-testid="back-btn" className={styles.button} onClick={navigateHandler}>
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
      <div className={styles.popup} data-testid="popup">
        <div className={styles.header}>
          <div className={styles.avatarWrapper}>
            <img
              src={avatarIcon}
              alt={card.ownername}
              className={styles.avatar}
              data-testid="popup-avatar-image"
              width="32"
              height="32"
            />
            <span className={styles.subtitle} data-testid="popup-subtitle">
              {card.ownername}
            </span>
          </div>
        </div>

        <img src={img} alt={card.title} className={styles.img} data-testid="popup-image" />

        <div className={styles.infoWrapper}>
          <p className={styles.views}>
            <span className={styles.viewsInfo} data-testid="popup-views">
              {card.views}
            </span>
            Views
          </p>

          <p>
            Taken on{' '}
            <span className={styles.date} data-testid="popup-date">
              {date}
            </span>
          </p>
        </div>

        <section>
          <h2 className={styles.title} data-testid="popup-title">
            {card.title}
          </h2>

          {card.description._content && (
            <p className={styles.descr} data-testid="popup-descr">
              {description}
            </p>
          )}

          {card.tags && (
            <p className={styles.tags} data-testid="popup-tags">
              {tags}
            </p>
          )}
        </section>
      </div>
    </>
  );
};

export default SearchCardInfo;
