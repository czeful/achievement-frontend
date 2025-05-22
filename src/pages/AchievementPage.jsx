import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from '../styles/AchievementPage.module.css';

export default function AchievementPage() {
  const { id } = useParams();
  // Заглушка: в реальном приложении будем фетчить данные
  const achievement = {
    id,
    title: `Achievement #${id}`,
    description: 'Полное описание ачивки, подробности и шаги для выполнения.',
    author: { name: 'Dias', tag: '@dias_228' },
    steps: [
      { id: 1, title: 'Step 1', description: 'Описание шага 1' },
      { id: 2, title: 'Step 2', description: 'Описание шага 2' },
      { id: 3, title: 'Step 3', description: 'Описание шага 3' }
    ]
  };

  return (
    <div className={styles.achievementPageContainer}>
      <h1 className={styles.achievementTitle}>{achievement.title}</h1>
      <div className={styles.achievementMeta}>
        <Link to={`/profile/${achievement.author.tag.slice(1)}`} className={styles.authorLink}>
          <div className={styles.authorAvatar} />
          <div className={styles.authorName}>{achievement.author.name}</div>
          <div className={styles.authorTag}>{achievement.author.tag}</div>
        </Link>
      </div>
      <p className={styles.achievementDescription}>{achievement.description}</p>
      <h2 className={styles.stepsTitle}>Steps</h2>
      <div className={styles.stepsList}>
        {achievement.steps.map(step => (
          <div key={step.id} className={styles.stepItem}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>{step.id}.</span>
              <span className={styles.stepTitle}>{step.title}</span>
            </div>
            <p className={styles.stepDesc}>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 