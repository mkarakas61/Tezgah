'use client';

import { useState, useEffect } from 'react';
import { useTokens } from './Layout';

export default function ProgressCard({ 
  title, 
  description, 
  level, 
  icon, 
  progress, 
  onClick, 
  tokenReward = 5, 
  completedKey,
  difficulty = 'Kolay'
}) {
  const [isCompleted, setIsCompleted] = useState(false);
  const { addTokens } = useTokens();
  
  // Check if completed from localStorage
  useEffect(() => {
    if (completedKey) {
      const completedItems = JSON.parse(localStorage.getItem(completedKey) || '[]');
      setIsCompleted(completedItems.includes(title));
    }
  }, [completedKey, title]);
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  
  const markAsCompleted = () => {
    if (completedKey && !isCompleted) {
      const completedItems = JSON.parse(localStorage.getItem(completedKey) || '[]');
      if (!completedItems.includes(title)) {
        completedItems.push(title);
        localStorage.setItem(completedKey, JSON.stringify(completedItems));
        addTokens(tokenReward);
        setIsCompleted(true);
      }
    }
  };
  
  // Get difficulty color
  const getDifficultyColor = () => {
    switch(difficulty.toLowerCase()) {
      case 'kolay':
        return 'bg-green-500';
      case 'orta':
        return 'bg-yellow-500';
      case 'zor':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };
  
  return (
    <div 
      className={`card card-3d cursor-pointer ${isCompleted ? 'border-2 border-success' : ''}`}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-3xl">{icon}</div>
        <div className={`level-badge ${getDifficultyColor()}`}>{difficulty}</div>
      </div>
      
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <p className="text-sm mb-3 text-gray-600 dark:text-gray-300">{description}</p>
      
      {level && <div className="badge mb-3">{level}</div>}
      
      <div className="progress-chart mb-3">
        <div 
          className="progress-chart-fill" 
          style={{ width: `${progress || (isCompleted ? 100 : 0)}%` }}
        />
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{isCompleted ? 'Tamamlandı' : `${progress || 0}% Tamamlandı`}</span>
        {!isCompleted && (
          <div className="flex items-center">
            <span className="text-sm mr-1">+{tokenReward}</span>
            <span>💰</span>
          </div>
        )}
      </div>
      
      {/* Hidden button for internal use */}
      {!isCompleted && (
        <button 
          className="hidden" 
          onClick={(e) => {
            e.stopPropagation();
            markAsCompleted();
          }}
          data-complete-btn
        >
          Complete
        </button>
      )}
    </div>
  );
} 