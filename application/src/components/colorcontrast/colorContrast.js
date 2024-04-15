import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import styles from '../../styles/colorContrast.module.css';

const ColorContrast = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.classList.toggle('dark-theme', newTheme === 'dark');
  };

  return (
    <Button
      className={`${styles.themeToggleButton} ${theme === 'light' ? styles.light : styles.dark}`}
      onClick={toggleTheme}
    >
      {theme === 'light' ? 'Dark Theme' : 'Light Theme'}
    </Button>
  );
};

export default ColorContrast;




