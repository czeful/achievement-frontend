import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Goals.css';
import apiService from '../api';

export default function GoalsList() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await apiService.getGoals();
        setGoals(response.data.goals);
      } catch (error) {
        console.error('Error fetching goals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  if (loading) {
    return <div className="container">Загрузка...</div>;
  }

  return (
    <div className="container">
      <h1 className="title">Achievements</h1>
      {goals.map((goal) => (
        <div key={goal.id} className="goal-card">
          <div className="goal-header">
            <span className="goal-name">{goal.name}</span>
            <span className="progress">
              {Math.round(
                (Object.values(goal.progress).filter(Boolean).length / 
                Object.keys(goal.progress).length) * 100
              )}%
            </span>
          </div>
          <p className="description">{goal.description}</p>
          <div className="footer">👥 {goal.collaborators.length}</div>
        </div>
      ))}
      <Link to="/goals/create" style={{ 
        display: 'inline-block',
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: 'black',
        color: 'yellow',
        textDecoration: 'none',
        borderRadius: '6px',
        fontWeight: 'bold'
      }}>
        Create New Goal
      </Link>
    </div>
  );
} 