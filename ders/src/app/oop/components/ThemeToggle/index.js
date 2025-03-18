import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

// ThemeToggle component
function ThemeToggle({ darkMode, toggleDarkMode }) {
  return (
    <div className={styles.container}>
      <button 
        onClick={toggleDarkMode} 
        className={`${styles.button} ${darkMode ? styles.buttonLight : styles.buttonDark}`}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );
}

// Prop Types tanımlaması
ThemeToggle.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired
};

export default ThemeToggle; 