import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Goals.css';

export default function GoalCreate() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика создания цели
  };

  return (
    <div className="container">
      <h1 className="title">Create a New Goal</h1>
      <form className="goal-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Goal Name" required />
        <textarea placeholder="Description" required />
        <input type="number" placeholder="Target (%)" min="0" max="100" required />
        <button type="submit">Create Goal</button>
      </form>
      <Link to="/goals" style={{ 
        display: 'inline-block',
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: 'black',
        color: 'yellow',
        textDecoration: 'none',
        borderRadius: '6px',
        fontWeight: 'bold'
      }}>
        Back to Goals
      </Link>
    </div>
  );
} 