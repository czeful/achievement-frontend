// src/pages/Settings.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../api';
import styles from '../styles/Settings.module.css';

const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    bio: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiService.getUserProfile('me');
        setUser(response.data);
        setFormData({
          name: response.data.name || '',
          location: response.data.location || '',
          bio: response.data.bio || ''
        });
      } catch (err) {
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await apiService.updateProfile(formData);
      setSuccess(true);
      // Refresh user data
      const response = await apiService.getUserProfile('me');
      setUser(response.data);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  if (loading) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Settings</h1>
      
      <div className={styles.section}>
        <h2>Edit Profile</h2>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>Profile updated successfully</div>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Save Changes
          </button>
        </form>
      </div>

      <div className={styles.section}>
        <h2>Account</h2>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Settings;
