import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiService from '../api';
import styles from '../styles/Auth.module.css'; // <-- тот же файл, что для Login

export default function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      // тестовый вход
      if (formData.email === 'test' && formData.password === '1234') {
        localStorage.setItem('token', 'test-token');
        localStorage.setItem('username', 'test_user');
        navigate('/discover');
        return;
      }
      const res = await apiService.register(formData);
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', res.user.username);
      navigate('/discover');
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при регистрации');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="some@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          type="password"
          name="confirmPassword"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.primaryBtn}>
          REGISTER
        </button>
      </form>
      <button
        className={styles.secondaryBtn}
        onClick={() => navigate('/register-with-phone')}
      >
        REGISTER WITH PHONE NUMBER
      </button>
      <Link to="/login" className={styles.link}>
        ALREADY HAVE AN ACCOUNT?
      </Link>
    </div>
  );
}
