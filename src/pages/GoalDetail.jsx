import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/Goals.css';

export default function GoalDetail() {
  const { id } = useParams();

  return (
    <div className="container">
      <h1 className="title">Achievement Name</h1>
      <div className="step-card">Step 1 - Description</div>
      <div className="step-card">Step 2 - Description</div>
      <div className="step-card">Step 3 - Description</div>
      <div style={{ marginTop: '20px' }}>
        <Link to="/goals" style={{ 
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: 'black',
          color: 'yellow',
          textDecoration: 'none',
          borderRadius: '6px',
          fontWeight: 'bold',
          marginRight: '10px'
        }}>
          Back to Goals
        </Link>
      </div>
    </div>
  );
} 