
import React from 'react';
import { FaDumbbell } from 'react-icons/fa';

export const SportsCard = () => {
  return (
    <div className="sports-card">
      <FaDumbbell size={24} color="black" className="sports-icon" />
      <p className="sports-duration">110 min</p>
      <p className="sports-description">Daily norm of sports</p>
    </div>
  );
};