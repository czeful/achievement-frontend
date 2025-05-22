import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Achievements.module.css';
import apiService from '../api';

export default function AchievementsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getAchievements()
      .then(res => setItems(res.data.achievements))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className={styles.loading}>Loading…</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Достижения</h1>
      <div className={styles.grid}>
        {items.map(a => {
          const doneCount = Object.values(a.progress).filter(Boolean).length;
          const total = Object.keys(a.progress).length;
          const percent = total ? Math.round(doneCount/total*100) : 0;
          return (
            <Link key={a.id} to={`/achievements/${a.id}`} className={styles.card}>
              <div className={styles.thumb}
                   style={{ backgroundImage: a.imageUrl ? `url(${a.imageUrl})` : undefined }}
              />
              <div className={styles.info}>
                <h3 className={styles.name}>{a.name}</h3>
                <p className={styles.meta}>
                  {a.category} • до {new Date(a.due_date).toLocaleDateString()}
                </p>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${percent}%` }} />
                </div>
                <p className={styles.metaSmall}>
                  {percent}% • 🤝 {a.collaborators.length}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <Link to="/achievements/create" className={styles.createBtn}>
        + Новое достижение
      </Link>
    </div>
  );
} 