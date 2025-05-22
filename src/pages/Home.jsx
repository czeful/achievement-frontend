import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import emptyImage from '../assets/images/empty.png';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [popular] = useState([
    { id: 1, title: 'First Goal Completed', user: 'John Doe', usertag: '@johndoe' },
    { id: 2, title: 'Social Butterfly',      user: 'Jane Smith', usertag: '@janesmith' },
    { id: 3, title: 'Goal Master',           user: 'Mike Johnson', usertag: '@mikejohnson' },
    { id: 4, title: 'Ultra Runner',          user: 'Alice Brown', usertag: '@alicebrown' },
  ]);

  return (
    <div className={styles.homeContainer}>
      {/* Banner */}
      <section className={styles.bannerSection}>
        <div className={styles.bannerContent}>
          <h2 className={styles.bannerTitle}>Join 1,000+ Achievers</h2>
          <p className={styles.bannerSubtitle}>Set goals, track progress, celebrate every win.</p>
          <Link to="/register" className={styles.bannerBtn}>Get Started</Link>
        </div>
      </section>

      {/* Hero */}
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>
          Achieve More With <span>Achievement</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Track your goals. Collaborate. Celebrate milestones.
        </p>
        <Link to="/register" className={styles.ctaButton}>
          Start Progress →
        </Link>
      </section>

      {/* Chart */}
      <section className={styles.chartSection}>
        <h2 className={styles.sectionTitle}>Your Potential, Visualized</h2>
        <div className={styles.mockChart}>
          <div className={styles.bar} style={{ height: '60%' }}>🏃‍♂️</div>
          <div className={styles.bar} style={{ height: '90%' }}>🎯</div>
          <div className={styles.bar} style={{ height: '75%' }}>💡</div>
          <div className={styles.bar} style={{ height: '50%' }}>🔥</div>
        </div>
        <p className={styles.chartLabels}>
          Productivity · Focus · Ideas · Consistency
        </p>
      </section>

      {/* Demo */}
      <section className={styles.createDemo}>
        <h2 className={styles.sectionTitle}>Create a Goal</h2>
        <div className={styles.goalDemoCard}>
          <input type="text" placeholder="Goal Name" disabled />
          <textarea placeholder="Goal Description" disabled />
          <button className={styles.demoButton}>+ Add Step</button>
        </div>
      </section>

      {/* Popular Achievements */}
      <section className={styles.popularSection}>
        <h2 className={styles.sectionTitle}>Popular Achievements</h2>
        <div className={styles.popularGrid}>
          {popular.map(a => (
            <Link
              key={a.id}
              to={`/achievements/${a.id}`}
              className={styles.popularCard}
            >
              <div className={styles.popularThumb}>
                <img src={emptyImage} alt={a.title} className={styles.popularImage} />
              </div>
              <div className={styles.popularInfo}>
                <div className={styles.popularTitle}>{a.title}</div>
                <div className={styles.popularUser}>
                  {a.user}{' '}
                  <Link
                    to={`/profile/${a.usertag.slice(1)}`}
                    className={styles.popularLink}
                    onClick={e => e.stopPropagation()}
                  >
                    {a.usertag}
                  </Link>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
