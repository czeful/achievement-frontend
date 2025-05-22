import React from 'react';
import '../styles/Profile.css';

export default function Settings() {
  const handleLogout = () => {
    // Здесь будет логика выхода из аккаунта
    console.log('Logout clicked');
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Options ⚙️</h1>
      <button 
        className="logout-btn"
        onClick={handleLogout}
      >
        LOG OUT
      </button>
    </div>
  );
} 