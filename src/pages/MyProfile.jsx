import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/MyProfile.module.css';
import apiService from '../api';

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const [friendsVisible, setFriendsVisible] = useState(false);
  const [achievementsVisible, setAchievementsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  // Данные для демо-графика
  const chartData = [60, 85, 50, 75, 40, 90, 30];

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiService.getUserProfile('me');
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className={styles.loading}>Loading your profile…</div>;
  if (!user)   return <div className={styles.loading}>User not found</div>;

  const maxActive = Math.max(user.achievementsCount, 1);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.info}>
          <div
            className={styles.avatar}
            style={{ backgroundImage: user.avatarUrl && `url(${user.avatarUrl})` }}
          />
          <div className={styles.nameBlock}>
            <h1 className={styles.name}>{user.name}</h1>
            <p className={styles.tag}>@{user.username}</p>
          </div>
        </div>
        <Link to="/settings" className={styles.settingsBtn}>
          ⚙️ Settings
        </Link>
      </div>

      {/* Progress Card */}
      <section className={styles.progressCard}>
        <div className={styles.progressHeader}>Progress</div>
        <div className={styles.progressTable}>
          <div className={styles.progressRow}>
            <div className={styles.progressLabel}>Active Achievements</div>
            <div className={styles.progressValue}>{user.achievementsCount}</div>
            <div className={styles.progressLine}>
              <div
                className={styles.progressLineActive}
                style={{ width: `${(user.achievementsCount / maxActive) * 100}%` }}
              />
            </div>
          </div>
          <div className={styles.progressRow}>
            <div className={styles.progressLabel}>Completed Achievements</div>
            <div className={styles.progressValue}>{user.completedGoals}</div>
            <div className={styles.progressLine}>
              <div
                className={styles.progressLineCompleted}
                style={{ width: '100%' }}
              />
            </div>
          </div>
          <div className={styles.progressRow}>
            <div className={styles.progressLabel}>Most Active Days</div>
            <div className={styles.progressValue}>{user.mostActiveDays ?? '-'}</div>
            <div className={styles.progressAnnotation}>@diagram</div>
          </div>
        </div>
        <div className={styles.chartContainer}>
          <div className={styles.barChart}>
            {chartData.map((h, i) => (
              <div key={i} className={styles.bar} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className={styles.chartFooter} />
      </section>

      {/* Friends Collapsible */}
      <section className={styles.collapsible}>
        <button
          className={styles.toggle}
          onClick={() => setFriendsVisible(v => !v)}
        >
          <span>{friendsVisible ? '▼' : '►'}</span>
          Friends ({user.friends.length})
        </button>
        {friendsVisible && (
          <ul className={styles.list}>
            {user.friends.map(f => (
              <li key={f.id} className={styles.listItem}>
                <Link to={`/profile/${f.username}`} className={styles.listLink}>
                  <div
                    className={styles.friendAvatar}
                    style={{ backgroundImage: f.avatarUrl && `url(${f.avatarUrl})` }}
                  />
                  <div className={styles.listInfo}>
                    <div className={styles.friendName}>{f.name}</div>
                    <div className={styles.friendTag}>@{f.username}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Achievements Collapsible */}
      <section className={styles.collapsible}>
        <button
          className={styles.toggle}
          onClick={() => setAchievementsVisible(v => !v)}
        >
          <span>{achievementsVisible ? '▼' : '►'}</span>
          Achievements ({user.achievements.length})
        </button>
        {achievementsVisible && (
          <ul className={styles.list}>
            {user.achievements.map(a => (
              <li key={a.id} className={styles.listItem}>
                <Link to={`/achievements/${a.id}`} className={styles.listLink}>
                  <div
                    className={styles.achievementThumb}
                    style={{ backgroundImage: a.imageUrl && `url(${a.imageUrl})` }}
                  />
                  <div className={styles.listInfo}>
                    <div className={styles.achievementName}>{a.title}</div>
                    <div className={styles.achievementDesc}>{a.description}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
} 