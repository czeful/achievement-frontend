import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from '../styles/AchievementPage.module.css';
import apiService from '../api';

export default function AchievementDetail() {
  const { id } = useParams();
  const [ach, setAch] = useState(null);

  useEffect(() => {
    apiService.getAchievement(id)
      .then(res => setAch(res.data))
      .catch(console.error);
  }, [id]);

  if (!ach) return <div className={styles.loading}>Loading…</div>;

  return (
    <div className={styles.achievementPageContainer}>
      <h1 className={styles.achievementTitle}>{ach.name}</h1>
      <div className={styles.achievementMeta}>
        <span>{ach.category}</span>
        <span>до {new Date(ach.due_date).toLocaleDateString()}</span>
        <span>статус: {ach.status}</span>
      </div>
      <Link to={`/profile/${ach.user.username}`} className={styles.detailAuthor}>
        <div className={styles.authorAvatar} />
        <span>@{ach.user.username}</span>
      </Link>
      <p className={styles.achievementDescription}>{ach.description}</p>

      <h2 className={styles.stepsTitle}>Шаги и прогресс</h2>
      <ul className={styles.stepsList}>
        {ach.steps.map((st, i) => (
          <li key={i} className={styles.stepItem}>
            <input
              type="checkbox"
              checked={Boolean(ach.progress[st])}
              readOnly
            />
            <span className={styles.stepTitle}>{st}</span>
          </li>
        ))}
      </ul>

      <p className={styles.metaSmall}>
        Участники: {ach.collaborators.length}
      </p>

      <Link to="/achievements" className={styles.backBtn}>← Назад</Link>
    </div>
  );
} 