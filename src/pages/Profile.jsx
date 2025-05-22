import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';
import apiService from '../api';

export default function Profile() {
  const [showProgress, setShowProgress] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiService.getProfile();
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="profile-container">Загрузка...</div>;
  }

  return (
    <div className="profile-container">
      <div className="avatar" />
      <h1 className="profile-name">{profile.name}</h1>
      <p className="profile-tag">@{profile.email.split('@')[0]}</p>
      <p className="profile-location">CITY, REGION</p>

      <div className="section">
        <button 
          className="section-toggle"
          onClick={() => setShowProgress(!showProgress)}
        >
          PROGRESS {showProgress ? '▴' : '▾'}
        </button>
        {showProgress && (
          <div className="progress-stats">
            <div><strong>ACTIVE ACHIEVEMENTS</strong> — X</div>
            <div><strong>COMPLETED ACHIEVEMENTS</strong> — Y</div>
            <div><strong>MOST ACTIVE DAYS</strong> — @DIAGRAM</div>
            <div className="chart-placeholder">[GRAPH]</div>
          </div>
        )}
      </div>

      <div className="section">
        <button 
          className="section-toggle"
          onClick={() => setShowFriends(!showFriends)}
        >
          FRIENDS {showFriends ? '▴' : '▾'}
        </button>
        {showFriends && (
          <div className="progress-stats">
            {/* Здесь можно отобразить компонент Friends */}
            <p>Список друзей будет здесь</p>
          </div>
        )}
      </div>
    </div>
  );
} 