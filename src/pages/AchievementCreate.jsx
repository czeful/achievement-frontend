// src/pages/AchievementCreate.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Achievements.module.css';
import apiService from '../api';

const CATEGORIES = ['Health', 'Career', 'Education', 'Personal', 'Finance', 'Hobby', 'Relationships'];

export default function AchievementCreate() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [dueDate, setDueDate] = useState('');
  const [steps, setSteps] = useState(['']);
  const navigate = useNavigate();

  const addStep = () => setSteps(s => [...s, '']);
  const updateStep = (i, val) => setSteps(s => { s[i] = val; return [...s]; });

  const handleSubmit = async e => {
    e.preventDefault();
    await apiService.createAchievement({
      name,
      title: name,
      description,
      category,
      steps,
      progress: Object.fromEntries(steps.map(st => [st, false])),
      status: 'in_progress',
      due_date: dueDate,
      collaborators: []
    });
    navigate('/achievements');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>New Achievement</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <textarea
          className={styles.textarea}
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <select
          className={styles.input}
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <label className={styles.label}>Due Date</label>
        <input
          type="date"
          className={styles.input}
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          required
        />

        <div className={styles.steps}>
          <label>Steps</label>
          {steps.map((st, i) => (
            <input
              key={i}
              className={styles.input}
              value={st}
              onChange={e => updateStep(i, e.target.value)}
              placeholder={`Step ${i + 1}`}
              required
            />
          ))}
          <button type="button" className={styles.smallBtn} onClick={addStep}>
            + Add Step
          </button>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Create
        </button>
      </form>
    </div>
  );
}
