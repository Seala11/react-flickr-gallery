import { useAppDispatch } from 'app/store';
import { FlickrCard, setScrollPos } from 'app/store/homePageSlice';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './index.module.scss';

type CardProps = {
  card: FlickrCard;
};

const Card = ({ card }: CardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [openCardPage, setOpenCardPage] = useState(false);

  const img = `https://farm${card.farm}.staticflickr.com/${card.server}/${card.id}_${card.secret}.jpg`;
  const title = card.title.length < 35 ? card.title : card.title.slice(0, 35) + '...';
  const name = card.ownername.length < 35 ? card.ownername : card.ownername.slice(0, 35) + '...';

  const navigateHandler = () => {
    dispatch(setScrollPos(window.pageYOffset));
    setOpenCardPage((open) => !open);
  };

  useEffect(() => {
    if (openCardPage) {
      navigate('/search/' + card.id);
    }
  }, [openCardPage, card.id, navigate]);

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
