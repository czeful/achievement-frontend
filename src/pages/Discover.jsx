import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Discover.module.css';
import emptyImage from '../assets/images/empty.png';

export default function Discover() {
  const [query, setQuery] = useState('');

  // Моковые данные
  const popularAchievements = [
    { id: 1, title: 'First Goal', user: 'John Doe', usertag: '@johndoe' },
    { id: 2, title: 'Sharp Shooter', user: 'Jane Smith', usertag: '@janesmith' },
    { id: 3, title: 'Ultra Runner', user: 'Mike Johnson', usertag: '@mikejohnson' },
  ];

  const allAchievements = [
    { id: 4, title: 'Brainstorm', user: 'Alice Brown', usertag: '@alicebrown' },
    { id: 5, title: 'Night Owl', user: 'Bob Wilson', usertag: '@bobwilson' },
    { id: 6, title: 'Early Bird', user: 'Carol Davis', usertag: '@caroldavis' },
    { id: 7, title: 'Marathoner', user: 'David Miller', usertag: '@davidmiller' },
    { id: 8, title: 'Bookworm', user: 'Eva Taylor', usertag: '@evataylor' },
    { id: 9, title: 'Foodie', user: 'Frank White', usertag: '@frankwhite' },
  ];

  const completedAchievements = [
    { id: 10, title: 'Zen Master', user: 'Grace Lee', usertag: '@gracelee' },
    { id: 11, title: 'Explorer', user: 'Henry Kim', usertag: '@henrykim' },
    { id: 12, title: 'Top Chef', user: 'Isabel Cruz', usertag: '@isabelcruz' },
  ];

  // Фильтрация по поисковому запросу
  const filterFn = a =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.user.toLowerCase().includes(query.toLowerCase());

  const popular = popularAchievements.filter(filterFn);
  const all = allAchievements.filter(filterFn);
  const completed = completedAchievements.filter(filterFn);

  return (
    <div className={styles.discoverContainer}>
      <h1 className={styles.discoverTitle}>Discover</h1>

      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search achievements..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      {popular.length > 0 && (
        <>
          <h2 className={styles.sectionSubtitle}>Popular</h2>
          <div className={styles.popularList}>
            {popular.map(a => (
              <Link
                key={a.id}
                to={`/achievements/${a.id}`}
                className={styles.achievementCard}
              >
                <div className={styles.placeholder}>
                  <img src={emptyImage} alt={a.title} className={styles.achievementImage} />
                </div>
                <div className={styles.userInfo}>
                  <div className={styles.cardText}>
                    <div className={styles.cardTitle}>{a.title}</div>
                    <div className={styles.username}>{a.user}</div>
                  </div>
                  <Link
                    to={`/profile/${a.usertag.slice(1)}`}
                    className={styles.authorLink}
                    onClick={e => e.stopPropagation()}
                  >
                    <div className={styles.avatar} />
                  </Link>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {all.length > 0 && (
        <>
          <h2 className={styles.sectionSubtitle}>All</h2>
          <div className={styles.allGrid}>
            {all.map(a => (
              <Link
                key={a.id}
                to={`/achievements/${a.id}`}
                className={styles.achievementCard}
              >
                <div className={styles.placeholderSmall}>
                  <img src={emptyImage} alt={a.title} className={styles.achievementImage} />
                </div>
                <div className={styles.userInfo}>
                  <div className={styles.cardText}>
                    <div className={styles.cardTitle}>{a.title}</div>
                    <div className={styles.username}>{a.user}</div>
                  </div>
                  <Link
                    to={`/profile/${a.usertag.slice(1)}`}
                    className={styles.authorLink}
                    onClick={e => e.stopPropagation()}
                  >
                    <div className={styles.avatar} />
                  </Link>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {completed.length > 0 && (
        <>
          <h2 className={styles.sectionSubtitle}>Completed</h2>
          <div className={styles.completedList}>
            {completed.map(a => (
              <Link
                key={a.id}
                to={`/achievements/${a.id}`}
                className={`${styles.achievementCard} ${styles.completedCard}`}
              >
                <div className={styles.placeholderSmall}>
                  <img src={emptyImage} alt={a.title} className={styles.achievementImage} />
                  <div className={styles.checkmark}>✓</div>
                </div>
                <div className={styles.userInfo}>
                  <div className={styles.cardText}>
                    <div className={styles.cardTitle}>{a.title}</div>
                    <div className={styles.username}>{a.user}</div>
                  </div>
                  <Link
                    to={`/profile/${a.usertag.slice(1)}`}
                    className={styles.authorLink}
                    onClick={e => e.stopPropagation()}
                  >
                    <div className={styles.avatar} />
                  </Link>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      <button className={styles.discoverButton}>Show More</button>
    </div>
  );
} 