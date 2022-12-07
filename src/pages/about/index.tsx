import React from 'react';
import styles from './index.module.scss';
import TEAM from 'shared/data/team';

const About = () => (
  <div className={styles.wrapper}>
    <h1>Our team</h1>
    <div>
      <ul className={styles.list}>
        {TEAM.map((member) => (
          <li key={member.id} className={styles.item}>
            <img src={member.img} alt={member.alt} className={styles.image} />
            <h2 className={styles.role}>{member.role}</h2>
            <h3 className={styles.name}>{member.name}</h3>
            <a href={member.link} target="_blank" rel="noreferrer" className={styles.link}>
              GitHub
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default About;
