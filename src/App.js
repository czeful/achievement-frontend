import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MyProfile from './pages/MyProfile';
import Settings from './pages/Settings';
import AchievementsList from './pages/AchievementsList';
import AchievementDetail from './pages/AchievementDetail';
import AchievementCreate from './pages/AchievementCreate';
import Discover from './pages/Discover';
import styles from './styles/App.module.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const currentUsername = localStorage.getItem('username');

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
  };

  const PrivateRoute = ({ children }) =>
    isAuthenticated ? children : <Navigate to="/login" replace />;

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <Link to="/" className={styles.logoLink}>Achievement</Link>
          </div>
          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>Home</Link>
            {isAuthenticated && (
              <>
                <Link to="/discover" className={styles.navLink}>Discover</Link>
                <Link to="/achievements" className={styles.navLink}>Achievements</Link>
                <Link to={`/profile/${currentUsername}`} className={styles.navLink}>Profile</Link>
                <Link to="/settings" className={styles.navLink}>Settings</Link>
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
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/register" element={<Register onRegister={() => setIsAuthenticated(true)} />} />

          {/* Private */}
          <Route
            path="/discover"
            element={<PrivateRoute><Discover /></PrivateRoute>}
          />
          <Route
            path="/profile/:username"
            element={<PrivateRoute><Profile /></PrivateRoute>}
          />
          <Route
            path="/myprofile"
            element={<PrivateRoute><MyProfile /></PrivateRoute>}
          />
          <Route
            path="/settings"
            element={<PrivateRoute><Settings /></PrivateRoute>}
          />
          <Route
            path="/achievements"
            element={<PrivateRoute><AchievementsList /></PrivateRoute>}
          />
          <Route
            path="/achievements/create"
            element={<PrivateRoute><AchievementCreate /></PrivateRoute>}
          />
          <Route
            path="/achievements/:id"
            element={<PrivateRoute><AchievementDetail /></PrivateRoute>}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App; 