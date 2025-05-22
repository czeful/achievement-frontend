import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import GoalsList from './pages/GoalsList';
import GoalDetail from './pages/GoalDetail';
import GoalCreate from './pages/GoalCreate';
import Friends from './pages/Friends';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import AchievementOptions from './pages/AchievementOptions';
import PrivateRoute from './components/PrivateRoute';
import styles from './styles/App.module.css';

function App() {
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <Link to="/" className={styles.logoLink}>Achievement</Link>
          </div>
          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>Home</Link>
            <Link to="/about" className={styles.navLink}>About</Link>
            <Link to="/contact" className={styles.navLink}>Contact</Link>
            {isAuthenticated && (
              <>
                <Link to="/goals" className={styles.navLink}>Goals</Link>
                <Link to="/friends" className={styles.navLink}>Friends</Link>
                <Link to="/profile" className={styles.navLink}>Profile</Link>
              </>
            )}
          </nav>
          <div className={styles.auth}>
            {!isAuthenticated ? (
              <>
                <Link to="/login" className={styles.authLink}>Login</Link>
                <Link to="/register" className={styles.authButton}>Register</Link>
              </>
            ) : (
              <Link to="/settings" className={styles.authLink}>Settings</Link>
            )}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <Routes>
          {/* Публичные маршруты */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Приватные маршруты */}
          <Route path="/goals" element={
            <PrivateRoute>
              <GoalsList />
            </PrivateRoute>
          } />
          <Route path="/goals/:id" element={
            <PrivateRoute>
              <GoalDetail />
            </PrivateRoute>
          } />
          <Route path="/goals/create" element={
            <PrivateRoute>
              <GoalCreate />
            </PrivateRoute>
          } />
          <Route path="/friends" element={
            <PrivateRoute>
              <Friends />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="/settings" element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          } />
          <Route path="/achievement-options" element={
            <PrivateRoute>
              <AchievementOptions />
            </PrivateRoute>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App; 