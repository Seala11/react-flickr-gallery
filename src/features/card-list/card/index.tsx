import AppContext from 'app/store/context';
import { SearchProviderActions } from 'app/store/searchPageReducer';
import { FlickrCard } from 'pages/home/models';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './index.module.scss';

type CardProps = {
  card: FlickrCard;
};

const Card = ({ card }: CardProps) => {
  const navigate = useNavigate();
  const { homePageDispatch } = useContext(AppContext);
  const [openModal, setOpenModal] = useState(false);

  const img = `https://farm${card.farm}.staticflickr.com/${card.server}/${card.id}_${card.secret}.jpg`;
  const title = card.title.length < 35 ? card.title : card.title.slice(0, 35) + '...';
  const name = card.ownername.length < 35 ? card.ownername : card.ownername.slice(0, 35) + '...';

  const navigateHandler = () => {
    homePageDispatch({ type: SearchProviderActions.SET_SCROLL_POS, pos: window.pageYOffset });
    setOpenModal((open) => !open);
  };

  useEffect(() => {
    if (openModal) {
      navigate('/search/' + card.id);
    }
  }, [openModal, card.id, navigate]);

  return (
    <li className={styles.card} onClick={navigateHandler}>
      <img src={img} alt={card.title} className={styles.img} data-testid="card-image" />
      <h2 className={styles.title} data-testid="card-title">
        {title}
      </h2>
      <p className={styles.subtitle} data-testid="card-subtitle">
        {name}
      </p>
    </li>
  );
};

export default Card;
