import React from 'react';
import styles from './index.module.scss';
import { FlickrCard } from 'pages/home/models';

interface PopUpProps {
  card: FlickrCard;
  popUpClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
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
      .map((tag) => `#${tag}`)
      .join(' ');

    const date = new Date(card.datetaken).toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    return (
      <div className={styles.popup} data-testid="popup">
        <img src={img} alt={card.title} className={styles.img} data-testid="popup-image" />
        <section>
          <div className={styles.avatarWrapper}>
            <img
              src={avatarIcon}
              alt={card.ownername}
              className={styles.avatar}
              data-testid="popup-avatar-image"
            />
            <span className={styles.subtitle} data-testid="popup-subtitle">
              {card.ownername}
            </span>
          </div>

          <h2 className={styles.title} data-testid="popup-title">
            {card.title}
          </h2>

          <p>
            Description:{' '}
            <span className={styles.descr} data-testid="popup-descr">
              {card.description._content ? card.description._content : 'not provided'}
            </span>
          </p>

          <p>
            Taken on{' '}
            <span className={styles.date} data-testid="popup-date">
              {date}
            </span>
          </p>

          <p>
            Views:{' '}
            <span className={styles.views} data-testid="popup-views">
              {card.views}
            </span>
          </p>

          <p>
            Tags:{' '}
            <span className={styles.tags} data-testid="popup-tags">
              {tags}
            </span>
          </p>
        </section>
        <button onClick={this.props.popUpClose}>Close</button>
      </div>
    );
  }
}

export default PopUp;
