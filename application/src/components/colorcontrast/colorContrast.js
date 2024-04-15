// src/components/colorcontrast/ColorContrast.js

import React, { useState, useEffect } from 'react';
import {Button, ButtonGroup} from "@nextui-org/react";
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
  };

  return (
    <Button
      className={`theme-toggle-button ${theme === 'light' ? 'light' : 'dark'}`}
      onClick={toggleTheme}
    >
      {theme === 'light' ? 'Dark Theme' : 'Light Theme'}
    </Button>
  );
};

export default ColorContrast;


