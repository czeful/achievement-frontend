import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Achieve More With <span>Achievement</span></h1>
        <p className={styles.heroSubtitle}>Track your goals. Collaborate. Celebrate milestones.</p>
        <Link to="/register" className={styles.ctaButton}>Начать прогресс →</Link>
      </section>

      <section className={styles.chartSection}>
        <h2 className={styles.sectionTitle}>Your Potential, Visualized</h2>
        <div className={styles.mockChart}>
          <div className={styles.bar} style={{ height: '60%' }}>🏃‍♂️</div>
          <div className={styles.bar} style={{ height: '90%' }}>🎯</div>
          <div className={styles.bar} style={{ height: '75%' }}>💡</div>
          <div className={styles.bar} style={{ height: '50%' }}>🔥</div>
        </div>
        <p className={styles.chartLabels}>Productivity · Focus · Ideas · Consistency</p>
      </section>

      <section className={styles.createDemo}>
        <h2 className={styles.sectionTitle}>Create a Goal</h2>
        <div className={styles.goalDemoCard}>
          <input type="text" placeholder="Название цели" disabled />
          <textarea placeholder="Описание цели" disabled />
          <button className={styles.demoButton}>+ Добавить шаг</button>
        </div>
      </section>
    </div>
  );
} 