import React from 'react';
import '../styles/Friends.css';

export default function Friends() {
  const friends = [
    { id: 1, name: 'Dias', tag: '@dias_228' },
    { id: 2, name: 'Dias', tag: '@dias_228' },
    { id: 3, name: 'Dias', tag: '@dias_228' },
    { id: 4, name: 'Dias', tag: '@dias_228' },
  ];

  const handleRemoveFriend = (friendId) => {
    // Здесь будет логика удаления друга
    console.log('Remove friend:', friendId);
  };

  return (
    <div className="friends-container">
      <h1 className="profile-name">Name</h1>
      <p className="profile-tag">@user_tag</p>
      <p className="profile-location">CITY, REGION</p>
      <div className="friends-block">
        <h2 className="friends-title">FRIENDS</h2>
        <div className="friend-list">
          {friends.map((friend) => (
            <div key={friend.id} className="friend-item">
              <div className="avatar" />
              <div className="friend-info">
                <div className="friend-name">{friend.name}</div>
                <div className="friend-tag">{friend.tag}</div>
              </div>
              <button 
                className="remove-btn"
                onClick={() => handleRemoveFriend(friend.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 