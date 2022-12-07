import React from 'react';
import { NavLink } from 'react-router-dom';
import NAV_LIST from 'shared/data/navigation';
import styles from './index.module.scss';

class LinkList extends React.Component {
  render() {
    return (
      <ul className={styles.list}>
        {NAV_LIST.map((item) => {
          return (
            <li key={item.id} className={styles.item}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.link_active} ` : styles.link
                }
                to={item.path}
                end
              >
                {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default LinkList;
