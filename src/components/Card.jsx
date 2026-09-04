import React from 'react';
import './components.css';

export default function Card({ children, className = '', onClick }) {
  return (
    <div className={`card ${onClick ? 'clickable animate-bounce-scale' : ''} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
