import React from 'react';
import styles from './index.module.scss';
import { FlickrCard } from 'pages/home/models';

interface PopUpProps {
  card: FlickrCard;
  popUpClose: (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
}

class PopUp extends React.Component<PopUpProps> {
  constructor(props: PopUpProps) {
    super(props);
  }

  render() {
    const card = this.props.card;
    const avatarIcon = `https://farm${card.iconfarm}.staticflickr.com/${card.iconserver}//buddyicons/${card.owner}.jpg`;
    const img = `https://farm${card.farm}.staticflickr.com/${card.server}/${card.id}_${card.secret}.jpg`;
    const tags = card.tags
      .split(' ')
      .map((tag, index) => (index < 20 ? `#${tag}` : ''))
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
        <div className={styles.overlay} onClick={this.props.popUpClose} data-testid="overlay" />
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
            <button
              type="button"
              onClick={this.props.popUpClose}
              data-testid="popup-close-btn"
              className={styles.closeBtn}
            />
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
  }
}

export default PopUp;
