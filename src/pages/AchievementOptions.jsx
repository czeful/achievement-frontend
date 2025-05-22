import React from 'react';
import '../styles/Profile.css';

export default function AchievementOptions() {
  const handleOptionClick = (option) => {
    // Здесь будет логика обработки нажатий на кнопки
    console.log('Option clicked:', option);
  };

  const handleDelete = () => {
    // Здесь будет логика удаления достижения
    console.log('Delete clicked');
  };

  return (
    <div className="achievement-options-container">
      <h1 className="settings-title">Achievement options</h1>
      <div className="option-list">
        <button 
          className="option-btn"
          onClick={() => handleOptionClick('add_friends')}
        >
          ADD FRIENDS
        </button>
        <button 
          className="option-btn"
          onClick={() => handleOptionClick('change_achievement')}
        >
          CHANGE ACHIEVEMENT
        </button>
        <button 
          className="option-btn"
          onClick={() => handleOptionClick('copy_link')}
        >
          COPY LINK
        </button>
        <button 
          className="option-btn"
          onClick={() => handleOptionClick('browse')}
        >
          BROWSE
        </button>
      </div>
      <button 
        className="delete-btn"
        onClick={handleDelete}
      >
        DELETE
      </button>
    </div>
  );
} 