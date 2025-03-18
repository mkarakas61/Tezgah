'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './styles.module.css';

// ConceptCard component
export default function ConceptCard({ concept, darkMode, index, isLearned, onCardClick }) {
  const { title, icon, color, description, image, difficultyLevel, points } = concept;
  
  // Zorluk seviyesi için gösterge elementi
  const getDifficultyStars = () => {
    const maxStars = 5;
    const filledStars = '★'.repeat(difficultyLevel);
    const emptyStars = '☆'.repeat(maxStars - difficultyLevel);
    return (
      <div className={styles.difficultyIndicator}>
        <span className={styles.difficultyStars}>
          {filledStars}{emptyStars}
        </span>
        <span className={styles.difficultyText}>
          {getDifficultyLabel(difficultyLevel)}
        </span>
      </div>
    );
  };
  
  // Zorluk seviyesi etiketi
  const getDifficultyLabel = (level) => {
    switch(level) {
      case 1: return 'Çok Kolay';
      case 2: return 'Kolay';
      case 3: return 'Orta';
      case 4: return 'Zor';
      case 5: return 'Çok Zor';
      default: return 'Orta';
    }
  };

  return (
    <motion.div
      className={`${styles.card} ${darkMode ? styles.darkCard : ''} ${isLearned ? styles.learnedCard : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          delay: index * 0.1,
          duration: 0.3
        }
      }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: darkMode ? 
          '0 8px 32px rgba(0, 0, 0, 0.4)' : 
          '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}
      onClick={onCardClick}
    >
      <div className={styles.cardTop}>
        <div className={styles.imageContainer}>
          <Image
            src={image}
            alt={title}
            width={300}
            height={150}
            className={styles.conceptImage}
          />
          {isLearned && (
            <div className={styles.learnedBadge}>
              <span className={styles.checkIcon}>✓</span>
              <span>Öğrenildi</span>
            </div>
          )}
        </div>
        
        <div className={styles.cardHeader}>
          <div className={styles.titleContainer}>
            <span className={styles.icon} style={{ backgroundColor: color }}>{icon}</span>
            <h3 className={styles.title}>{title}</h3>
          </div>
          
          <div className={styles.pointsContainer}>
            <Image 
              src="/sav.svg" 
              alt="SAV token" 
              width={18}
              height={18}
              className={styles.tokenIcon}
            />
            <span className={styles.pointsValue}>{points}</span>
          </div>
        </div>
        
        {getDifficultyStars()}
      </div>

      <div className={styles.cardContent}>
        <p className={styles.description}>{description}</p>
      </div>
      
      <div className={styles.cardFooter}>
        <span className={styles.readMore}>Detayları Göster →</span>
      </div>
    </motion.div>
  );
}

// Prop Types tanımlaması
ConceptCard.propTypes = {
  concept: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    difficultyLevel: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired
  }).isRequired,
  darkMode: PropTypes.bool,
  index: PropTypes.number.isRequired,
  isLearned: PropTypes.bool,
  onCardClick: PropTypes.func.isRequired
};

ConceptCard.defaultProps = {
  darkMode: false,
  isLearned: false
}; 