import React, { createContext, useState, useEffect, useContext } from 'react';

const ContrastContext = createContext();

export function ContrastContextProvider({ children }) {
  const [theme, setTheme] = useState('light'); // Default theme

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Function to update theme
  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    console.log("newTheme in context", newTheme);
  };

  return (
    <ContrastContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ContrastContext.Provider>
  );
}

export function useContrastContext() {
  return useContext(ContrastContext);
}

export default ContrastContext;