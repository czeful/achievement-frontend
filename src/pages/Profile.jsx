import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styles from '../styles/Profile.module.css';
import apiService from '../api';

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFriend, setIsFriend] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  // Получаем своё имя из localStorage
  const currentUsername = localStorage.getItem('username');

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const target = username || 'me';
        const response = await apiService.getUserProfile(target);
        console.log('User data:', response.data);
        setUser(response.data);
        
        // Определяем, чьё это профиль
        const owner = response.data.username;
        setIsCurrentUser(owner === currentUsername);
        
        if (owner !== currentUsername) {
          const friendship = await apiService.checkFriendship(response.data.id);
          setIsFriend(friendship.data.isFriend);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [username, navigate, currentUsername]);

  const handleAddFriend = async () => {
    try {
      await apiService.addFriend({ userId: user.id });
      setIsFriend(true);
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  if (loading) {
    return (
      <div className={styles.profileContainer}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.profileContainer}>
        <div>User not found</div>
      </div>
    );
  }

  console.log('Rendering user:', user);

  return (
    <div className={styles.profileContainer}>
      {/* "My Profile" button */}
      {!isCurrentUser && (
        <div className={styles.myProfileWrap}>
          <Link to="/myprofile" className={styles.myProfileBtn}>
            My Profile
          </Link>
        </div>
      )}

      <div 
        className={styles.avatar} 
        style={{ backgroundImage: user.avatarUrl ? `url(${user.avatarUrl})` : 'none' }} 
      />
      <h1 className={styles.profileName}>{user.name}</h1>
      <p className={styles.profileTag}>@{user.username}</p>
      <p className={styles.profileLocation}>{user.city}, {user.region}</p>

      {!isCurrentUser && !isFriend && (
        <button 
          className={styles.addFriendBtn}
          onClick={handleAddFriend}
        >
          Add to Friends
        </button>
      )}

      <div className={styles.progressSection}>
        <h2 className={styles.progressTitle}>Progress</h2>
        <div className={styles.progressList}>
          <div className={styles.progressItem}>
            <div className={styles.progressItemTitle}>Achievements</div>
            <div className={styles.progressItemValue}>{user.achievementsCount || 0}</div>
          </div>
          <div className={styles.progressItem}>
            <div className={styles.progressItemTitle}>Goals Completed</div>
            <div className={styles.progressItemValue}>{user.completedGoals || 0}</div>
          </div>
          <div className={styles.progressItem}>
            <div className={styles.progressItemTitle}>Friends</div>
            <div className={styles.progressItemValue}>{user.friendsCount || 0}</div>
          </div>
        </div>
      </div>

      {user.friends && user.friends.length > 0 && (
        <div className={styles.friendsSection}>
          <h2 className={styles.friendsTitle}>Friends</h2>
          <div className={styles.friendsList}>
            {user.friends.map(friend => (
              <Link
                key={friend.id}
                to={`/profile/${friend.username}`}
                className={styles.friendItem}
              >
                <div
                  className={styles.friendAvatar}
                  style={{ backgroundImage: friend.avatarUrl ? `url(${friend.avatarUrl})` : 'none' }}
                />
                <div className={styles.friendInfo}>
                  <div className={styles.friendName}>{friend.name}</div>
                  <div className={styles.friendTag}>@{friend.username}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {user.achievements && user.achievements.length > 0 && (
        <div className={styles.achievementsSection}>
          <h2 className={styles.achievementsTitle}>Achievements</h2>
          <div className={styles.achievementsList}>
            {console.log('Achievements:', user.achievements)}
            {user.achievements.map(ach => (
              <Link
                key={ach.id}
                to={`/achievements/${ach.id}`}
                className={styles.achievementItem}
              >
                <div
                  className={styles.achievementThumb}
                  style={{ backgroundImage: ach.imageUrl ? `url(${ach.imageUrl})` : 'none' }}
                />
                <div className={styles.achievementInfo}>
                  <div className={styles.achievementName}>{ach.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 