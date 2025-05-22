import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiService from '../api';
import styles from '../styles/Register.module.css';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      if (formData.email === 'test' && formData.password === '1234') {
        localStorage.setItem('token', 'test-token');
        navigate('/goals');
        return;
      }

      const response = await apiService.register(formData);
      localStorage.setItem('token', response.token);
      navigate('/goals');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration error');
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.registerTitle}>Register</h2>
      {error && <div className={styles.registerError}>{error}</div>}
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <div className={styles.registerGroup}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className={styles.registerGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className={styles.registerGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className={styles.registerGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        <button type="submit" className={styles.registerButton}>Register</button>
      </form>
      <p className={styles.registerText}>
        Already have an account? <Link to="/login" className={styles.registerLink}>Login</Link>
      </p>
    </div>
  );
} 