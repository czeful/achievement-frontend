import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../styles/Auth.module.css';
import apiService from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Простая проверка для тестового пользователя
    if (email === 'test' && password === '1234') {
      localStorage.setItem('token', 'test_token');
      localStorage.setItem('username', 'test_user');
      navigate('/discover');
      return;
    }

    try {
      const { data } = await apiService.login({ email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.user.username);
      navigate('/achievements');
    } catch (error) {
      setError('Неверный email или пароль');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Log in</h1>
      {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          className={styles.input} 
          type="text" 
          placeholder="some@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          className={styles.input} 
          type="password" 
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.primaryBtn}>LOG IN</button>
      </form>
      <button className={styles.secondaryBtn}>USE PHONE NUMBER</button>
      <Link to="/register" className={styles.link}>
        DON'T HAVE ACCOUNT YET?
      </Link>
    </div>
  );
} 